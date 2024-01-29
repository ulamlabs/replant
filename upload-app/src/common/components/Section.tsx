type Props = {
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

export const Section: React.FC<Props> = ({ children, actions }) => {
  return (
    <div
      className={
        'w-full h-[calc(100vh-80px)] max-w-xl relative overflow-hidden'
      }
    >
      <div className='h-full overflow-y-auto pb-20'>{children}</div>
      {actions && (
        <div className={'absolute bottom-0 w-full flex items-center'}>
          {actions}
        </div>
      )}
    </div>
  );
};
