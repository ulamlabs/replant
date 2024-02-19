import { ReplantWorldIcon } from 'common/icons';

type Props = {
  children?: React.ReactNode;
};

export const UnauthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={'w-screen h-screen'}>
      <div className={'py-2.5 px-5 flex items-center justify-between'}>
        <ReplantWorldIcon className='dark:fill-white fill-black' />
      </div>
      <div className={'py-2.5 px-5 w-screen flex items-center justify-center'}>
        {children}
      </div>
    </div>
  );
};
