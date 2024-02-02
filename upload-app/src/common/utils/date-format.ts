import { format, parseISO } from 'date-fns';

export const DATETIME_WITHOUT_SEC_FORMAT = 'dd.MM.yyy HH:mm';

export const formatDatetimeWithoutSec = (date: string) =>
  format(parseISO(date), DATETIME_WITHOUT_SEC_FORMAT);
