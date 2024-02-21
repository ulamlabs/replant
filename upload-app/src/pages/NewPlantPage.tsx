import { useAuthRequired } from 'modules/auth';
import { FeatureLayout } from 'modules/layout';
import { NewPlant } from 'modules/new-plant';

export const NewPlantPage: React.FC = () => {
  useAuthRequired();

  return (
    <FeatureLayout>
      <NewPlant />
    </FeatureLayout>
  );
};
