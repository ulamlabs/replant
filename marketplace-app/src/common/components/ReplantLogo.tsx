import clsx from 'clsx';
import { IconProps } from './icons/types';

export function ReplantLogo({ className }: IconProps) {
  return (
    <>
      <img
        className={clsx('dark:hidden h-8 md:min-w-9 md:h-12', className)}
        src='replant_logo_black.png'
        alt='Replant'
      />
      <img
        className={clsx('hidden dark:block h-8 md:min-w-9 md:h-12', className)}
        src='replant_logo_white.png'
        alt='Replant'
      />
    </>
  );
}
