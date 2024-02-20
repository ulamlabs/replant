import { Snackbar as MuiSnackbar } from '@mui/base';

type Props = {
  children?: React.ReactNode;
  open?: boolean;
  onClose: () => void;
};

export const Snackbar: React.FC<Props> = ({ children, open, onClose }) => {
  return (
    <MuiSnackbar
      className='bg-green-400 fixed rounded-lg top-5 right-5 px-5 py-2.5 text-base'
      autoHideDuration={10000}
      open={open}
      onClose={onClose}
    >
      {children}
    </MuiSnackbar>
  );
};
