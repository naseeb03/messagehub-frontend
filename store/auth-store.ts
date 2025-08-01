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
      
      // Use the actual user data from the backend response
      const user: User = {
        id: response.user.id.toString(), // Convert to string to match User interface
        name: response.user.name,
        email: response.user.email,
        avatar: "/placeholder.svg?height=32&width=32",
        token: response.access_token,
        slack_token: response.user.slack_token,
        gmail_token: response.user.gmail_token,
        jira_token: response.user.jira_token,
        outlook_token: response.user.outlook_token,
        gmail_refresh_token: response.user.gmail_refresh_token,
      };

      console.log(user);
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
      const response = await api.signup(name, email, password);
      
      // Use the actual user data from the signup response
      const user: User = {
        id: response.user.id.toString(), // Convert to string to match User interface
        name: response.user.name,
        email: response.user.email,
        avatar: "/placeholder.svg?height=32&width=32",
        token: response.access_token,
        slack_token: response.user.slack_token,
        gmail_token: response.user.gmail_token,
        jira_token: response.user.jira_token,
        outlook_token: response.user.outlook_token,
        gmail_refresh_token: response.user.gmail_refresh_token,
      };

      console.log(user);
      // For signup, we don't get a token, so we'll need to login to get the token
      // But we can set the user data immediately
      set({ user, isLoading: false });
      
      // Save user to localStorage
      localStorage.setItem("user", JSON.stringify(user));
      
      // Auto login after signup to get the token
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
