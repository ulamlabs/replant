import { TreesIcon } from 'common/icons';
import clsx from 'clsx';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

export const TreesButton: React.FC<Props> = ({ isActive, onClick }) => {
  return (
    <button onClick={onClick}>
      <TreesIcon
        className={clsx('cursor-pointer', isActive && 'stroke-bisque-400')}
      />
    </button>
  );
};
