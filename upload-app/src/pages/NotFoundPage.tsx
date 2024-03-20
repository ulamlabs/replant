import { Button, Header, Section } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { Layout } from 'modules/layout';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const fmtMsg = useFmtMsg();

  return (
    <Layout>
      <Section
        actions={
          <Link to={'/dashboard'}>
            <Button>{fmtMsg('goToDashboard')}</Button>
          </Link>
        }
      >
        <div className='space-y-5'>
          <Header text={fmtMsg('pageNotFound')} />
          <p className='text-center'>
            {fmtMsg('pageYouAreTryingToReachDoesNotExist')}
          </p>
        </div>
      </Section>
    </Layout>
  );
};
