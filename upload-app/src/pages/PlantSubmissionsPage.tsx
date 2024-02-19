import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';
import { PlantSubmissions } from 'modules/plants';

export const PlantSubmissionsPage: React.FC = () => {
  return (
    <NavigationLayout actions={<NavigationBar />}>
      <PlantSubmissions />
    </NavigationLayout>
  );
};
