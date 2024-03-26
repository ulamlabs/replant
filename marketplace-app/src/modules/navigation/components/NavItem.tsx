import clsx from 'clsx';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  children: string | JSX.Element;
  className?: string;
  type?: 'menu' | 'submenu';
};

const NavItem: FC<Props> = ({ to, children, className, type = 'menu' }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(
          isActive &&
            type === 'menu' &&
            'md:text-teal-500 md:border-b md:border-teal-500 md:dark:text-emerald-600 md:dark:border-emerald-600',
          'h-[47px] flex items-center py-3.5 text-2xl font-medium  transition-colors  md:text-lg',
          type === 'submenu'
            ? ' hover:bg-zinc-100 rounded-2xl px-6 py-4 md:h-[62px] dark:hover:bg-neutral-700'
            : ' md:hover:text-teal-500 md:dark:hover:text-emerald-600 md:max-h-[52px]',
          className
        )
      }
      to={to}
    >
      {children}
    </NavLink>
  );
};

export default NavItem;
