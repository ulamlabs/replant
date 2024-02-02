import { Dashboard } from 'modules/dashboard';
import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';

export const DashboardPage: React.FC = () => {
  return (
    <NavigationLayout actions={<NavigationBar />}>
      <Dashboard />
    </NavigationLayout>
  );
};
