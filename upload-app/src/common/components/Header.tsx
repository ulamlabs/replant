import clsx from 'clsx';
import { ArrowLeftIcon } from 'common/icons/ArrowLeftIcon';
import { useFmtMsg } from 'modules/intl';

type Props = {
  text: string;
  onBack?: () => void;
};

export const Header: React.FC<Props> = ({ text, onBack }) => {
  const fmtMsg = useFmtMsg();

  return (
    <header>
      <button
        className={clsx(
          onBack &&
            'mb-5 flex gap-2 items-center text-black dark:text-white cursor-pointer',
          !onBack && 'hidden'
        )}
        onClick={onBack}
      >
        <ArrowLeftIcon />
        {fmtMsg('back')}
      </button>
      <h2 className={'text-black dark:text-white text-center'}>{text}</h2>
    </header>
  );
};
