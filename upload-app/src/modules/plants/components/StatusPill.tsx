import clsx from 'clsx';
import { CheckIcon, CrossIcon, DocumentIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';

type Props = {
  state: 'PENDING' | 'APPROVED' | 'REJECTED';
};

export const StatusPill: React.FC<Props> = ({ state }) => {
  const fmtMsg = useFmtMsg();

  return (
    <div
      className={clsx(
        'rounded-xl py-1 px-1.5 flex items-center gap-1 w-18 justify-center text-xxs font-semibold leading-none text-white dark:text-white opacity-80',
        state === 'PENDING' && 'bg-bisque-400',
        state === 'APPROVED' && 'bg-green-400',
        state === 'REJECTED' && 'bg-red-400'
      )}
    >
      {state === 'PENDING' && (
        <>
          <DocumentIcon svgClassName='h-2 w-auto' />
          <span>{fmtMsg('pending')}</span>
        </>
      )}
      {state === 'APPROVED' && (
        <>
          <CheckIcon svgClassName='h-2 w-auto' />
          <span>{fmtMsg('approved')}</span>
        </>
      )}
      {state === 'REJECTED' && (
        <>
          <CrossIcon svgClassName='h-2 w-auto' />
          <span>{fmtMsg('rejected')}</span>
        </>
      )}
    </div>
  );
};
