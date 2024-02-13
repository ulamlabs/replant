import { AssignedSpecies } from 'modules/species';
import { create } from 'zustand';

export type CapturedImage = {
  image: string; // as data URL
  latitude: string;
  longitude: string;
};

type NewPlantState = {
  image?: CapturedImage;
  imageError?: string;
  isCameraLoading?: boolean;
  isCaptureModalOpen?: boolean;
  stream?: MediaStream;
  species?: AssignedSpecies;
  speciesError?: string;
  tmpImage?: CapturedImage;
  closeCapture: () => void;
  openCapture: () => void;
  reset: () => void;
  setImage: (value?: CapturedImage) => void;
  setImageError: (value?: string) => void;
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
  openCapture: async () => {
    if (!window.navigator.mediaDevices) {
      return;
    }
    set({
      isCameraLoading: true,
      isCaptureModalOpen: true,
      tmpImage: undefined,
    });
    const isPortait = window.matchMedia('(orientation: portrait)').matches;
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: {
        aspectRatio: { ideal: isPortait ? 4 / 3 : 3 / 4 },
        facingMode: { ideal: 'environment' },
      },
    });
    set({ isCameraLoading: false });
    // if capture modal has been closed before camera fully started, then close the camera
    if (!get().isCaptureModalOpen) {
      stopStream(stream);
      return;
    }
    set({ stream });
  },
  reset: () =>
    set({
      image: undefined,
      imageError: undefined,
      isCameraLoading: undefined,
      isCaptureModalOpen: undefined,
      stream: undefined,
      species: undefined,
      speciesError: undefined,
      tmpImage: undefined,
    }),
  setImage: (image) => set({ image, imageError: undefined }),
  setImageError: (imageError) => set({ imageError }),
  setSpecies: (species) => set({ species, speciesError: undefined }),
  setSpeciesError: (speciesError) => set({ speciesError }),
  setTmpImage: (tmpImage) => set({ tmpImage }),
}));

const stopStream = (stream: MediaStream) =>
  stream.getVideoTracks().forEach((track) => {
    track.stop();
  });
