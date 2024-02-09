import clsx from 'clsx';
import { Loader } from '.';

type Props = {
  className?: string;
  isLoading?: boolean;
  size: 'big' | 'small';
  text: string;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({
  className,
  isLoading = false,
  size,
  text,
  onClick,
}) => {
  return (
    <button
      className={clsx(
        'rounded-full cursor-pointer font-bold flex gap-2 items-center justify-center',
        size === 'big'
          ? 'bg-bisque-400 text-xl py-2.5 w-full text-white'
          : 'border-2 border-bisque-400 text-bisque-400 text-sm px-2 py-0.5',
        className
      )}
      onClick={onClick}
    >
      {isLoading && <Loader size={size === 'big' ? 8 : 4} />}
      {text}
    </button>
  );
};
