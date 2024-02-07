import { useQuery } from '@tanstack/react-query';
import { get } from 'modules/api';

export type Species = {
  botanical_name: string;
  common_name: string;
};

export type AssignedSpecies = {
  id: number;
  species: Species;
};

type AssignedSpeciesResponseData = AssignedSpecies[];

const assignedSpeciesUrl = '/assigned-species';

export const assignedSpeciesQueryKey = ['GET', assignedSpeciesUrl] as const;

const getAssignedSpecies = async () => {
  const response = await get<AssignedSpeciesResponseData>(assignedSpeciesUrl);
  return response.data;
};

export const useSpecies = () =>
  useQuery({
    queryFn: getAssignedSpecies,
    queryKey: assignedSpeciesQueryKey,
  });
