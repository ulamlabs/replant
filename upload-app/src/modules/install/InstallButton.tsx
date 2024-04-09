import { Button } from 'common/components';
import { InstallMobile } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { Link } from 'react-router-dom';

export const InstallButton: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const isOpenedAsApp = window.matchMedia('(display-mode: standalone)').matches;

  if (isOpenedAsApp) {
    return null;
  }

  return (
    <Link to={'/how-to-install'}>
      <Button Icon={InstallMobile} type='secondary' size='sm'>
        {fmtMsg('install')}
      </Button>
    </Link>
  );
};
