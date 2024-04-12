import { FC, ReactNode } from 'react';

type Props = {
  img: ReactNode;
  name: string;
  onClick: (wallet: string) => void;
};

export const Wallet: FC<Props> = ({ img, name, onClick }) => {
  return (
    <div
      onClick={() => onClick(name)}
      className='flex items-center gap-3 w-72 h-20 px-8 py-6 bg-white rounded-3xl border border-stone-100 hover:bg-green-100 cursor-pointer transition-colors duration-200'
    >
      {img}
      <p className='text-neutral-900 text-base font-normal'>{name}</p>
    </div>
  );
};
