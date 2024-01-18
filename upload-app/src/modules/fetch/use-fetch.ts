const apiOrigin = window.location.origin.includes('localhost')
  ? 'http://localhost:8003'
  : window.location.origin;

export const apiBaseUrl = apiOrigin + '/api';

const originalFetch = fetch;

type FetchFn = typeof fetch;

export const useFetch = () => {
  // const loginState = useSelector(selectLoginState);
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const fetch: FetchFn = async (input, init) => {
    if (typeof input === 'string') {
      input = apiBaseUrl + input; // TODO: do the same when input is Request or URL object
    }
    const response = await originalFetch(input, init);
    if (response.status === 403) {
      // dispatch({ type: 'LOG_OUT'})
      // navigate('/login')
    }
    return response;
  };

  return fetch;
};

/**
 * export const useTransactionsQuery = () => {
 *   const fetch = useFetch();
 *   const query = useQuery(() => fetch('/api/transactions'));
 *   return query;
 * }
 */
