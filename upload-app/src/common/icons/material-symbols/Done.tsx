import clsx from 'clsx';
import { IconProps } from 'common/icons';

export const Done: React.FC<IconProps> = ({
  overrideColor,
  pathClassName,
  svgClassName,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height='24'
    viewBox='0 -960 960 960'
    width='24'
    className={svgClassName}
  >
    <path
      className={clsx(
        !overrideColor && 'fill-black dark:fill-white',
        pathClassName
      )}
      d='M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z'
    />
  </svg>
);
