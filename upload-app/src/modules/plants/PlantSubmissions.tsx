import clsx from 'clsx';
import { Alert, Header, LoaderBox } from 'common/components';
import { prettifyError, useInfiniteScrolling } from 'common/utils';
import { useFmtMsg } from 'modules/intl';
import { PlantTile, usePlantsInfinite } from '.';

export const PlantSubmissions: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = usePlantsInfinite();

  const { lastItemRef } = useInfiniteScrolling(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  });

  return (
    <div className='space-y-5'>
      <Header text={fmtMsg('submissions')} />
      <Alert
        className={clsx(!error && 'hidden')}
        severity='error'
        text={error ? prettifyError(error) : ''}
      />
      <div className='space-y-2.5'>
        {data?.pages
          .flatMap((page) => page.results)
          .map((plant, idx, plants) => (
            <PlantTile
              key={plant.id}
              plant={plant}
              ref={idx === plants.length - 1 ? lastItemRef : undefined}
            />
          ))}
      </div>
      <LoaderBox visible={isFetching} />
    </div>
  );
};
