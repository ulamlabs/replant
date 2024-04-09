import { Loader } from 'common/components';
import { LogInForm, useVerifyEmail } from 'modules/auth';
import { useFmtMsg } from 'modules/intl';
import { useSearchParams } from 'react-router-dom';

export const ConfirmEmailPage = () => {
  const fmtMsg = useFmtMsg();

  const [searchParams] = useSearchParams();

  const uid = searchParams.get('uid') || '';
  const token = searchParams.get('token') || '';

  const { isSuccess, isLoading } = useVerifyEmail({ uid, token });

  return (
    <div className='max-w-md m-auto flex flex-col md:-mt-12'>
      {isLoading ? (
        <div className='absolute top-1/2 left-1/2 -translate-x-full -translate-y-full'>
          <Loader />
        </div>
      ) : isSuccess ? (
        <>
          <h2 className='text-2xl md:text-3xl font-bold mb-3 '>
            {fmtMsg('yourAccountHasBeenSuccessfullyVerified')}
          </h2>
          <p className='text-neutral-400 text-sm md:text-base font-normal mb-8'>
            {fmtMsg('nowYouCanLogInAndDiscoverTheFeaturesOfReplantWorld')}
          </p>
          <LogInForm />
        </>
      ) : (
        <h2 className='text-2xl md:text-3xl font-bold mb-3 '>
          {fmtMsg('yourAccountHasBeenAlreadyVerified')}
        </h2>
      )}
    </div>
  );
};
