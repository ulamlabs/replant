import { DBSchema, openDB } from 'idb';
import { NewTree } from 'modules/plants';
import { AssignedSpeciesResponseData } from 'modules/species';
import { v4 as getId } from 'uuid';

export type OfflineTree = {
  id: string;
  capturedAt: string;
  tree: NewTree;
};

interface RwDbSchema extends DBSchema {
  assignedSpecies: {
    key: number;
    value: AssignedSpeciesResponseData;
  };
  trees: {
    key: string;
    value: OfflineTree;
  };
}

const dbName = 'RW Offline DB';

export const openDb = async () => {
  return await openDB<RwDbSchema>(dbName, 1, {
    upgrade: (db) => {
      if (!db.objectStoreNames.contains('assignedSpecies')) {
        db.createObjectStore('assignedSpecies');
      }
      if (!db.objectStoreNames.contains('trees')) {
        db.createObjectStore('trees', {
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
    console.error('Db assigned species save error', e);
    throw e;
  }
};

export const loadAssignedSpecies = async () => {
  const db = await openDb();
  try {
    const species = await db.get('assignedSpecies', 0);
    return species;
  } catch (e) {
    console.error('Db assigned species load error', e);
    throw e;
  }
};

export const saveNewTree = async (tree: NewTree, capturedAt: string) => {
  const db = await openDb();
  try {
    const tx = db.transaction('trees', 'readwrite');
    const obj = {
      capturedAt,
      id: getId(),
      tree,
    };
    await Promise.all([tx.store.add(obj), tx.done]);
  } catch (e) {
    console.error('Db new tree save error', e);
    throw e;
  }
};

export const loadNewTrees = async () => {
  const db = await openDb();
  try {
    return db.getAll('trees');
  } catch (e) {
    console.error('Db new tree load error', e);
    throw e;
  }
};

export const getNewTreesTotalCount = async () => {
  const db = await openDb();
  try {
    return db.count('trees');
  } catch (e) {
    console.error('Db new trees total count error', e);
    throw e;
  }
};

export const getNewTreesKeys = async () => {
  const db = await openDb();
  try {
    return db.getAllKeys('trees');
  } catch (e) {
    console.error('Db new trees all keys error', e);
    throw e;
  }
};

export const getNewTreeById = async (id: string) => {
  const db = await openDb();
  try {
    return db.get('trees', id);
  } catch (e) {
    console.error('Db get new tree by id error', id, e);
    throw e;
  }
};

export const deleteNewTreeById = async (id: string) => {
  const db = await openDb();
  try {
    return db.delete('trees', id);
  } catch (e) {
    console.error('Db delete new tree by id error', id, e);
    throw e;
  }
};
