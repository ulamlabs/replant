import { Button } from 'common/components';
import { ReplantWorldIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useMatch, useNavigate } from 'react-router-dom';

type Props = {
  children?: React.ReactNode;
};

export const UnauthLayout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const fmtMsg = useFmtMsg();

  const matchLogin = useMatch('/login');
  const matchSignup = useMatch('/signup');
  const matchSignupOrg = useMatch('/signup-org');

  return (
    <div className={'w-screen h-screen'}>
      <div className={'py-2.5 px-5 flex items-center justify-between'}>
        <ReplantWorldIcon className='dark:fill-white fill-black' />
        {(matchSignup || matchSignupOrg) && (
          <Button
            onClick={() => navigate('/login')}
            size={'sm'}
            text={fmtMsg('logIn')}
            type={'secondary'}
          />
        )}
        {matchLogin && (
          <Button
            onClick={() => navigate('/signup')}
            size={'sm'}
            text={fmtMsg('signUp')}
            type={'secondary'}
          />
        )}
      </div>
      <div className={'py-2.5 px-5 w-screen flex items-center justify-center'}>
        {children}
      </div>
    </div>
  );
};
