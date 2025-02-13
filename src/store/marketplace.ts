import { create } from "zustand";
import {
  MarketplaceListing,
  ListingFilters,
  EscrowTransaction,
} from "@/types/marketplace";

interface MarketplaceState {
  listings: MarketplaceListing[];
  filters: ListingFilters;
  escrowTransactions: EscrowTransaction[];
  setListings: (listings: MarketplaceListing[]) => void;
  setFilters: (filters: ListingFilters) => void;
  addListing: (listing: MarketplaceListing) => void;
  updateListing: (id: string, updates: Partial<MarketplaceListing>) => void;
  removeListing: (id: string) => void;
  addEscrowTransaction: (transaction: EscrowTransaction) => void;
  updateEscrowTransaction: (
    id: string,
    updates: Partial<EscrowTransaction>,
  ) => void;
}

export const useMarketplaceStore = create<MarketplaceState>((set) => ({
  listings: [],
  filters: {},
  escrowTransactions: [],
  setListings: (listings) => set({ listings }),
  setFilters: (filters) => set({ filters }),
  addListing: (listing) =>
    set((state) => ({
      listings: [...state.listings, listing],
    })),
  updateListing: (id, updates) =>
    set((state) => ({
      listings: state.listings.map((l) =>
        l.id === id ? { ...l, ...updates } : l,
      ),
    })),
  removeListing: (id) =>
    set((state) => ({
      listings: state.listings.filter((l) => l.id !== id),
    })),
  addEscrowTransaction: (transaction) =>
    set((state) => ({
      escrowTransactions: [...state.escrowTransactions, transaction],
    })),
  updateEscrowTransaction: (id, updates) =>
    set((state) => ({
      escrowTransactions: state.escrowTransactions.map((t) =>
        t.id === id ? { ...t, ...updates } : t,
      ),
    })),
}));
