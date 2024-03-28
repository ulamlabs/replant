import clsx from 'clsx';
import { UserIcon } from 'common/components/icons/UserIcon';
import { useFmtMsg } from 'modules/intl';
import NavItem from 'modules/navigation/components/NavItem';
import { FC, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserType } from '.';

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
          <UserIcon overrideColors className='w-9 h-9 fill-neutral-400' />
        </div>
        <div>
          <h3 className='text-sm font-semibold'>
            {user?.username || 'Test testowy'}
          </h3>
          <p className='text-neutral-400 text-xs font-normal'>Individual</p>
        </div>
      </div>

      <div
        className={
          'w-12 h-12 relative rounded-full hidden lg:flex items-center bg-neutral-50 justify-center cursor-pointer z-20'
        }
      >
        <div
          onClick={() => setIsUserOpen((prev) => !prev)}
          className='w-full h-full flex justify-center items-center'
        >
          <UserIcon overrideColors className='w-9 h-9 fill-neutral-400' />
        </div>
        <div
          className={clsx(
            'lg:w-80 max-h-0 overflow-hidden bg-neutral-50 mr-0 ml-auto transition-all duration-200 mt-[70px] rounded-3xl absolute z-20 top-0 right-0 shadow-lg dark:bg-neutral-750 dark:shadow-neutral-700',
            isUserOpen && 'max-h-80'
          )}
        >
          <div className='h-20 px-6 py-5 bg-zinc-100 rounded-t-3xl cursor-default flex items-center gap-2 dark:bg-neutral-900'>
            <UserIcon overrideColors className='w-9 h-9 fill-neutral-400' />
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
    </>
  );
};
