import clsx from 'clsx';
import { IconExtendProps } from './types';

export function IconLeaf({ className, overrideColors }: IconExtendProps) {
  return (
    <svg
      className={clsx(
        !overrideColors && 'fill-black dark:fill-white',
        className
      )}
      width='100'
      height='100'
      viewBox='0 0 35 35'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <path d='M34.7542 2.35094C34.7248 1.84636 34.511 1.37017 34.1536 1.01277C33.7962 0.655376 33.32 0.441655 32.8155 0.412189C26.0092 0.0117199 19.9953 0.814376 14.9405 2.7961C10.1039 4.69188 6.37594 7.63094 4.15532 11.2953C1.12688 16.2986 1.12 22.3727 4.07797 28.1717L1.08219 31.1675C0.890338 31.3594 0.738152 31.5871 0.634321 31.8378C0.530491 32.0885 0.477051 32.3571 0.477051 32.6284C0.477051 32.8998 0.530491 33.1684 0.634321 33.4191C0.738152 33.6698 0.890338 33.8975 1.08219 34.0894C1.46966 34.4768 1.99517 34.6945 2.54313 34.6945C2.81445 34.6945 3.08311 34.6411 3.33378 34.5372C3.58445 34.4334 3.81221 34.2812 4.00407 34.0894L6.99985 31.0936C9.87703 32.5614 12.823 33.3022 15.6709 33.3022C18.5645 33.3112 21.4042 32.5201 23.8763 31.0163C27.5406 28.7956 30.4797 25.0659 32.3755 20.2311C34.352 15.1728 35.1547 9.15719 34.7542 2.35094ZM21.733 27.4825C18.28 29.5742 14.2289 29.7323 10.0936 27.9844L24.6239 13.4541C24.8158 13.2622 24.9679 13.0344 25.0718 12.7838C25.1756 12.5331 25.229 12.2644 25.229 11.9931C25.229 11.7218 25.1756 11.4531 25.0718 11.2025C24.9679 10.9518 24.8158 10.724 24.6239 10.5322C24.4321 10.3403 24.2043 10.1882 23.9536 10.0843C23.703 9.98049 23.4343 9.92705 23.163 9.92705C22.8916 9.92705 22.623 9.98049 22.3723 10.0843C22.1217 10.1882 21.8939 10.3403 21.702 10.5322L7.18203 25.0728C5.43922 20.9478 5.59735 16.8864 7.69766 13.4334C11.2916 7.49859 19.8217 4.20031 30.7289 4.45297C30.9661 15.3567 27.6678 23.8886 21.733 27.4825Z' />
    </svg>
  );
}
