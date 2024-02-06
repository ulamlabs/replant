import { useQuery } from '@tanstack/react-query';
import { get } from 'modules/api';

export type Species = {
  botanical_name: string;
  common_name: string;
};

type AssignedSpecies = {
  species: Species;
};

type SpeciesResponseData = AssignedSpecies[];

const SPECIES_URL = '/species';

export const SPECIES_QUERY_KEY = ['GET', SPECIES_URL] as const;

const getSpecies = async () => {
  const response = await get<SpeciesResponseData>(SPECIES_URL);
  return response.data.map((item) => item.species);
};

export const useSpecies = () =>
  useQuery({ queryFn: getSpecies, queryKey: SPECIES_QUERY_KEY });
