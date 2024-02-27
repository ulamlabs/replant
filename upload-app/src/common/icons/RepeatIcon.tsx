import { IconProps } from '.';

export const RepeatIcon: React.FC<IconProps> = ({
  pathClassName,
  svgClassName,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='24'
      height='24'
      viewBox='0 0 24 24'
      className={svgClassName}
    >
      <path
        fill='white'
        d='m7 22l-4-4l4-4l1.4 1.45L6.85 17H17v-4h2v6H6.85l1.55 1.55zM5 11V5h12.15L15.6 3.45L17 2l4 4l-4 4l-1.4-1.45L17.15 7H7v4z'
        className={pathClassName}
      />
    </svg>
  );
};
