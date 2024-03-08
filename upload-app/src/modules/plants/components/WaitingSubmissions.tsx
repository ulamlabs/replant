import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Button, LoaderBox } from 'common/components';
import { OfflineIcon, UploadIcon } from 'common/icons';
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
        <div className='flex gap-4 items-center'>
          <Button
            size='md'
            onClick={async () => {
              try {
                await store.upload();
                openSnackbar(fmtMsg('uploadFinishedSuccessfully'), 'success');
              } catch (e) {
                openSnackbar(
                  fmtMsg('uploadAborted', {
                    error:
                      e instanceof AxiosError ? prettifyError(e) : String(e),
                  }),
                  'error'
                );
              } finally {
                queryClient.invalidateQueries({ queryKey: allPlantsQueryKey });
                await loadPlants();
              }
            }}
          >
            <UploadIcon
              svgClassName={'size-6'}
              pathClassName='fill-bisque-400 dark:fill-white'
            />
            {fmtMsg('uploadAll')}
          </Button>
          <span>{fmtMsg('treesToUpload', { count: store.totalCount })}</span>
        </div>
      )}
      {showNoConnection && (
        <div className='flex gap-4 items-center justify-center'>
          <OfflineIcon
            pathClassName='fill-black dark:fill-white'
            svgClassName='w-6 h-6 min-w-6 min-h-6'
          />
          {fmtMsg('youAreOfflineConnectToInternetToUploadWaitingPhotos', {
            count: store.totalCount,
          })}
        </div>
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
