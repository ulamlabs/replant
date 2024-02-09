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
  stream?: MediaStream;
  species?: AssignedSpecies;
  speciesError?: string;
  isCameraLoading?: boolean;
  isCaptureModalOpen?: boolean;
  closeCapture: () => void;
  openCapture: () => void;
  reset: () => void;
  setImage: (value?: CapturedImage) => void;
  setImageError: (value?: string) => void;
  setSpecies: (value?: AssignedSpecies) => void;
  setSpeciesError: (value?: string) => void;
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
    set({ isCameraLoading: true, isCaptureModalOpen: true });
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: { aspectRatio: 3 / 4, facingMode: { ideal: 'environment' } },
    });
    set({ isCameraLoading: false, stream });
  },
  reset: () =>
    set({
      image: undefined,
      imageError: undefined,
      stream: undefined,
      species: undefined,
      speciesError: undefined,
      isCameraLoading: undefined,
      isCaptureModalOpen: undefined,
    }),
  setImage: (image) =>
    set({
      image,
      imageError: undefined,
    }),
  setImageError: (imageError) => set({ imageError }),
  setSpecies: (species) => set({ species, speciesError: undefined }),
  setSpeciesError: (speciesError) => set({ speciesError }),
}));
