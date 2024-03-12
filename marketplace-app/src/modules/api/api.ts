import {
  SponsorSimple,
  SponsorDetails,
  Paginated,
  Tree,
  TreesCluster,
  TreePoint,
} from 'types';
import { get } from './base-api';

export type GetTreesParams = {
  sponsor?: number;
  offset?: number;
  pageSize?: number;
};

export function getTrees(params: GetTreesParams) {
  return get<Paginated<Tree>>('nfts', { params }).then(
    (response) => response.data
  );
}

export function getTreeDetails(nftId: number) {
  return get<Tree>(`nfts/${nftId}`).then((response) => response.data);
}

export type Tile = {
  index: number;
};

export type TileWithZoom = Tile & {
  zoom: number;
};

export function getTreesClusters(params: TileWithZoom) {
  return get<TreesCluster[]>('trees_clusters', { params }).then(
    (response) => response.data
  );
}

export function getTreePoints(params: Tile) {
  return get<TreePoint[]>('tree_points', { params }).then(
    (response) => response.data
  );
}

export type AutocompleteSponsorsParams = {
  search?: string;
};
export function autocompleteSponsors(params: AutocompleteSponsorsParams) {
  return get<Paginated<SponsorSimple>>('sponsors/', {
    params,
  }).then((response) => response.data);
}

export function getSponsor(sponsorId: number) {
  return get<SponsorDetails>(`sponsors/${sponsorId}/`).then(
    (response) => response.data
  );
}
