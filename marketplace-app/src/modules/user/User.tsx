import clsx from 'clsx';
import { Logout } from 'modules/auth';
import { useFmtMsg } from 'modules/intl';
import NavItem from 'modules/navigation/components/NavItem';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '.';
import { UserDropdown, UserIcon } from './components';

type Props = {
  user: UserType;
};

export const User: FC<Props> = ({ user }) => {
  const fmtMsg = useFmtMsg();
  const navigate = useNavigate();

  const [isUserOpen, setIsUserOpen] = useState(false);

  return (
    <>
      <div className='flex lg:hidden w-full h-20 px-7 py-4 bg-neutral-50 rounded-3xl items-center gap-3 dark:bg-neutral-900'>
        <div
          onClick={() => navigate('profile')}
          className='h-full flex justify-center items-center'
        >
          <UserIcon className='w-9 h-9' />
        </div>
        <div>
          <h3 className='text-sm font-semibold'>{user.sponsor?.name}</h3>
          <p className='text-neutral-400 text-xs font-normal'>
            {user.sponsor?.type === 'COMPANY'
              ? fmtMsg('company')
              : fmtMsg('individual')}
          </p>
        </div>
      </div>

      <div
        className={
          'w-12 h-12 relative rounded-full hidden lg:flex items-cente justify-center cursor-pointer z-20'
        }
      >
        <div
          onClick={() => setIsUserOpen((prev) => !prev)}
          className='w-full h-full flex justify-center items-center z-20 relative'
        >
          <UserDropdown open={isUserOpen}>
            <UserIcon />
          </UserDropdown>
        </div>
        {isUserOpen && (
          <div
            onClick={() => setIsUserOpen(false)}
            className='hidden md:block fixed top-0 left-0 w-screen h-screen z-10 cursor-default'
          />
        )}
        <div
          className={clsx(
            'lg:w-80 max-h-0 overflow-hidden bg-neutral-50 mr-0 ml-auto transition-all duration-200 mt-16 rounded-3xl absolute z-20 top-0 right-0 shadow-lg dark:bg-neutral-750 dark:shadow-neutral-700',
            isUserOpen && 'max-h-80'
          )}
        >
          <div className='px-6 py-5 bg-zinc-100 rounded-t-3xl cursor-default flex items-center gap-2 dark:bg-neutral-900'>
            <UserIcon className='w-9 h-9' />
            <div>
              <h3 className='text-base font-semibold'>{user.sponsor?.name}</h3>
              <p className='text-neutral-400 text-sm font-normal'>
                {user.sponsor?.type === 'COMPANY'
                  ? fmtMsg('company')
                  : fmtMsg('individual')}
              </p>
            </div>
          </div>
          <ul className='flex flex-col px-6 py-5'>
            <NavItem type='submenu' to='profile'>
              {fmtMsg('profile')}
            </NavItem>
            <NavItem type='submenu' to='settings'>
              {fmtMsg('settings')}
            </NavItem>
            <Logout />
          </ul>
        </div>
      </div>
    </>
  );
};
