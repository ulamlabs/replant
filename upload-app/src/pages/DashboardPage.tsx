import { useAuthRequired } from 'modules/auth';
import { Dashboard } from 'modules/dashboard';
import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';

export const DashboardPage: React.FC = () => {
  useAuthRequired();

  return (
    <NavigationLayout actions={<NavigationBar />}>
      <Dashboard />
    </NavigationLayout>
  );
};
