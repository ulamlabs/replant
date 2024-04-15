import { FC } from 'react';
import { IconProps } from './types';

export const IconRefreshCircle: FC<IconProps> = ({ className }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='19'
      height='18'
      viewBox='0 0 19 18'
      fill='none'
      className={className}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M9.67285 16.4999C5.53072 16.4999 2.17285 13.142 2.17285 8.99988C2.17285 4.85774 5.53072 1.49988 9.67285 1.49988C13.815 1.49988 17.1728 4.85774 17.1728 8.99988C17.1728 13.142 13.815 16.4999 9.67285 16.4999Z'
        strokeWidth='1.125'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.68042 10.8823C6.81542 11.1073 6.98042 11.3174 7.16792 11.5049C8.54792 12.8849 10.7904 12.8849 12.1779 11.5049C12.7404 10.9424 13.0629 10.2298 13.1679 9.50232'
        strokeWidth='1.125'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.17798 8.49762C6.28298 7.76262 6.60548 7.05758 7.16798 6.49508C8.54798 5.11508 10.7905 5.11508 12.178 6.49508C12.373 6.69008 12.5305 6.9001 12.6655 7.1176'
        strokeWidth='1.125'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M6.53882 12.885V10.8825H8.54131'
        strokeWidth='1.125'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12.8108 5.11511V7.1176H10.8083'
        strokeWidth='1.125'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
