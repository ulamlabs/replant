import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  className?: string;
};

export const MailboxImage: FC<Props> = ({ className }) => {
  return (
    <>
      <img
        className={clsx('hidden dark:block w-1/2 m-auto md:w-auto', className)}
        src='mailbox_black.svg'
        alt='Mailbox'
      />
      <img
        className={clsx('dark:hidden', className)}
        src='mailbox_white.svg'
        alt='Mailbox'
      />
    </>
  );
};
