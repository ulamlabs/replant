import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Button, LoaderBox } from 'common/components';
import { prettifyError } from 'common/utils';
import { useFmtMsg } from 'modules/intl';
import {
  OfflinePlant,
  loadNewPlants,
  useIsOnline,
  useOfflineStore,
} from 'modules/offline';
import { openSnackbar } from 'modules/snackbar';
import { useEffect, useState } from 'react';
import { UploadProgressBar, WaitingPlantTile } from '.';
import { allPlantsQueryKey } from '..';

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

  const queryClient = useQueryClient();

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
          onClick={async () => {
            try {
              await store.upload();
              openSnackbar(fmtMsg('uploadFinishedSuccessfully'), 'success');
            } catch (e) {
              openSnackbar(
                fmtMsg('uploadAborted', {
                  error: e instanceof AxiosError ? prettifyError(e) : String(e),
                }),
                'error'
              );
            } finally {
              queryClient.invalidateQueries({ queryKey: allPlantsQueryKey });
              await loadPlants();
            }
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
      {store.isUploading && <UploadProgressBar />}
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
