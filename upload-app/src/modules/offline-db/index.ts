import { DBSchema, openDB } from 'idb';
import { AssignedSpeciesResponseData } from 'modules/species';

interface RwDbSchema extends DBSchema {
  assignedSpecies: {
    key: number;
    value: AssignedSpeciesResponseData;
  };
}

const rwDbName = 'RwDb';

export const openDb = async () => {
  return await openDB<RwDbSchema>(rwDbName, 1, {
    upgrade: (db) => {
      if (!db.objectStoreNames.contains('assignedSpecies')) {
        db.createObjectStore('assignedSpecies');
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
    console.log('Db save error', e);
  }
};

export const loadAssignedSpecies = async () => {
  const db = await openDb();
  try {
    const obj = await db.get('assignedSpecies', 0);
    return obj;
  } catch (e) {
    console.log('Db load error', e);
  }
};
