import { MailboxImage } from 'common/components';
import { useFmtMsg } from 'modules/intl';

export const SignUpSuccess = () => {
  const fmtMsg = useFmtMsg();

  return (
    <div className='max-w-md m-auto flex flex-col gap-16'>
      <div>
        <h2 className=' text-4xl font-bold mb-3 '>{fmtMsg('almostThere')}</h2>
        <p className='text-neutral-400 text-lg font-normal mb-8'>
          {fmtMsg('WeHaveJustSentAnEmailToVerifyYourEmailAddress')}
        </p>
      </div>
      <MailboxImage />
      <p className='text-neutral-400 text-sm'>
        {fmtMsg('cantFindTheMessage')}
        <span className='underline cursor-pointer'>
          {fmtMsg('clickToResend')}
        </span>
      </p>
    </div>
  );
};
