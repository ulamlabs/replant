import { LogIn, useVerifyEmail } from 'modules/auth';
import { useFmtMsg } from 'modules/intl';
import { useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

export const ConfirmEmailPage = () => {
  const fmtMsg = useFmtMsg();

  const mutateCalled = useRef(false);

  const { mutate, isIdle, isSuccess } = useVerifyEmail();

  const [searchParams] = useSearchParams();

  const uid = searchParams.get('uid') || '';
  const token = searchParams.get('token') || '';

  useEffect(() => {
    if (!mutateCalled.current) {
      mutateCalled.current = true;
      mutate({
        uid,
        token,
      });
    }
  }, [uid, token, mutate, isIdle]);

  return (
    <div className='max-w-md m-auto flex flex-col'>
      {isSuccess ? (
        <>
          <h2 className=' text-4xl font-bold mb-3 '>
            {fmtMsg('yourAccountHasBeenSuccessfullyVerified')}
          </h2>
          <p className='text-neutral-400 text-lg font-normal mb-8'>
            {fmtMsg('nowYouCanLogInAndDiscoverTheFeaturesOfReplantWorld')}
          </p>
          <LogIn />
        </>
      ) : (
        <h2 className=' text-4xl font-bold mb-3 '>
          {fmtMsg('yourAccountHasBeenAlreadyVerified')}
        </h2>
      )}
    </div>
  );
};
