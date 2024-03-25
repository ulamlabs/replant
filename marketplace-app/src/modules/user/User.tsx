import clsx from 'clsx';
import { UserIcon } from 'common/components/icons/UserIcon';
import { useFmtMsg } from 'modules/intl';
import NavItem from 'modules/navigation/components/NavItem';
import { useNavToggle } from 'modules/navigation/store';
import { FC } from 'react';
import { User as UserType } from '.';

type Props = {
  user: UserType;
};

export const User: FC<Props> = ({ user }) => {
  const fmtMsg = useFmtMsg();

  const { isUserOpen, toggleUser } = useNavToggle();

  return (
    <div
      className={
        'w-12 h-12 relative rounded-full flex items-center bg-neutral-50 justify-center cursor-pointer z-20'
      }
    >
      <div
        onClick={toggleUser}
        className='w-full h-full flex justify-center items-center'
      >
        <UserIcon pathClassName='fill-neutral-400' svgClassName='w-9 h-9' />
      </div>
      <div
        className={clsx(
          'w-[248px] md:w-80 max-h-0 overflow-hidden bg-neutral-50 mr-0 ml-auto transition-all duration-200 mt-[70px] rounded-3xl absolute z-20 top-0 right-0 md:shadow-lg dark:bg-neutral-750 dark:shadow-neutral-700',
          isUserOpen && 'max-h-[455px]'
        )}
      >
        <div className='h-[76px] px-6 py-5 bg-zinc-100 rounded-t-3xl cursor-default flex items-center gap-2 dark:bg-neutral-900'>
          <UserIcon pathClassName='fill-neutral-400' svgClassName='w-9 h-9' />
          <div>
            <h3 className='text-sm font-semibold'>
              {user?.username || 'Test testowy'}
            </h3>
            <p className='text-neutral-400 text-xs font-normal'>Individual</p>
          </div>
        </div>
        <ul className='flex flex-col px-6 py-5 gap-2'>
          <NavItem type='submenu' to='profile'>
            {fmtMsg('profile')}
          </NavItem>
          <NavItem type='submenu' to='settings'>
            {fmtMsg('settings')}
          </NavItem>
          <NavItem type='submenu' className=' text-red-400' to=''>
            {fmtMsg('logOut')}
          </NavItem>
        </ul>
      </div>
    </div>
  );
};
