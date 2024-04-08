import { useQueryClient } from '@tanstack/react-query';
import { Loader, MailboxImage } from 'common/components';
import { IconCheck } from 'common/components/icons/IconCheck';
import { useResendEmail } from 'modules/auth';
import { useFmtMsg } from 'modules/intl';
import { useLocation } from 'react-router-dom';

export const SignUpSuccess = () => {
  const fmtMsg = useFmtMsg();
  const queryClient = useQueryClient();
  const email: string | undefined = queryClient.getQueryData(['email']);
  const resendMutation = useResendEmail();
  const location = useLocation();

  console.log(location);

  const resendEmail = () => {
    if (!email) {
      return;
    }
    resendMutation.mutate({ email: email });
  };

  return (
    <div className='max-w-md m-auto flex flex-col gap-16'>
      <div>
        <h2 className='text-2xl md:text-4xl font-bold mb-3 '>
          {fmtMsg('almostThere')}
        </h2>
        <p className='text-neutral-400 text-sm md:text-lg font-normal mb-8'>
          {fmtMsg('weHaveJustSentAnEmailToVerifyYourEmailAddress')}
        </p>
      </div>
      <MailboxImage />
      <div className='flex items-center gap-2'>
        <p className='text-neutral-400 text-sm'>
          {fmtMsg('cantFindTheMessage')}
          <span onClick={resendEmail} className='underline cursor-pointer'>
            {fmtMsg('clickToResend')}
          </span>
        </p>
        {resendMutation.isPending && <Loader size={4} />}
        {resendMutation.isSuccess && <IconCheck className='h-5 w-5' />}
      </div>
    </div>
  );
};
