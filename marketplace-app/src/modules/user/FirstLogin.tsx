import { Stepper } from 'common/components';
import { ReplantLogo } from 'common/components/ReplantLogo';
import { IconArrowLeft } from 'common/components/icons/IconArrowLeft';
import { IconCoinbase } from 'common/components/icons/IconCoinbase';
import { IconCompass } from 'common/components/icons/IconCompass';
import { IconExternalLink } from 'common/components/icons/IconExternalLink';
import { IconMetaMask } from 'common/components/icons/IconMetaMask';
import { IconPhantom } from 'common/components/icons/IconPhantom';
import { IconZengo } from 'common/components/icons/IconZengo';
import { useFmtMsg } from 'modules/intl';
import { Wallet } from 'modules/wallet';
import { ReactNode, useEffect, useState } from 'react';
import { ProfileDetailsForm, useUser, useUserStore } from '.';

export const FirstLogin = () => {
  const store = useUserStore();
  const { data: user } = useUser();
  const [connecting, setConnecting] = useState(false);
  const fmtMsg = useFmtMsg();

  const connectWallet = (wallet: ReactNode) => {
    setConnecting(true);
    store.setWalletImg(wallet);
  };

  useEffect(() => {
    if (connecting) {
      setTimeout(() => {
        store.nextStep();
        setConnecting(false);
      }, 500);
    }
  }, [connecting, store]);

  return (
    <div className='bg-zinc-400 bg-opacity-70 w-screen h-screen absolute top-0 left-0 z-30 flex justify-center items-center'>
      <div className='h-[637px] bg-stone-50 rounded-3xl flex'>
        <div className=' bg-zinc-100 px-12 py-20 rounded-tl-3xl rounded-bl-3xl flex flex-col gap-8 items-start'>
          <ReplantLogo />
          <Stepper step={store.firstLoginStep} steps={2} />
          <div className='max-w-72'>
            <h2 className='text-neutral-900 text-3xl font-bold mb-5'>
              {store.firstLoginStep === 1
                ? fmtMsg('connectYourWallet')
                : fmtMsg('completeProfileInformation')}
            </h2>
            <p className='text-neutral-900 text-base font-normal'>
              {store.firstLoginStep === 1
                ? fmtMsg(
                    'connectingYourWalletIsLikeLoggingInToWeb3SelectYourWalletFromTheOptionsToGetStarted'
                  )
                : fmtMsg('pleaseAddAllYourProfileDetails')}
            </p>
          </div>
          {store.firstLoginStep === 1 && (
            <a
              href='https://metamask.io/'
              className='text-neutral-400 text-base font-normal flex items-center gap-1 group'
            >
              {fmtMsg('dontHaveAWallet')}
              <IconExternalLink className='opacity-0 transition-opacity duration-200 group-hover:opacity-100' />
            </a>
          )}
        </div>
        <div className='p-12 w-[684px]'>
          <div className='flex justify-between w-full items-center mb-10'>
            <h3 className='text-neutral-900 text-2xl font-normal'>
              {store.firstLoginStep === 1 ? (
                fmtMsg('chooseWallet')
              ) : store.editUserDetails ? (
                <div className='flex items-center gap-2'>
                  <button>
                    <IconArrowLeft />
                  </button>
                  {fmtMsg('profileNameAndType')}
                </div>
              ) : (
                fmtMsg('profileDetails')
              )}
            </h3>
            <button className='text-neutral-400 text-base font-normal cursor-pointer'>
              {fmtMsg('skip')}
            </button>
          </div>
          {store.firstLoginStep === 1 ? (
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
            <Wallet img={store.selectedWalletImg} connecting />
          ) : (
            <ProfileDetailsForm user={user} />
          )}
        </div>
      </div>
    </div>
  );
};
