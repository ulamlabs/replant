import { IconProps } from '.';

export const UploadIcon: React.FC<IconProps> = ({
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
        d='M11.5 15.577v-8.65l-2.33 2.33l-.708-.719L12 5l3.538 3.538l-.707.72L12.5 6.927v8.65zM6.615 19q-.69 0-1.152-.462Q5 18.075 5 17.385v-2.423h1v2.423q0 .23.192.423q.193.192.423.192h10.77q.23 0 .423-.192q.192-.193.192-.423v-2.423h1v2.423q0 .69-.462 1.152q-.463.463-1.153.463z'
        className={pathClassName}
      />
    </svg>
  );
};
