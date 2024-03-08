import clsx from 'clsx';
import { BackButton, Button, LoaderBox, Section } from 'common/components';
import { CameraIcon, CheckIcon, RepeatIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { Layout } from 'modules/layout';
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
    const capturedAt = new Date().toISOString();
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    const imgData = canvas.toDataURL('image/png');
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);
        store.setTmpImage({
          capturedAt,
          image: imgData,
          latitude,
          longitude,
        });
      },
      (error) => {
        console.log(error);
      },
      {
        timeout: 5000,
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
        'fixed left-0 right-0 top-0 bottom-0 bg-white dark:bg-teal-900 z-10'
      )}
    >
      <Layout>
        <Section
          actions={
            <div className='space-y-4'>
              {store.tmpImage ? (
                <>
                  <Button
                    Icon={RepeatIcon}
                    size='lg'
                    type='secondary'
                    onClick={() => store.setTmpImage(undefined)}
                  >
                    {fmtMsg('retake')}
                  </Button>
                  <Button
                    Icon={CheckIcon}
                    onClick={() => {
                      store.setImage(store.tmpImage);
                      store.closeCapture();
                    }}
                  >
                    {fmtMsg('keep')}
                  </Button>
                </>
              ) : (
                <Button
                  Icon={CameraIcon}
                  disabled={store.isCameraLoading}
                  onClick={capture}
                >
                  {fmtMsg('capture')}
                </Button>
              )}
            </div>
          }
        >
          <div className='flex flex-col gap-4'>
            <BackButton onClick={store.closeCapture} />
            <LoaderBox visible={store.isCameraLoading} />
            <video
              className={clsx(
                'rounded-lg',
                (store.isCameraLoading || store.tmpImage) && 'hidden',
                'w-full'
              )}
              autoPlay
              playsInline
              ref={playerRef}
            />
            <canvas
              className={clsx(
                'rounded-lg w-full',
                (store.isCameraLoading || !store.tmpImage) && 'hidden'
              )}
              ref={canvasRef}
              width='600'
              height='800'
            />
          </div>
        </Section>
      </Layout>
    </div>
  );
};
