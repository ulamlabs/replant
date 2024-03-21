import clsx from 'clsx';
import { IconProps } from './types';

export function IconThreads({ className, overrideColors }: IconProps) {
  return (
    <a href='https://www.threads.net/@replant.world' target='_blank'>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='23.3334'
        height='23.3334'
        viewBox='0 0 23.3334 23.3334'
        fill='none'
        className={clsx(
          !overrideColors && 'fill-black dark:fill-white',
          className
        )}
      >
        <path d='M9.99462 14.387C9.99462 13.7891 10.2819 12.8383 12.5132 12.8383C13.1971 12.8383 13.6186 12.8878 14.1844 13.0147C14.0036 15.3568 12.8573 15.666 11.7432 15.666C11.1336 15.666 9.99462 15.348 9.99462 14.387Z' />
        <path d='M3.83958 24.297H19.6187C20.6205 24.297 21.5812 23.899 22.2896 23.1907C22.9979 22.4823 23.3958 21.5216 23.3958 20.5199V4.74071C23.3958 3.73896 22.9979 2.77825 22.2896 2.06991C21.5812 1.36156 20.6205 0.963623 19.6187 0.963623L3.83958 0.963623C2.83784 0.963623 1.87712 1.36156 1.16878 2.06991C0.460442 2.77825 0.0625 3.73896 0.0625 4.74071L0.0625 20.5199C0.0625 21.5216 0.460442 22.4823 1.16878 23.1907C1.87712 23.899 2.83784 24.297 3.83958 24.297ZM8.61708 9.58237C9.44396 8.40112 10.5348 7.94029 12.0442 7.94029C13.1087 7.94029 14.0144 8.29904 14.6619 8.97717C15.3079 9.65675 15.6769 10.628 15.7615 11.869C16.1192 12.0188 16.4488 12.1952 16.7502 12.3984C17.9635 13.2136 18.6315 14.4328 18.6315 15.8299C18.6315 18.8005 16.196 21.3803 11.789 21.3803C8.00458 21.3803 4.07292 19.1782 4.07292 12.6245C4.07292 6.10571 7.88062 3.88029 11.7773 3.88029C13.5769 3.88029 17.7987 4.14571 19.3854 9.38842L17.8979 9.77342C16.67 6.04008 14.096 5.44508 11.7379 5.44508C7.83687 5.44508 5.63187 7.81925 5.63187 12.8724C5.63187 17.4034 8.09646 19.8097 11.789 19.8097C14.8267 19.8097 17.0915 18.2317 17.0915 15.9203C17.0915 14.3467 15.7702 13.5942 15.7017 13.5942C15.4435 14.9432 14.7523 17.2138 11.716 17.2138C9.94708 17.2138 8.42021 15.9917 8.42021 14.3905C8.42021 12.1038 10.5902 11.2755 12.3037 11.2755C12.9454 11.2755 13.7183 11.3192 14.1223 11.4009C14.1223 10.7038 13.5331 9.51092 12.0427 9.51092C10.7142 9.51092 10.351 9.93092 9.92812 10.4209L9.89312 10.4603C9.59854 10.2634 8.61708 9.58237 8.61708 9.58237Z' />
      </svg>
    </a>
  );
}
