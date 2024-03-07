import { Button, LoaderBox } from 'common/components';
import { useFmtMsg } from 'modules/intl';
import {
  OfflinePlant,
  loadNewPlants,
  useIsOnline,
  useOfflineStore,
} from 'modules/offline';
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

  const store = useOfflineStore();

  const isOnline = useIsOnline();

  const showUploadButton =
    store.totalCount > 0 && !store.isUploading && isOnline;

  const showNoConnection =
    store.totalCount > 0 && !store.isUploading && !isOnline;

  return (
    <div className='space-y-5'>
      {showUploadButton && (
        <Button size='sm' type='secondary' onClick={() => store.upload()}>
          {fmtMsg('uploadAll')}
        </Button>
      )}
      {showNoConnection && (
        <span>
          {fmtMsg('youAreOfflineConnectToInternetToUploadWaitingPhotos')}
        </span>
      )}
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
    </div>
  );
};
