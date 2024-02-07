import { Button } from 'common/components';
import { useEffect, useRef } from 'react';

type Props = {
  onClose: () => void;
};

export const Capture: React.FC<Props> = ({ onClose }) => {
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
    if (
      !window.navigator.mediaDevices ||
      !playerRef.current ||
      !canvasRef.current
    ) {
      return;
    }

    const canvas = canvasRef.current;
    const context = canvasRef.current.getContext('2d');
    const player = playerRef.current;

    if (!context) {
      return;
    }
    context.drawImage(player, 0, 0, canvas.width, canvas.height);
    console.log(canvas.toDataURL());
  };

  useEffect(() => {
    openCamera();
    return () => {
      closeCamera();
    };
  }, [canvasRef.current, playerRef.current]);

  return (
    <div>
      <video autoPlay ref={playerRef}></video>
      <canvas ref={canvasRef} width='320' height='240'></canvas>
      <Button size='small' text='Capture' onClick={capture} />
      <Button size='small' text='Close' onClick={onClose} />
    </div>
  );
};
