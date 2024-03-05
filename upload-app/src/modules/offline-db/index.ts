import { DBSchema, openDB } from 'idb';
import { NewPlant } from 'modules/plants';
import { AssignedSpeciesResponseData } from 'modules/species';

interface RwDbSchema extends DBSchema {
  assignedSpecies: {
    key: number;
    value: AssignedSpeciesResponseData;
  };
  plants: {
    key: number;
    value: NewPlant;
  };
}

const rwDbName = 'RW Offline DB';

export const openDb = async () => {
  return await openDB<RwDbSchema>(rwDbName, 1, {
    upgrade: (db) => {
      if (!db.objectStoreNames.contains('assignedSpecies')) {
        db.createObjectStore('assignedSpecies');
      }
      if (!db.objectStoreNames.contains('plants')) {
        db.createObjectStore('plants', {
          autoIncrement: true,
        });
      }
    },
  });
};

export const saveAssignedSpecies = async (
  value: AssignedSpeciesResponseData
) => {
  const db = await openDb();
  try {
    const tx = db.transaction('assignedSpecies', 'readwrite');
    await Promise.all([tx.store.put(value, 0), tx.done]);
  } catch (e) {
    console.log('Db assigned species save error', e);
  }
};

export const loadAssignedSpecies = async () => {
  const db = await openDb();
  try {
    const species = await db.get('assignedSpecies', 0);
    return species;
  } catch (e) {
    console.log('Db assigned species load error', e);
  }
};

export const saveNewPlant = async (plant: NewPlant) => {
  const db = await openDb();
  try {
    const tx = db.transaction('plants', 'readwrite');
    await Promise.all([tx.store.add(plant), tx.done]);
  } catch (e) {
    console.log('Db new plant save error', e);
  }
};

export const loadNewPlants = async () => {
  const db = await openDb();
  try {
    return db.getAll('plants');
  } catch (e) {
    console.log('Db new plant load error', e);
  }
};
