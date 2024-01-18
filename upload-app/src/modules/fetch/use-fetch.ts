const originalFetch = fetch;

export const useFetch = () => {
  // const { loginState, setLoginState } = useState/useSelector(loginState);
  // const navigate = useNavigate();

  const fetch: typeof originalFetch = async (...args) => {
    const response = await originalFetch(...args);
    if (response.status === 403) {
      // setLoginState({ loggedIn: false })
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
