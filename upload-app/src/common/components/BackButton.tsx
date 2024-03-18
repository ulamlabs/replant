import { ArrowLeftIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';

type Props = {
  onClick: () => void;
};

export const BackButton: React.FC<Props> = ({ onClick }) => {
  const fmtMsg = useFmtMsg();
  return (
    <button
      className={
        'flex gap-2 items-center text-black dark:text-white cursor-pointer'
      }
      onClick={onClick}
    >
      <ArrowLeftIcon pathClassName='dark:fill-white fill-black' />
      {fmtMsg('back')}
    </button>
  );
};
