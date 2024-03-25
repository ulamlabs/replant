import clsx from 'clsx';
import { Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { User as UserType } from 'modules/user';
import { User } from 'modules/user/User';
import { FC } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { useNavToggle } from '../store';
import NavItem from './NavItem';

type Props = {
  user: UserType | undefined;
  navigate: NavigateFunction;
};

const MobileNavBar: FC<Props> = ({ user, navigate }) => {
  const fmtMsg = useFmtMsg();
  const { isUserOpen, isNavOpen, toggleNav, closeAll } = useNavToggle();

  return (
    <div className='md:hidden flex gap-4'>
      {user && <User user={user} />}
      <div
        onClick={toggleNav}
        className=' w-12 h-12 bg-neutral-50 flex-col justify-center items-center gap-2 inline-flex cursor-pointer relative z-20 rounded-full dark:bg-neutral-900'
      >
        <div
          className={clsx(
            'w-7 h-0.5 bg-neutral-900 dark:bg-gray-200 rounded-3xl transition-transform duration-300 transform',
            isNavOpen && ' rotate-45 translate-y-[5px]'
          )}
        />
        <div
          className={clsx(
            'w-7 h-0.5 bg-neutral-900 dark:bg-gray-200 rounded-3xl transition-transform duration-300 transform',
            isNavOpen && ' -rotate-45 -translate-y-[5px]'
          )}
        />
      </div>
      <div
        onClick={closeAll}
        className={clsx(
          'fixed h-0 w-screen left-0 top-0 bg-opacity-70 z-10 bg-zinc-400 px-[20px] sm:px-[60px] transition-all duration-300 dark:bg-neutral-700 dark:bg-opacity-70',
          (isNavOpen || isUserOpen) && 'h-screen'
        )}
      ></div>
      <div
        className={clsx(
          'w-[248px] max-h-0 overflow-hidden bg-neutral-50 mr-0 ml-auto transition-all duration-200 mt-[70px] rounded-3xl absolute z-20 top-0 right-5 sm:right-[60px] dark:bg-neutral-750',
          isNavOpen && 'max-h-[455px]'
        )}
      >
        <ul className='flex flex-col px-6 py-5 gap-2'>
          <NavItem to='/'>{fmtMsg('home')}</NavItem>
          <NavItem to='marketplace'>{fmtMsg('marketplace')}</NavItem>
          <NavItem to='sponsors'>{fmtMsg('sponsors')}</NavItem>
          <NavItem to='planters'>{fmtMsg('planters')}</NavItem>
          <NavItem to='impact'>{fmtMsg('impact')}</NavItem>
        </ul>
        {!user && (
          <div className='h-[148px] px-6 py-5 bg-zinc-100 rounded-b-3xl flex flex-col gap-3 dark:bg-neutral-900'>
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
        )}
      </div>
    </div>
  );
};

export default MobileNavBar;
