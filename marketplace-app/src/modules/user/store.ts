import { ReactNode } from 'react';
import { create } from 'zustand';

type AuthState = {
  firstLoginStep: number;
  selectedWalletImg: ReactNode;
  editUserDetails: boolean;
};

type AuthActions = {
  nextStep: () => void;
  setWalletImg: (img: ReactNode) => void;
  setEditUserDetails: (val: boolean) => void;
};

const initialValues = {
  firstLoginStep: 1,
  selectedWalletImg: null,
  editUserDetails: false,
};

export const useUserStore = create<AuthState & AuthActions>()((set) => ({
  ...initialValues,
  nextStep: () => set((state) => ({ firstLoginStep: ++state.firstLoginStep })),
  setWalletImg: (img) => set({ selectedWalletImg: img }),
  setEditUserDetails: (val) => set({ editUserDetails: val }),
}));
