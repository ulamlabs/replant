import { Login } from 'modules/auth';
import { UnauthLayout } from 'modules/layout';

export const LoginPage: React.FC = () => {
  return (
    <UnauthLayout>
      <Login />
    </UnauthLayout>
  );
};
