import { Button } from 'common/components';
import { InstallIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useOfflineStore } from 'modules/offline';
import { useNavigate } from 'react-router-dom';

export const InstallButton: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const navigate = useNavigate();

  const { isUploading } = useOfflineStore();

  const isOpenedAsApp = window.matchMedia('(display-mode: standalone)').matches;

  if (isOpenedAsApp || isUploading) {
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
