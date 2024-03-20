import { IconProps } from '.';

export const InstallIcon: React.FC<IconProps> = ({
  pathClassName,
  svgClassName,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='1em'
      height='1em'
      viewBox='0 0 24 24'
      className={svgClassName}
    >
      <path
        fill='#808080'
        d='M7.615 22q-.69 0-1.152-.462Q6 21.075 6 20.385V3.615q0-.69.463-1.152Q6.925 2 7.615 2h6.462v1H7.615q-.23 0-.423.192Q7 3.385 7 3.615V4.5h7.077v1H7v13h10v-2h1v3.885q0 .69-.462 1.152q-.463.463-1.153.463zM7 19.5v.885q0 .23.192.423q.193.192.423.192h8.77q.23 0 .423-.192q.192-.193.192-.423V19.5zm11-6.212l-4.308-4.307l.708-.708l3.1 3.1V3.5h1v7.873l3.1-3.1l.708.708zM7 4.5V3zm0 15V21z'
        className={pathClassName}
      />
    </svg>
  );
};
