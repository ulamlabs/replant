type Props = {
  children?: React.ReactNode;
  actions?: React.ReactNode;
};

export const Section: React.FC<Props> = ({ children, actions }) => {
  return (
    <div className={'w-full h-full max-w-lg pb-20'}>
      <div>{children}</div>
      {actions && (
        <div className={'fixed bottom-5 w-full flex items-center'}>
          {actions}
        </div>
      )}
    </div>
  );
};
