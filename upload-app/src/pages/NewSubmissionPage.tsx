import { NavigationLayout } from 'modules/layout';
import { NavigationBar } from 'modules/navigation';

export const NewSubmissionPage: React.FC = () => {
  return (
    <NavigationLayout actions={<NavigationBar />}>
      <>take a picture</>
    </NavigationLayout>
  );
};
