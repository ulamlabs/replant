import { UnauthLayout } from 'modules/layout';
import { SignupIntoOrganization as SignupFeature } from 'modules/auth';

export const SignupIntoOrganization: React.FC = () => {
  return (
    <UnauthLayout>
      <SignupFeature />
    </UnauthLayout>
  );
};
