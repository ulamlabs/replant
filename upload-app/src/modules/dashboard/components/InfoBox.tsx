import clsx from 'clsx';
import { Loader } from 'common/components';

type Props = {
  className: string;
  icon: React.ReactNode;
  isLoading: boolean;
  title: string;
  value?: string;
};

export const InfoBox: React.FC<Props> = ({
  className,
  icon,
  isLoading,
  title,
  value,
}) => {
  return (
    <div
      className={clsx(
        'px-5 py-2.5 rounded-xl flex justify-between opacity-80',
        className
      )}
    >
      <div className='flex flex-col'>
        <span className='text-xs font-semibold text-white dark:text-white'>
          {title}
        </span>
        <span className='text-3xl font-medium text-white dark:text-white'>
          {isLoading ? <Loader /> : value}
        </span>
      </div>
      <div className='opacity-50'>{icon}</div>
    </div>
  );
};
