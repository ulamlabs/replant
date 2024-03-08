export type Species = {
  botanical_name: string;
  common_name: string;
};

export type AssignedSpecies = {
  id: number;
  species: Species;
};
