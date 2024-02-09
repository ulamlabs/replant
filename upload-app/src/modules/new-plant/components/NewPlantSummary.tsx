import { Summary, SummaryItem } from 'common/components';
import { ImageIcon } from 'common/icons';
import { useFmtMsg } from 'modules/intl';
import { useNewPlantStore } from '../store';

export const NewPlantSummary: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const store = useNewPlantStore();

  return (
    <Summary>
      <SummaryItem>
        <span>{fmtMsg('photo')}</span>
        <div className='rounded border border-black dark:border-white h-20 aspect-3/4 flex items-center justify-center box-content'>
          {store.image ? (
            <img
              className='h-20 rounded'
              src={URL.createObjectURL(store.image)}
            />
          ) : (
            <ImageIcon
              svgClassName='size-4.5'
              pathClassName='fill-black dark:fill-white'
            />
          )}
        </div>
      </SummaryItem>
      <SummaryItem>
        <span>{fmtMsg('botanicalName')}</span>
        <span>{store.species?.species.botanical_name ?? '-'}</span>
      </SummaryItem>
      <SummaryItem>
        <span>{fmtMsg('commonName')}</span>
        <span>{store.species?.species.common_name ?? '-'}</span>
      </SummaryItem>
      <SummaryItem>
        <span>{fmtMsg('latitude')}</span>
        <span>{store.latitude?.toFixed(6) ?? ' -'}</span>
      </SummaryItem>
      <SummaryItem>
        <span>{fmtMsg('longitude')}</span>
        <span>{store.longitude?.toFixed(6) ?? ' -'}</span>
      </SummaryItem>
    </Summary>
  );
};
