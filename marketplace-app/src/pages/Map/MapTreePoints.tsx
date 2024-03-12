import { useQueries } from '@tanstack/react-query';
import { TileWithZoom, getTreePoints } from 'modules/api/api';
import { useEffect } from 'react';
import { TreePoint } from 'types';
import { PixiTreeMarker } from './PixiTreeMarker';
import { usePixiMap } from './hooks';
import { MAX_MARKERS_ZOOM } from './const';

export function MapTreePoints({ tiles }: { tiles: TileWithZoom[] }) {
  const pixiMap = usePixiMap();

  const treePoints = useQueries({
    queries: tiles.map((tile) => {
      return {
        queryKey: ['treeMarkers', [tile.index]],
        queryFn: () => getTreePoints({ index: tile.index }),
        enabled: tile.zoom === MAX_MARKERS_ZOOM,
      };
    }),
    combine: (results) =>
      results.reduce<TreePoint[]>((acc, curr) => {
        return acc.concat(curr.data ?? []);
      }, []),
  });

  useEffect(() => {
    pixiMap.render();
  }, [treePoints, pixiMap]);

  return (
    <>
      {treePoints.map((tree) => (
        <PixiTreeMarker tree={tree} key={tree.nft_id} />
      ))}
    </>
  );
}
