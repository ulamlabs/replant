import { AparatIcon } from 'common/icons/AparatIcon';
import { UserIcon } from 'common/icons/UserIcon';
import { HomeIcon } from 'common/icons/HomeIcon';
import { TreesIcon } from 'common/icons/TreesIcon';
import { useMatch, useNavigate } from 'react-router-dom';

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={
        'w-full py-2.5 px-5 flex items-center justify-around dark:bg-teal-700 bg-teal-600 rounded-full shadow-md'
      }
    >
      <HomeIcon
        isActive={!!useMatch('/home')}
        onClick={() => navigate('/home')}
      />
      <TreesIcon
        isActive={!!useMatch('/trees')}
        onClick={() => navigate('/trees')}
      />
      <AparatIcon
        isActive={!!useMatch('/add-tree')}
        onClick={() => navigate('/add-tree')}
      />
      <UserIcon
        isActive={!!useMatch('/user')}
        onClick={() => navigate('/user')}
      />
    </div>
  );
};
