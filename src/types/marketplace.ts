export type ListingCategory =
  | "real_estate"
  | "vehicles"
  | "electronics"
  | "furniture"
  | "fashion"
  | "services"
  | "jobs"
  | "other";

export type ListingStatus = "active" | "pending" | "sold" | "cancelled";

export type PaymentMethod = "slk" | "crypto" | "fiat";

export type EscrowStatus =
  | "awaiting_payment"
  | "in_escrow"
  | "released"
  | "disputed"
  | "refunded";

export interface ListingImage {
  id: string;
  url: string;
  isPrimary: boolean;
}

export interface ListingLocation {
  city: string;
  area?: string;
  coordinates?: [number, number];
}

export interface MarketplaceListing {
  id: string;
  title: string;
  description: string;
  category: ListingCategory;
  subcategory?: string;
  price: number;
  negotiable: boolean;
  condition?: "new" | "like_new" | "good" | "fair" | "poor";
  paymentMethods: PaymentMethod[];
  escrowRequired: boolean;
  images: ListingImage[];
  location: ListingLocation;
  seller: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
    verified: boolean;
    joinedDate: Date;
    totalSales: number;
    responseRate: number;
  };
  features?: Record<string, string | number | boolean>;
  status: ListingStatus;
  views: number;
  favorites: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ListingFilters {
  category?: ListingCategory;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string[];
  location?: string;
  paymentMethods?: PaymentMethod[];
  escrowOnly?: boolean;
  verifiedSellers?: boolean;
  sortBy?: "price_asc" | "price_desc" | "date" | "popularity";
}

export interface EscrowTransaction {
  id: string;
  listingId: string;
  buyer: string;
  seller: string;
  amount: number;
  currency: PaymentMethod;
  status: EscrowStatus;
  disputeReason?: string;
  releaseCode?: string;
  createdAt: Date;
  updatedAt: Date;
}
