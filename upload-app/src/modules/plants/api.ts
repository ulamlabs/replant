import { useMutation } from '@tanstack/react-query';
import { post } from 'modules/api';
import { NewPlantType, PlantType } from './types';
import { AxiosError, AxiosResponse } from 'axios';

const plantUrl = '/plant';

const postPlantQueryKey = ['POST', plantUrl] as const;

const postPlant = (payload: NewPlantType) =>
  post<PlantType, NewPlantType>(plantUrl, payload);

export const usePlantMutation = () =>
  useMutation<AxiosResponse<PlantType>, AxiosError<any>, NewPlantType>({
    mutationKey: postPlantQueryKey,
    mutationFn: (payload) => postPlant(payload),
  });
