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
    <div>
      {header && (
        <h5 className={'text-left text-black dark:text-white mb-1'}>
          {header}
        </h5>
      )}
      <div
        className={clsx(
          'border border-black dark:border-white dark:text-white text-black text-xs py-2.5 px-5 w-full flex gap-2 rounded-full cursor-text',
          className
        )}
      >
        {icon}
        <input
          onChange={onChange}
          value={value}
          placeholder={placeholder}
          className='text-xs text-black dark:text-white placeholder-gray-500 border-0 bg-transparent focus:outline-none w-full '
        />
      </div>
    </div>
  );
};
