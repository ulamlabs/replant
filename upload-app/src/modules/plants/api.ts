import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { get, post } from 'modules/api';
import { saveNewPlant } from 'modules/offline-db';
import { NewPlant, Page, Plant, PlantsSummary } from '.';

const PAGE_SIZE = 15;

const plantsSummaryUrl = '/trees/summary';
const plantsUrl = '/trees';

const plantsInfiniteQueryKey = ['GET', plantsUrl, 'infinite'];
const plantsQueryKey = (page: number) => ['GET', plantsUrl, page];
const plantsSummaryQueryKey = ['POST', plantsUrl, 'summary'];
const postPlantsQueryKey = ['POST', plantsUrl];

const getPlants = async (page: number) => {
  const response = await get<Page<Plant>>(
    `${plantsUrl}?page_size=${PAGE_SIZE}&page=${page}`
  );
  return response.data;
};

const getPlantsSummary = async () => {
  const response = await get<PlantsSummary>(plantsSummaryUrl);
  return response.data;
};

const postPlants = (payload: NewPlant) =>
  post<Plant, NewPlant>(plantsUrl, payload);

export const usePlants = (page: number) =>
  useQuery<Page<Plant>>({
    queryFn: () => getPlants(page),
    queryKey: plantsQueryKey(page),
  });

export const usePlantsSummary = () =>
  useQuery<PlantsSummary>({
    queryFn: () => getPlantsSummary(),
    queryKey: plantsSummaryQueryKey,
  });

export const usePlantsMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    { response?: AxiosResponse<Plant>; onLine: boolean },
    AxiosError,
    NewPlant
  >({
    mutationKey: postPlantsQueryKey,
    mutationFn: async (payload) => {
      if (window.navigator.onLine) {
        const response = await postPlants(payload);
        return { response, onLine: true };
      }
      await saveNewPlant(payload);
      return { onLine: false };
    },
    onSuccess: (data) => {
      if (data.onLine) {
        queryClient.invalidateQueries({ queryKey: ['GET', plantsUrl] }); // invalidates all plants queries
      }
    },
    networkMode: 'always',
  });
};

export const usePlantsInfinite = () =>
  useInfiniteQuery<
    Page<Plant>,
    AxiosError,
    InfiniteData<Page<Plant>>,
    string[],
    number
  >({
    initialPageParam: 1,
    getNextPageParam: (lastPage, _, lastPageParam) => {
      if (!lastPage.next) {
        return;
      }
      return lastPageParam + 1;
    },
    queryKey: plantsInfiniteQueryKey,
    queryFn: ({ pageParam }) => getPlants(pageParam),
  });
