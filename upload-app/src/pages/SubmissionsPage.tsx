import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';

export const SubmissionsPage: React.FC = () => {
  return (
    <NavigationLayout actions={<NavigationBar />}>
      <>submitted plants</>
    </NavigationLayout>
  );
};
