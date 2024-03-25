import { create } from 'zustand';

type State = {
  isUserOpen: boolean;
  isNavOpen: boolean;
};

type Actions = {
  toggleUser: () => void;
  toggleNav: () => void;
  closeAll: () => void;
};

export const useNavToggle = create<State & Actions>((set) => ({
  isUserOpen: false,
  isNavOpen: false,
  toggleUser: () =>
    set((state) => ({ isUserOpen: !state.isUserOpen, isNavOpen: false })),
  toggleNav: () =>
    set((state) => ({ isNavOpen: !state.isNavOpen, isUserOpen: false })),
  closeAll: () => set(() => ({ isUserOpen: false, isNavOpen: false })),
}));
