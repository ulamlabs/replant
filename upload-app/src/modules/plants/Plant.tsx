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
    <div className='p-2.5 rounded-xl dark:bg-teal-700 border dark:border-0 border-teal-600  text-black dark:text-white space-y-2'>
      <div className='flex gap-4 relative'>
        <img
          src={plant.image}
          alt='Tree'
          className='aspect-3/4 object-cover rounded-xl w-24 h-full'
        />
        <div className='flex flex-col text-xs font-light'>
          <span className='text-base font-bold'>
            {plant.species.botanical_name}
          </span>
          <span className='text-sm mb-3'>{plant.species.common_name}</span>
          <span>{`${fmtMsg('latitude')}: ${plant.latitude}`}</span>
          <span>{`${fmtMsg('longitude')}: ${plant.longitude}`}</span>
          <span>{`${fmtMsg('date')}: ${formatDatetimeWithoutSec(
            plant.created_at
          )}`}</span>
          <span>{`${fmtMsg('id')}: ${plant.id}`}</span>
        </div>
        <div className='absolute bottom-0 right-0'>
          <ReviewStatePill state={plant.review_state} />
        </div>
      </div>
      {plant.rejection_reason && (
        <div className='text-red-400 text-xs'>
          {fmtMsg('rejectionReason') + ': ' + plant.rejection_reason}
        </div>
      )}
    </div>
  );
};
