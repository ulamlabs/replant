import { Signup } from 'modules/auth';
import { UnauthLayout } from 'modules/layout';

export const SignupPage: React.FC = () => {
  return (
    <UnauthLayout>
      <Signup />
    </UnauthLayout>
  );
};
