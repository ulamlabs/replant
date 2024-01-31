import { UnauthLayout } from 'modules/layout';
import { Signup as SignupFeature } from 'modules/auth';

export const Signup: React.FC = () => {
  return (
    <UnauthLayout>
      <SignupFeature />
    </UnauthLayout>
  );
};
