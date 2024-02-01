import { Button } from 'common/components';
import { useLogoutMutation } from './api';
import { useFmtMsg } from 'modules/intl';
import { useNavigate } from 'react-router-dom';

export const Logout: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const logoutMutation = useLogoutMutation();

  const logOut = async () => {
    if (logoutMutation.isPending) {
      return;
    }
    await logoutMutation.mutateAsync({});
    navigate('/login');
  };

  return (
    <Button
      isLoading={logoutMutation.isPending}
      text={fmtMsg('logOut')}
      size='big'
      onClick={logOut}
    />
  );
};
