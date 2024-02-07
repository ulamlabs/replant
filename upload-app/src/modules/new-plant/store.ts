import { AssignedSpecies } from 'modules/species';
import { create } from 'zustand';

type NewPlantState = {
  image?: Blob;
  imageError?: string;
  latitude?: number;
  longitude?: number;
  species?: AssignedSpecies;
  speciesError?: string;
  setImage: (image: Blob, position: GeolocationPosition) => void;
  setImageError: (value?: string) => void;
  setLatitude: (value?: number) => void;
  setLongitude: (value?: number) => void;
  setSpecies: (value?: AssignedSpecies) => void;
  setSpeciesError: (value?: string) => void;
};

export const useNewPlantStore = create<NewPlantState>()((set) => ({
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
}));
