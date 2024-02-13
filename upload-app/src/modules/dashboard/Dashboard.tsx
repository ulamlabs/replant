import { LoaderBox, Section } from 'common/components';
import { CheckIcon, CrossIcon, DocumentIcon, TreeIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { Plant, usePlants, usePlantsSummary } from 'modules/plants';
import { InfoBox } from './components';

export const Dashboard: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const { data: summary, isLoading: isLoadingSummary } = usePlantsSummary();

  const { data: plants, isLoading: isLoadingPlants } = usePlants(1);

  return (
    <Section>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-5'>
        <InfoBox
          title={fmtMsg('addedTrees')}
          icon={<TreeIcon />}
          isLoading={isLoadingSummary}
          value={summary?.added_count}
          className={'bg-blue-400'}
        />
        <InfoBox
          title={fmtMsg('pendingTrees')}
          icon={<DocumentIcon />}
          isLoading={isLoadingSummary}
          value={summary?.pending_review_count}
          className={'bg-bisque-400'}
        />
        <InfoBox
          title={fmtMsg('approvedTrees')}
          icon={<CheckIcon />}
          isLoading={isLoadingSummary}
          value={summary?.approved_count}
          className={'bg-green-400'}
        />
        <InfoBox
          title={fmtMsg('rejectedTrees')}
          icon={<CrossIcon />}
          isLoading={isLoadingSummary}
          value={summary?.rejected_count}
          className={'bg-red-400'}
        />
      </div>
      <div className='space-y-2.5'>
        <LoaderBox visible={isLoadingPlants} />
        {plants?.results.slice(0, 5).map((plant) => (
          <Plant plant={plant} key={plant.id} />
        ))}
      </div>
    </Section>
  );
};
