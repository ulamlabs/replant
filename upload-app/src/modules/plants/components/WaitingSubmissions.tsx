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

  const [isLoadingPlants, setIsLoadingPlants] = useState(true);
  const [plants, setPlants] = useState<OfflinePlant[]>();

  const loadPlants = async () => {
    setIsLoadingPlants(true);
    const plants = await loadNewPlants();
    setIsLoadingPlants(false);
    setPlants(plants);
  };

  useEffect(() => {
    loadPlants();
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
        <Button
          size='sm'
          type='secondary'
          onClick={async () => {
            await store.upload();
            await loadPlants();
          }}
        >
          {fmtMsg('uploadAll')}
        </Button>
      )}
      {showNoConnection && (
        <span>
          {fmtMsg('youAreOfflineConnectToInternetToUploadWaitingPhotos')}
        </span>
      )}
      {store.isUploading && (
        <div className='space-y-0.5'>
          <div className='flex justify-between text-sm'>
            <span>{fmtMsg('uploading')}</span>
            <span>{`${store.uploadedCount} / ${store.totalCount}`}</span>
          </div>
          <div className='w-full bg-gray-500 h-1 rounded-sm'>
            <div
              className='bg-white h-1 rounded-sm'
              style={{
                width: `${(store.uploadedCount / store.totalCount) * 100}%`,
              }}
            />
          </div>
        </div>
      )}
      <div className='space-y-2.5'>
        <LoaderBox visible={isLoadingPlants} />
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
