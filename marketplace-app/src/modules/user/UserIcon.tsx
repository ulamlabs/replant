import clsx from 'clsx';
import { FC } from 'react';

type Props = {
  img?: string;
  className: string;
};

export const UserIcon: FC<Props> = ({
  img,
  className,
  dropdown,
  isUserOpen,
}) => {
  return (
    <div className={clsx(className)}>
      <img className='dark:hidden' src={img || 'default_user.png'} />
      <img
        className='hidden dark:block'
        src={img || 'default_user_black.png'}
      />
      <div></div>
    </div>
  );
};
