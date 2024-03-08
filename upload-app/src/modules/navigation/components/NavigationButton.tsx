import clsx from 'clsx';
import { IconProps } from 'common/icons';
import { useNavigate, useMatch } from 'react-router-dom';

type Props = {
  Icon: React.ComponentType<IconProps>;
  path: string;
};

export const NavigationButton: React.FC<Props> = ({ Icon, path }) => {
  const navigate = useNavigate();

  const isActive = useMatch(path);

  return (
    <button onClick={() => navigate(path)}>
      <Icon
        pathClassName={clsx(
          'cursor-pointer',
          isActive && 'fill-teal-900 dark:fill-bisque-400'
        )}
      />
    </button>
  );
};
