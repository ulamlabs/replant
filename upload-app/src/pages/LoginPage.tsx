import { Login } from 'modules/auth';
import { Layout } from 'modules/layout';

export const LoginPage: React.FC = () => {
  return (
    <Layout>
      <Login />
    </Layout>
  );
};
