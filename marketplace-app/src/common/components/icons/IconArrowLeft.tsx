import { FC } from 'react';
import { IconProps } from './types';

export const IconArrowLeft: FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='25'
      viewBox='0 0 24 25'
      fill='none'
      className={className}
    >
      <path
        d='M14.9998 20.4201L8.47984 13.9001C7.70984 13.1301 7.70984 11.8701 8.47984 11.1001L14.9998 4.58008'
        stroke='black'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
