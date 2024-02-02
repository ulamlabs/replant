import { SignupIntoOrganization } from 'modules/auth';
import { UnauthLayout } from 'modules/layout';

export const SignupIntoOrganizationPage: React.FC = () => {
  return (
    <UnauthLayout>
      <SignupIntoOrganization />
    </UnauthLayout>
  );
};
