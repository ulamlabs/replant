import { UserIcon } from 'common/components/icons/UserIcon';
import { FC } from 'react';
import { User as UserType } from '.';

type Props = {
  user: UserType;
};

export const User: FC<Props> = ({ user }) => {
  return (
    <div className='w-11 h-11 relative rounded-full flex items-center'>
      <UserIcon pathClassName='fill-gray-500' svgClassName='w-6 h-6' />
    </div>
  );
};
