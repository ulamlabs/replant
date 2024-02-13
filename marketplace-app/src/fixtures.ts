import { Paginated, Plant } from 'types';

const plants: Plant[] = [
  {
    commonName: 'Pedunculate Oak',
    latinName: 'Quercus robur',
    date: '2024-01-01',
    imageUrl: 'fixtures/1.jpeg',
    lat: '13.633120',
    lon: '99.590502',
    nftCollection: '0x1234',
    nftId: '1',
    organization: 'Ulam Labs',
    planter: 'John Woo',
    plantingCostUsd: '10.00',
    country: 'Thailand',
    sponsoredBy: 'Ulam Labs',
  },
  {
    commonName: 'Persian willow',
    latinName: 'Salix aegyptiaca',
    date: '2024-01-02',
    imageUrl: 'fixtures/2.jpeg',
    lat: '14.633120',
    lon: '98.590502',
    nftCollection: '0x1234',
    nftId: '2',
    organization: 'Ulam Labs',
    planter: 'John Woo',
    plantingCostUsd: '12.00',
    country: 'Thailand',
    sponsoredBy: 'Ulam Labs',
  },
  {
    commonName: 'American sycamore',
    latinName: 'Platanus occidentalis',
    date: '2024-01-02',
    imageUrl: 'fixtures/3.jpeg',
    lat: '14.633120',
    lon: '98.590502',
    nftCollection: '0x1234',
    nftId: '3',
    organization: 'Green Thai',
    planter: 'John Woo',
    plantingCostUsd: '7.00',
    country: 'Thailand',
    sponsoredBy: 'Ulam Labs',
  },
];

const PLANTS: Plant[] = [];

const TOTAL_PLANTS = 10000;

for (let i = 0; i < TOTAL_PLANTS; i++) {
  const index = Math.floor(Math.random() * plants.length);
  PLANTS.push({ ...plants[index], nftId: (i + 1).toString() });
}

const ORGANIZATIONS = Array.from(
  new Set(PLANTS.map((plant) => plant.organization))
);

export function searchOrganization(searchTerm: string): string[] {
  return ORGANIZATIONS.filter((org) =>
    org.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
}

export type ListPlantsOptions = {
  organization?: string;
  offset?: number;
  pageSize?: number;
};

export function listPlants(options: ListPlantsOptions = {}): Paginated<Plant> {
  let plants = PLANTS;

  if (options.organization) {
    plants = PLANTS.filter(
      (plant) =>
        plant.organization.toLowerCase() ===
        options?.organization?.toLowerCase()
    );
  }

  if (!options?.offset) {
    options.offset = 0;
  }
  if (!options?.pageSize) {
    options.pageSize = 12;
  }

  return {
    offset: options.offset,
    total: plants.length,
    pageSize: options.pageSize,
    results: plants.slice(options.offset, options.offset + options.pageSize),
  };
}

export type OrgSummary = {
  plants: number;
  species: number;
  totalPlantsCostUsd: number;
};

export function getOrganizationSummary(organization: string): OrgSummary {
  let plants = 0;
  const species = new Set<string>();
  let totalPlantsCostUsd = 0;

  for (const plant of PLANTS) {
    if (plant.organization !== organization) {
      continue;
    }

    plants++;
    totalPlantsCostUsd += Number(plant.plantingCostUsd);
    species.add(plant.latinName);
  }

  return {
    plants,
    totalPlantsCostUsd,
    species: species.size,
  };
}
