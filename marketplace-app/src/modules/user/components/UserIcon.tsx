import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  img?: string;
  className?: string;
};

export const UserIcon: FC<Props> = ({ img, className }) => {
  return (
    <div className={clsx(className)}>
      <img className='dark:hidden' src={img || 'default_user.png'} alt='user' />
      <img
        className='hidden dark:block'
        src={img || 'default_user_black.png'}
        alt='user'
      />
    </div>
  );
};
