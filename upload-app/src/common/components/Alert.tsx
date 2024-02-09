import clsx from 'clsx';

type Severity = 'error' | 'success';

type Props = {
  text: string;
  severity: Severity;
  className?: string;
};

export const Alert: React.FC<Props> = ({ text, severity, className }) => {
  return (
    <div
      className={clsx(
        'text-xs text-black p-3 rounded-md dark:opacity-80 whitespace-pre-line w-full',
        severity === 'error' && 'bg-red-100 dark:bg-red-200',
        severity === 'success' && 'bg-green-200',
        className
      )}
    >
      {text}
    </div>
  );
};
