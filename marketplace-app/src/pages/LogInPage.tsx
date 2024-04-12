import { Button } from 'common/components';
import { LogIn } from 'modules/auth';
import { useFmtMsg } from 'modules/intl';
import { Link } from 'react-router-dom';

export const LogInPage = () => {
  const fmtMsg = useFmtMsg();

  return (
    <div className='max-w-md m-auto flex flex-col md:-mt-12'>
      <h2 className='text-2xl md:text-3xl font-bold mb-1 md:mb-3 '>
        {fmtMsg('welcomeBack')}
      </h2>
      <p className='text-neutral-400 text-sm md:text-base font-normal mb-4 md:mb-8'>
        {fmtMsg('logInAndExploreTheReplantWorldsFeatures')}
      </p>
      <LogIn />
      <Link to='/signup'>
        <Button
          type='secondary'
          className='border-none md:h-16 max-h-max w-full text-sm hover:bg-transparent hover:text-teal-600'
        >
          {fmtMsg('createAccount')}
        </Button>
      </Link>
    </div>
  );
};
