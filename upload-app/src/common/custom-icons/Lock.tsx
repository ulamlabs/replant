import clsx from 'clsx';
import { IconProps } from 'common/icons';

export const Lock: React.FC<IconProps> = ({
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
        d='M 228.640 1.599 C 191.567 8.297, 157.902 35.189, 142.832 70.145 C 135.657 86.786, 133 102.031, 133 126.553 L 133 141.659 125.217 143.332 C 99.713 148.812, 78.357 169.418, 72.520 194.177 C 70.307 203.565, 70.280 438.320, 72.491 447.696 C 78.190 471.867, 98.028 491.741, 122.774 498.070 C 130.022 499.924, 135.044 500, 250 500 C 365.840 500, 369.927 499.937, 377.391 498.028 C 389.931 494.821, 398.240 489.891, 408.511 479.562 C 418.137 469.882, 422.173 463.467, 426.165 451.500 L 428.500 444.500 428.500 321 L 428.500 197.500 426.174 190.500 C 422.337 178.949, 417.453 171.248, 408.011 161.856 C 400.988 154.871, 397.667 152.412, 390.703 149.041 C 385.939 146.735, 378.490 144.127, 374.043 143.207 L 366 141.544 366 122.383 C 366 109.316, 365.511 100.641, 364.461 95.108 C 359.970 71.434, 348.865 50.656, 331.496 33.434 C 314.863 16.940, 292.756 5.409, 270.240 1.483 C 259.691 -0.357, 239.151 -0.299, 228.640 1.599 M 239.500 40.646 C 211.485 45.159, 189.096 62.992, 178.732 89.050 C 174.916 98.645, 174 105.542, 174 124.684 L 174 142 250.104 142 L 326.209 142 325.726 122.250 C 325.182 100.007, 324.278 95.394, 317.917 82.417 C 311.313 68.945, 300.556 57.570, 287 49.722 C 284.525 48.290, 278.281 45.707, 273.125 43.983 C 265.501 41.433, 261.767 40.784, 253.125 40.505 C 247.281 40.317, 241.150 40.380, 239.500 40.646 M 232.500 239.419 C 199.578 246.994, 173.896 273.092, 167.966 305 C 166.417 313.332, 166.417 328.668, 167.966 337 C 173.961 369.261, 200.462 396.003, 232.927 402.553 C 244.411 404.870, 263.570 404.145, 273.500 401.019 C 300.880 392.398, 322.326 370.711, 330.057 343.829 C 333.094 333.267, 333.762 315.872, 331.551 304.942 C 325.397 274.518, 303.744 250.665, 273.500 240.990 C 264.572 238.135, 241.864 237.264, 232.500 239.419'
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
