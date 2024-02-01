import { Section } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { InfoBox } from './components/InfoBox';
import { CheckIcon, CrossIcon, DocumentIcon, TreeIcon } from 'common/icons';
import { PlantBox } from 'modules/plants';
import image from './tree-planting.png';

export const Dashboard: React.FC = () => {
  const fmtMsg = useFmtMsg();

  return (
    <Section>
      <div className='grid grid-cols-2 md:grid-cols-4 gap-3 mb-5'>
        <InfoBox
          title={fmtMsg('addedTrees')}
          icon={<TreeIcon />}
          isLoading={false}
          value={'10'}
          className={'bg-blue-400'}
        />
        <InfoBox
          title={fmtMsg('pendingTrees')}
          icon={<DocumentIcon />}
          isLoading={false}
          value={'0'}
          className={'bg-bisque-400'}
        />
        <InfoBox
          title={fmtMsg('rejectedTrees')}
          icon={<CheckIcon />}
          isLoading={false}
          value={'9'}
          className={'bg-green-400'}
        />
        <InfoBox
          title={fmtMsg('approvedTrees')}
          icon={<CrossIcon />}
          isLoading={false}
          value={'112'}
          className={'bg-red-400'}
        />
      </div>
      <div>
        <PlantBox
          image={image}
          botanicalName={'Quercoxylon E. Hofmann'}
          commonName={'dąb liściasty'}
          location={'51°06′36″N 17°01′20″E'}
          date={'2024-02-01T20:12:00'}
          id={2}
        />
      </div>
    </Section>
  );
};
