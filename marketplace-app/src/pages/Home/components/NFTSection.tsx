import { useQuery } from '@tanstack/react-query';
import { Button } from 'common/components';
import { Loader } from 'common/components/Loader';
import { TreeTile } from 'common/components/TreeTile';
import { getTrees } from 'modules/api/api';
import { useNavigate } from 'react-router-dom';

export const NFTSection = () => {
  const navigate = useNavigate();

  const { data: trees, isLoading } = useQuery({
    queryKey: ['trees'],
    queryFn: () => getTrees({ pageSize: 4 }),
  });

  if (trees) {
    trees.results = [
      {
        image:
          'https://uploads-ssl.webflow.com/63086d41671f3bfcf18a5762/65fc03145cce9dc952373ced_Frame%20278.png',
        common_name: 'Dąb liściasty',
        botanical_name: 'Quercoxylon E. Hofmann',
        iucn_status: 'EN',
        country: 'Poland',
        created_at: '01-01-2024',
        planting_cost_usd: '10',
        planter: 'john',
        planting_organization: 'ulam labs',
        latitude: '10',
        longitude: '10',
        sponsor: 'ulam',
        nft_collection: '#234748765757685',
        nft_id: '#23474876575768',
      },
      {
        image:
          'https://uploads-ssl.webflow.com/63086d41671f3bfcf18a5762/65fc03145cce9dc952373ced_Frame%20278.png',
        common_name: 'Dąb liściasty',
        botanical_name: 'Quercoxylon E. Hofmann',
        iucn_status: 'EN',
        country: 'Poland',
        created_at: '01-01-2024',
        planting_cost_usd: '10',
        planter: 'john',
        planting_organization: 'ulam labs',
        latitude: '10',
        longitude: '10',
        sponsor: 'ulam',
        nft_collection: '#234748765757685',
        nft_id: '#23474876575785',
      },
      {
        image:
          'https://uploads-ssl.webflow.com/63086d41671f3bfcf18a5762/65fc03145cce9dc952373ced_Frame%20278.png',
        common_name: 'Dąb liściasty',
        botanical_name: 'Quercoxylon E. Hofmann',
        iucn_status: 'EN',
        country: 'Poland',
        created_at: '01-01-2024',
        planting_cost_usd: '10',
        planter: 'john',
        planting_organization: 'ulam labs',
        latitude: '10',
        longitude: '10',
        sponsor: 'ulam',
        nft_collection: '#234748765757685',
        nft_id: '#23478765757685',
      },
      {
        image:
          'https://uploads-ssl.webflow.com/63086d41671f3bfcf18a5762/65fc03145cce9dc952373ced_Frame%20278.png',
        common_name: 'Dąb liściasty',
        botanical_name: 'Quercoxylon E. Hofmann',
        iucn_status: 'EN',
        country: 'Poland',
        created_at: '01-01-2024',
        planting_cost_usd: '10',
        planter: 'john',
        planting_organization: 'ulam labs',
        latitude: '10',
        longitude: '10',
        sponsor: 'ulam',
        nft_collection: '#234748765757685',
        nft_id: '#23448765757685',
      },
    ];
  }

  return (
    <section className='mb-20'>
      <div className='flex justify-between items-center mb-10'>
        <h2 className='dark:text text-4xl font-bold'>NFT's for sale</h2>
        <Button type='secondary' onClick={() => navigate('marketplace')}>
          View all
        </Button>
      </div>

      {isLoading && (
        <div className='flex justify-center my-20'>
          <Loader />
        </div>
      )}

      {trees && (
        <div className=' grid place-items-center gap-7 content-center md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {trees.results.map((tree) => (
            <TreeTile tree={tree} key={tree.nft_id} />
          ))}
        </div>
      )}
    </section>
  );
};
