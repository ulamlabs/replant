import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation/NavigationBar';

export const Home: React.FC = () => {
  return (
    <>
      <NavigationLayout actions={<NavigationBar />}>
        <>test home</>
      </NavigationLayout>
    </>
  );
};
