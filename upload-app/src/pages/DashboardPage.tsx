import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';
import { Dashboard as DashboardFeature } from 'modules/dashboard';

export const DashboardPage: React.FC = () => {
  return (
    <NavigationLayout actions={<NavigationBar />}>
      <DashboardFeature />
    </NavigationLayout>
  );
};
