import clsx from 'clsx';
import { IconProps } from './types';

export function IconLinked({ className, overrideColors }: IconProps) {
  return (
    <a href='https://www.linkedin.com/company/replantworld/' target='_blank'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='28'
        height='28'
        viewBox='0 0 28 28'
        fill='none'
        className={clsx(
          'hover:opacity-60',
          !overrideColors && 'fill-black dark:fill-white',
          className
        )}
      >
        <path d='M8.82585 6.46182C8.82554 7.08066 8.57941 7.67403 8.1416 8.11139C7.7038 8.54876 7.11019 8.7943 6.49135 8.79399C5.87251 8.79368 5.27914 8.54755 4.84177 8.10974C4.40441 7.67194 4.15887 7.07833 4.15918 6.45949C4.15949 5.84065 4.40562 5.24728 4.84342 4.80991C5.28123 4.37255 5.87484 4.12701 6.49368 4.12732C7.11252 4.12763 7.70589 4.37376 8.14325 4.81156C8.58062 5.24937 8.82616 5.84298 8.82585 6.46182ZM8.89585 10.5218H4.22918V25.1285H8.89585V10.5218ZM16.2692 10.5218H11.6258V25.1285H16.2225V17.4635C16.2225 13.1935 21.7875 12.7968 21.7875 17.4635V25.1285H26.3958V15.8768C26.3958 8.67849 18.1592 8.94682 16.2225 12.4818L16.2692 10.5218Z' />
      </svg>
    </a>
  );
}