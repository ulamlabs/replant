import { Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { Link } from 'react-router-dom';
import { LogInForm } from '.';

export const LogIn = () => {
  const fmtMsg = useFmtMsg();

  const submit = () => {};

  return (
    <div className='max-w-md m-auto flex flex-col'>
      <h2 className='text-2xl md:text-4xl font-bold mb-1 md:mb-3 '>
        {fmtMsg('welcomeBack')}
      </h2>
      <p className='text-neutral-400 text-sm md:text-lg font-normal mb-4 md:mb-8'>
        {fmtMsg('logInAndExploreTheReplantWorldsFeatures')}
      </p>
      <LogInForm />
      <div className='flex flex-col gap-3 mt-6 md:mt-8'>
        <Button onClick={submit} className='md:h-16 max-h-max'>
          {fmtMsg('logIn')}
        </Button>
        <Link to='/signup'>
          <Button
            type='secondary'
            className='border-none md:h-16 max-h-max w-full'
          >
            {fmtMsg('createAccount')}
          </Button>
        </Link>
      </div>
    </div>
  );
};
