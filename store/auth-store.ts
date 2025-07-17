import { create } from "zustand";
import { User } from "../lib/data";

interface AuthStore {
  user: User | null;
  setUser: (user: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  setUser: (user) => {
    set({ user });
    localStorage.setItem("user", JSON.stringify(user));
  },
  logout: () => {
    set({ user: null });
    localStorage.removeItem("user");
  },
}));
