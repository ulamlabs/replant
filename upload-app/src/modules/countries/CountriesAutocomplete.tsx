import clsx from 'clsx';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { ArrowDownIcon } from 'common/icons';
import { Country } from './api';

type Props = {
  label?: string;
  placeholder: string;
  icon: React.ReactNode;
  options: Country[];
  value?: Country;
  onChange: (val: Country) => void;
  error?: string;
  className?: string;
};

export const CountriesAutocomplete: React.FC<Props> = ({
  label,
  placeholder,
  icon,
  options,
  value,
  className,
  onChange,
  error,
}) => {
  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    getOptionLabel: (option) => option.name,
    id: 'autocomplete',
    options,
    value,
    onChange: (_, newValue) => {
      if (newValue) {
        onChange(newValue);
      }
    },
  });

  return (
    <div className={clsx('relative', className)}>
      {label && (
        <label className={'text-left text-xs text-black dark:text-white'}>
          {label}
        </label>
      )}
      <div
        {...getRootProps()}
        className={clsx(
          'border border-black dark:border-white dark:text-white text-black text-xs py-2.5 px-5 w-full flex gap-2 rounded-full cursor-text items-center',
          error && 'border-red-400 dark:border-red-400'
        )}
      >
        {icon}
        <input
          {...getInputProps()}
          placeholder={placeholder}
          className='text-xs text-black dark:text-white placeholder-gray-500 border-0 bg-transparent focus:outline-none w-full'
        />
        <ArrowDownIcon
          svgClassName={clsx(!!groupedOptions.length && 'rotate-180')}
        />
      </div>
      {groupedOptions.length > 0 && (
        <ul
          {...getListboxProps()}
          className='absolute box-border p-1.5 overflow-auto rounded-xl dark:bg-teal-900 bg-white w-full border border-black dark:border-white shadow-xl max-h-40'
        >
          {options &&
            (groupedOptions as typeof options).map((option, index) => (
              <li
                {...getOptionProps({ option, index })}
                className='text-xs m-2 text-black dark:text-white'
                key={option.id}
              >
                {option.name}
              </li>
            ))}
        </ul>
      )}
      {error && (
        <label className={'text-left text-xs text-red-400 dark:text-red-400'}>
          {error}
        </label>
      )}
    </div>
  );
};