import { useMutation } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { post } from 'modules/api';
import { NewPlantType, PlantType } from './types';

const plantsUrl = '/plants';

const postPlantsQueryKey = ['POST', plantsUrl] as const;

const postPlants = (payload: NewPlantType) =>
  post<PlantType, NewPlantType>(plantsUrl, payload);

export const usePlantsMutation = () =>
  useMutation<AxiosResponse<PlantType>, AxiosError<any>, NewPlantType>({
    mutationKey: postPlantsQueryKey,
    mutationFn: (payload) => postPlants(payload),
  });
