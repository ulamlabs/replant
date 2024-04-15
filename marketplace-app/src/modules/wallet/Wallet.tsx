import { ReplantLogo } from 'common/components/ReplantLogo';
import { IconRefreshCircle } from 'common/components/icons/IconRefreshCircle';
import { useFmtMsg } from 'modules/intl';
import { FC, ReactNode } from 'react';

type Props = {
  img: ReactNode;
  name?: string;
  onClick?: (wallet: ReactNode) => void;
  connecting?: boolean;
};

export const Wallet: FC<Props> = ({ img, name, onClick, connecting }) => {
  const fmtMsg = useFmtMsg();

  return connecting ? (
    <div className='flex items-center gap-3 w-full h-20 px-8 py-6 rounded-3xl border border-stone-100 bg-green-100'>
      <div className='flex items-center gap-2 h-8'>
        <ReplantLogo className='!h-8 !min-w-0' />
        <IconRefreshCircle className='stroke-green-800 animate-spin' />
        {img}
      </div>
      <p className='text-neutral-900 text-base font-normal'>
        {fmtMsg('connecting')}
      </p>
    </div>
  ) : (
    <div
      onClick={() => onClick && onClick(img)}
      className='flex items-center gap-3 w-72 h-20 px-8 py-6 bg-white rounded-3xl border border-stone-100 hover:bg-green-100 cursor-pointer transition-colors duration-200'
    >
      {img}
      <p className='text-neutral-900 text-base font-normal'>{name}</p>
    </div>
  );
};
