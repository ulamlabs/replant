import { SignupIntoOrganization as SignupIntoOrganizationFeature } from 'modules/auth';
import { UnauthLayout } from 'modules/layout';

export const SignupIntoOrganization: React.FC = () => {
  return (
    <UnauthLayout>
      <SignupIntoOrganizationFeature />
    </UnauthLayout>
  );
};
