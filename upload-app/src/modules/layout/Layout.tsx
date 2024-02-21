import replantWorldImg from 'assets/replant.png';
import { NavigationBar } from 'modules/navigation';

type Props = {
  children?: React.ReactNode;
};

export const Layout: React.FC<Props> = ({ children }) => {
  return (
    <div className='max-w-xl mx-auto h-screen'>
      <div className='p-4'>
        <img className='h-9 invert dark:invert-0' src={replantWorldImg} />
      </div>
      <div className='h-[calc(100vh-180px)] max-h-[calc(100vh-180px)] overflow-y-auto'>
        <div className='px-4'>{children}</div>
      </div>
      <div className='h-28 p-4'>
        <NavigationBar />
      </div>
    </div>
  );
};
