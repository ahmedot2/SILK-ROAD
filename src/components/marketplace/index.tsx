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
    title: "2021 Tesla Model 3 Performance",
    description: "Fully loaded, autopilot, red exterior",
    category: "vehicles",
    subcategory: "cars",
    price: 45000,
    negotiable: true,
    condition: "like_new",
    paymentMethods: ["slk", "crypto"],
    escrowRequired: true,
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1619767886558-efdc259b6e31?w=500",
        isPrimary: true,
      },
    ],
    location: {
      city: "Dubai",
      area: "Downtown",
    },
    seller: {
      id: "1",
      name: "John Doe",
      rating: 4.8,
      verified: true,
      joinedDate: new Date("2023-01-01"),
      totalSales: 12,
      responseRate: 98,
    },
    features: {
      mileage: 15000,
      color: "red",
      transmission: "automatic",
    },
    status: "active",
    views: 245,
    favorites: 12,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Luxury 2BR Apartment - Marina View",
    description: "Fully furnished, high floor, amazing views",
    category: "real_estate",
    subcategory: "apartments",
    price: 1200000,
    negotiable: false,
    condition: "new",
    paymentMethods: ["slk", "crypto", "fiat"],
    escrowRequired: true,
    images: [
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=500",
        isPrimary: true,
      },
    ],
    location: {
      city: "Dubai",
      area: "Dubai Marina",
    },
    seller: {
      id: "2",
      name: "Dubai Luxury Properties",
      rating: 4.9,
      verified: true,
      joinedDate: new Date("2022-06-01"),
      totalSales: 45,
      responseRate: 100,
    },
    features: {
      size: 1500,
      bedrooms: 2,
      bathrooms: 2.5,
      parking: true,
    },
    status: "active",
    views: 789,
    favorites: 45,
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
    // Handle payment confirmation
    setShowPayment(false);
    setSelectedListing(null);
  };

  const handleMessage = (message: string) => {
    console.log("Send message:", message);
    // Implement chat functionality
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

        <div className="grid grid-cols-4 gap-6">
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
