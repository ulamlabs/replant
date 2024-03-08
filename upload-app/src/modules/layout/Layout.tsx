import replantWorldImg from 'assets/replant.png';
import clsx from 'clsx';
import { NavigationBar } from 'modules/navigation';

type Props = {
  children?: React.ReactNode;
  navigation?: boolean;
};

export const Layout: React.FC<Props> = ({ children, navigation = false }) => {
  return (
    <div className='max-w-xl mx-auto h-dvh'>
      <div className='p-4'>
        <img className='h-9 invert dark:invert-0' src={replantWorldImg} />
      </div>
      <div
        className={clsx(
          navigation ? `h-[calc(100dvh-148px)]` : `h-[calc(100dvh-84px)]`,
          navigation
            ? `max-h-[calc(100dvh-148px)]`
            : `max-h-[calc(100dvh-84px)]`,
          'overflow-y-auto'
        )}
      >
        <div className='px-4 h-full min-h-full max-h-full'>{children}</div>
      </div>
      {navigation ? (
        <div className='h-20 p-4'>
          <NavigationBar />
        </div>
      ) : (
        <div className='h-4' />
      )}
    </div>
  );
};
