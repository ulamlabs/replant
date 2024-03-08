import { useUser } from 'modules/user';

export const useAuthRequired = () => {
  useUser(); // make simple query to check if user is logged in. 401 is handled in global query provider configuaration.
};
