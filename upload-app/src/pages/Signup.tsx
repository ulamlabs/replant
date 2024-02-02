import { Signup as SignupFeature } from 'modules/auth';
import { UnauthLayout } from 'modules/layout';

export const Signup: React.FC = () => {
  return (
    <UnauthLayout>
      <SignupFeature />
    </UnauthLayout>
  );
};
