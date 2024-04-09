import clsx from 'clsx';
import { IconProps } from 'common/icons';

export const FindInPage: React.FC<IconProps> = ({
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
      d='M240-80q-33 0-56.5-23.5T160-160v-640q0-33 23.5-56.5T240-880h360l200 240v466L618-360q11-17 16.5-37t5.5-43q0-66-47-113t-113-47q-66 0-113 47t-47 113q0 66 47 113t113 47q23 0 43-5.5t37-16.5L768-96q-23 10-48 13t-50 3H240Zm240-280q-33 0-56.5-23.5T400-440q0-33 23.5-56.5T480-520q33 0 56.5 23.5T560-440q0 33-23.5 56.5T480-360Z'
    />
  </svg>
);