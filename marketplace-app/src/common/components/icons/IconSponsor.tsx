import clsx from 'clsx';
import { IconProps } from './types';

export function IconSponsor({ className, overrideColors }: IconProps) {
  return (
    <svg
      className={clsx(
        !overrideColors && 'fill-black dark:fill-white',
        className
      )}
      xmlns='http://www.w3.org/2000/svg'
      width='100'
      height='100'
      viewBox='0 0 1330 1120'
      version='1.1'
    >
      <path d='' stroke='none' fillRule='evenodd' />
      <path
        d='M 640 1.103 C 585.061 7.280, 533.401 34.564, 497.243 76.500 C 439.148 143.880, 426.555 238.342, 465.062 317.884 C 498.038 385.998, 560.317 431.134, 636.500 442.132 C 641.450 442.846, 654.275 443.431, 665 443.431 C 701.263 443.431, 730.540 436.717, 762.500 421.071 C 807.784 398.903, 842.781 363.650, 864.938 317.884 C 931.495 180.402, 841.002 17.638, 688.789 1.058 C 677.620 -0.159, 651.003 -0.134, 640 1.103 M 222 187.569 C 220.625 187.810, 216.125 188.499, 212 189.102 C 195.802 191.469, 175.431 199.793, 160.043 210.333 C 150.370 216.959, 134.959 232.370, 128.333 242.043 C 118.031 257.084, 110.020 276.476, 106.870 294 C 104.726 305.930, 105.234 329.392, 107.910 342 C 113.478 368.234, 126.189 390.681, 146.067 409.381 C 179.002 440.364, 224.954 451.341, 270 438.985 C 280.413 436.129, 300.029 426.339, 309.540 419.251 C 335.499 399.905, 352.819 372.792, 359.725 340.692 C 361.022 334.665, 361.484 328.008, 361.475 315.500 C 361.462 296.721, 360.108 288.139, 354.769 273 C 339.636 230.089, 302.505 198.132, 257.727 189.478 C 249.663 187.920, 226.937 186.706, 222 187.569 M 1080.500 188.066 C 1050.124 192.214, 1023.937 205.563, 1003.198 227.472 C 986.528 245.083, 975.641 265.828, 970.385 290 C 967.831 301.746, 967.771 329.055, 970.275 340.692 C 977.181 372.792, 994.501 399.905, 1020.460 419.251 C 1029.971 426.339, 1049.587 436.129, 1060 438.985 C 1091.563 447.643, 1125.655 444.700, 1153.171 430.944 C 1188.380 413.343, 1213.953 380.339, 1222.090 342 C 1224.766 329.392, 1225.274 305.930, 1223.130 294 C 1219.980 276.476, 1211.969 257.084, 1201.667 242.043 C 1195.041 232.370, 1179.630 216.959, 1169.957 210.333 C 1155.490 200.424, 1137.565 192.799, 1120.975 189.498 C 1111.437 187.601, 1089.572 186.827, 1080.500 188.066 M 203.500 483.564 C 151.261 490.659, 100.869 515.966, 66 552.617 C 25.640 595.039, 4.008 645.347, 0.478 705 L -0.143 715.500 5.297 724.636 C 35.100 774.688, 89.770 811.737, 155.619 826.506 C 184.547 832.994, 222.142 836.062, 251.500 834.331 C 260.850 833.779, 268.633 833.425, 268.795 833.542 C 268.957 833.660, 268.183 839.098, 267.076 845.628 C 264.306 861.954, 262.115 884.869, 261.780 901 L 261.500 914.500 267.421 924.953 C 301.481 985.078, 359.431 1037.347, 429.446 1071.095 C 481.315 1096.097, 537.798 1110.950, 606.500 1117.654 C 632.021 1120.144, 697.979 1120.144, 723.500 1117.654 C 792.202 1110.950, 848.685 1096.097, 900.554 1071.095 C 970.569 1037.347, 1028.519 985.078, 1062.579 924.953 L 1068.500 914.500 1068.220 901 C 1067.885 884.869, 1065.694 861.954, 1062.924 845.628 C 1061.817 839.098, 1061.043 833.660, 1061.205 833.542 C 1061.367 833.425, 1069.150 833.779, 1078.500 834.331 C 1107.858 836.062, 1145.453 832.994, 1174.381 826.506 C 1240.653 811.642, 1294.953 774.684, 1325.092 723.927 C 1330.208 715.310, 1331 713.300, 1331 708.929 C 1331 705.819, 1330.616 704.119, 1330 704.500 C 1329.377 704.885, 1328.998 702.926, 1328.995 699.309 C 1328.993 696.114, 1328.122 687.650, 1327.061 680.500 C 1315.746 604.290, 1267.938 539.172, 1198.500 505.390 C 1165.222 489.200, 1133.832 481.990, 1096.699 482.008 C 1077.816 482.017, 1066.750 482.993, 1051.377 486.007 C 1013.900 493.353, 979.715 509.365, 949.392 533.775 C 936.598 544.075, 918.631 562.789, 909.063 575.779 L 901.667 585.822 891.084 578.710 C 834.709 540.827, 773.827 518.759, 705.500 511.440 C 695.777 510.399, 681.529 509.834, 665 509.834 C 648.471 509.834, 634.223 510.399, 624.500 511.440 C 556.173 518.759, 495.291 540.827, 438.916 578.710 L 428.333 585.822 420.937 575.779 C 411.369 562.789, 393.402 544.075, 380.608 533.775 C 345.302 505.353, 303.790 487.956, 259.500 483.020 C 247 481.626, 215.514 481.933, 203.500 483.564'
        stroke='none'
        fillRule='evenodd'
      />
    </svg>
  );
}