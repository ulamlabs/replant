import clsx from 'clsx';
import { useFmtMsg } from 'modules/intl';
import { FC } from 'react';

type Props = {
  step: number;
  steps: number;
};

export const Stepper: FC<Props> = ({ step, steps }) => {
  const fmtMsg = useFmtMsg();
  const stepsElements = [];

  for (let i = 1; i <= steps; i++) {
    const visited = i === step || i < step;

    stepsElements.push(
      <div
        key={i}
        className={clsx(
          'w-14 h-1 bg-neutral-300 rounded-sm',
          visited && 'bg-teal-500'
        )}
      />
    );
  }

  return (
    <div>
      <p className='text-neutral-400 text-sm font-normal mb-2'>
        {fmtMsg('step')} {step} {fmtMsg('of')} {steps}
      </p>
      <div className='flex gap-4'>{stepsElements}</div>
    </div>
  );
};
