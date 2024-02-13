import clsx from 'clsx';

type Props = {
  children?: React.ReactNode;
  actions?: React.ReactNode;
  className?: string;
};

export const Section: React.FC<Props> = ({ children, actions, className }) => {
  return (
    <div
      className={clsx(
        'w-full h-[calc(100vh-86px)] relative overflow-hidden',
        className
      )}
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
