import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { MarketplaceListing, PaymentMethod } from "@/types/marketplace";
import { Heart, MessageCircle, Shield, Star } from "lucide-react";
import { useState } from "react";
import { ChatInterface } from "./ChatInterface";

interface ListingDetailsProps {
  listing: MarketplaceListing;
  onClose: () => void;
  onPurchase: (amount: number, paymentMethod: PaymentMethod) => void;
  onMessage: (message: string) => void;
}

export function ListingDetails({
  listing,
  onClose,
  onPurchase,
  onMessage,
}: ListingDetailsProps) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState<PaymentMethod>(listing.paymentMethods[0]);
  const [amount, setAmount] = useState(listing.price);
  const [showChat, setShowChat] = useState(false);

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Listing Details</DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details">
          <TabsList>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="purchase">Purchase</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <img
                  src={listing.images[0]?.url}
                  alt={listing.title}
                  className="w-full aspect-video rounded-lg object-cover"
                />
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {listing.images.slice(1).map((image) => (
                    <img
                      key={image.id}
                      src={image.url}
                      alt=""
                      className="w-full aspect-square rounded-md object-cover"
                    />
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{listing.title}</h2>
                    <p className="text-muted-foreground">
                      {listing.location.city}, {listing.location.area}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon">
                    <Heart className="h-5 w-5" />
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <p className="text-2xl font-bold">
                    {listing.price.toLocaleString()}{" "}
                    {listing.paymentMethods.includes("slk") ? "SLK" : "USD"}
                  </p>
                  {listing.negotiable && (
                    <Badge variant="secondary">Negotiable</Badge>
                  )}
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Description</h3>
                  <p className="text-muted-foreground">{listing.description}</p>
                </div>

                <div className="space-y-2">
                  <h3 className="font-semibold">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(listing.features || {}).map(
                      ([key, value]) => (
                        <div key={key} className="flex items-center gap-2">
                          <span className="text-muted-foreground capitalize">
                            {key}:
                          </span>
                          <span>{String(value)}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={
                            listing.seller.avatar ||
                            `https://api.dicebear.com/7.x/avataaars/svg?seed=${listing.seller.id}`
                          }
                          alt={listing.seller.name}
                          className="w-10 h-10 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">{listing.seller.name}</p>
                          <div className="flex items-center gap-1 text-sm">
                            <Star className="h-4 w-4 fill-primary" />
                            <span>{listing.seller.rating}</span>
                            {listing.seller.verified && (
                              <Badge variant="outline" className="ml-2">
                                Verified
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => setShowChat(true)}
                      >
                        <MessageCircle className="h-4 w-4 mr-2" />
                        Message
                      </Button>
                    </div>
                  </CardHeader>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="purchase" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Purchase Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Method</label>
                  <div className="flex gap-2">
                    {listing.paymentMethods.map((method) => (
                      <Button
                        key={method}
                        variant={
                          selectedPaymentMethod === method
                            ? "default"
                            : "outline"
                        }
                        onClick={() => setSelectedPaymentMethod(method)}
                      >
                        {method.toUpperCase()}
                      </Button>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Amount</label>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                  />
                </div>

                {listing.escrowRequired && (
                  <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                    <Shield className="h-5 w-5 text-primary" />
                    <div className="flex-1">
                      <p className="font-medium">Escrow Protected</p>
                      <p className="text-sm text-muted-foreground">
                        Payment will be held in escrow until you confirm receipt
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full"
                  onClick={() => onPurchase(amount, selectedPaymentMethod)}
                >
                  Purchase Now
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <ChatInterface
          open={showChat}
          onClose={() => setShowChat(false)}
          seller={listing.seller}
          listingId={listing.id}
          onSendMessage={onMessage}
        />
      </DialogContent>
    </Dialog>
  );
}
