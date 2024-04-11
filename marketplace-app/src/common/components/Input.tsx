import clsx from 'clsx';
import { FC, HTMLInputTypeAttribute, useState } from 'react';

type Props = {
  label?: string;
  placeholder: string;
  value?: string;
  icon?: React.ReactNode;
  className?: string;
  onChange: (e: string) => void;
  type?: HTMLInputTypeAttribute;
  error?: string;
};

export const Input: FC<Props> = ({
  label,
  placeholder,
  value,
  icon,
  className,
  onChange,
  type = 'text',
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex flex-col gap-2 text-sm md:text-base w-full'>
      {label && <label className='text-left font-semibold'>{label}</label>}
      <div
        className={clsx(
          'border px-5 py-3 md:py-5 md:px-7 w-full flex gap-2 rounded-2xl md:rounded-3xl cursor-text items-center bg-white dark:bg-neutral-750 hover:border-teal-200 hover:dark:border-neutral-700 hover:dark:bg-zinc-800',
          error
            ? 'dark:!border-red-800 !border-red-400'
            : 'border-stone-100 dark:border-neutral-700',
          className
        )}
      >
        {icon}
        <input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
          className='text-black dark:text-white placeholder-gray-500 border-0 bg-transparent focus:outline-none w-full text-sm'
          type={showPassword ? 'text' : type}
        />
        {type === 'password' && (
          <div
            className={clsx(
              'text-xs font-semibold cursor-pointer',
              error ? 'text-red-400' : 'text-teal-500'
            )}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? 'Hide' : 'Show'}
          </div>
        )}
      </div>
      {error && (
        <label
          className={
            'text-left text-sm font-light text-red-400 dark:text-red-400'
          }
        >
          {error}
        </label>
      )}
    </div>
  );
};
