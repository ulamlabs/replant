import * as ReactQuery from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { AxiosError } from 'axios';
import { GC_TIME, SHORT_STALE_TIME } from './consts';

const queryClient = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      staleTime: SHORT_STALE_TIME,
      gcTime: GC_TIME,
    },
  },
  queryCache: new ReactQuery.QueryCache({
    // @ts-expect-error error: Error -> error: AxiosError
    onError: (error: AxiosError) => {
      if (error.response?.status === 401 && window.location.pathname !== '/') {
        globalThis.location.href = '/';
      }
    },
  }),
});

export const QueryClientProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <ReactQuery.QueryClientProvider client={queryClient}>
    {children}
    <ReactQueryDevtools initialIsOpen={false} position={'bottom'} />
  </ReactQuery.QueryClientProvider>
);
