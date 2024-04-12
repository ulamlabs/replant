import { Stepper } from 'common/components';
import { ReplantLogo } from 'common/components/ReplantLogo';
import { IconExternalLink } from 'common/components/icons/IconExternalLink';
import { useFmtMsg } from 'modules/intl';
import { Wallet } from 'modules/wallet';
import { useState } from 'react';

export const FirstLogin = () => {
  const [step, setStep] = useState(1);
  const fmtMsg = useFmtMsg();

  return (
    <div className='bg-zinc-400 bg-opacity-70 w-screen h-screen absolute top-0 left-0 z-30 flex justify-center items-center'>
      <div className='h-[637px] bg-stone-50 rounded-3xl flex'>
        <div className=' bg-zinc-100 px-12 py-20 rounded-tl-3xl rounded-bl-3xl flex flex-col gap-8 items-start'>
          <ReplantLogo />
          <Stepper step={step} steps={2} />
          <div className='max-w-72'>
            <h2 className='text-neutral-900 text-3xl font-bold mb-5'>
              {fmtMsg('connectYourWallet')}
            </h2>
            <p className='text-neutral-900 text-base font-normal'>
              {fmtMsg(
                'connectingYourWalletIsLikeLoggingInToWeb3SelectYourWalletFromTheOptionsToGetStarted'
              )}
            </p>
          </div>
          <a
            href='https://metamask.io/'
            className='text-neutral-400 text-base font-normal flex items-center gap-1 group'
          >
            {fmtMsg('dontHaveAWallet')}
            <IconExternalLink className='opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
          </a>
        </div>
        <div className='p-12 w-[642px]'>
          <div className='flex justify-between w-full items-center mb-10'>
            <h3 className='text-neutral-900 text-2xl font-normal'>
              {fmtMsg('chooseWallet')}
            </h3>
            <p className='text-neutral-400 text-base font-normal cursor-pointer'>
              {fmtMsg('skip')}
            </p>
          </div>
          <div className='grid grid-cols-2 gap-3'>
            <Wallet name='Compass' />
          </div>
        </div>
      </div>
    </div>
  );
};
