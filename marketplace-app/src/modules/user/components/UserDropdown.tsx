import clsx from 'clsx';
import { IconDropdown } from 'common/components/icons/IconDropdown';
import { FC, ReactNode } from 'react';

type Props = {
  className?: string;
  children?: ReactNode;
  open: boolean;
};

export const UserDropdown: FC<Props> = ({
  className,
  children,
  open = false,
}) => {
  return (
    <div className={clsx('relative', className)}>
      {children}
      <div className='w-5 h-5 bg-stone-100 rounded-3xl border-2 border-zinc-100 flex-col justify-center items-center inline-flex absolute right-0 bottom-0 dark:border-neutral-900'>
        <IconDropdown
          className={clsx(
            'transition-transform duration-200',
            open && 'rotate-180'
          )}
        />
      </div>
    </div>
  );
};
