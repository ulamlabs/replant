import { BeatLoader } from 'react-spinners';

export type LoaderProps = { size?: number; color?: string };

// base for more complex loader components
export const Loader: React.FC<LoaderProps> = ({ size = 10 }) => (
  <BeatLoader size={size} speedMultiplier={0.5} color={'#808080'} />
);

type Props = LoaderProps & {
  height?: string;
  margin?: string;
  width?: string;
};

export const LoaderBox: React.FC<Props> = ({
  height = '200px',
  margin = '0',
  width = '100%',
  ...loaderProps
}) => {
  return (
    <div
      style={{ height, margin, width }}
      className='flex items-center justify-center'
    >
      <Loader {...loaderProps} />
    </div>
  );
};
