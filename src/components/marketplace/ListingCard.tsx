import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, MapPin, Shield, Star } from "lucide-react";
import { MarketplaceListing } from "@/types/marketplace";

interface ListingCardProps {
  listing: MarketplaceListing;
  onFavorite: () => void;
  onClick: () => void;
}

export function ListingCard({
  listing,
  onFavorite,
  onClick,
}: ListingCardProps) {
  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-shadow bg-card"
      onClick={onClick}
    >
      <CardHeader className="p-0">
        <div className="relative aspect-video overflow-hidden rounded-t-lg">
          <img
            src={listing.images[0]?.url}
            alt={listing.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite();
            }}
            className="absolute top-2 right-2 p-2 rounded-full bg-background/80 hover:bg-background"
          >
            <Heart className="h-4 w-4" />
          </button>
          {listing.escrowRequired && (
            <Badge className="absolute top-2 left-2" variant="secondary">
              <Shield className="h-3 w-3 mr-1" /> Escrow Protected
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <h3 className="font-semibold truncate">{listing.title}</h3>
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 mr-1" />
            {listing.location.city}
            {listing.location.area ? `, ${listing.location.area}` : ""}
          </div>
          <p className="font-bold text-lg">
            {listing.price.toLocaleString()}{" "}
            {listing.paymentMethods.includes("slk") ? "SLK" : "USD"}
            {listing.negotiable && (
              <span className="text-sm font-normal text-muted-foreground ml-2">
                (Negotiable)
              </span>
            )}
          </p>
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-primary" />
              <span>{listing.seller.rating}</span>
              {listing.seller.verified && (
                <Badge variant="outline" className="ml-2">
                  Verified
                </Badge>
              )}
            </div>
            <div className="text-muted-foreground">
              {listing.seller.totalSales} sales
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="px-4 py-3 border-t flex justify-between text-sm text-muted-foreground">
        <div className="flex gap-2">
          {listing.paymentMethods.map((method) => (
            <Badge key={method} variant="secondary">
              {method.toUpperCase()}
            </Badge>
          ))}
        </div>
        <span>{listing.views} views</span>
      </CardFooter>
    </Card>
  );
}
