import { Stepper } from 'common/components';
import { ReplantLogo } from 'common/components/ReplantLogo';
import { IconCoinbase } from 'common/components/icons/IconCoinbase';
import { IconCompass } from 'common/components/icons/IconCompass';
import { IconExternalLink } from 'common/components/icons/IconExternalLink';
import { IconMetaMask } from 'common/components/icons/IconMetaMask';
import { IconPhantom } from 'common/components/icons/IconPhantom';
import { IconZengo } from 'common/components/icons/IconZengo';
import { useFmtMsg } from 'modules/intl';
import { Wallet } from 'modules/wallet';
import { useState } from 'react';

export const FirstLogin = () => {
  const [step, setStep] = useState(1);
  const [connecting, setConnecting] = useState('');
  const fmtMsg = useFmtMsg();

  const connectWallet = (wallet: string) => {
    // handle connecting to wallet
    setConnecting(wallet);
    setTimeout(() => {
      setStep(2); // to remove when connecting handled
    }, 500);
  };

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
        <div className='p-12 w-[684px]'>
          <div className='flex justify-between w-full items-center mb-10'>
            <h3 className='text-neutral-900 text-2xl font-normal'>
              {fmtMsg('chooseWallet')}
            </h3>
            <p className='text-neutral-400 text-base font-normal cursor-pointer'>
              {fmtMsg('skip')}
            </p>
          </div>
          {step === 1 ? (
            <div className='grid grid-cols-2 gap-3'>
              <Wallet
                onClick={connectWallet}
                name='Compass'
                img={<IconCompass className='w-8 h-8' />}
              />
              <Wallet
                onClick={connectWallet}
                name='Phantom'
                img={<IconPhantom className='w-8 h-8' />}
              />
              <Wallet
                onClick={connectWallet}
                name='MetaMask'
                img={<IconMetaMask className='w-8 h-8' />}
              />
              <Wallet
                onClick={connectWallet}
                name='Zengo'
                img={<IconZengo className='w-8 h-8' />}
              />
              <Wallet
                onClick={connectWallet}
                name='Coinbase wallet'
                img={<IconCoinbase className='w-8 h-8' />}
              />
            </div>
          ) : connecting ? (
            <div></div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  );
};
