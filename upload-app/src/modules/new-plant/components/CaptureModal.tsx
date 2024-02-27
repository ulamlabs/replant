import clsx from 'clsx';
import { BackButton, Button, LoaderBox } from 'common/components';
import { CameraIcon, CheckIcon, RepeatIcon } from 'common/icons';
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
        'fixed left-0 right-0 top-[68px] bottom-0 flex justify-center bg-white dark:bg-teal-900 z-10'
      )}
    >
      <div className='w-full max-w-xl max-h-full h-full overflow-y-auto px-4 flex flex-col gap-5 justify-between'>
        <div className='flex flex-col gap-5'>
          <BackButton onClick={store.closeCapture} />
          <LoaderBox visible={store.isCameraLoading} />
          <video
            className={clsx(
              'rounded-lg',
              (store.isCameraLoading || store.tmpImage) && 'hidden'
            )}
            autoPlay
            playsInline
            ref={playerRef}
          />
          <canvas
            className={clsx(
              'rounded-lg',
              (store.isCameraLoading || !store.tmpImage) && 'hidden'
            )}
            ref={canvasRef}
            width='600'
            height='800'
          />
        </div>
        <div className='flex flex-col gap-5 pb-4'>
          {store.tmpImage ? (
            <>
              <Button
                size='lg'
                type='secondary'
                text={
                  <>
                    <RepeatIcon pathClassName='fill-bisque-400' />
                    {fmtMsg('retake')}
                  </>
                }
                onClick={() => store.setTmpImage(undefined)}
              />
              <Button
                text={
                  <>
                    <CheckIcon svgClassName='h-5 w-5' />
                    {fmtMsg('keep')}
                  </>
                }
                onClick={() => {
                  store.setImage(store.tmpImage);
                  store.closeCapture();
                }}
              />
            </>
          ) : (
            <Button
              disabled={store.isCameraLoading}
              text={
                <>
                  <CameraIcon svgClassName='h-5 w-5' />
                  {fmtMsg('capture')}
                </>
              }
              onClick={capture}
            />
          )}
        </div>
      </div>
    </div>
  );
};
