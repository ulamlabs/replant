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

  return (
    <div className={'w-screen h-screen'}>
      <div className={'py-2.5 px-5 flex items-center justify-between'}>
        <ReplantWorldIcon className='dark:fill-white fill-black' />
        {useMatch('/signup') && (
          <Button
            onClick={() => navigate('/login')}
            text={fmtMsg('logIn')}
            size={'SMALL'}
          />
        )}
        {useMatch('/login') && (
          <Button
            onClick={() => navigate('/signup')}
            text={fmtMsg('signup')}
            size={'SMALL'}
          />
        )}
      </div>
      <div className={'py-2.5 px-5 w-screen flex items-center'}>{children}</div>
    </div>
  );
};
