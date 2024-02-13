import { useQuery } from '@tanstack/react-query';
import { OrganizationSearchBox } from 'common/components/OrganizationSearchBox';
import { OrganizationSummary } from 'common/components/OrganizationSummary';
import { Pagination } from 'common/components/Pagination';
import { PlantsGrid } from 'common/components/PlantsGrid';
import { ReplantLogo } from 'common/components/ReplantLogo';
import { listPlants } from 'fixtures';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';

export function Gallery() {
  const fmtMsg = useFmtMsg();
  const [offset, setOffset] = useState(0);
  const [organization, setOrganization] = useState<string>('');

  const { data: plants } = useQuery({
    queryKey: ['plants', offset, organization],
    queryFn: () => listPlants({ offset, organization }),
  });

  function onSearch(organization: string) {
    setOrganization(organization);
    setOffset(0);
  }

  return (
    <div className='p-2 pb-12 lg:px-20 lg:py-12 flex flex-col gap-10'>
      <div className='flex justify-between gap-10'>
        <ReplantLogo />
        <OrganizationSearchBox onSearch={onSearch} />
      </div>

      <div className='text-3xl text-center font-light'>
        {fmtMsg('replantWorldsProofOfPlantingNftGallery')}
      </div>

      {organization && <OrganizationSummary organization={organization} />}

      {plants && (
        <>
          <div>
            {organization && (
              <h3 className='text-xl font-bold mb-4'>
                {fmtMsg('sponsoredTrees')}
              </h3>
            )}
            <PlantsGrid plants={plants?.results} />
          </div>
          <div className='flex justify-center'>
            <Pagination
              paginated={plants}
              onPaginated={(paginate) => setOffset(paginate.offset)}
            />
          </div>
        </>
      )}
    </div>
  );
}
