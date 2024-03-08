type Props = { svgClassName?: string };

export const ArrowDownIcon: React.FC<Props> = ({ svgClassName }) => {
  return (
    <svg
      width='12'
      height='8'
      viewBox='0 0 12 8'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={svgClassName}
    >
      <path
        d='M1 1.5L6 6.5L11 1.5'
        stroke='#808080'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
