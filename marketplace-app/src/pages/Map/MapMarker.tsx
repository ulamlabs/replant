import { DivIcon } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import { TreesCluster } from 'types';
import { abbreviateNumber } from 'js-abbreviation-number';

export type MapMarkerProps = {
  cluster: TreesCluster;
  relativeSize: number;
};

export function MapMarker({ cluster, relativeSize }: MapMarkerProps) {
  const map = useMap();

  const scale = relativeSize * 1.2 + 0.8;

  const formattedNumber = abbreviateNumber(cluster.number_of_trees, 1);

  const icon = new DivIcon({
    html: `<div class="map-cluster-icon" style="transform: scale(${scale})">${formattedNumber}</div>`,
  });

  const position: [number, number] = [-cluster.lat, cluster.lon];

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{
        click: () => {
          map.setZoomAround(position, (cluster.zoom + 1) * 2, {
            animate: true,
          });
        },
      }}
    />
  );
}
