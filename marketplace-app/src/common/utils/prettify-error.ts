import { AxiosError } from 'axios';

export const prettifyError = (err: AxiosError) => {
  if (err.response?.data) {
    const header = `${err.message}\n`;
    if (err.response.status >= 500) {
      if (`${err.response?.data}`.includes('NoneType')) {
        const header = `Internal Server Error</strong>\n`;
        return (
          header +
          `Unfortunately there was an unexpected server error. Try logging in again, and if that doesn't help, contact the site administrator.`
        );
      }

      return header;
    }
    if (typeof err.response.data === 'object') {
      return prettifyJSON(err.response.data);
    }
    return header + err.response.data;
  }

  return err.message;
};

// TODO: make it recursive
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const prettifyJSON = (obj: any) => {
  return Object.entries(obj)
    .map((items) => {
      if (!Array.isArray(items[1])) {
        items[1] = [items[1]];
      } // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (items[1] as any[]).map((item) => item).join('\n');
    })
    .join('\n');
};
