import { InstallationSteps } from 'modules/install';
import { Layout } from 'modules/layout';

export const InstallPage: React.FC = () => {
  return (
    <Layout hideInstall>
      <InstallationSteps />
    </Layout>
  );
};
