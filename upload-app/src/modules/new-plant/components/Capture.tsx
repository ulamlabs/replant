import { Button } from 'common/components';
import { useEffect, useRef } from 'react';

type Props = {
  onCancel: () => void;
  onCapture: (image: Blob, position: GeolocationPosition) => void;
};

export const Capture: React.FC<Props> = ({ onCancel, onCapture }) => {
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
    <div>
      <video autoPlay ref={playerRef} />
      <canvas className='hidden' ref={canvasRef} width='800' height='600' />
      <Button size='small' text='Capture' onClick={capture} />
      <Button size='small' text='Close' onClick={onCancel} />
    </div>
  );
};
