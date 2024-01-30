import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';

export const UserPage: React.FC = () => {
  return (
    <NavigationLayout actions={<NavigationBar />}>
      <>user data and settings</>
    </NavigationLayout>
  );
};
