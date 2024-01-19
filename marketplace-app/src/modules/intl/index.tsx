import { useIntl as _useIntl, IntlProvider as _IntlProvider } from 'react-intl';
import messages from './en-US.json';

export type MessageDict = typeof messages;
export type MessageKey = keyof typeof messages;

type Props = {
  children: React.ReactNode;
};

export const IntlProvider: React.FC<Props> = ({ children }) => {
  const locale = 'en-US';
  return (
    <_IntlProvider locale={locale} messages={messages}>
      {children}
    </_IntlProvider>
  );
};

export const useFmtMsg = () => {
  const { formatMessage } = _useIntl();

  // simplify formatMessage API
  const fmtMsg = (
    id: MessageKey,
    values?: {
      [key: string]: string | number | boolean | null | undefined | Date;
    }
  ) => formatMessage({ id }, values);

  return fmtMsg;
};

export type FmtMsgFn = ReturnType<typeof useFmtMsg>;
