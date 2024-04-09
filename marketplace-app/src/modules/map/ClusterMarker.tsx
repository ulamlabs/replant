import { DivIcon } from 'leaflet';
import { Marker, useMap } from 'react-leaflet';
import { abbreviateNumber } from 'js-abbreviation-number';
import { memo } from 'react';
import { TreesCluster } from './types';

export type MapMarkerProps = {
  cluster: TreesCluster;
  relativeSize: number;
};

function _ClusterMarker({ cluster, relativeSize }: MapMarkerProps) {
  const map = useMap();

  const scale = relativeSize * 1.2 + 0.8;

  const formattedNumber = abbreviateNumber(cluster.number_of_trees, 0);

  const cssClasses =
    'absolute flex items-center justify-center rounded-full bg-white p-1 border-4 border-green-350 w-8 h-8';
  const icon = new DivIcon({
    html: `<div class="${cssClasses}" style="transform: scale(${scale})">${formattedNumber}</div>`,
  });

  const position: [number, number] = [cluster.latitude, cluster.longitude];

  function onClick() {
    map.setZoomAround(position, (cluster.zoom + 1) * 2, {
      animate: true,
    });
  }

  return (
    <Marker
      position={position}
      icon={icon}
      eventHandlers={{ click: onClick }}
    />
  );
}

export const ClusterMarker = memo(_ClusterMarker);
