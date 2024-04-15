import { useFmtMsg } from 'modules/intl';
import { FC } from 'react';

type Props = {
  name: string;
  type: string;
  onClick: () => void;
};

export const UserInfo: FC<Props> = ({ name, type, onClick }) => {
  const fmtMsg = useFmtMsg();
  return (
    <div
      onClick={onClick}
      className='w-52 py-3 flex justify-between items-center cursor-pointer rounded-lg group hover:bg-zinc-100 transition-all hover:px-4 hover:py-3'
    >
      <div>
        <h3 className='text-neutral-900 text-base font-semibold'>{name}</h3>
        <p className='text-neutral-400 text-xs font-normal'>
          {type === 'COMPANY' ? fmtMsg('company') : fmtMsg('individual')}
        </p>
      </div>
      <p className='text-teal-500 text-xs font-semibold px-3 py-2 opacity-0 group-hover:opacity-100 transition-opacity'>
        {fmtMsg('edit')}
      </p>
    </div>
  );
};
