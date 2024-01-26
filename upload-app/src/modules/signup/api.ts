import { useQuery } from '@tanstack/react-query';
import { useFetch } from 'modules/fetch';

const COUNTRIES_URL = '/countries';
const COUNTRIES_QUERY_KEY = ['GET', COUNTRIES_URL] as const;

export const useCountriesQuery = () => {
  const fetch = useFetch();
  const query = useQuery({
    queryKey: COUNTRIES_QUERY_KEY,
    queryFn: () => fetch(COUNTRIES_URL).then((res) => res.json()),
  });

  return query.data;
};
