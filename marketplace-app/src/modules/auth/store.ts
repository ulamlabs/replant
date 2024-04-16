import { create } from 'zustand';

type AuthState = {
  name: string;
  nameError: string;
  email: string;
  emailError: string;
  password: string;
  passwordError: string;
  switchValue: boolean;
};

type AuthActions = {
  setName: (val: string) => void;
  setEmail: (val: string) => void;
  setPassword: (val: string) => void;
  setNameError: (val: string) => void;
  setEmailError: (val: string) => void;
  setPasswordError: (val: string) => void;
  toggleSwitchValue: () => void;
  reset: () => void;
};

const initialValues = {
  name: '',
  nameError: '',
  email: '',
  emailError: '',
  password: '',
  passwordError: '',
  switchValue: true,
};

export const useAuthStore = create<AuthState & AuthActions>()((set) => ({
  ...initialValues,
  setName: (name) => set({ name }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setNameError: (nameError) => set({ nameError }),
  setEmailError: (emailError) => set({ emailError }),
  setPasswordError: (passwordError) => set({ passwordError }),
  toggleSwitchValue: () =>
    set((state) => ({ switchValue: !state.switchValue })),
  reset: () => set(initialValues),
}));
