import clsx from 'clsx';
import { HTMLInputTypeAttribute } from 'react';

type Props = {
  label?: string;
  placeholder: string;
  value?: string;
  icon: React.ReactNode;
  className?: string;
  onChange: (e: string) => void;
  type?: HTMLInputTypeAttribute;
  error?: string;
};

export const Input: React.FC<Props> = ({
  label,
  placeholder,
  value,
  icon,
  className,
  onChange,
  type = 'text',
  error,
}) => {
  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <label className={'text-left text-xs text-black dark:text-white'}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          'border dark:border-white dark:text-white text-black text-xs py-2.5 px-5 w-full flex gap-2 rounded-full cursor-text',
          error && 'border-red-400 dark:border-red-400',
          className
        )}
      >
        {icon}
        <input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
          className='text-xs text-black dark:text-white placeholder-gray-500 border-0 bg-transparent focus:outline-none w-full'
          type={type}
        />
      </div>
      {error && (
        <label className={'text-left text-xs text-red-400 dark:text-red-400'}>
          {error}
        </label>
      )}
    </div>
  );
};
