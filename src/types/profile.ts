export interface UserProfile {
  id: string;
  address: string;
  displayName?: string;
  bio?: string;
  avatarUrl?: string;
  preferences: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  userId: string;
  type: "buy" | "sell" | "transfer";
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed";
  metadata: Record<string, any>;
  createdAt: Date;
  updatedAt: Date;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface Notification {
  id: string;
  userId: string;
  type: string;
  title: string;
  message: string;
  isRead: boolean;
  metadata: Record<string, any>;
  createdAt: Date;
}

export interface GlobalSetting {
  key: string;
  value: any;
  description?: string;
  updatedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}
