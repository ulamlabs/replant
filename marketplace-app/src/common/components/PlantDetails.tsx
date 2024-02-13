import { useFmtMsg } from 'modules/intl';
import { Plant } from 'types';
import { ReadOnlyField } from './ReadOnlyField';

type PlantDetailsProps = {
  plant: Plant;
};

export function PlantDetails({ plant }: PlantDetailsProps) {
  const fmtMsg = useFmtMsg();

  return (
    <div className='flex flex-col gap-8 sm:flex-row items-center'>
      <img
        src={plant.imageUrl}
        alt={plant.commonName}
        className='w-64 rounded-lg'
      />
      <div className='flex flex-col w-full'>
        <ReadOnlyField
          label={fmtMsg('botanicalName')}
          value={plant.latinName}
        />
        <ReadOnlyField label={fmtMsg('commonName')} value={plant.commonName} />
        <ReadOnlyField label={fmtMsg('country')} value={plant.country} />
        <ReadOnlyField
          label={fmtMsg('location')}
          value={`${plant.lat} ${plant.lon}`}
        />
        <ReadOnlyField label={fmtMsg('captureDate')} value={plant.date} />
        <ReadOnlyField
          label={fmtMsg('sponsoredBy')}
          value={plant.sponsoredBy}
        />
        <ReadOnlyField
          label={fmtMsg('nftCollection')}
          value={plant.nftCollection}
        />
        <ReadOnlyField label={fmtMsg('nftId')} value={`#${plant.nftId}`} />
        <ReadOnlyField
          label={fmtMsg('plantingOrganizationCommunity')}
          value={plant.organization}
        />
        <ReadOnlyField label={fmtMsg('planter')} value={plant.planter} />
        <ReadOnlyField
          label={fmtMsg('plantingCost')}
          value={`$${plant.plantingCostUsd}`}
        />
      </div>
    </div>
  );
}
