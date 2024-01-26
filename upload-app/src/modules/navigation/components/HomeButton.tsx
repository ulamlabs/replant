import { HomeIcon } from 'common/icons';
import clsx from 'clsx';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

export const HomeButton: React.FC<Props> = ({ isActive, onClick }) => {
  return (
    <button onClick={onClick}>
      <HomeIcon
        className={clsx('cursor-pointer', isActive && 'fill-bisque-400')}
      />
    </button>
  );
};
