import clsx from 'clsx';
import { IconProps } from 'common/icons';
import { Visibility, VisibilityOff } from 'common/material-symbols';
import { HTMLInputTypeAttribute, useState } from 'react';

type Props = {
  Icon: React.ComponentType<IconProps>;
  label?: string;
  placeholder: string;
  value?: string;
  className?: string;
  onChange: (e: string) => void;
  type?: HTMLInputTypeAttribute;
  error?: string;
};

export const Input: React.FC<Props> = ({
  Icon,
  label,
  placeholder,
  value,
  className,
  onChange,
  type = 'text',
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className='flex flex-col gap-1.5 text-base w-full'>
      {label && (
        <label className={'text-left text-black dark:text-white'}>
          {label}
        </label>
      )}
      <div
        className={clsx(
          'border dark:text-white text-black py-2.5 px-5 w-full flex gap-2 rounded-full cursor-text items-center',
          error
            ? 'dark:border-red-400 border-red-400'
            : 'border-black dark:border-white',
          className
        )}
      >
        <InputIcon Icon={Icon} />
        <input
          onChange={(e) => onChange(e.target.value)}
          value={value}
          placeholder={placeholder}
          className='text-black dark:text-white placeholder-gray-500 border-0 bg-transparent focus:outline-none w-full'
          type={showPassword ? 'text' : type}
        />
        {type === 'password' && (
          <div onClick={() => setShowPassword((prev) => !prev)}>
            {showPassword ? (
              <InputIcon Icon={VisibilityOff} size={5} />
            ) : (
              <InputIcon Icon={Visibility} size={5} />
            )}
          </div>
        )}
      </div>
      {error && (
        <label className={'text-left text-red-400 dark:text-red-400'}>
          {error}
        </label>
      )}
    </div>
  );
};

export const InputIcon: React.FC<{
  Icon: React.ComponentType<IconProps>;
  size?: 4 | 5 | 6;
}> = ({ Icon, size = 4 }) => (
  <Icon
    overrideColor
    pathClassName='fill-gray-500'
    svgClassName={clsx(
      'opacity-80',
      size === 4 && 'h-4 min-h-4 min-w-4 w-4',
      size === 5 && 'h-5 min-h-5 min-w-5 w-5',
      size === 6 && 'h-6 min-h-6 min-w-6 w-6'
    )}
  />
);
