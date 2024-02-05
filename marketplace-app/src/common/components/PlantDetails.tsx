import { Plant } from 'types';
import { ReadOnlyField } from './ReadOnlyField';

type PlantDetailsProps = {
  plant: Plant;
};

export function PlantDetails({ plant }: PlantDetailsProps) {
  return (
    <div className='flex flex-col gap-8 sm:flex-row items-center'>
      <img
        src={plant.imageUrl}
        alt={plant.commonName}
        className='w-64 rounded-lg'
      />
      <div className='flex flex-col w-full'>
        <ReadOnlyField label='Botanical name' value={plant.latinName} />
        <ReadOnlyField label='Common name' value={plant.commonName} />
        <ReadOnlyField label='Country' value={plant.country} />
        <ReadOnlyField label='Location' value={`${plant.lat} ${plant.lon}`} />
        <ReadOnlyField label='Capture date' value={plant.date} />
        <ReadOnlyField label='Sponsored by' value={plant.sponsoredBy} />
        <ReadOnlyField label='NFT collection' value={plant.nftCollection} />
        <ReadOnlyField label='NFT ID' value={`#${plant.nftId}`} />
        <ReadOnlyField
          label='Planing organization/community'
          value={plant.organization}
        />
        <ReadOnlyField label='Planter' value={plant.planter} />
        <ReadOnlyField
          label='Planting cost'
          value={`$${plant.plantingCostUsd}`}
        />
      </div>
    </div>
  );
}
