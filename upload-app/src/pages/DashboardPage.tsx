import { useAuthRequired } from 'modules/auth';
import { Dashboard } from 'modules/dashboard';
import { Layout } from 'modules/layout';

export const DashboardPage: React.FC = () => {
  useAuthRequired();

  return (
    <Layout navigation>
      <Dashboard />
    </Layout>
  );
};
