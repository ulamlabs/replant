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
            'lg:text-teal-500 lg:border-b lg:border-teal-500 lg:dark:text-emerald-600 lg:dark:border-emerald-600',
          'h-12 flex items-center py-3.5 text-2xl font-normal transition-colors lg:text-lg',
          type === 'submenu'
            ? 'hover:bg-zinc-100 text-base lg:!text-base rounded-2xl px-6 py-4 lg:h-16 dark:hover:bg-neutral-700 justify-end'
            : 'lg:hover:text-teal-500 lg:dark:hover:text-emerald-600 lg:max-h-14',
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
