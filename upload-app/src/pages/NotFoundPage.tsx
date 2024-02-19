import { Button, Header, Section } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { UnauthLayout } from 'modules/layout';
import { useNavigate } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  const fmtMsg = useFmtMsg();

  return (
    <UnauthLayout>
      <Section
        actions={
          <Button
            text={fmtMsg('goToDashboard')}
            onClick={() => navigate('/')}
          />
        }
      >
        <div className='space-y-5'>
          <Header text={fmtMsg('pageNotFound')} />
          <p className='text-sm'>{fmtMsg('pageYouAreTryingToReachDoesNotExist')}</p>
        </div>
      </Section>
    </UnauthLayout>
  );
};
