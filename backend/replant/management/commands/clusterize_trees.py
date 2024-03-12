import functools
import logging
from collections import Counter, defaultdict
import math

import djclick as click
from django.db import models, transaction
from sklearn import cluster as sci_cluster
import numpy as np
import time

from replant.models import Tree, TreesCluster

logger = logging.getLogger(__name__)

TREES_BULK_SIZE = 5000

LATLON_PRECISION = 10_000
HALF_LATLON_PRECISION = LATLON_PRECISION // 2

LatLon = tuple[float, float]

START_N_CLUSTERS = 100
N_CLUSTERS_MULTIPLIER = 5

START_MIN_DISTANCE = 25
MIN_DISTANCE_MULTIPLIER = 0.25

MAX_ZOOM = 8


@click.command()
@transaction.atomic
def clusterize_trees():
    t0 = time.time()

    TreesCluster.objects.all().delete()

    latlons = Tree.objects.annotate(
        lon_float=models.functions.Cast("longitude", output_field=models.FloatField()),
        lat_float=models.functions.Cast("latitude", output_field=models.FloatField()),
    ).values_list("lon_float", "lat_float")

    print("Finding initial clusters...")
    clusters, labels, counter = clusterize(
        n_clusters=100, items=latlons, zoom=1, min_distance=START_MIN_DISTANCE
    )

    # Zoom 0
    zoom_0_clusters, _, zoom_0_counter = merge_close_clusters(
        list(clusters),
        labels,
        counter,
        min_distance=START_MIN_DISTANCE / MIN_DISTANCE_MULTIPLIER,
    )
    save_clusters(zoom_0_clusters, list(zoom_0_counter.values()), zoom=0)

    print("Expanding clusters...")
    expand_clusters(
        clusters,
        labels,
        latlons,
        counter,
        zoom=2,
        min_distance=START_MIN_DISTANCE * MIN_DISTANCE_MULTIPLIER,
    )

    t1 = time.time()
    print(f"Done in {t1-t0:.2f}s")


def expand_clusters(
    parent_clusters: list[np.array],
    parent_labels: list[int],
    parent_latlons: list[tuple[float, float]],
    counter: Counter,
    zoom: int,
    min_distance: float,
):
    if get_max_distance(parent_latlons) < min_distance:
        save_clusters(parent_clusters, list(counter.values()), zoom=zoom)

        if zoom < MAX_ZOOM:
            expand_clusters(
                parent_clusters,
                parent_labels,
                parent_latlons,
                counter,
                zoom=zoom + 1,
                min_distance=min_distance * MIN_DISTANCE_MULTIPLIER,
            )
        return

    for i in range(len(parent_clusters)):
        if zoom == 2:
            print(f"{i+1} / {len(parent_clusters)}...")
        label = -i - 1
        cluster_latlons = []
        for j, j_label in enumerate(parent_labels):
            if j_label == label:
                cluster_latlons.append(parent_latlons[j])

        if not cluster_latlons:
            return

        clusters, labels, counter = clusterize(
            n_clusters=min(20, len(cluster_latlons) // 10),
            items=cluster_latlons,
            zoom=zoom,
            min_distance=min_distance,
        )

        if zoom < MAX_ZOOM:
            expand_clusters(
                clusters,
                labels,
                cluster_latlons,
                counter,
                zoom=zoom + 1,
                min_distance=min_distance * MIN_DISTANCE_MULTIPLIER,
            )


def clusterize(n_clusters: int, items: list[np.array], zoom: int, min_distance: float):
    model = sci_cluster.MiniBatchKMeans(n_clusters=max(1, min(n_clusters, len(items))))
    model = model.fit(items)

    clusters = list(model.cluster_centers_)
    labels = list(model.labels_)
    counter = Counter(sorted(model.labels_))

    clusters, labels, counter = merge_close_clusters(
        clusters, labels, counter, min_distance=min_distance
    )

    # Remove centroids with no items. It can happen with MiniBatchKMeans.
    for i in reversed(range(len(clusters))):
        if not counter.get(i):
            clusters.pop(i)
            if i in counter:
                del counter[i]

    save_clusters(clusters, list(counter.values()), zoom=zoom)

    return clusters, labels, counter


def merge_close_clusters(
    clusters: list[np.array], labels: list[int], counter: Counter, min_distance: float
):
    label_by_cluster = {id(cluster): i for i, cluster in enumerate(clusters)}
    merged_clusters: list[tuple[np.array, int]] = []
    new_labels = list(labels)
    new_counter: dict[int, int] = defaultdict(int)
    while clusters:
        cluster = clusters.pop()
        label = label_by_cluster[id(cluster)]
        for k in range(len(new_labels)):
            if new_labels[k] == label:
                new_labels[k] = -len(merged_clusters) - 1
        weight = counter[label]
        new_counter[len(merged_clusters)] += weight
        to_merge = []
        for i in reversed(range(len(clusters))):
            other_cluster = clusters[i]
            if distance(cluster, other_cluster) < min_distance:
                clusters.pop(i)
                other_label = label_by_cluster[id(other_cluster)]
                for k in range(len(new_labels)):
                    if new_labels[k] == other_label:
                        new_labels[k] = -len(merged_clusters) - 1
                other_weight = counter[other_label]
                to_merge.append((other_cluster, other_weight))
                new_counter[len(merged_clusters)] += other_weight
        if to_merge:
            to_merge.append((cluster, weight))
            cluster = merge_clusters(to_merge)
        merged_clusters.append(cluster)
    return merged_clusters, new_labels, new_counter


def merge_clusters(clusters: list[tuple[np.array, int]]):
    x = 0.0
    y = 0.0
    total_weight = 0
    for cluster, weight in clusters:
        total_weight += weight
        x += cluster[0] * weight
        y += cluster[1] * weight
    x /= total_weight
    y /= total_weight
    return [x, y]


distances = {}


def get_max_distance(points: list[np.array]):
    global distances
    if id(points) in distances:
        return distances[id(points)]

    p1 = points[0]
    max_distance = 0.0
    for p2 in points[1:]:
        d = distance(p1, p2)
        if d > max_distance:
            max_distance = d

    distances[id(points)] = max_distance
    return max_distance


def distance(p1, p2) -> float:
    return math.sqrt(
        (p2[0] - p1[0]) * (p2[0] - p1[0]) + (p2[1] - p1[1]) * (p2[1] - p1[1])
    )


def save_clusters(centroids: np.array, counts: list[int], zoom: int):
    assert len(centroids) == len(counts)
    clusters: list[TreesCluster] = []
    max_count = max(counts)
    for centroid, count in zip(centroids, counts):
        x = max(-180, min(180, centroid[0]))
        y = max(-90, min(90, centroid[1]))
        cluster = TreesCluster(
            lon=x,
            lat=y,
            number_of_trees=count,
            zoom=zoom,
            tile_index=get_tile_index(x=x, y=y, zoom=zoom),
        )
        clusters.append(cluster)
    TreesCluster.objects.bulk_create(clusters)


def get_tile_index(x: float, y: float, zoom: int) -> int:
    grid_size = int(4 ** (max(0, zoom - 1)))
    tile_size = 360 / grid_size
    x2 = int((x + 180) / tile_size)
    y2 = int((y + 90) / tile_size)
    return y2 * grid_size + x2
