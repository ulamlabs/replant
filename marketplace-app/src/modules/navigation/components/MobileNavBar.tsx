import clsx from 'clsx';
import { Button } from 'common/components';
import { Logout } from 'modules/auth';
import { useFmtMsg } from 'modules/intl';
import { UserType } from 'modules/user';
import { User } from 'modules/user/User';
import { FC } from 'react';
import { NavigateFunction } from 'react-router-dom';
import NavItem from './NavItem';

type Props = {
  user: UserType | undefined;
  navigate: NavigateFunction;
  open: boolean;
  toggleNav: () => void;
};

const MobileNavBar: FC<Props> = ({ user, navigate, toggleNav, open }) => {
  const fmtMsg = useFmtMsg();

  return (
    <>
      <div
        onClick={toggleNav}
        className='w-7 h-7 flex-col justify-center items-center gap-2 inline-flex cursor-pointer relative  lg:hidden'
      >
        <div
          className={clsx(
            'w-7 h-0.5 bg-neutral-900 dark:bg-gray-200 rounded-3xl transition-transform duration-300 transform',
            open && 'rotate-45 translate-y-[5px]'
          )}
        />
        <div
          className={clsx(
            'w-7 h-0.5 bg-neutral-900 dark:bg-gray-200 rounded-3xl transition-transform duration-300 transform',
            open && '-rotate-45 -translate-y-[5px]'
          )}
        />
      </div>
      <div
        className={clsx(
          'w-screen max-h-0 overflow-hidden opacity-0 bg-zinc-100 transition-all duration-300 pt-0 pb-0 fixed -z-10 top-0 left-0 dark:bg-neutral-750 px-5 sm:px-16 flex flex-col justify-between',
          open && 'max-h-screen h-screen !pt-20 !pb-8 opacity-100'
        )}
      >
        <div>
          <ul className='flex flex-col gap-4 my-10'>
            <NavItem to='/'>{fmtMsg('home')}</NavItem>
            <NavItem to='marketplace'>{fmtMsg('marketplace')}</NavItem>
            <NavItem to='sponsors'>{fmtMsg('sponsors')}</NavItem>
            <NavItem to='planters'>{fmtMsg('planters')}</NavItem>
            <NavItem to='impact'>{fmtMsg('impact')}</NavItem>
          </ul>
          {!user ? (
            <div className='bg-transparent rounded-b-3xl flex flex-col gap-3'>
              <Button
                onClick={() => navigate('/signup')}
                type='primary'
                className='w-full'
              >
                {fmtMsg('signUp')}
              </Button>
              <Button
                onClick={() => navigate('/login')}
                type='secondary'
                className='w-full'
              >
                {fmtMsg('logIn')}
              </Button>
            </div>
          ) : (
            <div className='flex flex-col gap-3 bg-tr'>
              <User user={user} />
              <Logout />
            </div>
          )}
        </div>
        <p className='text-neutral-400 text-xs font-normal'>
          Replant World Copyright © 2024
        </p>
      </div>
    </>
  );
};

export default MobileNavBar;
