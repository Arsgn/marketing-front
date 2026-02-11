import { create } from "zustand";

interface AuthState {
  user: AUTH.User | null;
  isAuth: boolean;
  setUser: (user: AUTH.User) => void;
  clearUser: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuth: false,

  setUser: (user) =>
    set({
      user,
      isAuth: true,
    }),

  clearUser: () =>
    set({
      user: null,
      isAuth: false,
    }),
}));
