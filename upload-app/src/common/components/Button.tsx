import clsx from 'clsx';
import { Loader } from '.';

type Props = {
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  isLoading?: boolean;
  size?: 'lg' | 'md' | 'sm';
  type?: 'primary' | 'secondary';
  onClick: () => void;
};

export const Button: React.FC<Props> = ({
  children,
  className,
  disabled = false,
  isLoading = false,
  size = 'lg',
  type = 'primary',
  onClick,
}) => {
  return (
    <button
      className={clsx(
        'rounded-full cursor-pointer font-bold flex items-center justify-center',
        size === 'lg'
          ? 'text-xl py-2.5 w-full gap-2'
          : size === 'md'
          ? 'text-base px-3 py-1.5 gap-1'
          : 'text-sm px-2 py-0.5 gap-1',
        type === 'primary'
          ? 'bg-bisque-400 text-white'
          : 'border-2 border-bisque-400 text-bisque-400',
        className
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {isLoading && <Loader size={size === 'lg' ? 8 : size === 'md' ? 6 : 4} />}
      {children}
    </button>
  );
};
