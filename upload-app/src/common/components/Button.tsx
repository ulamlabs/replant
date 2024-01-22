import clsx from 'clsx';

type Props = {
  text: string;
  size: 'BIG' | 'SMALL';
  className?: string;
  onClick: () => void;
};

export const Button: React.FC<Props> = ({ text, size, className, onClick }) => {
  return (
    <div
      className={clsx(
        'rounded-full cursor-pointer font-bold',
        size === 'BIG'
          ? 'bg-brown-400 text-xl py-2.5 w-full'
          : 'border-2 border-brown-400 text-brown-400 text-sm py-0.5',
        className
      )}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
