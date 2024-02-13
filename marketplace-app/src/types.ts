export type Plant = {
  latinName: string;
  commonName: string;
  imageUrl: string;
  country: string;
  date: string;
  plantingCostUsd: string;
  planter: string;
  organization: string;
  lat: string;
  lon: string;
  sponsoredBy: string;
  nftCollection: string;
  nftId: string;
};

export type Paginate = {
  offset: number;
  pageSize: number;
};

export type Paginated<T> = Paginate & {
  total: number;
  results: T[];
};
