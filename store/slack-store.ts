import { create } from "zustand";
import { api } from "../lib/api";

interface SlackChannel {
  id: string;
  name: string;
  is_private: boolean;
  num_members: number;
  unread_count?: number;
}

interface SlackMessage {
  id: string;
  text: string;
  user: string;
  username?: string;
  real_name?: string;
  ts: string;
  channel: string;
}

interface SlackStore {
  isConnected: boolean;
  isLoading: boolean;
  error: string | null;
  channels: SlackChannel[];
  messages: SlackMessage[];
  selectedChannel: string | null;
  
  // Actions
  connect: () => Promise<void>;
  disconnect: () => void;
  fetchChannels: () => Promise<void>;
  fetchMessages: (channelId: string) => Promise<void>;
  setSelectedChannel: (channelId: string) => void;
  clearError: () => void;
}

export const useSlackStore = create<SlackStore>((set, get) => ({
  isConnected: false,
  isLoading: false,
  error: null,
  channels: [],
  messages: [],
  selectedChannel: null,

  connect: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getSlackInstallUrl();
      // Open the Slack OAuth URL in a new window
      window.open(response.url, '_blank', 'width=600,height=600');
      set({ isLoading: false });
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to connect to Slack", 
        isLoading: false 
      });
    }
  },

  disconnect: () => {
    set({ 
      isConnected: false, 
      channels: [], 
      messages: [], 
      selectedChannel: null 
    });
  },

  fetchChannels: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getSlackConversations();
      if (response.ok) {
        const channels = response.channels || [];
        set({ 
          channels, 
          isConnected: true, 
          isLoading: false 
        });
      } else {
        set({ 
          error: response.error || "Failed to fetch channels", 
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to fetch channels", 
        isLoading: false 
      });
    }
  },

  fetchMessages: async (channelId: string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.getSlackChannelMessages(channelId);
      if (response.ok) {
        const messages = response.messages || [];
        set({ 
          messages, 
          selectedChannel: channelId,
          isLoading: false 
        });
      } else {
        set({ 
          error: response.error || "Failed to fetch messages", 
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: error instanceof Error ? error.message : "Failed to fetch messages", 
        isLoading: false 
      });
    }
  },

  setSelectedChannel: (channelId: string) => {
    set({ selectedChannel: channelId });
    get().fetchMessages(channelId);
  },

  clearError: () => set({ error: null }),
})); 