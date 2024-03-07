import { create } from 'zustand';
import { getNewPlantsTotalCount } from '.';

type OfflineState = {
  isUploading: boolean;
  totalCount: number;
  uploadedCount: number;
};

type OfflineActions = {
  incTotalCount: () => void;
  incUploadedCount: () => void;
  reset: () => void;
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
    reset: () => set(initialValue),
    syncTotalCount: async () => {
      set({ totalCount: await getNewPlantsTotalCount() });
    },
    upload: () => {},
  })
);
