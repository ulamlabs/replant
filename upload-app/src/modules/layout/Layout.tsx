import replantWorldImg from 'assets/replant.png';
import clsx from 'clsx';
import { NavigationBar } from 'modules/navigation';

type Props = {
  children?: React.ReactNode;
  navigation?: boolean;
};

export const Layout: React.FC<Props> = ({ children, navigation = false }) => {
  return (
    <div className='max-w-xl mx-auto h-screen'>
      <div className='p-4'>
        <img className='h-9 invert dark:invert-0' src={replantWorldImg} />
      </div>
      <div
        className={clsx(
          navigation ? `h-[calc(100vh-148px)]` : `h-[calc(100vh-68px)]`,
          navigation ? `max-h-[calc(100vh-148px)]` : `max-h-[calc(100vh-68px)]`,
          'overflow-y-auto',
          !navigation && 'pb-4'
        )}
      >
        <div className='px-4'>{children}</div>
      </div>
      {navigation && (
        <div className='h-20 p-4'>
          <NavigationBar />
        </div>
      )}
    </div>
  );
};
