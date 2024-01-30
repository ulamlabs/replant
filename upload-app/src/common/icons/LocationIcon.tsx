type Props = { className?: string };

export const LocationIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width='15'
      height='18'
      viewBox='0 0 15 18'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_327_23)'>
        <path
          d='M7.19998 10.8C9.18538 10.8 10.8 9.1854 10.8 7.2C10.8 5.2146 9.18538 3.6 7.19998 3.6C5.21458 3.6 3.59998 5.2146 3.59998 7.2C3.59998 9.1854 5.21458 10.8 7.19998 10.8ZM7.19998 5.4C8.19268 5.4 8.99998 6.2073 8.99998 7.2C8.99998 8.1927 8.19268 9 7.19998 9C6.20728 9 5.39998 8.1927 5.39998 7.2C5.39998 6.2073 6.20728 5.4 7.19998 5.4Z'
          fill='#808080'
          className={className}
        />
        <path
          d='M6.67801 17.8327C6.83033 17.9415 7.01282 18 7.2 18C7.38717 18 7.56967 17.9415 7.72199 17.8327C7.99559 17.6392 14.426 12.9961 14.3999 7.20006C14.3999 3.23013 11.1699 0 7.2 0C3.23014 0 7.92331e-05 3.23013 7.92331e-05 7.19556C-0.0260205 12.9961 6.40441 17.6392 6.67801 17.8327ZM7.2 1.80001C10.1781 1.80001 12.5999 4.22193 12.5999 7.20456C12.6188 11.1988 8.65078 14.7853 7.2 15.9616C5.75012 14.7844 1.78116 11.197 1.80006 7.20006C1.80006 4.22193 4.22193 1.80001 7.2 1.80001Z'
          fill='#808080'
          className={className}
        />
      </g>
      <defs>
        <clipPath id='clip0_327_23'>
          <rect width='14.4' height='18' fill='white' />
        </clipPath>
      </defs>
    </svg>
  );
};
