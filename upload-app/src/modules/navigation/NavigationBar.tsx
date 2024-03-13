import { CameraIcon, ForestIcon, HomeIcon, UserIcon } from 'common/icons';
import { useOfflineStore } from 'modules/offline';
import { NavigationButton } from './components';

export const NavigationBar: React.FC = () => {
  const offlineStore = useOfflineStore();

  return (
    <div
      className={
        'w-full h-12 py-2.5 px-5 flex items-center justify-around dark:bg-teal-700 bg-teal-600 rounded-full shadow-md'
      }
    >
      <NavigationButton Icon={HomeIcon} path='/dashboard' />
      <NavigationButton
        Icon={ForestIcon}
        path='/submissions'
        showBadge={offlineStore.totalCount > 0}
      />
      <NavigationButton Icon={CameraIcon} path='/new-plant' />
      <NavigationButton Icon={UserIcon} path='/user' />
    </div>
  );
};
