type Props = { className?: string };

export const CameraIcon: React.FC<Props> = ({ className }) => {
  return (
    <svg
      width='28'
      height='26'
      viewBox='0 0 28 26'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M22.7101 8V5.5H20.2101V3H22.7101V0.5H25.2101V3H27.7101V5.5H25.2101V8H22.7101ZM12.7101 21.125C14.2726 21.125 15.601 20.5783 16.6951 19.485C17.7893 18.3917 18.336 17.0633 18.3351 15.5C18.3351 13.9375 17.7885 12.6096 16.6951 11.5162C15.6018 10.4229 14.2735 9.87583 12.7101 9.875C11.1476 9.875 9.81973 10.4221 8.72639 11.5162C7.63306 12.6104 7.08598 13.9383 7.08514 15.5C7.08514 17.0625 7.63223 18.3908 8.72639 19.485C9.82056 20.5792 11.1485 21.1258 12.7101 21.125ZM12.7101 18.625C11.8351 18.625 11.0956 18.3229 10.4914 17.7187C9.88723 17.1146 9.58514 16.375 9.58514 15.5C9.58514 14.625 9.88723 13.8854 10.4914 13.2812C11.0956 12.6771 11.8351 12.375 12.7101 12.375C13.5851 12.375 14.3247 12.6771 14.9289 13.2812C15.5331 13.8854 15.8351 14.625 15.8351 15.5C15.8351 16.375 15.5331 17.1146 14.9289 17.7187C14.3247 18.3229 13.5851 18.625 12.7101 18.625ZM2.71014 25.5C2.02264 25.5 1.43431 25.2554 0.945144 24.7662C0.455977 24.2771 0.210977 23.6883 0.210144 23V8C0.210144 7.3125 0.455144 6.72417 0.945144 6.235C1.43514 5.74583 2.02348 5.50083 2.71014 5.5H6.64764L8.96014 3H17.7101V8H20.2101V10.5H25.2101V23C25.2101 23.6875 24.9656 24.2762 24.4764 24.7662C23.9872 25.2562 23.3985 25.5008 22.7101 25.5H2.71014Z'
        fill='white'
        className={className}
      />
    </svg>
  );
};
