import random
from pathlib import Path
import bisect

from PIL import Image
import opensimplex

LATLON_PRECISION = 100_000
HALF_LATLON_PRECISION = LATLON_PRECISION // 2

LatLon = tuple[float, float]


def get_random_latlon() -> LatLon:
    image, green_mask = get_green_mask()
    x, y = random.choice(green_mask)
    x_offset = (
        random.randrange(-HALF_LATLON_PRECISION, HALF_LATLON_PRECISION)
        / LATLON_PRECISION
    )
    y_offset = (
        random.randrange(-HALF_LATLON_PRECISION, HALF_LATLON_PRECISION)
        / LATLON_PRECISION
    )
    x = max(0, min(image.width, x + x_offset))
    y = max(0, min(image.height, y + y_offset))
    return image_coords_to_latlon(image, x, y)


def get_green_mask() -> tuple[Image.Image, list[float]]:
    print("Builing green areas mask...")
    image_path = Path(__file__).parent.parent / "assets" / "blue-marble.png"
    image = Image.open(image_path)
    data = image.getdata()
    green_mask: list[float] = []
    for i, color in enumerate(data):
        g = color[1]
        y = i // image.width
        equator_distance = abs(y - image.height / 2) / image.height
        is_green = (
            g > sum(color) / 3 + 80 * equator_distance
            and g < 90 - 50 * equator_distance
        )
        green_mask.append(1 - equator_distance if is_green else 0)
    return image, green_mask


def save_green_areas(image: Image.Image, green_mask: list[float]):
    print("Saving green areas image...")
    to_save = [(0, int(255 * value), 0) for value in green_mask]
    output_image = Image.new("RGB", image.size)
    output_image.putdata(to_save)
    image_path = Path(__file__).parent.parent / "assets" / "green-areas.png"
    output_image.save(image_path)


def apply_noise(image: Image.Image, data: list[float]) -> list[float]:
    print("Applying noise...")
    noise_scales = [
        (0.02, 5.0),
        (0.05, 7.0),
        (0.2, 4.0),
        (0.5, -3.0),
    ]
    noise = CompoundNoise(noise_scales, seed=1)

    result: list[float] = []
    for i, value in enumerate(data):
        if value == 0:
            result.append(0)
            continue

        x = i % image.width
        y = i // image.width

        value *= noise.at(x, y)
        value = max(0, value - 0.5) * 2
        result.append(value)

    print("Noise applied.")

    return result


class LatLonRoller:
    def __init__(self, weights: list[float], latlons: list[LatLon]):
        assert len(weights) == len(latlons)

        self.latlons = latlons
        self.sum_of_weights = 0.0
        self.weights_acc = []
        for weight in weights:
            self.sum_of_weights += weight
            self.weights_acc.append(self.sum_of_weights)

    def roll(self) -> LatLon:
        roulette_roll = random.random() * self.sum_of_weights
        index = bisect.bisect(self.weights_acc, roulette_roll)
        lat, lon = self.latlons[index]
        lon_offset = (
            random.randrange(-HALF_LATLON_PRECISION, HALF_LATLON_PRECISION)
            / LATLON_PRECISION
        )
        lat_offset = (
            random.randrange(-HALF_LATLON_PRECISION, HALF_LATLON_PRECISION)
            / LATLON_PRECISION
        )

        return lat + lat_offset, lon + lon_offset


class CompoundNoise:
    def __init__(self, scales: list[tuple[float, float]], seed: int):
        self.scales = scales
        self.noises = [opensimplex.OpenSimplex(seed) for _ in scales]
        self.total = sum(scale[1] for scale in scales)

    def at(self, x: float, y: float) -> float:
        noise_value = 0
        for i, noise in enumerate(self.noises):
            scale, intensity = self.scales[i]
            noise_value += noise.noise2(x * scale, y * scale) * intensity
        return (noise_value + self.total) / self.total / 2


def get_latlon_roller():
    image, green_mask = get_green_mask()
    green_mask = apply_noise(image, green_mask)
    # save_green_areas(image, green_mask)
    latlons = [
        image_coords_to_latlon(image, *image_index_to_image_coords(image, i))
        for i in range(len(green_mask))
    ]

    return LatLonRoller(weights=green_mask, latlons=latlons)


def image_index_to_image_coords(image, index: int):
    return (index % image.width), index // image.width


def image_coords_to_latlon(image: Image.Image, x: float, y: float) -> LatLon:
    lon = (x / image.width - 0.5) * 180 / (image.height / image.width)
    lat = (y / image.height - 0.5) * 180

    assert lon >= -180 and lon <= 180 and lat >= -90 and lat <= 90
    return lat, lon
