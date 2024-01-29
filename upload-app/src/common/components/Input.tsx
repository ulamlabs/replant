import clsx from 'clsx';
import { CrossedEyeIcon } from 'common/icons/CrossedEyeIcon';
import { EyeIcon } from 'common/icons/EyeIcon';
import { HTMLInputTypeAttribute, useState } from 'react';

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
  const [showPassword, setShowPassword] = useState(false);

  const newType = type !== 'password' ? type : showPassword ? 'text' : type;

  return (
    <div className='flex flex-col gap-1.5'>
      {label && (
        <label className={'text-left text-xs text-black dark:text-white'}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          'border border-black dark:border-white dark:text-white text-black text-xs py-2.5 px-5 w-full flex gap-2 rounded-full cursor-text',
          error && ' dark:border-red-400 border-red-400',
          className
        )}
      >
        {icon}
        <input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
          className='text-xs text-black dark:text-white placeholder-gray-500 border-0 bg-transparent focus:outline-none w-full'
          type={newType}
        />
        {type === 'password' && (
          <div onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? <CrossedEyeIcon /> : <EyeIcon />}
          </div>
        )}
      </div>
      {error && (
        <label className={'text-left text-xs text-red-400 dark:text-red-400'}>
          {error}
        </label>
      )}
    </div>
  );
};
