import { Modal } from 'common/components/Modal';
import { PlantDetails } from 'common/components/PlantDetails';
import { PlantTile } from 'common/components/PlantTile';
import { useState } from 'react';
import { Plant } from 'types';

type PlantsGridProps = {
  plants: Plant[];
};

export function PlantsGrid({ plants }: PlantsGridProps) {
  const [selectedPlant, setSelectedPlant] = useState<Plant | null>(null);

  return (
    <>
      <div
        className='grid grid-cols-4 gap-4 justify-center'
        style={{ gridTemplateColumns: 'repeat(auto-fill, 250px)' }}
      >
        {plants.map((plant) => (
          <PlantTile
            plant={plant}
            onClick={() => setSelectedPlant(plant)}
            key={plant.nftId}
          />
        ))}
      </div>
      {selectedPlant && (
        <Modal
          title={selectedPlant.latinName}
          subtitle={selectedPlant.commonName}
          onClose={() => setSelectedPlant(null)}
        >
          <PlantDetails plant={selectedPlant} />
        </Modal>
      )}
    </>
  );
}
