import clsx from 'clsx';
import { useFmtMsg } from 'modules/intl';

type Props = {
  offline: boolean;
  onToggleOffline: (vals: boolean) => void;
};

export const ModeSelector: React.FC<Props> = ({ offline, onToggleOffline }) => {
  const fmtMsg = useFmtMsg();

  return (
    <div className='flex gap-5 items-start'>
      <button
        className={clsx(!offline && 'border-b-2', 'border-black dark:border-white pb-1')}
        onClick={() => onToggleOffline(false)}
      >
        {fmtMsg('submitted')}
      </button>
      <button
        className={clsx(offline && 'border-b-2', 'border-black dark:border-white pb-1')}
        onClick={() => onToggleOffline(true)}
      >
        {fmtMsg('waiting')}
      </button>
    </div>
  );
};
