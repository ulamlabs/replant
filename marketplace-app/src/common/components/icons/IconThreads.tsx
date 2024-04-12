import clsx from 'clsx';
import { IconExtendProps } from './types';

export function IconThreads({ className, overrideColors }: IconExtendProps) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='28'
      height='28'
      viewBox='0 0 28 28'
      fill='none'
      className={clsx(
        !overrideColors && 'fill-black dark:fill-white',
        className
      )}
    >
      <path d='M11.9803 16.7386C11.9803 16.0211 12.325 14.8801 15.0025 14.8801C15.8233 14.8801 16.329 14.9396 17.008 15.0919C16.791 17.9024 15.4155 18.2734 14.0785 18.2734C13.347 18.2734 11.9803 17.8919 11.9803 16.7386Z' />
      <path d='M4.59402 28.6306H23.529C24.7311 28.6306 25.884 28.1531 26.734 27.3031C27.584 26.4531 28.0615 25.3002 28.0615 24.0981V5.16312C28.0615 3.96102 27.584 2.80816 26.734 1.95815C25.884 1.10815 24.7311 0.630615 23.529 0.630615L4.59402 0.630615C3.39193 0.630615 2.23907 1.10815 1.38906 1.95815C0.539053 2.80816 0.0615234 3.96102 0.0615234 5.16312L0.0615234 24.0981C0.0615234 25.3002 0.539053 26.4531 1.38906 27.3031C2.23907 28.1531 3.39193 28.6306 4.59402 28.6306ZM10.327 10.9731C11.3193 9.55562 12.6283 9.00262 14.4395 9.00262C15.717 9.00262 16.8038 9.43312 17.5808 10.2469C18.356 11.0624 18.7988 12.2279 18.9003 13.7171C19.3296 13.8968 19.7251 14.1085 20.0868 14.3524C21.5428 15.3306 22.3443 16.7936 22.3443 18.4701C22.3443 22.0349 19.4218 25.1306 14.1333 25.1306C9.59202 25.1306 4.87402 22.4881 4.87402 14.6236C4.87402 6.80112 9.44327 4.13062 14.1193 4.13062C16.2788 4.13062 21.345 4.44912 23.249 10.7404L21.464 11.2024C19.9905 6.72237 16.9018 6.00837 14.072 6.00837C9.39077 6.00837 6.74477 8.85737 6.74477 14.9211C6.74477 20.3584 9.70227 23.2459 14.1333 23.2459C17.7785 23.2459 20.4963 21.3524 20.4963 18.5786C20.4963 16.6904 18.9108 15.7874 18.8285 15.7874C18.5188 17.4061 17.6893 20.1309 14.0458 20.1309C11.923 20.1309 10.0908 18.6644 10.0908 16.7429C10.0908 13.9989 12.6948 13.0049 14.751 13.0049C15.521 13.0049 16.4485 13.0574 16.9333 13.1554C16.9333 12.3189 16.2263 10.8874 14.4378 10.8874C12.8435 10.8874 12.4078 11.3914 11.9003 11.9794L11.8583 12.0266C11.5048 11.7904 10.327 10.9731 10.327 10.9731Z' />
    </svg>
  );
}
