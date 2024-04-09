import clsx from 'clsx';

type Props = {
  children: React.ReactNode;
  className?: string;
  type?: 'primary' | 'secondary';
  onClick?: () => void;
  disabled?: boolean;
};

export const Button: React.FC<Props> = ({
  children,
  className,
  type = 'primary',
  onClick,
  disabled,
}) => {
  return (
    <button
      className={clsx(
        'cursor-pointer flex font-bold items-center justify-center rounded-3xl px-6 py-3 text-base max-h-12 transition-colors text-nowrap',
        type === 'primary'
          ? 'bg-teal-500 hover:bg-teal-600 text-zinc-100 disabled:bg-teal-400 disabled:text-neutral-100 dark:bg-emerald-600 dark:hover:bg-emerald-500 dark:disabled:bg-neutral-700 dark:disabled:text-zinc-500'
          : 'border border-teal-500 text-teal-500 hover:bg-teal-200 disabled:border-stone-400 disabled:text-400 dark:border-emerald-600 dark:text-emerald-600 dark:hover:bg-neutral-900 dark:hover:border-emerald-500 dark:hover:text-emerald-500 dark:disabled:border-neutral-700 dark:disabled:text-neutral-700',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
