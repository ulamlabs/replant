import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';

export const Home: React.FC = () => {
  return (
    <NavigationLayout actions={<NavigationBar />}>test home</NavigationLayout>
  );
};
