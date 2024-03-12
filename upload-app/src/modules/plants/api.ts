import {
  InfiniteData,
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { get, post } from 'modules/api';
import { isOnline, useOfflineStore } from 'modules/offline';
import * as offlineDb from 'modules/offline/db';
import { NewTree, Page, Plant, PlantsSummary } from '.';

const PAGE_SIZE = 15;

const plantsSummaryUrl = '/trees/summary';
const plantsUrl = '/trees';

const plantsInfiniteQueryKey = ['GET', plantsUrl, 'infinite'];
const plantsQueryKey = (page: number) => ['GET', plantsUrl, page];
const plantsSummaryQueryKey = ['POST', plantsUrl, 'summary'];
const postPlantsQueryKey = ['POST', plantsUrl];

export const allPlantsQueryKey = ['GET', plantsUrl];

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

export const postPlants = (payload: NewTree) =>
  post<Plant, NewTree>(plantsUrl, payload);

const postPlantsOrSaveToDb = async (payload: {
  plant: NewTree;
  capturedAt: string;
}) => {
  if (isOnline()) {
    const response = await postPlants(payload.plant);
    return { response, onLine: true };
  }
  await offlineDb.saveNewTree(payload.plant, payload.capturedAt);
  return { onLine: false };
};

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

  const { incTotalCount } = useOfflineStore();

  return useMutation<
    { response?: AxiosResponse<Plant>; onLine: boolean },
    AxiosError,
    { plant: NewTree; capturedAt: string }
  >({
    mutationKey: postPlantsQueryKey,
    mutationFn: postPlantsOrSaveToDb,
    onSuccess: (data) => {
      if (data.onLine) {
        queryClient.invalidateQueries({ queryKey: allPlantsQueryKey }); // invalidates all plants queries if uploaded to BE
      } else {
        incTotalCount();
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
