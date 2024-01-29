import clsx from 'clsx';

type Props = {
  text: string;
  size: 'BIG' | 'SMALL';
  className?: string;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ text, size, className, onClick }) => {
  return (
    <button
      className={clsx(
        'rounded-full cursor-pointer font-bold',
        size === 'BIG'
          ? 'bg-bisque-400 text-xl py-2.5 w-full text-white'
          : 'border-2 border-bisque-400 text-bisque-400 text-sm px-2 py-0.5',
        className
      )}
      onClick={onClick}
    >
      {text}
    </button>
  );
};
