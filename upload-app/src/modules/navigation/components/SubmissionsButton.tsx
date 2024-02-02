import { ForestIcon } from 'common/icons';
import clsx from 'clsx';

type Props = {
  isActive: boolean;
  onClick: () => void;
};

export const SubmissionsButton: React.FC<Props> = ({ isActive, onClick }) => {
  return (
    <button onClick={onClick}>
      <ForestIcon
        className={clsx(
          'cursor-pointer',
          isActive && 'fill-teal-900 dark:fill-bisque-400'
        )}
      />
    </button>
  );
};
