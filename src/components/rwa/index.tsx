import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { type Asset } from "@/types";
import { AssetFilters } from "./AssetFilters";
import { AssetCard } from "./AssetCard";
import { TokenizedAsset } from "@/types/rwa";
import { HowItWorks } from "./HowItWorks";

const MOCK_ASSETS: Asset[] = [
  {
    id: "1",
    name: "Luxury Apartment",
    description: "Prime location real estate investment",
    owner: "0x123",
    price: 500000,
    totalSupply: 1000,
    availableSupply: 750,
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
    verified: true,
    createdAt: new Date(),
  },
];

import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { TokenizeAssetForm } from "./TokenizeAssetForm";

export default function RWA() {
  const [showTokenizeForm, setShowTokenizeForm] = useState(false);
  const [activeTab, setActiveTab] = useState<"marketplace" | "portfolio">(
    "marketplace",
  );

  const MOCK_TOKENIZED_ASSETS: TokenizedAsset[] = [
    {
      id: "1",
      name: "Luxury Apartment Complex",
      description:
        "Prime location real estate investment in Miami's financial district",
      owner: "0x123",
      price: 5000000,
      totalSupply: 5000,
      availableSupply: 3750,
      imageUrl:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
      verified: true,
      createdAt: new Date(),
      assetType: "real_estate",
      status: "approved",
      documents: [],
      compliance: {
        kycRequired: true,
        accreditationRequired: true,
        jurisdictions: ["US", "EU"],
        restrictions: ["No US persons"],
      },
      tokenMetrics: {
        tokenSymbol: "MIAMI",
        tokenPrice: 1000,
        totalSupply: 5000,
        minInvestment: 1000,
        maxInvestment: 500000,
        tradingEnabled: true,
      },
      distribution: {
        channels: ["dex", "otc"],
        lockupPeriod: 180,
      },
    },
    {
      id: "2",
      name: "Tech Growth Fund",
      description: "Diversified portfolio of high-growth technology companies",
      owner: "0x456",
      price: 10000000,
      totalSupply: 10000,
      availableSupply: 8000,
      imageUrl:
        "https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=500",
      verified: true,
      createdAt: new Date(),
      assetType: "fund",
      status: "tokenized",
      documents: [],
      compliance: {
        kycRequired: true,
        accreditationRequired: true,
        jurisdictions: ["US", "EU", "UK", "SG"],
        restrictions: ["Accredited investors only"],
      },
      tokenMetrics: {
        tokenSymbol: "TECHX",
        tokenPrice: 1000,
        totalSupply: 10000,
        minInvestment: 5000,
        maxInvestment: 1000000,
        tradingEnabled: true,
      },
      distribution: {
        channels: ["dex", "cex", "otc"],
        lockupPeriod: 365,
        vestingSchedule: {
          cliff: 90,
          duration: 720,
          intervals: "monthly",
          initialRelease: 10,
        },
      },
    },
    {
      id: "3",
      name: "Green Energy Infrastructure",
      description: "Solar and wind farm project bonds",
      owner: "0x789",
      price: 25000000,
      totalSupply: 25000,
      availableSupply: 20000,
      imageUrl:
        "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500",
      verified: true,
      createdAt: new Date(),
      assetType: "debt",
      status: "approved",
      documents: [],
      compliance: {
        kycRequired: true,
        accreditationRequired: false,
        jurisdictions: ["EU", "UK"],
        restrictions: [],
      },
      tokenMetrics: {
        tokenSymbol: "GRNB",
        tokenPrice: 1000,
        totalSupply: 25000,
        minInvestment: 1000,
        maxInvestment: 5000000,
        tradingEnabled: true,
      },
      distribution: {
        channels: ["dex", "otc"],
        lockupPeriod: 90,
      },
    },
    {
      id: "4",
      name: "AI Startup Equity",
      description: "Pre-IPO shares of leading AI technology company",
      owner: "0xabc",
      price: 15000000,
      totalSupply: 15000,
      availableSupply: 12000,
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=500",
      verified: true,
      createdAt: new Date(),
      assetType: "private_equity",
      status: "pending",
      documents: [],
      compliance: {
        kycRequired: true,
        accreditationRequired: true,
        jurisdictions: ["US", "EU", "UK", "SG"],
        restrictions: ["Qualified investors only"],
      },
      tokenMetrics: {
        tokenSymbol: "AITECH",
        tokenPrice: 1000,
        totalSupply: 15000,
        minInvestment: 10000,
        maxInvestment: 2000000,
        tradingEnabled: false,
      },
      distribution: {
        channels: ["otc"],
        lockupPeriod: 720,
        vestingSchedule: {
          cliff: 180,
          duration: 1080,
          intervals: "monthly",
          initialRelease: 0,
        },
      },
    },
  ];

  return (
    <MainLayout>
      <Dialog open={showTokenizeForm} onOpenChange={setShowTokenizeForm}>
        <DialogContent className="max-w-2xl">
          <TokenizeAssetForm />
        </DialogContent>
      </Dialog>

      <div className="space-y-6">
        <HowItWorks />
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Real World Assets</h1>
            <p className="text-muted-foreground">
              Discover and invest in tokenized real-world assets
            </p>
          </div>
          <Button onClick={() => setShowTokenizeForm(true)}>
            Tokenize Asset
          </Button>
        </div>

        <div className="flex space-x-4 border-b">
          <button
            className={`pb-2 px-1 ${activeTab === "marketplace" ? "border-b-2 border-primary font-semibold" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("marketplace")}
          >
            Marketplace
          </button>
          <button
            className={`pb-2 px-1 ${activeTab === "portfolio" ? "border-b-2 border-primary font-semibold" : "text-muted-foreground"}`}
            onClick={() => setActiveTab("portfolio")}
          >
            My Portfolio
          </button>
        </div>

        <div className="grid grid-cols-4 gap-6">
          <div className="col-span-1">
            <AssetFilters onFilterChange={console.log} />
          </div>
          <div className="col-span-3 grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_TOKENIZED_ASSETS.map((asset) => (
              <AssetCard
                key={asset.id}
                asset={asset}
                onInvest={() => console.log("Invest in", asset.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
