import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { get } from 'modules/api/base-api';
import { UserType } from '.';

const userUrl = '/user';

export const userQueryKey = ['GET', userUrl] as const;

const getUser = async () => {
  const response = await get<UserType>(userUrl);
  return response.data;
};

export const useUser = () =>
  useQuery<UserType, AxiosError>({
    queryKey: userQueryKey,
    queryFn: () => getUser(),
    retry: false,
  });
