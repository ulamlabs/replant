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
          isActive && 'text-teal-500 border-b border-teal-500',
          'py-3.5 text-lg hover:text-teal-500 transition-colors'
        )
      }
      to={to}
    >
      {name}
    </NavLink>
  );
};

export default NavItem;
