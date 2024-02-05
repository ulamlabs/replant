import { useQuery } from '@tanstack/react-query';
import { getOrganizationSummary } from 'fixtures';
import { OrganizationSummaryBox } from './OrganizationSummaryBox';
import { IconOrganization } from './icons/IconOrganization';
import { IconTree } from './icons/IconTree';
import { IconLeaf } from './icons/IconLeaf';
import { IconCoin } from './icons/IconCoin';

type OrganizationSummaryProps = {
  organization: string;
};

export function OrganizationSummary({
  organization,
}: OrganizationSummaryProps) {
  const { data } = useQuery({
    queryKey: ['organizationSummary', organization],
    queryFn: () => getOrganizationSummary(organization),
  });

  return (
    <div>
      <div className='flex gap-3 items-center mb-4'>
        <IconOrganization className='w-6' />
        <h2 className='text-2xl font-bold'>{organization}</h2>
      </div>
      {data ? (
        <div className='flex flex-col sm:flex-row gap-5 w-full'>
          <OrganizationSummaryBox
            icon={
              <IconTree
                className='w-8 h-8 fill-green-400 dark:fill-green-300'
                overrideColors={true}
              />
            }
            label='Trees sponsored'
            value={data?.plants}
          />
          <OrganizationSummaryBox
            icon={
              <IconLeaf
                className='w-8 h-8 fill-green-400 dark:fill-green-300'
                overrideColors={true}
              />
            }
            label='Species of trees'
            value={data?.species}
          />
          <OrganizationSummaryBox
            icon={
              <IconCoin
                className='w-8 h-8 fill-green-400 dark:fill-green-300'
                overrideColors={true}
              />
            }
            label='Sponsored trees value'
            value={`${data.totalPlantsCostUsd.toLocaleString()} USD`}
          />
        </div>
      ) : null}
    </div>
  );
}
