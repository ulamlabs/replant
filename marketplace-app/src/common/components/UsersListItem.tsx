import { FC } from 'react';
import { Planter, SponsorDetails } from 'types';

type Props = {
  data: SponsorDetails | Planter;
  index: number;
  type: 'sponsors' | 'planters';
};

export const UsersListItem: FC<Props> = ({ data, index, type }) => {
  const { img, name, company, trees, percentage } = data;

  return (
    <li className='flex h-20 md:h-24 px-3 md:px-8 py-3 bg-stone-50 dark:bg-neutral-850 dark:border-transparent border border-stone-100 justify-between rounded-3xl items-center transition-colors hover:bg-teal-100 cursor-pointer dark:hover:bg-neutral-750'>
      <div className='flex gap-2 md:gap-4 items-center'>
        <span className='text-neutral-400 text-sm md:text-xl font-semibold dark:text-zinc-600'>
          {index}
        </span>
        <img src={img} className='max-h-8 md:max-h-16 rounded-full' />
        <div>
          <h3 className='text-base md:text-xl font-bold'>{name}</h3>
          <p className='text-neutral-400 text-xs md:text-sm font-normal dark:text-zinc-600'>
            {company}
          </p>
        </div>
      </div>
      <div className='flex justify-between gap-3 items-center'>
        <div>
          <p className='text-right text-lg md:text-3xl font-bold'>{trees}</p>
          <p className='text-neutral-400 text-xs md:text-sm font-normal dark:text-zinc-600 text-right'>
            {type === 'planters' ? 'sponsored trees' : 'planted trees'}
          </p>
        </div>
        <p className=' w-auto md:w-16 h-7 p-2 md:p-3 bg-teal-200 rounded-full justify-center items-center gap-2.5 flex text-center text-teal-500 text-xs md:text-sm font-bold dark:bg-teal-800 dark:text-emerald-600'>
          +{percentage}%
        </p>
      </div>
    </li>
  );
};
