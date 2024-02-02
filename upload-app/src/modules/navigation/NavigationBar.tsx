import { useMatch, useNavigate } from 'react-router-dom';
import {
  CameraButton,
  HomeButton,
  TreesButton,
  UserButton,
} from './components';

export const NavigationBar: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      className={
        'w-full py-2.5 px-5 flex items-center justify-around dark:bg-teal-700 bg-teal-600 rounded-full shadow-md max-w-md'
      }
    >
      <HomeButton
        isActive={!!useMatch('/home')}
        onClick={() => navigate('/home')}
      />
      <TreesButton
        isActive={!!useMatch('/submissions')}
        onClick={() => navigate('/submissions')}
      />
      <CameraButton
        isActive={!!useMatch('/new-submission')}
        onClick={() => navigate('/new-submission')}
      />
      <UserButton
        isActive={!!useMatch('/user')}
        onClick={() => navigate('/user')}
      />
    </div>
  );
};
