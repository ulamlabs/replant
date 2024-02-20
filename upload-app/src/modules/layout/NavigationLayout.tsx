import replantWorldImg from 'assets/replant.png';

type Props = {
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

export const NavigationLayout: React.FC<Props> = ({ children, actions }) => {
  return (
    <div className={'w-screen h-full'}>
      <div className={'py-2.5 px-5'}>
        <img className='h-9 invert dark:invert-0' src={replantWorldImg} />
      </div>
      <div className={'py-2.5 px-5'}>{children}</div>
      {actions && (
        <div
          className={
            'fixed bottom-5 px-5 w-screen flex items-center justify-center'
          }
        >
          {actions}
        </div>
      )}
    </div>
  );
};
