import { useQuery } from '@tanstack/react-query';
import { get } from 'modules/api';
import { loadAssignedSpecies, saveAssignedSpecies } from 'modules/offline-db';
import { AssignedSpecies } from './types';

export type AssignedSpeciesResponseData = AssignedSpecies[];

const assignedSpeciesUrl = '/assigned-species';

export const assignedSpeciesQueryKey = ['GET', assignedSpeciesUrl] as const;

const getAssignedSpecies = async () => {
  if (window.navigator.onLine) {
    const response = await get<AssignedSpeciesResponseData>(assignedSpeciesUrl);
    await saveAssignedSpecies(response.data);
    return response.data;
  }
  return await loadAssignedSpecies();
};

export const useSpecies = () =>
  useQuery({
    queryFn: getAssignedSpecies,
    queryKey: assignedSpeciesQueryKey,
    networkMode: 'always',
  });
