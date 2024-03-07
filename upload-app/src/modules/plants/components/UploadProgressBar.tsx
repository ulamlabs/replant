import { useFmtMsg } from 'modules/intl';
import { useOfflineStore } from 'modules/offline';

export const UploadProgressBar: React.FC = () => {
  const fmtMsg = useFmtMsg();

  const { uploadedCount, totalCount } = useOfflineStore();

  return (
    <div className='space-y-0.5'>
      <div className='flex justify-between text-sm'>
        <span>{fmtMsg('uploading')}</span>
        <span>{`${uploadedCount} / ${totalCount}`}</span>
      </div>
      <div className='w-full bg-gray-100 dark:bg-gray-500 h-1 rounded-sm'>
        <div
          className='bg-black dark:bg-white h-1 rounded-sm'
          style={{
            width: `${(uploadedCount / totalCount) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};
