import clsx from 'clsx';
import { IconX } from 'common/components/icons/IconX';
import { FC, useEffect, useState } from 'react';
import { Severity } from './types';

type Props = {
  message: string;
  title?: string;
  severity: Severity;
  hideAfter: number;
  onClose: () => void;
};

export const Snackbar: FC<Props> = ({
  message,
  severity,
  title,
  onClose,
  hideAfter,
}) => {
  const [transition, setTransition] = useState(false);

  useEffect(() => {
    setTransition(true);

    const closeTimer = setTimeout(() => {
      onClose();
    }, hideAfter);

    const transitionTimer = setTimeout(() => {
      setTransition(false);
    }, hideAfter - 300);

    return () => {
      clearTimeout(closeTimer);
      clearTimeout(transitionTimer);
    };
  }, [onClose, hideAfter]);

  const closeSnackbar = () => {
    setTransition(false);
    setTimeout(onClose, 300);
  };

  return (
    <div
      className={clsx(
        'rounded-3xl shadow px-8 py-6 w-96 gap-4 flex flex-col relative -translate-x-full transition-transform duration-300 ease-in-out',
        transition && 'translate-x-0',
        severity === 'error' && 'bg-red-50 text-red-400',
        severity === 'warning' && 'bg-yellow-50 text-yellow-800',
        severity === 'info' && 'bg-sky-100 text-sky-600',
        severity === 'success' && 'bg-green-100 text-green-600'
      )}
    >
      {title && <h3 className='text-base font-bold pr-4'>{title}</h3>}
      <p className={clsx('text-sm font-normal', !title && 'pr-4')}>{message}</p>
      <div
        onClick={closeSnackbar}
        className={clsx(
          'hover:opacity-60 cursor-pointer absolute right-8',
          !title && 'top-1/2 -translate-y-1/2'
        )}
      >
        <IconX
          className={clsx(
            'w-3 h-3',
            severity === 'error' && 'fill-red-400',
            severity === 'warning' && 'fill-yellow-800',
            severity === 'info' && 'fill-sky-600',
            severity === 'success' && 'fill-green-600'
          )}
          overrideColors
        />
      </div>
    </div>
  );
};
