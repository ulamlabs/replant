import { Button, UsersListItem } from 'common/components';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { Planter, SponsorDetails } from 'types';

type Props = {
  data: SponsorDetails[] | Planter[];
  type: 'sponsors' | 'planters';
};

export const UsersList: FC<Props> = ({ data, type }) => {
  const navigate = useNavigate();

  return (
    <div className='xl:w-1/2'>
      <div className='flex justify-between items-center mb-10'>
        <h2 className='text-4xl font-bold'>
          {type === 'sponsors' ? 'Top sponsors' : 'Top planters'}
        </h2>
        <Button type='secondary' onClick={() => navigate(type)}>
          View all
        </Button>
      </div>
      <ul className='flex flex-col gap-5'>
        {data.map((test, index) => (
          <UsersListItem
            key={test.id}
            type={type}
            data={test}
            index={index + 1}
          />
        ))}
      </ul>
    </div>
  );
};
