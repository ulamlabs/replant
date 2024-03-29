import { Message, Severity } from './types';

export const SNACKBAR_EVENT = 'ReplantWorld:openSnackbar';

export const openSnackbar = (message: string, severity: Severity) => {
  document.dispatchEvent(
    new CustomEvent<Message>(SNACKBAR_EVENT, { detail: { message, severity } })
  );
};
