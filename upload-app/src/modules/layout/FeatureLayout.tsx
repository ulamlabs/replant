import { ReplantWorldIcon } from 'common/icons';

type Props = {
  children?: React.ReactNode;
};

export const FeatureLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={'w-screen h-screen'}>
      <div className={'py-2.5 px-5'}>
        <ReplantWorldIcon className=' fill-black dark:fill-white' />
      </div>
      <div className={'py-2.5 px-5 flex justify-center'}>
        {children}
      </div>
    </div>
  );
};
