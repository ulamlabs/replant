import clsx from 'clsx';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';

type Props = {
  to: string;
  name: string;
};

const NavItem: FC<Props> = ({ to, name }) => {
  return (
    <NavLink
      className={({ isActive }) =>
        clsx(
          isActive &&
            'text-teal-500 border-b border-teal-500 dark:text-emerald-600 dark:border-emerald-600',
          'py-3.5 text-lg hover:text-teal-500 dark:hover:text-emerald-600 transition-colors max-h-[52px]'
        )
      }
      to={to}
    >
      {name}
    </NavLink>
  );
};

export default NavItem;
