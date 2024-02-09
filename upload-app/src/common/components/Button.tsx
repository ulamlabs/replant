import clsx from 'clsx';
import { Loader } from '.';

type Props = {
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  size?: 'lg' | 'sm';
  text: string;
  type?: 'primary' | 'secondary';
  onClick: () => void;
};

export const Button: React.FC<Props> = ({
  className,
  disabled = false,
  isLoading = false,
  size = 'lg',
  text,
  type = 'primary',
  onClick,
}) => {
  return (
    <button
      className={clsx(
        'rounded-full cursor-pointer font-bold flex gap-2 items-center justify-center',
        size === 'lg' ? 'text-xl py-2.5 w-full ' : 'text-sm px-2 py-0.5',
        type === 'primary'
          ? 'bg-bisque-400 text-white'
          : 'border-2 border-bisque-400 text-bisque-400',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && <Loader size={size === 'lg' ? 8 : 4} />}
      {text}
    </button>
  );
};
