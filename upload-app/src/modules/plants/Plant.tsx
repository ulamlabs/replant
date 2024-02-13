import { formatDatetimeWithoutSec } from 'common/utils/date-format';
import { useFmtMsg } from 'modules/intl';
import { ReviewStatePill } from './components';
import { PlantType } from './types';

type Props = {
  plant: PlantType;
};

export const Plant: React.FC<Props> = ({ plant }) => {
  const fmtMsg = useFmtMsg();

  return (
    <div className='p-2.5 pb-3.5 rounded-xl flex gap-5 dark:bg-teal-700 border dark:border-0 border-teal-600 relative text-black dark:text-white'>
      <img
        src={plant.image}
        alt='Tree'
        className='aspect-3/4 object-cover rounded-xl w-24 h-full'
      />
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col'>
          <span className='text-base font-bold'>
            {plant.species.botanical_name}
          </span>
          <span className='text-sm'>{plant.species.common_name}</span>
        </div>
        <div className='flex flex-col text-xs font-light'>
          <span>{`${fmtMsg('latitude')}: ${plant.latitude}`}</span>
          <span>{`${fmtMsg('longitude')}: ${plant.longitude}`}</span>
          <span>{`${fmtMsg('date')}: ${formatDatetimeWithoutSec(
            plant.created_at
          )}`}</span>
          <span>{`${fmtMsg('id')}: ${plant.id}`}</span>
        </div>
      </div>
      <div className='absolute bottom-2 right-2'>
        <ReviewStatePill state={plant.review_state} />
      </div>
    </div>
  );
};
