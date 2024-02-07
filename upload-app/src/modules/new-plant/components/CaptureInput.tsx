import clsx from 'clsx';
import { CameraIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';
import { useNewPlantStore } from '../store';
import { Capture } from './Capture';

export const CaputureInput: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const store = useNewPlantStore();

  const [isCameraOpen, setIsCameraOpen] = useState(false);

  return (
    <div>
      <span className='text-xs'>{fmtMsg('photo')}</span>
      <div
        className={clsx(
          'border py-4 px-5 rounded-full flex justify-center items-center gap-2',
          store.imageError
            ? 'border-red-400 dark:border-red-400'
            : 'border-black dark:border-white'
        )}
        onClick={() => {
          setIsCameraOpen(true);
        }}
      >
        <CameraIcon
          svgClassName='size-6'
          pathClassName='fill-black dark:fill-white'
        />
        <span className='font-bold'>
          {store.image ? fmtMsg('changePhoto') : fmtMsg('capturePhoto')}
        </span>
      </div>
      {store.imageError && (
        <span className={'text-left text-xs text-red-400 dark:text-red-400'}>
          {store.imageError}
        </span>
      )}
      {isCameraOpen && (
        <Capture
          onCancel={() => {
            setIsCameraOpen(false);
          }}
          onCapture={(image) => {
            store.setImage(image);
            setIsCameraOpen(false);
          }}
        />
      )}
    </div>
  );
};
