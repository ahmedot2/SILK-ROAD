import { create } from "zustand";

interface AuthState {
  address: string | null;
  isConnected: boolean;
  setAddress: (address: string | null) => void;
  setConnected: (connected: boolean) => void;
  disconnect: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  address: null,
  isConnected: false,
  setAddress: (address) => set({ address }),
  setConnected: (connected) => set({ isConnected: connected }),
  disconnect: () => set({ address: null, isConnected: false }),
}));
