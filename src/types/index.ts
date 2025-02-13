export interface User {
  id: string;
  address?: string;
  email?: string;
  username: string;
  avatar?: string;
  createdAt: Date;
}

export interface Asset {
  id: string;
  name: string;
  description: string;
  owner: string;
  price: number;
  totalSupply: number;
  availableSupply: number;
  imageUrl: string;
  verified: boolean;
  createdAt: Date;
}

export interface Listing {
  id: string;
  seller: string;
  title: string;
  description: string;
  price: number;
  currency: string;
  status: "active" | "sold" | "cancelled";
  createdAt: Date;
}

export interface Raffle {
  id: string;
  creator: string;
  prize: Asset;
  ticketPrice: number;
  totalTickets: number;
  soldTickets: number;
  endDate: Date;
  status: "active" | "completed" | "cancelled";
  winner?: string;
  createdAt: Date;
}
