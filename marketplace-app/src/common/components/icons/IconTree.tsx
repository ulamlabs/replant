import clsx from 'clsx';
import { IconExtendProps } from './types';

export function IconTree({ className, overrideColors }: IconExtendProps) {
  return (
    <svg
      className={clsx(
        !overrideColors && 'fill-black dark:fill-white',
        className
      )}
      width='100'
      height='100'
      viewBox='0 0 35 41'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M34.0682 29.8398L28.8951 23.3734H30.6559C31.0065 23.3739 31.3505 23.2781 31.6503 23.0964C31.9501 22.9148 32.1943 22.6543 32.3562 22.3433C32.5181 22.0324 32.5915 21.6829 32.5684 21.3331C32.5453 20.9833 32.4265 20.6465 32.2251 20.3596L18.8133 1.19996C18.5217 0.783856 18.0768 0.500507 17.5764 0.412136C17.076 0.323766 16.5609 0.437598 16.1444 0.728636C15.9797 0.851678 15.8366 1.00125 15.721 1.17122C15.6731 1.19996 2.26131 20.3596 2.26131 20.3596C2.06049 20.6468 1.9423 20.9836 1.9196 21.3334C1.89691 21.6831 1.97057 22.0324 2.13257 22.3431C2.29458 22.6539 2.53872 22.9143 2.83843 23.0959C3.13814 23.2776 3.48193 23.3736 3.8324 23.3734H5.59317L0.420066 29.8398C-0.0397653 30.4165 -0.129816 31.204 0.188234 31.8688C0.5082 32.5298 1.1807 32.9532 1.91643 32.9532H15.3282V38.7011C15.3282 39.2093 15.53 39.6966 15.8894 40.0559C16.2487 40.4152 16.736 40.6171 17.2442 40.6171C17.7523 40.6171 18.2396 40.4152 18.5989 40.0559C18.9583 39.6966 19.1601 39.2093 19.1601 38.7011V32.9532H32.5719C32.9326 32.9526 33.2858 32.8503 33.591 32.658C33.8962 32.4657 34.1409 32.1913 34.2972 31.8662C34.4535 31.541 34.5149 31.1785 34.4744 30.82C34.4339 30.4616 34.2931 30.1219 34.0682 29.8398ZM19.1601 29.1213V19.5415C19.1601 19.0333 18.9583 18.546 18.5989 18.1867C18.2396 17.8274 17.7523 17.6255 17.2442 17.6255C16.736 17.6255 16.2487 17.8274 15.8894 18.1867C15.53 18.546 15.3282 19.0333 15.3282 19.5415V29.1213H5.90356L11.0767 22.6549C11.5365 22.0782 11.6265 21.2908 11.3085 20.6259C11.1511 20.3013 10.9056 20.0275 10.6 19.8357C10.2944 19.644 9.94106 19.542 9.58029 19.5415H7.51105L17.2442 5.63925L26.9772 19.5415H24.908C24.5475 19.5425 24.1945 19.6451 23.8896 19.8375C23.5847 20.0299 23.3402 20.3044 23.1842 20.6294C23.0281 20.9545 22.9669 21.3169 23.0075 21.6752C23.0481 22.0334 23.1888 22.373 23.4136 22.6549L28.5867 29.1213H19.1601Z' />
    </svg>
  );
}
