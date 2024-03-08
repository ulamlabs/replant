import { Header } from 'common/components';
import { Logout, useAuthRequired } from 'modules/auth';
import { useFmtMsg } from 'modules/intl';
import { Layout } from 'modules/layout';
import { User } from 'modules/user/User';

export const UserPage: React.FC = () => {
  useAuthRequired();

  const fmtMsg = useFmtMsg();

  return (
    <Layout navigation>
      <div className='space-y-5'>
        <Header text={fmtMsg('yourAccount')} />
        <User />
        <Logout />
      </div>
    </Layout>
  );
};
