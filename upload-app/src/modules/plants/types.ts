import { Species } from 'modules/species';

export type NewPlantType = {
  assigned_species_id: number;
  image: string;
  latitude: string;
  longitude: string;
};

export type ReviewState = 'PENDING' | 'APPROVED' | 'REJECTED';

export type PlantType = {
  id: number;
  species: Species;
  review_state: ReviewState;
  image: string;
  latitude: string;
  longitude: string;
  created_at: string;
};
