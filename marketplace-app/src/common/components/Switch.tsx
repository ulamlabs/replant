import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  values: [string, string];
  inputValue: string;
  onClick: () => void;
};

export const Switch: FC<Props> = ({ values, onClick, inputValue }) => {
  return (
    <div
      className=' h-12 md:h-14 p-0.5 bg-white dark:bg-neutral-750 rounded-3xl flex relative cursor-pointer'
      onClick={onClick}
    >
      <input
        className=' invisible absolute -z-10'
        type='text'
        value={inputValue}
        onChange={() => {}}
      />
      {values.map((value) => (
        <p
          key={value}
          className={clsx(
            'px-6 py-4 w-1/2 flex justify-center items-center z-10 transition-all duration-200 ease-in-out font-bold text-base',
            value === inputValue
              ? 'text-white dark:text-zinc-100'
              : 'text-teal-500 dark:text-emerald-600'
          )}
        >
          {value}
        </p>
      ))}
      <div
        className={clsx(
          'absolute w-1/2 h-full bg-teal-500 dark:bg-emerald-600 rounded-3xl top-0 left-0 transition-all duration-200 ease-in-out',
          inputValue === values[1] && ' translate-x-full'
        )}
      />
    </div>
  );
};
