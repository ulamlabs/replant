import { useMutation, useQuery } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { get, post } from 'modules/api';
import { NewPlantType, PlantType, PlantsSummary } from './types';

type PlantsPage = {
  count: number;
  next: string;
  previous: string;
  results: PlantType[];
};

const plantsSummaryUrl = '/plants/summary';
const plantsUrl = '/plants';

const plantsQueryKey = (page: number) => ['GET', plantsUrl, page] as const;
const plantsSummaryQueryKey = ['POST', plantsUrl, '/summary'];
const postPlantsQueryKey = ['POST', plantsUrl] as const;

const getPlants = async (page: number) => {
  const response = await get<PlantsPage>(
    `${plantsUrl}?page_size=15&page=${page}`
  );
  return response.data;
};

const getPlantsSummary = async () => {
  const response = await get<PlantsSummary>(plantsSummaryUrl);
  return response.data;
};

const postPlants = (payload: NewPlantType) =>
  post<PlantType, NewPlantType>(plantsUrl, payload);

export const usePlants = (page: number) =>
  useQuery<PlantsPage>({
    queryFn: () => getPlants(page),
    queryKey: plantsQueryKey(page),
  });

export const usePlantsSummary = () =>
  useQuery<PlantsSummary>({
    queryFn: () => getPlantsSummary(),
    queryKey: plantsSummaryQueryKey,
  });

export const usePlantsMutation = () =>
  useMutation<AxiosResponse<PlantType>, AxiosError, NewPlantType>({
    mutationKey: postPlantsQueryKey,
    mutationFn: (payload) => postPlants(payload),
  });
