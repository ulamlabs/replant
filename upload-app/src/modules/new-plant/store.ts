import { AssignedSpecies } from 'modules/species';
import { create } from 'zustand';

type NewPlantState = {
  image?: Blob;
  imageError?: string;
  species?: AssignedSpecies;
  speciesError?: string;
  setImage: (value?: Blob) => void;
  setImageError: (value?: string) => void;
  setSpecies: (value?: AssignedSpecies) => void;
  setSpeciesError: (value?: string) => void;
};

export const useNewPlantStore = create<NewPlantState>()((set) => ({
  setImage: (image) => set({ image, imageError: undefined }),
  setImageError: (imageError) => set({ imageError }),
  setSpecies: (species) => set({ species, speciesError: undefined }),
  setSpeciesError: (speciesError) => set({ speciesError }),
}));
