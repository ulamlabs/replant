import { DBSchema, IDBPDatabase, openDB } from 'idb';
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

let db: IDBPDatabase<RwDbSchema>;

const getDb = async () => {
  if (!db) {
    db = await openDb();
  }
  return db;
};

const openDb = async () => {
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
  const db = await getDb();
  const tx = db.transaction('assignedSpecies', 'readwrite');
  await Promise.all([tx.store.put(value, 0), tx.done]);
};

export const loadAssignedSpecies = async () => {
  const db = await getDb();
  return db.get('assignedSpecies', 0);
};

export const saveNewTree = async (tree: NewTree, capturedAt: string) => {
  const db = await getDb();
  const tx = db.transaction('trees', 'readwrite');
  const obj = {
    capturedAt,
    id: getId(),
    tree,
  };
  await Promise.all([tx.store.add(obj), tx.done]);
};

export const getNewTreesTotalCount = async () => {
  const db = await getDb();
  return db.count('trees');
};

export const loadNewTrees = async (offset: number, count: number) => {
  const result: OfflineTree[] = [];
  const db = await openDb();
  const tx = await db.transaction('trees', 'readonly');
  let cursor = await tx.store.openCursor();
  if (!cursor) {
    return [];
  }
  if (offset > 0) {
    cursor = await cursor.advance(offset);
  }
  for (let i = 0; i < count; i++) {
    if (!cursor) {
      break;
    }
    result.push(cursor.value);
    cursor = await cursor.continue();
  }
  return result;
};

export const getNewTreesKeys = async () => {
  const db = await getDb();
  return db.getAllKeys('trees');
};

export const getNewTreeById = async (id: string) => {
  const db = await getDb();
  return db.get('trees', id);
};

export const deleteNewTreeById = async (id: string) => {
  const db = await getDb();
  return db.delete('trees', id);
};

(window as any).saveNewTree = saveNewTree;
(window as any).loadNewTrees = loadNewTrees;
(window as any).getNewTreesTotalCount = getNewTreesTotalCount;
(window as any).getNewTreesKeys = getNewTreesKeys;
