import { useQueries } from '@tanstack/react-query';
import { TileWithZoom, getTreesClusters } from 'modules/api/api';
import { useMemo } from 'react';
import { TreesCluster } from 'types';
import { ClusterMarker } from './ClusterMarker';
import { MAX_MARKERS_ZOOM } from './const';

export function MapTreesClusters({ tiles }: { tiles: TileWithZoom[] }) {
  const clusters = useQueries({
    queries: tiles.map((tile) => {
      return {
        queryKey: ['treesClusters', [tile.index, tile.zoom]],
        queryFn: () => getTreesClusters(tile),
        enabled: tile.zoom < MAX_MARKERS_ZOOM,
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

  return (
    <>
      {clusters.map((cluster) => (
        <ClusterMarker
          cluster={cluster}
          relativeSize={cluster.number_of_trees / maxTrees}
          key={cluster.id}
        />
      ))}
    </>
  );
}
