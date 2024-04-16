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

  return (
    <LogoutButton
      className='bg-transparent hover:!bg-red-50 dark:hover:!bg-red-800 dark:hover:!bg-opacity-30 border-none lg:!justify-end !text-red-400 dark:!text-red-800 min-h-16 px-6 py-5 !rounded-2xl !text-base !font-medium'
      onClick={logOut}
    >
      {fmtMsg('logOut')}
    </LogoutButton>
  );
};
