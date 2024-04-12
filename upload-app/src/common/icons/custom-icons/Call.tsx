import clsx from 'clsx';
import { IconProps } from 'common/icons';

export const Call: React.FC<IconProps> = ({
  overrideColor,
  pathClassName,
  svgClassName,
}) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='600'
    height='600'
    viewBox='0 0 600 600'
    version='1.1'
    className={svgClassName}
  >
    <path
      d='M 106.653 51.430 C 101.672 54.145, 91.538 62.687, 84.710 69.924 C 48.721 108.074, 40.711 160.518, 60.563 228.022 C 69.991 260.080, 88.416 298.282, 108.633 327.691 C 147.179 383.760, 187.201 426.907, 235.611 464.583 C 265.376 487.748, 288.649 503.024, 313 515.381 C 345.446 531.846, 376.004 542.412, 406 547.539 C 420.240 549.973, 448.208 550.541, 460.500 548.646 C 494.663 543.379, 523.601 526.563, 543.656 500.323 L 549.500 492.676 549.213 467.088 C 549.056 453.015, 548.447 439.706, 547.861 437.513 C 547.274 435.318, 545.381 432.222, 543.648 430.624 C 541.447 428.595, 522.452 420.220, 480.506 402.787 C 447.510 389.073, 419.288 377.608, 417.792 377.308 C 410.246 375.799, 409.003 376.707, 382.291 403.227 C 353.046 432.262, 356.688 430.602, 341.131 421.986 C 303.936 401.385, 263.488 369.973, 237.962 341.864 C 214.995 316.575, 193.431 286.645, 177.538 258 C 169.467 243.454, 167.850 246.842, 196.773 217.709 C 223.293 190.997, 224.201 189.754, 222.692 182.208 C 221.635 176.926, 172.321 59.757, 169.927 56.842 C 165.947 51.996, 161.866 51.270, 134.500 50.543 C 112.938 49.970, 109.108 50.092, 106.653 51.430'
      stroke='none'
      fillRule='evenodd'
      className={clsx(
        !overrideColor && 'fill-black dark:fill-white',
        pathClassName
      )}
    />
  </svg>
);
