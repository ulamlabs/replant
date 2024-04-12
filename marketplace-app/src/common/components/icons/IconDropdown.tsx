import clsx from 'clsx';
import { IconProps } from './types';

export function IconDropdown({ className }: IconProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='14'
      height='14'
      viewBox='0 0 14 14'
      fill='none'
      className={clsx(className)}
    >
      <path
        d='M11.6199 5.22095L7.81655 9.02428C7.36738 9.47345 6.63238 9.47345 6.18322 9.02428L2.37988 5.22095'
        stroke='#1D3E32'
      />
    </svg>
  );
}
