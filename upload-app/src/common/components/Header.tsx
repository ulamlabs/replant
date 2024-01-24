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
      {onBack && (
        <button
          className={
            'mb-5 flex gap-2 items-center text-black dark:text-white cursor-pointer'
          }
          onClick={onBack}
        >
          <ArrowLeftIcon />
          {fmtMsg('back')}
        </button>
      )}
      <h2
        className={'text-black dark:text-white text-center text-2xl font-bold'}
      >
        {text}
      </h2>
    </header>
  );
};
