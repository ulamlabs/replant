import clsx from 'clsx';
import { useFmtMsg } from 'modules/intl';
import { useOfflineStore } from 'modules/offline';

type Props = {
  offline: boolean;
  onToggleOffline: (vals: boolean) => void;
};

export const ModeSelector: React.FC<Props> = ({ offline, onToggleOffline }) => {
  const fmtMsg = useFmtMsg();

  const showBadge = useOfflineStore().totalCount > 0;

  return (
    <div className='flex gap-5 items-start'>
      <button
        className={clsx(
          !offline && 'border-b-2',
          'border-black dark:border-white pb-1'
        )}
        onClick={() => onToggleOffline(false)}
      >
        {fmtMsg('submitted')}
      </button>
      <button
        className={clsx(
          offline && 'border-b-2',
          'border-black dark:border-white pb-1 flex items-center gap-1'
        )}
        onClick={() => onToggleOffline(true)}
      >
        {showBadge && (
          <div className='w-2 h-2 bg-orange-500 rounded-lg' />
        )}
        {fmtMsg('waiting')}
      </button>
    </div>
  );
};
