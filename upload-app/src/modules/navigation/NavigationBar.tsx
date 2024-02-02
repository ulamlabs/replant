import { CameraIcon, ForestIcon, HomeIcon, UserIcon } from 'common/icons';
import { NavigationButton } from './components';

export const NavigationBar: React.FC = () => {
  return (
    <div
      className={
        'w-full py-2.5 px-5 flex items-center justify-around dark:bg-teal-700 bg-teal-600 rounded-full shadow-md max-w-md'
      }
    >
      <NavigationButton Icon={HomeIcon} path='/dashboard' />
      <NavigationButton Icon={ForestIcon} path='/submissions' />
      <NavigationButton Icon={CameraIcon} path='/new-submission' />
      <NavigationButton Icon={UserIcon} path='/user' />
    </div>
  );
};
