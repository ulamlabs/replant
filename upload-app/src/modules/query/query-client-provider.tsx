import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import * as ReactQuery from '@tanstack/react-query';
import { GC_TIME, SHORT_STALE_TIME } from './consts';
import { AxiosError } from 'axios';

const queryClient = new ReactQuery.QueryClient({
  defaultOptions: {
    queries: {
      gcTime: GC_TIME,
      refetchOnWindowFocus: false,
      // @ts-ignore err: unknown -> error: AxiosError
      retry: (failureCount, error: AxiosError) => {
        if (error.response?.status === 401) {
          return false; // do not retry, trigger error
        }

        // otherwise, restore default
        const defaultRetry = new ReactQuery.QueryClient().getDefaultOptions()
          .queries?.retry;

        return typeof defaultRetry === 'number' &&
          Number.isSafeInteger(defaultRetry)
          ? failureCount < (defaultRetry ?? 0)
          : false;
      },
      staleTime: SHORT_STALE_TIME,
    },
  },
  queryCache: new ReactQuery.QueryCache({
    // @ts-ignore err: unknown -> error: AxiosError
    onError: (error: AxiosError, xssd) => {
      if (error.response?.status === 401) {
        globalThis.location.href = '/login';
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
