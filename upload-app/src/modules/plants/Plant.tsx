import { formatDatetimeWithoutSec } from 'common/utils/date-format';
import { useFmtMsg } from 'modules/intl';
import { ReviewStatePill } from './components';

type Props = {
  botanicalName: string;
  commonName: string;
  date: string;
  id: number;
  image: string;
  location: string;
};

export const Plant: React.FC<Props> = ({
  botanicalName,
  commonName,
  date,
  id,
  image,
  location,
}) => {
  const fmtMsg = useFmtMsg();

  return (
    <div className='p-2.5 pb-3.5 rounded-xl flex gap-5 dark:bg-teal-700 border dark:border-0 border-teal-600 relative text-black dark:text-white'>
      <img
        src={image}
        alt='Tree'
        className='aspect-3/4 object-cover rounded-xl w-24 h-full'
      />
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col'>
          <span className='text-base font-bold'>{botanicalName}</span>
          <span className='text-sm '>{commonName}</span>
        </div>
        <div className='flex flex-col text-xs font-light'>
          <span>{`${fmtMsg('location')}: ${location}`}</span>
          <span>{`${fmtMsg('date')}: ${formatDatetimeWithoutSec(date)}`}</span>
          <span>{`${fmtMsg('id')}: ${id}`}</span>
        </div>
      </div>
      <div className='absolute bottom-2 right-2'>
        <ReviewStatePill state={'APPROVED'} />
      </div>
    </div>
  );
};
