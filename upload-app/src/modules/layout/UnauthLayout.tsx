import { ReplantWorldIcon } from 'common/assets/ReplantWorldIcon';

type Props = {
  children?: React.ReactNode;
};

export const UnauthLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className={'w-screen h-screen '}>
      <div className={'py-2.5 px-5'}>
        <ReplantWorldIcon />
      </div>
      <div className={'py-2.5 px-5'}>{children}</div>
    </div>
  );
};
