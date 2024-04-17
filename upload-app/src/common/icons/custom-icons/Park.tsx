import clsx from 'clsx';
import { IconProps } from 'common/icons';

export const Park: React.FC<IconProps> = ({
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
      d='M 294.748 51.250 C 291.899 53.429, 168.020 221.073, 167.383 223.612 C 166.601 226.727, 168.671 231.731, 171.387 233.288 C 172.805 234.101, 181.358 234.665, 197.375 235 L 221.251 235.500 162.944 314 C 130.876 357.175, 104.010 393.740, 103.243 395.255 C 102.145 397.425, 102.087 398.735, 102.975 401.423 C 105.290 408.437, 99.556 408.039, 194.189 407.756 L 279.431 407.500 285.172 358.168 L 290.913 308.835 270.956 279.813 C 259.980 263.850, 251 250.603, 251 250.375 C 251 250.147, 260.297 258.519, 271.661 268.980 C 283.024 279.441, 292.699 288, 293.161 288 C 293.622 288, 294.008 286.988, 294.018 285.750 C 294.067 279.504, 299.987 202.680, 300.455 202.211 C 300.755 201.912, 301.002 203.879, 301.005 206.583 C 301.011 212.570, 307.862 312.195, 308.298 312.631 C 308.468 312.802, 318.034 304.348, 329.554 293.846 C 341.074 283.343, 351.587 273.794, 352.915 272.625 C 354.243 271.456, 352.381 274.775, 348.777 280 C 345.173 285.225, 335.300 299.543, 326.836 311.817 L 311.448 334.134 315.665 370.317 C 317.984 390.218, 319.908 406.837, 319.940 407.250 C 319.973 407.663, 358.639 408, 405.864 408 L 491.727 408 494.252 405.476 C 497.353 402.374, 498.076 399.063, 496.466 395.334 C 495.793 393.776, 469.112 357.175, 437.174 314 L 379.106 235.500 402.803 235 C 418.680 234.665, 427.197 234.100, 428.613 233.288 C 431.690 231.523, 433.583 226.382, 432.354 223.126 C 431.494 220.849, 410.821 192.650, 325.595 77.500 C 315.825 64.300, 306.919 52.712, 305.805 51.750 C 303.445 49.712, 297.132 49.426, 294.748 51.250 M 279 480.065 C 279 534.210, 278.964 535.213, 276.848 540.132 C 275.469 543.337, 273.410 546.009, 271.116 547.567 L 267.536 550 299.916 550 L 332.296 550 328.898 547.749 C 326.990 546.484, 324.404 543.305, 323 540.499 L 320.500 535.500 320.218 480.250 L 319.935 425 299.468 425 L 279 425 279 480.065'
      stroke='none'
      fillRule='evenodd'
      className={clsx(
        !overrideColor && 'fill-black dark:fill-white',
        pathClassName
      )}
    />
  </svg>
);
