import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
};

export const LogoutButton: FC<Props> = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={clsx(
        'bg-transparent hover:bg-red-50 dark:hover:bg-red-800 dark:hover:bg-opacity-30 border-none lg:justify-end text-red-400 dark:text-red-800 min-h-16 px-6 py-5 rounded-2xl text-base font-medium cursor-pointer flex items-center justify-center max-h-12 transition-colors text-nowrap',
        className
      )}
    >
      {children}
    </button>
  );
};
