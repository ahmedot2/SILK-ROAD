import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import { ListingCard } from "./ListingCard";
import { ListingFilters } from "./ListingFilters";
import { ListingDetails } from "./ListingDetails";
import { PaymentDialog } from "./PaymentDialog";
import {
  MarketplaceListing,
  ListingFilters as Filters,
  PaymentMethod,
} from "@/types/marketplace";
import { Plus, Search } from "lucide-react";
import { HowItWorks } from "./HowItWorks";
import { Input } from "@/components/ui/input";
import { useMarketplaceStore } from "@/store/marketplace";

const MOCK_LISTINGS: MarketplaceListing[] = [
  {
    id: "1",
    title: "2024 Tesla Model S Plaid",
    description:
      "Brand new Tesla Model S Plaid, Midnight Silver Metallic, Full Self-Driving capability",
    category: "vehicles",
    subcategory: "cars",
    price: 115000,
    negotiable: true,
    condition: "new",
    paymentMethods: ["slk", "crypto"],
    escrowRequired: true,
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "Downtown" },
    seller: {
      id: "1",
      name: "Premium Auto Dubai",
      rating: 4.9,
      verified: true,
      joinedDate: new Date("2023-01-01"),
      totalSales: 45,
      responseRate: 98,
    },
    features: { mileage: 0, color: "silver", transmission: "automatic" },
    status: "active",
    views: 1245,
    favorites: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Luxury Penthouse - Palm Jumeirah",
    description:
      "5-bedroom penthouse with private pool and panoramic sea views",
    category: "real_estate",
    subcategory: "residential",
    price: 15000000,
    negotiable: true,
    condition: "new",
    paymentMethods: ["slk", "crypto", "fiat"],
    escrowRequired: true,
    images: [
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "Palm Jumeirah" },
    seller: {
      id: "2",
      name: "Luxury Real Estate LLC",
      rating: 4.8,
      verified: true,
      joinedDate: new Date("2022-06-01"),
      totalSales: 28,
      responseRate: 95,
    },
    features: { bedrooms: 5, bathrooms: 6, area: 8500, parking: 3 },
    status: "active",
    views: 856,
    favorites: 124,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Limited Edition Rolex Daytona",
    description: "Platinum Daytona with ice blue dial, unworn condition",
    category: "luxury",
    subcategory: "watches",
    price: 185000,
    negotiable: false,
    condition: "new",
    paymentMethods: ["slk", "crypto"],
    escrowRequired: true,
    images: [
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "Dubai Mall" },
    seller: {
      id: "3",
      name: "Luxury Timepieces",
      rating: 5.0,
      verified: true,
      joinedDate: new Date("2023-03-15"),
      totalSales: 67,
      responseRate: 100,
    },
    features: { brand: "Rolex", model: "Daytona", material: "Platinum" },
    status: "active",
    views: 432,
    favorites: 78,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "4",
    title: "Gaming PC Setup - RTX 4090",
    description: "Complete gaming setup with top-of-the-line components",
    category: "electronics",
    subcategory: "computers",
    price: 8500,
    negotiable: true,
    condition: "new",
    paymentMethods: ["slk", "crypto", "fiat"],
    escrowRequired: true,
    images: [
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1616588589676-62b3bd4ff6d2?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "Business Bay" },
    seller: {
      id: "4",
      name: "Tech Haven",
      rating: 4.7,
      verified: true,
      joinedDate: new Date("2023-08-01"),
      totalSales: 156,
      responseRate: 97,
    },
    features: { gpu: "RTX 4090", cpu: "i9-13900K", ram: "64GB" },
    status: "active",
    views: 678,
    favorites: 45,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "5",
    title: "Private Yacht - 2023 Azimut 78",
    description: "Luxury yacht with 4 cabins, fully equipped and ready to sail",
    category: "vehicles",
    subcategory: "boats",
    price: 8500000,
    negotiable: true,
    condition: "new",
    paymentMethods: ["slk", "crypto"],
    escrowRequired: true,
    images: [
      {
        id: "5",
        url: "https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "Dubai Marina" },
    seller: {
      id: "5",
      name: "Marine Luxury",
      rating: 4.9,
      verified: true,
      joinedDate: new Date("2022-12-01"),
      totalSales: 12,
      responseRate: 100,
    },
    features: { length: "78ft", cabins: 4, year: 2023 },
    status: "active",
    views: 345,
    favorites: 67,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "6",
    title: "Rare Bitcoin Mining Farm",
    description: "Operational mining farm with 1000 ASIC miners",
    category: "business",
    subcategory: "crypto",
    price: 2500000,
    negotiable: true,
    condition: "like_new",
    paymentMethods: ["slk", "crypto"],
    escrowRequired: true,
    images: [
      {
        id: "6",
        url: "https://images.unsplash.com/photo-1631897642056-97a7abff6818?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "Silicon Oasis" },
    seller: {
      id: "6",
      name: "Crypto Assets LLC",
      rating: 4.8,
      verified: true,
      joinedDate: new Date("2023-05-01"),
      totalSales: 8,
      responseRate: 95,
    },
    features: { miners: 1000, hashrate: "100 PH/s", power: "3.5 MW" },
    status: "active",
    views: 567,
    favorites: 89,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "7",
    title: "Bored Ape NFT Collection",
    description: "Rare collection of 5 Bored Ape Yacht Club NFTs",
    category: "digital",
    subcategory: "nft",
    price: 750000,
    negotiable: false,
    condition: "new",
    paymentMethods: ["slk", "crypto"],
    escrowRequired: true,
    images: [
      {
        id: "7",
        url: "https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "DIFC" },
    seller: {
      id: "7",
      name: "NFT Vault",
      rating: 4.9,
      verified: true,
      joinedDate: new Date("2023-02-15"),
      totalSales: 34,
      responseRate: 98,
    },
    features: { collection: "BAYC", quantity: 5, rarity: "Legendary" },
    status: "active",
    views: 890,
    favorites: 156,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "8",
    title: "Commercial Building - Business Bay",
    description: "Prime location commercial building with 100% occupancy",
    category: "real_estate",
    subcategory: "commercial",
    price: 45000000,
    negotiable: true,
    condition: "good",
    paymentMethods: ["slk", "crypto", "fiat"],
    escrowRequired: true,
    images: [
      {
        id: "8",
        url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "Business Bay" },
    seller: {
      id: "8",
      name: "Commercial RE Group",
      rating: 4.7,
      verified: true,
      joinedDate: new Date("2022-09-01"),
      totalSales: 15,
      responseRate: 92,
    },
    features: { floors: 25, area: 250000, occupancy: "100%" },
    status: "active",
    views: 445,
    favorites: 67,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "9",
    title: "Private Island - World Islands",
    description: "Exclusive private island with development rights",
    category: "real_estate",
    subcategory: "islands",
    price: 85000000,
    negotiable: true,
    condition: "new",
    paymentMethods: ["slk", "crypto"],
    escrowRequired: true,
    images: [
      {
        id: "9",
        url: "https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "World Islands" },
    seller: {
      id: "9",
      name: "Island Properties",
      rating: 5.0,
      verified: true,
      joinedDate: new Date("2023-01-15"),
      totalSales: 3,
      responseRate: 100,
    },
    features: { area: 350000, beachfront: "1.2km", development: "Approved" },
    status: "active",
    views: 234,
    favorites: 45,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "10",
    title: "Lamborghini Aventador SVJ",
    description: "Limited edition, only 900 units worldwide",
    category: "vehicles",
    subcategory: "cars",
    price: 950000,
    negotiable: false,
    condition: "new",
    paymentMethods: ["slk", "crypto"],
    escrowRequired: true,
    images: [
      {
        id: "10",
        url: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=500",
        isPrimary: true,
      },
    ],
    location: { city: "Dubai", area: "Sheikh Zayed Road" },
    seller: {
      id: "10",
      name: "Exotic Cars Dubai",
      rating: 4.9,
      verified: true,
      joinedDate: new Date("2023-04-01"),
      totalSales: 23,
      responseRate: 97,
    },
    features: { engine: "V12", power: "770hp", acceleration: "2.8s" },
    status: "active",
    views: 678,
    favorites: 123,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export default function Marketplace() {
  const [filters, setFilters] = useState<Filters>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedListing, setSelectedListing] =
    useState<MarketplaceListing | null>(null);
  const [showPayment, setShowPayment] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState<{
    amount: number;
    method: PaymentMethod;
  } | null>(null);

  const handlePurchase = (amount: number, paymentMethod: PaymentMethod) => {
    setPaymentDetails({ amount, method: paymentMethod });
    setShowPayment(true);
  };

  const handlePaymentConfirm = () => {
    setShowPayment(false);
    setSelectedListing(null);
  };

  const handleMessage = (message: string) => {
    console.log("Send message:", message);
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <HowItWorks />
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">Marketplace</h1>
            <p className="text-muted-foreground">
              Buy and sell items with SLK tokens
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" /> List Item
          </Button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search listings..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="col-span-1">
            <ListingFilters filters={filters} onFilterChange={setFilters} />
          </div>
          <div className="col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {MOCK_LISTINGS.map((listing) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  onFavorite={() => console.log("Favorite", listing.id)}
                  onClick={() => setSelectedListing(listing)}
                />
              ))}
            </div>
          </div>
        </div>

        {selectedListing && (
          <ListingDetails
            listing={selectedListing}
            onClose={() => setSelectedListing(null)}
            onPurchase={handlePurchase}
            onMessage={handleMessage}
          />
        )}

        {showPayment && paymentDetails && selectedListing && (
          <PaymentDialog
            open={showPayment}
            onClose={() => setShowPayment(false)}
            amount={paymentDetails.amount}
            paymentMethod={paymentDetails.method}
            escrowRequired={selectedListing.escrowRequired}
            onConfirm={handlePaymentConfirm}
          />
        )}
      </div>
    </MainLayout>
  );
}
