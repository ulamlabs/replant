import { UserIcon } from 'common/icons';
import clsx from 'clsx';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

export const UserButton: React.FC<Props> = ({ isActive, onClick }) => {
  return (
    <button onClick={onClick}>
      <UserIcon
        pathClassName={clsx('cursor-pointer', isActive && 'fill-bisque-400')}
      />
    </button>
  );
};
