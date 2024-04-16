import { useQueryClient } from '@tanstack/react-query';
import { useFmtMsg } from 'modules/intl';
import { useNavigate } from 'react-router-dom';
import { useLogoutUser } from '.';
import { LogoutButton } from './components';

export const Logout = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const logoutMutation = useLogoutUser();

  const queryClient = useQueryClient();

  const logOut = async () => {
    if (logoutMutation.isPending) {
      return;
    }
    await logoutMutation.mutateAsync({});
    queryClient.removeQueries(); // remove all queries
    navigate('/');
  };

  return <LogoutButton onClick={logOut}>{fmtMsg('logOut')}</LogoutButton>;
};
