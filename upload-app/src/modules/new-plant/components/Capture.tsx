import clsx from 'clsx';
import { CameraIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useNewPlantStore } from '../store';
import { CaptureModal } from './CaptureModal';

export const Capture: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const store = useNewPlantStore();

  return (
    <div>
      <span>{fmtMsg('photo')}</span>
      <div
        className={clsx(
          'border py-4 px-5 rounded-full flex justify-center items-center gap-2',
          store.imageError
            ? 'border-red-400 dark:border-red-400'
            : 'border-black dark:border-white'
        )}
        onClick={store.openCapture}
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
        <span className={'text-left text-red-400 dark:text-red-400'}>
          {store.imageError}
        </span>
      )}
      <CaptureModal />
    </div>
  );
};
