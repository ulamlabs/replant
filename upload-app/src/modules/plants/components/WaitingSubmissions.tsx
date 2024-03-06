import { LoaderBox } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import { OfflinePlant, loadNewPlants } from 'modules/offline';
import { useEffect, useState } from 'react';
import { WaitingPlantTile } from './WaitingPlantTile';

export const WaitingSubmissions: React.FC = () => {
  const fmtMsg = useFmtMsg();
  const [isLoading, setIsLoading] = useState(true);
  const [plants, setPlants] = useState<OfflinePlant[]>();

  useEffect(() => {
    loadNewPlants().then((plants) => {
      setIsLoading(false);
      setPlants(plants);
    });
  }, []);

  return (
    <div className='space-y-2.5'>
      <LoaderBox visible={isLoading} />
      {plants?.map((plant) => (
        <WaitingPlantTile key={plant.id} plant={plant.plant} />
      ))}
      {plants?.length === 0 && (
        <div className='text-center'>
          {fmtMsg('youHaveNoTreesWaitingForSubmission')}
        </div>
      )}
    </div>
  );
};
