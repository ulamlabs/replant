import { useQueries } from '@tanstack/react-query';
import { ClusterTile, getTreesClusters } from 'modules/api/api';
import { useMap, useMapEvents } from 'react-leaflet';
import { useEffect, useMemo, useState } from 'react';
import { TreesCluster } from 'types';
import { useThrottle } from '@uidotdev/usehooks';
import { MapMarker } from './MapMarker';

export function MapTrees() {
  const map = useMap();
  const [mapZoom, setMapZoom] = useState(map.getZoom());
  const [mapBounds, setMapBounds] = useState(map.getBounds());
  const [moveMapBounds, setMoveMapBounds] = useState(mapBounds);
  const throttledMoveMapBounds = useThrottle(moveMapBounds, 500);

  useEffect(() => {
    setMapBounds(throttledMoveMapBounds);
  }, [throttledMoveMapBounds]);

  const clustersZoom = useMemo(() => Math.floor(mapZoom / 2), [mapZoom]);

  const clusterTiles = useMemo<ClusterTile[]>(() => {
    const gridSize = 4 ** Math.max(clustersZoom - 1);
    const tileSize = 360 / gridSize;
    const minX = Math.floor(Math.max(0, mapBounds.getWest() + 180) / tileSize);
    const maxX =
      Math.ceil(Math.min(360, mapBounds.getEast() + 180) / tileSize) - 1;
    const minY = Math.floor((-mapBounds.getNorth() + 90) / tileSize);
    const maxY = Math.ceil((-mapBounds.getSouth() + 90) / tileSize) - 1;
    const tiles: ClusterTile[] = [];
    for (let x = minX; x <= maxX; x++) {
      for (let y = minY; y <= maxY; y++) {
        tiles.push({ x, y, zoom: clustersZoom });
      }
    }

    return tiles;
  }, [clustersZoom, mapBounds]);

  const clusters = useQueries({
    queries: clusterTiles.map((tile) => {
      return {
        queryKey: ['treesClusters', [tile.x, tile.y, tile.zoom]],
        queryFn: () => getTreesClusters(tile),
      };
    }),
    combine: (results) =>
      results.reduce<TreesCluster[]>((acc, curr) => {
        return acc.concat(curr.data ?? []);
      }, []),
  });

  const maxTrees = useMemo(() => {
    return Math.max(...clusters.map((c) => c.number_of_trees));
  }, [clusters]);

  useMapEvents({
    zoom: () => {
      setMapZoom(map.getZoom());
      setMapBounds(map.getBounds());
    },
    move: () => {
      setMoveMapBounds(map.getBounds());
    },
  });

  return clusters.map((cluster) => (
    <MapMarker
      cluster={cluster}
      relativeSize={cluster.number_of_trees / maxTrees}
      key={cluster.id}
    />
  ));
}
