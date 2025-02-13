import { create } from "zustand";
import { type Raffle } from "@/types";

interface RafflesState {
  raffles: Raffle[];
  setRaffles: (raffles: Raffle[]) => void;
  addRaffle: (raffle: Raffle) => void;
  updateRaffle: (id: string, updates: Partial<Raffle>) => void;
}

export const useRafflesStore = create<RafflesState>((set) => ({
  raffles: [],
  setRaffles: (raffles) => set({ raffles }),
  addRaffle: (raffle) =>
    set((state) => ({
      raffles: [...state.raffles, raffle],
    })),
  updateRaffle: (id, updates) =>
    set((state) => ({
      raffles: state.raffles.map((r) =>
        r.id === id ? { ...r, ...updates } : r,
      ),
    })),
}));
