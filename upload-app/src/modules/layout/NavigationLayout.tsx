import { ReplantWorldIcon } from 'common/icons/ReplantWorldIcon';

type Props = {
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

export const NavigationLayout: React.FC<Props> = ({ children, actions }) => {
  return (
    <div className={'w-screen h-full pb-20'}>
      <div className={'py-2.5 px-5'}>
        <ReplantWorldIcon />
      </div>
      <div className={'py-2.5 px-5 '}>{children}</div>
      {actions && (
        <div className={'fixed bottom-5 px-5 w-screen'}>{actions}</div>
      )}
    </div>
  );
};
