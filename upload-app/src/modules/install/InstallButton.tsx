import { Button } from 'common/components';
import { InstallIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useNavigate } from 'react-router-dom';

export const InstallButton: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const isOpenedAsApp = window.matchMedia('(display-mode: standalone)').matches;

  if (isOpenedAsApp) {
    return null;
  }

  return (
    <Button
      Icon={InstallIcon}
      type='secondary'
      size='sm'
      onClick={() => navigate('/how-to-install')}
    >
      {fmtMsg('install')}
    </Button>
  );
};
