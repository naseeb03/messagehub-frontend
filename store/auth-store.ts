import { create } from "zustand";
import { User } from "../lib/data";
import { api } from "../lib/api";

interface AuthStore {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set, get) => ({
  user: null,
  token: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.login(email, password);
      
      // Create user object from backend response
      const user: User = {
        id: response.user.id.toString(),
        name: response.user.name || email.split('@')[0], // Use backend name or email prefix as fallback
        email: response.user.email,
        avatar: "/placeholder.svg?height=32&width=32",
      };

      set({ user, token: response.access_token, isLoading: false });
      
      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", response.access_token);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Login failed", 
        isLoading: false 
      });
    }
  },

  signup: async (name: string, email: string, password: string) => {
    set({ isLoading: true, error: null });
    try {
      await api.signup(name, email, password);
      
      // Auto login after signup
      await get().login(email, password);
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Signup failed", 
        isLoading: false 
      });
    }
  },

  logout: () => {
    set({ user: null, token: null });
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  },

  clearError: () => set({ error: null }),
}));
