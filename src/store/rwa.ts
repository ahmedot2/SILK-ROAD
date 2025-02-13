import { create } from "zustand";
import { type Asset } from "@/types";

interface RWAState {
  assets: Asset[];
  setAssets: (assets: Asset[]) => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
}

export const useRWAStore = create<RWAState>((set) => ({
  assets: [],
  setAssets: (assets) => set({ assets }),
  addAsset: (asset) =>
    set((state) => ({
      assets: [...state.assets, asset],
    })),
  updateAsset: (id, updates) =>
    set((state) => ({
      assets: state.assets.map((a) => (a.id === id ? { ...a, ...updates } : a)),
    })),
}));
