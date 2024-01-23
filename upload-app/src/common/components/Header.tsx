import clsx from 'clsx';
import { ArrowLeftIcon } from '../icons/ArrowLeftIcon';
import { useFmtMsg } from '../../modules/intl';

type Props = {
  text: string;
  onBack?: () => void;
};

export const Header: React.FC<Props> = ({ text, onBack }) => {
  const formatMessage = useFmtMsg();

  return (
    <div>
      <div
        className={clsx(
          onBack &&
            'mb-5 flex gap-2 items-center text-black dark:text-white cursor-pointer',
          !onBack && 'hidden'
        )}
        onClick={onBack}
      >
        <ArrowLeftIcon />
        {formatMessage('back')}
      </div>
      <div
        className={clsx(
          'text-black dark:text-white text-center text-2xl font-bold'
        )}
      >
        {text}
      </div>
    </div>
  );
};
