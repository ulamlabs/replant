import { FC, ReactNode } from 'react';

type Props = {
  img: ReactNode;
  name: string;
};

export const Wallet: FC<Props> = ({ img, name }) => {
  return (
    <div className='flex items-center gap-3 w-64 h-20 px-8 py-6 bg-white rounded-3xl border border-stone-100'>
      {img}
      <p className='text-neutral-900 text-base font-normal'>{name}</p>
    </div>
  );
};
