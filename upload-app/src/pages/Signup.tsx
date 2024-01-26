import { UnauthLayout } from 'modules/layout';
import { Signup as SignupFeature } from 'modules/signup';

export const Signup: React.FC = () => {
  return (
    <UnauthLayout>
      <SignupFeature />
    </UnauthLayout>
  );
};
