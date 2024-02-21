import { Header } from 'common/components';
import { Logout, useAuthRequired } from 'modules/auth';
import { useFmtMsg } from 'modules/intl';
import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';
import { User } from 'modules/user/User';

export const UserPage: React.FC = () => {
  useAuthRequired();

  const fmtMsg = useFmtMsg();

  return (
    <NavigationLayout actions={<NavigationBar />}>
      <div className='space-y-5'>
        <Header text={fmtMsg('yourAccount')} />
        <User />
        <Logout />
      </div>
    </NavigationLayout>
  );
};
