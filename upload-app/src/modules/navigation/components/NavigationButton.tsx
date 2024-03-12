import clsx from 'clsx';
import { IconProps } from 'common/icons';
import { useMatch, useNavigate } from 'react-router-dom';

type Props = {
  Icon: React.ComponentType<IconProps>;
  path: string;
  showBadge?: boolean;
};

export const NavigationButton: React.FC<Props> = ({
  Icon,
  path,
  showBadge = false,
}) => {
  const navigate = useNavigate();

  const isActive = useMatch(path);

  return (
    <button className='relative' onClick={() => navigate(path)}>
      <Icon
        pathClassName={clsx(
          'cursor-pointer',
          isActive && 'fill-teal-900 dark:fill-bisque-400'
        )}
      />
      {showBadge && (
        <div className='w-2 h-2 bg-orange-600 rounded-lg absolute top-[-0.25rem] right-[-0.25rem]' />
      )}
    </button>
  );
};
