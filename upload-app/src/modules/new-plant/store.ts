import { AssignedSpecies } from 'modules/species';
import { create } from 'zustand';

type NewPlantState = {
  image?: Blob;
  imageError?: string;
  latitude?: number;
  longitude?: number;
  stream?: MediaStream;
  species?: AssignedSpecies;
  speciesError?: string;
  isCameraLoading?: boolean;
  isCaptureModalOpen?: boolean;
  setImage: (image: Blob, position: GeolocationPosition) => void;
  setImageError: (value?: string) => void;
  setLatitude: (value?: number) => void;
  setLongitude: (value?: number) => void;
  setSpecies: (value?: AssignedSpecies) => void;
  setSpeciesError: (value?: string) => void;
  openCapture: () => void;
  closeCapture: () => void;
};

export const useNewPlantStore = create<NewPlantState>()((set, get) => ({
  setImage: (image, position) =>
    set({
      image,
      imageError: undefined,
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    }),
  setImageError: (imageError) => set({ imageError }),
  setLatitude: (latitude) => set({ latitude }),
  setLongitude: (longitude) => set({ longitude }),
  setSpecies: (species) => set({ species, speciesError: undefined }),
  setSpeciesError: (speciesError) => set({ speciesError }),
  openCapture: async () => {
    if (!window.navigator.mediaDevices) {
      return;
    }
    set({ isCameraLoading: true, isCaptureModalOpen: true });
    const stream = await window.navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
    });
    set({ isCameraLoading: false, stream });
  },
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
}));
