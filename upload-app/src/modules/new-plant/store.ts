import { FmtMsgFn } from 'modules/intl';
import { CapturedImage } from 'modules/plants';
import { openSnackbar } from 'modules/snackbar';
import { AssignedSpecies } from 'modules/species';
import { create } from 'zustand';

type NewPlantState = {
  image?: CapturedImage;
  imageError?: string;
  isCameraLoading?: boolean;
  isCaptureModalOpen?: boolean;
  isGettingLocation?: boolean;
  stream?: MediaStream;
  species?: AssignedSpecies;
  speciesError?: string;
  tmpImage?: CapturedImage;
  closeCapture: () => void;
  openCapture: (fmtMsg: FmtMsgFn) => void;
  reset: () => void;
  setImage: (value?: CapturedImage) => void;
  setImageError: (value?: string) => void;
  setIsGettingLocation: (value: boolean) => void;
  setSpecies: (value?: AssignedSpecies) => void;
  setSpeciesError: (value?: string) => void;
  setTmpImage: (value?: CapturedImage) => void;
};

export const useNewPlantStore = create<NewPlantState>()((set, get) => ({
  closeCapture: () => {
    set({ isCaptureModalOpen: false });
    const stream = get().stream;
    if (!stream) {
      return;
    }
    stopStream(stream);
  },
  openCapture: async (fmtMsg) => {
    if (!window.navigator.mediaDevices) {
      openSnackbar(fmtMsg('mediaDevicesNotFound'), 'error');
      return;
    }
    set({
      isCameraLoading: true,
      isCaptureModalOpen: true,
      tmpImage: undefined,
    });
    const isPortrait = window.matchMedia('(orientation: portrait)').matches;
    try {
      const stream = await window.navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: { ideal: 'environment' },
          width: { ideal: isPortrait ? 800 : 600 },
          height: { ideal: isPortrait ? 600 : 800 },
        },
      });
      set({ isCameraLoading: false });
      // if capture modal has been closed before camera fully started, then close the camera
      if (!get().isCaptureModalOpen) {
        stopStream(stream);
        return;
      }
      set({ stream });
    } catch (e) {
      // if capture modal has been closed before camera error, then don't show error
      if (get().isCaptureModalOpen) {
        openSnackbar(
          fmtMsg('failedToOpenCamera', { error: String(e) }),
          'error'
        );
      }
      set({ isCameraLoading: false, isCaptureModalOpen: false });
    }
  },
  reset: () =>
    set({
      image: undefined,
      imageError: undefined,
      isCameraLoading: undefined,
      isCaptureModalOpen: undefined,
      isGettingLocation: undefined,
      stream: undefined,
      species: undefined,
      speciesError: undefined,
      tmpImage: undefined,
    }),
  setImage: (image) => set({ image, imageError: undefined }),
  setImageError: (imageError) => set({ imageError }),
  setIsGettingLocation: (value: boolean) => set({ isGettingLocation: value }),
  setSpecies: (species) => set({ species, speciesError: undefined }),
  setSpeciesError: (speciesError) => set({ speciesError }),
  setTmpImage: (tmpImage) => set({ tmpImage }),
}));

const stopStream = (stream: MediaStream) =>
  stream.getVideoTracks().forEach((track) => {
    track.stop();
  });
