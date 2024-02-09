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
    const stream = get().stream;
    if (!stream) {
      return;
    }
    stream.getVideoTracks().forEach((track) => {
      track.stop();
    });
    set({ isCaptureModalOpen: false });
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
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: { aspectRatio: 3 / 4, facingMode: { ideal: 'environment' } },
    });
    set({ isCameraLoading: false, stream });
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
