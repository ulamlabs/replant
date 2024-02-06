import clsx from 'clsx';
import { useAutocomplete } from '@mui/base/useAutocomplete';
import { LoupeIcon } from 'common/icons';
import { Species, useSpecies } from './api';
import { useFmtMsg } from 'modules/intl';

type Props = {
  error?: string;
  value?: Species;
  onChange: (value: Species) => void;
};

export const SpeciesAutocomplete: React.FC<Props> = ({
  error,
  value,
  onChange,
}) => {
  const fmtMsg = useFmtMsg();

  const { data } = useSpecies();

  const {
    getRootProps,
    getInputProps,
    getListboxProps,
    getOptionProps,
    groupedOptions,
  } = useAutocomplete({
    getOptionLabel: (option) => option.common_name,
    id: 'autocomplete',
    options: data || [],
    value,
    onChange: (_, newValue) => {
      if (newValue) {
        onChange(newValue);
      }
    },
  });

  return (
    <div className={'relative'}>
      <label
        className={'text-left text-xs text-black dark:text-white'}
        htmlFor='species'
      >
        {fmtMsg('species')}
      </label>
      <div
        {...getRootProps()}
        className={clsx(
          'border dark:text-white text-black text-xs py-4 px-5 w-full flex gap-2 rounded-full cursor-text items-center',
          error
            ? 'border-red-400 dark:border-red-400'
            : 'border-black dark:border-white'
        )}
      >
        <input
          {...getInputProps()}
          name='species'
          placeholder={fmtMsg('search')}
          className='text-xs text-black dark:text-white placeholder-black dark:placeholder-white border-0 bg-transparent focus:outline-none w-full'
        />
        <LoupeIcon pathClassName='fill-black dark:fill-white' />
      </div>
      {groupedOptions.length > 0 && (
        <ul
          {...getListboxProps()}
          className='absolute box-border p-1.5 overflow-auto rounded-xl dark:bg-teal-900 bg-white w-full border border-black dark:border-white shadow-xl max-h-40'
        >
          {data &&
            (groupedOptions as typeof data).map((option, index) => (
              <li
                {...getOptionProps({ option, index })}
                className='text-xs m-2 text-black dark:text-white'
                key={option.botanical_name}
              >
                {option.common_name}
              </li>
            ))}
        </ul>
      )}
      {error && (
        <span className={'text-left text-xs text-red-400 dark:text-red-400'}>
          {error}
        </span>
      )}
    </div>
  );
};