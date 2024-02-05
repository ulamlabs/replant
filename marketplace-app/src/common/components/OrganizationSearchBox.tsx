import { useState } from 'react';
import { IconSearch } from './icons/IconSearch';
import { useQuery } from '@tanstack/react-query';
import { searchOrganization } from 'fixtures';
import { useClickAway, useDebounce } from '@uidotdev/usehooks';
import { Menu } from './Menu';
import { MenuItem } from './MenuItem';
import { IconX } from './icons/IconX';

type OrganizationSearchBoxProps = {
  onSearch: (organizationName: string) => void;
};

export function OrganizationSearchBox(props: OrganizationSearchBoxProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [focused, setFocused] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);
  const ref = useClickAway(() => setFocused(false));

  const { data: organizations } = useQuery({
    queryKey: ['organizations', debouncedSearchTerm],
    queryFn: () => searchOrganization(debouncedSearchTerm),
    enabled: focused,
  });

  function select(org: string) {
    setSearchTerm(org);
    setFocused(false);
    props.onSearch(org);
  }

  function onChange(value: string) {
    setSearchTerm(value);
    props.onSearch('');
  }

  return (
    <div
      className='relative w-72 bg-gray-200 dark:bg-teal-700 rounded-xl flex items-center justify-end pr-3 h-14'
      ref={ref}
    >
      <input
        type='text'
        placeholder='Search'
        className='px-6 py-2 absolute left-0 top-0 w-full h-full bg-transparent rounded-xl pr-10'
        value={searchTerm}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
      />
      <div className='flex max-w-4 z-10' onClick={() => onChange('')}>
        {searchTerm ? <IconX className='cursor-pointer' /> : <IconSearch />}
      </div>

      {focused && organizations?.length ? (
        <Menu>
          {organizations.map((org) => (
            <MenuItem value={org} onSelect={() => select(org)} key={org}>
              {org}
            </MenuItem>
          ))}
        </Menu>
      ) : null}
    </div>
  );
}
