import { Plant } from 'types';

type PlantDetailsProps = {
  plant: Plant;
  onClick: (plant: Plant) => void;
};

export function PlantTile(props: PlantDetailsProps) {
  return (
    <div
      className='flex flex-col bg-teal-200 dark:bg-teal-700 rounded-xl overflow-hidden cursor-pointer max-w-[320px] w-full'
      onClick={() => props.onClick(props.plant)}
    >
      <div
        style={{ backgroundImage: `url(${props.plant.imageUrl})` }}
        className='h-72 bg-cover'
      />
      <div className='p-4'>
        <div className='font-bold'>{props.plant.latinName}</div>
        <div className='text-sm'>{props.plant.commonName}</div>
        <div className='flex justify-between items-center'>
          <span className='text-xs text-teal-650'>#{props.plant.nftId}</span>
          <span className='text-2xl font-bold'>
            {props.plant.plantingCostUsd} USD
          </span>
        </div>
      </div>
    </div>
  );
}
