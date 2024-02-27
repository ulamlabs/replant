import { useQuery } from '@tanstack/react-query';
import { Pagination } from 'common/components/Pagination';
import { TreesGrid } from 'common/components/TreesGrid';
import { ReplantLogo } from 'common/components/ReplantLogo';
import { getTrees } from 'modules/api/api';
import { useFmtMsg } from 'modules/intl';
import { useState } from 'react';
import { SponsorSimple } from 'types';
import { SponsorSummary } from 'common/components/SponsorSummary';
import { SponsorSearchBox } from 'common/components/SponsorSearchBox';

export function Gallery() {
  const fmtMsg = useFmtMsg();
  const [offset, setOffset] = useState(0);
  const [sponsor, setSponsor] = useState<SponsorSimple | null>(null);

  const { data: trees } = useQuery({
    queryKey: ['trees', offset, sponsor],
    queryFn: () => getTrees({ offset, sponsor: sponsor?.id }),
  });

  function onSearch(sponsor: SponsorSimple | null) {
    setSponsor(sponsor);
    setOffset(0);
  }

  return (
    <div className='p-2 pb-12 lg:px-20 lg:py-12 flex flex-col gap-10'>
      <div className='flex justify-between gap-10'>
        <ReplantLogo />
        <SponsorSearchBox onSearch={onSearch} />
      </div>

      <div className='text-3xl text-center font-light'>
        {fmtMsg('replantWorldsProofOfPlantingNftGallery')}
      </div>

      {sponsor && <SponsorSummary sponsor={sponsor} />}

      {trees && (
        <>
          <div>
            {sponsor && (
              <h3 className='text-xl font-bold mb-4'>
                {fmtMsg('sponsoredTrees')}
              </h3>
            )}
            <TreesGrid trees={trees?.results} />
            {trees?.count === 0 && <p>No trees</p>}
          </div>
          <div className='flex justify-center'>
            <Pagination
              paginated={trees}
              onPaginated={(paginate) => setOffset(paginate.offset)}
            />
          </div>
        </>
      )}
    </div>
  );
}
