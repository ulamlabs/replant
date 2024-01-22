import clsx from 'clsx';

type Props = {
  header?: string;
  placeholder: string;
  value?: string;
  icon: React.ReactNode;
  className?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<Props> = ({
  header,
  placeholder,
  value,
  icon,
  className,
  onChange,
}) => {
  return (
    <>
      <div className={clsx(header && 'text-xs text-left text-black')}>
        {header}
      </div>
      <div
        className={clsx(
          'rounded-md cursor-text border border-black text-xs p-2.5 w-full',
          className
        )}
      >
        {icon}
        <input
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className='text-xs'
        />
      </div>
    </>
  );
};
