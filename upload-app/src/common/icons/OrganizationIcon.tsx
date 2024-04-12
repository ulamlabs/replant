import { IconProps } from '.';

export const OrganizationIcon: React.FC<IconProps> = ({
  pathClassName,
  svgClassName,
}) => {
  return (
    <svg
      width='91'
      height='94'
      viewBox='0 0 91 94'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={svgClassName}
    >
      <path
        d='M89.3289 57.6883C87.7969 57.2276 86.2412 56.8421 84.667 56.53L74.4702 42.3391C72.9039 40.1579 71.142 38.0947 69.7821 36.541C66.8115 33.1472 63.693 32.4968 59.3139 32.5243C54.9365 32.4897 51.8175 33.1472 48.8471 36.5413C48.1026 37.3922 47.2192 38.4167 46.312 39.5337L44.1752 36.4861C42.6116 34.309 40.8483 32.2443 39.4868 30.6885C36.5167 27.2949 33.3961 26.6396 29.0186 26.6717C24.6412 26.643 21.5217 27.2952 18.5524 30.6882C17.5539 31.8286 16.2439 33.3499 14.9637 35.0091C14.1951 36.0052 14.4774 37.3681 15.5943 38.0538C16.7111 38.739 18.2393 38.4878 19.0081 37.4914C20.2139 35.9288 21.466 34.4751 22.4222 33.3827C24.1776 31.3769 25.6708 31.0259 29.0006 31.0502C29.0132 31.0504 29.0252 31.0504 29.0375 31.0502C32.3637 31.0295 33.8619 31.3769 35.6175 33.3827C36.9135 34.8636 38.5876 36.8232 40.0276 38.8278L50.873 54.2965C51.3389 54.9608 52.1385 55.3254 52.9567 55.3252C53.401 55.3252 53.851 55.2177 54.2558 54.9919C55.4054 54.351 55.7545 53.0002 55.0355 51.9752L49.1373 43.5627C50.3742 41.9438 51.6841 40.4167 52.7181 39.2353C54.4737 37.2292 55.9631 36.8838 59.2962 36.9028C59.3088 36.903 59.321 36.903 59.3336 36.9028C62.6577 36.8826 64.1575 37.2292 65.9134 39.2355C67.2078 40.7142 68.8802 42.6716 70.3374 44.7011L78.2244 55.6772C77.0511 55.5971 75.8712 55.5558 74.6867 55.5558C67.6771 55.5558 60.9487 56.9314 54.6881 59.6443C53.4687 60.1726 52.9606 61.4828 53.5529 62.5701C54.1456 63.6577 55.6143 64.1108 56.8334 63.5825C62.4199 61.1617 68.4266 59.934 74.6867 59.934C78.438 59.934 82.1346 60.3835 85.7042 61.2721C82.1041 75.3535 69.3332 86.2866 53.488 88.9781C53.8093 87.0146 53.9743 85.0263 53.9743 83.0361C53.9743 82.0032 53.9301 80.9794 53.8453 79.9655L68.59 72.4518C69.7671 71.852 70.176 70.5148 69.5037 69.465C68.8311 68.4151 67.3316 68.0502 66.1547 68.6501L53.1433 75.2806C49.0689 56.4439 30.4475 42.1713 8.15564 42.1713C6.53504 42.1713 4.88853 42.2494 3.26193 42.4036C2.2168 42.5026 1.3585 43.1839 1.12695 44.0983C0.379104 47.0506 0 50.0912 0 53.1355C0 75.6681 20.554 94 45.8184 94C47.4404 94 49.0869 93.9219 50.7124 93.7679C50.7135 93.7679 50.7146 93.7675 50.7157 93.7675C70.9508 91.8477 87.5015 78.0181 90.9642 60.1352C91.1693 59.0719 90.4755 58.0333 89.3289 57.6883ZM4.90817 53.1357C4.90817 50.9491 5.1269 48.7653 5.55946 46.6235C6.42731 46.5746 7.29489 46.55 8.15455 46.55C30.7121 46.55 49.0642 62.9177 49.0642 83.0361C49.0642 84.2606 48.993 85.4841 48.8567 86.7001L27.9149 65.7238C27.0132 64.8209 25.4613 64.7404 24.4492 65.5445C23.4368 66.3487 23.3468 67.7326 24.2482 68.6355L45.1927 89.6145C22.9224 89.3155 4.90817 73.068 4.90817 53.1357ZM29.0181 22.221C35.8872 22.221 41.4756 17.2368 41.4756 11.1106C41.4753 4.98416 35.887 0 29.0181 0C22.1492 0 16.5611 4.98416 16.5611 11.1106C16.5611 17.2368 22.1492 22.221 29.0181 22.221ZM29.0181 4.37847C33.1803 4.37847 36.5663 7.39865 36.5663 11.1106C36.5663 14.8226 33.1803 17.8425 29.0181 17.8425C24.8564 17.8425 21.4704 14.8226 21.4704 11.1106C21.4704 7.39865 24.8561 4.37847 29.0181 4.37847ZM59.3137 28.0738C66.1831 28.0738 71.7717 23.0899 71.7717 16.9637C71.7717 10.8372 66.1831 5.85305 59.3137 5.85305C52.4448 5.85305 46.8567 10.8372 46.8567 16.9637C46.8567 23.0896 52.4451 28.0738 59.3137 28.0738ZM59.3137 10.2313C63.4762 10.2313 66.8625 13.2515 66.8625 16.9634C66.8625 20.6754 63.4762 23.6951 59.3137 23.6951C55.152 23.6951 51.766 20.6752 51.766 16.9634C51.766 13.2515 55.152 10.2313 59.3137 10.2313Z'
        fill='#808080'
        className={pathClassName}
      />
    </svg>
  );
};