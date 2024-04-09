import clsx from 'clsx';
import { IconProps } from 'common/icons';

export const Camera: React.FC<IconProps> = ({
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
      d='M 236.844 51.378 C 226.965 54.949, 220.221 60.853, 215.248 70.287 L 212.500 75.500 212.207 115.201 L 211.914 154.901 159.707 155.201 L 107.500 155.500 99.500 158.308 C 77.177 166.143, 60.674 182.670, 53.153 204.722 L 50.500 212.500 50.219 349.500 C 49.905 502.728, 49.533 493.979, 57.031 509.500 C 66.290 528.662, 83.435 542.868, 103.498 547.999 C 111.185 549.965, 114.577 550, 300 550 C 485.423 550, 488.815 549.965, 496.502 547.999 C 516.565 542.868, 533.710 528.662, 542.969 509.500 C 550.467 493.979, 550.095 502.728, 549.781 349.500 L 549.500 212.500 546.692 204.500 C 542.877 193.629, 537.035 184.072, 529.518 176.406 L 523.237 170 515.266 170 L 507.296 170 506.714 178.977 C 505.960 190.619, 502.665 198.317, 495.792 204.497 C 482.815 216.164, 462.685 215.732, 450.476 203.524 C 444.230 197.278, 441.782 191.142, 441.090 180 L 440.500 170.500 430.955 169.939 C 419.428 169.260, 413.711 166.859, 406.815 159.797 L 402.130 155 395.108 155 L 388.086 155 387.793 115.250 L 387.500 75.500 384.715 70.214 C 380.752 62.692, 375.979 57.809, 368.768 53.899 L 362.500 50.500 301.500 50.279 C 253.015 50.102, 239.750 50.328, 236.844 51.378 M 468.500 81.371 C 466.850 82.133, 464.150 84.190, 462.500 85.941 L 459.500 89.126 459.184 106.063 L 458.868 123 443.902 123 C 427.362 123, 424.424 123.707, 419.584 128.855 C 415.510 133.187, 414.774 141.281, 417.982 146.471 C 421.950 152.892, 425.701 154, 443.460 154 L 459 154 459 170.132 C 459 184.904, 459.182 186.558, 461.155 189.750 C 463.412 193.403, 469.665 196.940, 473.934 196.978 C 477.465 197.010, 484.182 193.406, 486.500 190.235 C 488.276 187.806, 488.535 185.624, 488.816 170.750 L 489.132 154 504.250 154 C 517.393 154, 519.900 153.737, 523.434 151.985 C 528.874 149.290, 531.280 145.708, 531.772 139.570 C 532.101 135.467, 531.732 133.850, 529.839 131.092 C 524.934 123.945, 523.668 123.535, 505.430 123.183 L 489 122.865 489 107.081 C 489 92.357, 488.849 91.073, 486.750 87.990 C 482.204 81.310, 474.602 78.553, 468.500 81.371 M 418.147 207.064 C 404.986 209.684, 395.852 221.046, 395.766 234.905 C 395.694 246.409, 401.164 255.404, 411.500 260.778 C 418.371 264.350, 429.361 264.554, 436.100 261.233 C 441.963 258.345, 447.345 252.963, 450.233 247.100 C 453.554 240.361, 453.350 229.371, 449.778 222.500 C 443.640 210.694, 430.970 204.512, 418.147 207.064 M 280 225.538 C 253.652 229.704, 228.204 242.323, 208.636 260.925 C 194.799 274.079, 181.900 294.891, 175.527 314.347 C 155.586 375.223, 183.344 442.873, 240 471.477 C 260.755 481.955, 275.819 485.468, 300 485.468 C 324.181 485.468, 339.245 481.955, 360 471.477 C 416.656 442.873, 444.414 375.223, 424.473 314.347 C 408.969 267.018, 368.589 232.986, 319 225.455 C 307.431 223.698, 291.422 223.732, 280 225.538 M 279 253.948 C 258.737 258.255, 242.746 267.078, 227.412 282.412 C 207.011 302.813, 197.046 326.489, 197.013 354.640 C 196.958 401.613, 226.445 440.680, 272.500 454.651 C 280.909 457.202, 282.715 457.381, 300 457.381 C 317.285 457.381, 319.091 457.202, 327.500 454.651 C 373.555 440.680, 403.042 401.613, 402.987 354.640 C 402.954 326.489, 392.989 302.813, 372.588 282.412 C 357.083 266.907, 341.134 258.175, 320.500 253.894 C 308.734 251.452, 290.627 251.476, 279 253.948'
      stroke='none'
      fillRule='evenodd'
      className={clsx(
        !overrideColor && 'fill-black dark:fill-white',
        pathClassName
      )}
    />
  </svg>
);