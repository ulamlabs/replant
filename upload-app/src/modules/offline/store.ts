import { postPlants } from 'modules/plants';
import { create } from 'zustand';
import * as offlineDb from './db';

type OfflineState = {
  isUploading: boolean;
  totalCount: number;
  uploadedCount: number;
};

type OfflineActions = {
  incTotalCount: () => void;
  incUploadedCount: () => void;
  syncTotalCount: () => void;
  upload: () => void;
};

const initialValue: OfflineState = {
  isUploading: false,
  totalCount: 0,
  uploadedCount: 0,
};

export const useOfflineStore = create<OfflineState & OfflineActions>()(
  (set, get) => ({
    ...initialValue,
    incTotalCount: () => {
      set((prevState) => ({ totalCount: prevState.totalCount + 1 }));
    },
    incUploadedCount: () => {
      set((prevState) => ({ uploadedCount: prevState.uploadedCount + 1 }));
    },
    syncTotalCount: async () => {
      set({ totalCount: await offlineDb.getNewTreesTotalCount() });
    },
    upload: async () => {
      try {
        set({ isUploading: true, uploadedCount: 0 });
        const keys = await offlineDb.getNewTreesKeys();
        for (const key of keys) {
          const plant = await offlineDb.getNewTreeById(key);
          if (!plant) {
            continue;
          }
          await postPlants({
            ...plant.tree,
            ...(plant.capturedAt ? { captured_at: plant.capturedAt } : {}), // fallback for trees captured before NewTree had captured_at field
          });
          await offlineDb.deleteNewTreeById(key);
          get().incUploadedCount();
        }
      } finally {
        set({ isUploading: false, uploadedCount: 0 });
        get().syncTotalCount();
      }
    },
  })
);
