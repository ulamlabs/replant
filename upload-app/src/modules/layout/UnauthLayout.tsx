import replantWorldImg from 'assets/replant.png';

type Props = {
  children?: React.ReactNode;
};

export const UnauthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={'w-screen h-screen'}>
      <div className={'py-2.5 px-5 flex items-center justify-between'}>
        <img className='h-9 invert dark:invert-0' src={replantWorldImg} />
      </div>
      <div className={'py-2.5 px-5 w-screen flex items-center justify-center'}>
        {children}
      </div>
    </div>
  );
};
