import { DBSchema, openDB } from 'idb';
import { NewPlant } from 'modules/plants';
import { AssignedSpeciesResponseData } from 'modules/species';
import { v4 as getId } from 'uuid';

export type OfflinePlant = {
  id: string;
  capturedAt: string;
  plant: NewPlant;
};

interface RwDbSchema extends DBSchema {
  assignedSpecies: {
    key: number;
    value: AssignedSpeciesResponseData;
  };
  plants: {
    key: string;
    value: OfflinePlant;
  };
}

const dbName = 'RW Offline DB';

export const openDb = async () => {
  return await openDB<RwDbSchema>(dbName, 1, {
    upgrade: (db) => {
      if (!db.objectStoreNames.contains('assignedSpecies')) {
        db.createObjectStore('assignedSpecies');
      }
      if (!db.objectStoreNames.contains('plants')) {
        db.createObjectStore('plants', {
          keyPath: 'id',
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

export const saveNewPlant = async (plant: NewPlant, capturedAt: string) => {
  const db = await openDb();
  try {
    const tx = db.transaction('plants', 'readwrite');
    const obj = {
      capturedAt,
      id: getId(),
      plant,
    };
    await Promise.all([tx.store.add(obj), tx.done]);
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

export const getNewPlantsTotalCount = async () => {
  const db = await openDb();
  try {
    return db.count('plants');
  } catch (e) {
    console.log('Db new plants total count error', e);
  }
};

export const getNewPlantsKeys = async () => {
  const db = await openDb();
  try {
    return db.getAllKeys('plants');
  } catch (e) {
    console.log('Db new plants all keys error', e);
    throw e;
  }
};

export const getNewPlantById = async (id: string) => {
  const db = await openDb();
  try {
    return db.get('plants', id);
  } catch (e) {
    console.log('Db get new plant by id error', id, e);
    throw e;
  }
};

export const deleteNewPlantById = async (id: string) => {
  const db = await openDb();
  try {
    return db.delete('plants', id);
  } catch (e) {
    console.log('Db delete new plant by id error', id, e);
    throw e;
  }
};
