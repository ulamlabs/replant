import clsx from 'clsx';
import { IconExtendProps } from './types';

export function IconCoin({ className, overrideColors }: IconExtendProps) {
  return (
    <svg
      className={clsx(
        !overrideColors && 'fill-black dark:fill-white',
        className
      )}
      width='100'
      height='100'
      viewBox='0 0 41 29'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M34.319 2.85891C30.6597 1.02844 25.8335 0.0625 20.3335 0.0625C14.8335 0.0625 10.0072 1.02844 6.34803 2.85891C2.56506 4.74953 0.395996 7.48922 0.395996 10.375V18.625C0.395996 21.5108 2.56506 24.2505 6.34803 26.1411C10.0072 27.9716 14.8421 28.9375 20.3335 28.9375C25.8249 28.9375 30.6597 27.9716 34.319 26.1411C38.1002 24.2505 40.271 21.5108 40.271 18.625V10.375C40.271 7.48922 38.1019 4.74953 34.319 2.85891ZM8.19396 6.54734C11.2379 5.02625 15.5485 4.1875 20.3335 4.1875C25.1185 4.1875 29.4291 5.02625 32.473 6.54734C34.7383 7.68 36.146 9.14781 36.146 10.375C36.146 11.6022 34.7383 13.07 32.473 14.2027C29.4291 15.7237 25.1185 16.5625 20.3335 16.5625C15.5485 16.5625 11.2379 15.7237 8.19396 14.2027C5.92865 13.07 4.521 11.6022 4.521 10.375C4.521 9.14781 5.92865 7.68 8.19396 6.54734ZM29.271 23.6747C27.0272 24.2925 24.721 24.6557 22.396 24.7575V20.6325C24.7127 20.538 27.015 20.2208 29.271 19.6855V23.6747ZM11.396 19.6941C13.652 20.2294 15.9543 20.5466 18.271 20.6411V24.7661C15.946 24.6643 13.6398 24.3011 11.396 23.6833V19.6941ZM4.521 18.625V16.8272C5.10627 17.2211 5.71657 17.5765 6.34803 17.8911C6.64709 18.0406 6.95646 18.1833 7.271 18.3208V21.9422C5.55225 20.9006 4.521 19.6752 4.521 18.625ZM33.396 21.9422V18.3208C33.7105 18.1833 34.0199 18.0406 34.319 17.8911C34.9504 17.5765 35.5607 17.2211 36.146 16.8272V18.625C36.146 19.6752 35.1147 20.9006 33.396 21.9422Z' />
    </svg>
  );
}
