import clsx from 'clsx';
import { CheckIcon, CrossIcon, DocumentIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { ReviewState } from '../types';

type Props = {
  state: ReviewState;
};

export const ReviewStatePill: React.FC<Props> = ({ state }) => {
  const fmtMsg = useFmtMsg();

  return (
    <div
      className={clsx(
        'rounded-xl py-1 px-1.5 flex items-center gap-1 text-sm font-semibold leading-none text-white dark:text-white opacity-80',
        state === 'PENDING' && 'bg-bisque-400',
        state === 'APPROVED' && 'bg-green-400',
        state === 'REJECTED' && 'bg-red-400'
      )}
    >
      {state === 'PENDING' && (
        <>
          <DocumentIcon svgClassName='h-3 w-auto' />
          <span>{fmtMsg('pending')}</span>
        </>
      )}
      {state === 'APPROVED' && (
        <>
          <CheckIcon svgClassName='h-3 w-auto' />
          <span>{fmtMsg('approved')}</span>
        </>
      )}
      {state === 'REJECTED' && (
        <>
          <CrossIcon svgClassName='h-3 w-auto' />
          <span>{fmtMsg('rejected')}</span>
        </>
      )}
    </div>
  );
};
