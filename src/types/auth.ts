export interface UserRole {
  id: string;
  name: "admin" | "user" | "merchant";
  permissions: string[];
}

export interface UserKYC {
  id: string;
  userId: string;
  status: "pending" | "approved" | "rejected";
  documentType: "passport" | "id_card" | "driving_license";
  documentNumber: string;
  documentImage: string;
  verifiedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  address: string;
  nonce: string; // For wallet signature verification
  email?: string;
  username?: string;
  role: UserRole;
  kycStatus: "none" | "pending" | "approved" | "rejected";
  kyc?: UserKYC;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthSession {
  id: string;
  userId: string;
  token: string;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}
