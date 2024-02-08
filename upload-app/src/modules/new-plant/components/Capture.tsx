import { BackButton, Button } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { useEffect, useRef } from 'react';

type Props = {
  onCancel: () => void;
  onCapture: (image: Blob, position: GeolocationPosition) => void;
};

export const Capture: React.FC<Props> = ({ onCancel, onCapture }) => {
  const fmtMsg = useFmtMsg();

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const playerRef = useRef<HTMLVideoElement>(null);

  const openCamera = async () => {
    if (
      !window.navigator.mediaDevices ||
      !playerRef.current ||
      !canvasRef.current
    ) {
      return;
    }

    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: true,
    });

    playerRef.current.srcObject = stream;
  };

  // fix this!!
  const closeCamera = () => {
    if (!playerRef.current?.srcObject) {
      return;
    }
    const stream = playerRef.current.srcObject as MediaStream;
    stream.getVideoTracks().forEach((track) => track.stop());
  };

  const capture = () => {
    const canvas = canvasRef.current;
    const player = playerRef.current;

    if (!window.navigator.mediaDevices || !canvas || !player) {
      return;
    }

    const context = canvasRef.current.getContext('2d');

    if (!context) {
      return;
    }

    context.drawImage(player, 0, 0, canvas.width, canvas.height);

    canvas.toBlob((blob) => {
      if (!blob) {
        return;
      }
      window.navigator.geolocation.getCurrentPosition(
        (position) => {
          onCapture(blob, position);
        },
        (error) => {
          console.log(error);
        }
      );
    }, 'image/png');
  };

  useEffect(() => {
    openCamera();
    return () => {
      closeCamera();
    };
  }, [canvasRef.current, playerRef.current]);

  return (
    <div className='fixed left-0 right-0 top-14 bottom-0 flex justify-center bg-white dark:bg-teal-900 z-10'>
      <div className='max-w-xl py-2.5 px-5 flex flex-col gap-5 justify-between'>
        <div className='flex flex-col gap-5'>
          <BackButton onClick={onCancel} />
          <video className='rounded-lg' autoPlay ref={playerRef} />
          <canvas className='hidden' ref={canvasRef} width='800' height='600' />
        </div>
        <Button size='big' text={fmtMsg('capture')} onClick={capture} />
      </div>
    </div>
  );
};
