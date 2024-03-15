import clsx from 'clsx';
import {
  BackButton,
  Button,
  Loader,
  LoaderBox,
  Section,
} from 'common/components';
import { CameraIcon, CheckIcon, LocationIcon, RepeatIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { Layout } from 'modules/layout';
import { openSnackbar } from 'modules/snackbar';
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
    const captured_at = new Date().toISOString();
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/png');
    store.setIsGettingLocation(true);
    window.navigator.geolocation.getCurrentPosition(
      (position) => {
        store.setIsGettingLocation(false);
        const latitude = position.coords.latitude.toFixed(6);
        const longitude = position.coords.longitude.toFixed(6);
        store.setTmpImage({
          captured_at,
          image,
          latitude,
          longitude,
        });
      },
      (error) => {
        store.setIsGettingLocation(false);
        openSnackbar(
          fmtMsg('failedToGetLocation', { error: error.message }),
          'error'
        );
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
            {store.isGettingLocation && (
              <div className='flex gap-4 items-center justify-center'>
                <LocationIcon svgClassName='w-6 h-6' />
                <Loader />
              </div>
            )}
          </div>
        </Section>
      </Layout>
    </div>
  );
};
