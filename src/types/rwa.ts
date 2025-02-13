export type AssetType =
  | "real_estate"
  | "private_equity"
  | "fund"
  | "debt"
  | "other";

export type AssetStatus = "pending" | "approved" | "rejected" | "tokenized";

export interface TokenizedAsset extends Asset {
  assetType: AssetType;
  status: AssetStatus;
  documents: AssetDocument[];
  compliance: ComplianceInfo;
  tokenMetrics: TokenMetrics;
  distribution: DistributionInfo;
}

export interface AssetDocument {
  id: string;
  type: "legal" | "financial" | "technical" | "other";
  name: string;
  url: string;
  verified: boolean;
  uploadedAt: Date;
}

export interface ComplianceInfo {
  kycRequired: boolean;
  accreditationRequired: boolean;
  jurisdictions: string[];
  restrictions: string[];
}

export interface TokenMetrics {
  tokenSymbol: string;
  tokenPrice: number;
  totalSupply: number;
  minInvestment: number;
  maxInvestment: number;
  tradingEnabled: boolean;
}

export interface DistributionInfo {
  channels: ("dex" | "cex" | "otc")[];
  lockupPeriod: number; // in days
  vestingSchedule?: VestingSchedule;
}

export interface VestingSchedule {
  cliff: number; // in days
  duration: number; // in days
  intervals: "daily" | "weekly" | "monthly";
  initialRelease: number; // percentage
}
