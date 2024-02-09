import clsx from 'clsx';
import { BackButton, Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { useEffect, useRef } from 'react';
import { useNewPlantStore } from '../store';

export const CaptureModal: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);

  const store = useNewPlantStore();

  const capture = () => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const player = playerRef.current;
    if (!canvas || !player || !context) {
      return;
    }
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL('image/png');
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);
        store.setTmpImage({ image: imgData, latitude, longitude });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  useEffect(() => {
    if (!playerRef.current || !store.stream) {
      return;
    }
    playerRef.current.srcObject = store.stream;
  }, [store.stream]);

  return (
    <div
      className={clsx(
        !store.isCaptureModalOpen && 'hidden',
        'fixed left-0 right-0 top-14 bottom-0 pb-5 pt-2.5 px-5 flex justify-center bg-white dark:bg-teal-900 z-10'
      )}
    >
      <div className='w-full max-w-xl flex flex-col gap-5 justify-between'>
        <div className='flex flex-col gap-5'>
          <BackButton onClick={store.closeCapture} />
          <video
            className={clsx('rounded-lg', store.tmpImage && 'hidden')}
            autoPlay
            ref={playerRef}
          />
          <canvas
            className={clsx('rounded-lg', !store.tmpImage && 'hidden')}
            ref={canvasRef}
            width='600'
            height='800'
          />
        </div>
        <div className='flex flex-col gap-5'>
          {store.tmpImage ? (
            <>
              <Button
                size='lg'
                type='secondary'
                text={fmtMsg('retake')}
                onClick={() => store.setTmpImage(undefined)}
              />
              <Button
                text={fmtMsg('keep')}
                onClick={() => {
                  store.setImage(store.tmpImage);
                  store.closeCapture();
                }}
              />
            </>
          ) : (
            <Button text={fmtMsg('capture')} onClick={capture} />
          )}
        </div>
      </div>
    </div>
  );
};
