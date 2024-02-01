import { useQuery } from '@tanstack/react-query';
import { get } from 'modules/api';
import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';

export const Home: React.FC = () => {
  const {} = useQuery({
    queryKey: ['GET', '/api/status'],
    queryFn: () => get('/status'),
  });

  return (
    <NavigationLayout actions={<NavigationBar />}>
      <>test home</>
    </NavigationLayout>
  );
};
