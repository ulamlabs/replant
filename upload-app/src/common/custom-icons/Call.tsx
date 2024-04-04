import clsx from 'clsx';
import { IconProps } from 'common/icons';

export const Call: React.FC<IconProps> = ({
  overrideColor,
  pathClassName,
  svgClassName,
}) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='500'
      height='500'
      viewBox='0 0 500 500'
      version='1.1'
      className={svgClassName}
    >
      <path
        d='M 56.653 1.430 C 51.672 4.145, 41.538 12.687, 34.710 19.924 C -1.279 58.074, -9.289 110.518, 10.563 178.022 C 19.991 210.080, 38.416 248.282, 58.633 277.691 C 97.179 333.760, 137.201 376.907, 185.611 414.583 C 215.376 437.748, 238.649 453.024, 263 465.381 C 295.453 481.849, 326.048 492.428, 356 497.536 C 370.529 500.014, 397.254 500.568, 410 498.657 C 444.515 493.480, 473.448 476.763, 493.656 450.323 L 499.500 442.676 499.213 417.088 C 499.056 403.015, 498.447 389.706, 497.861 387.513 C 497.274 385.318, 495.381 382.222, 493.648 380.624 C 491.447 378.595, 472.452 370.220, 430.506 352.787 C 397.510 339.073, 369.288 327.608, 367.792 327.308 C 360.246 325.799, 359.003 326.707, 332.291 353.227 C 303.046 382.262, 306.688 380.602, 291.131 371.986 C 253.936 351.385, 213.488 319.973, 187.962 291.864 C 164.995 266.575, 143.431 236.645, 127.538 208 C 119.467 193.454, 117.850 196.842, 146.773 167.709 C 173.293 140.997, 174.201 139.754, 172.692 132.208 C 171.635 126.926, 122.321 9.757, 119.927 6.842 C 115.947 1.996, 111.866 1.270, 84.500 0.543 C 62.938 -0.030, 59.108 0.092, 56.653 1.430'
        stroke='none'
        fillRule='evenodd'
        className={clsx(
          !overrideColor && 'fill-black dark:fill-white',
          pathClassName
        )}
      />
    </svg>
  );
};
