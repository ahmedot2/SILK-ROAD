import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { HowItWorks } from "./HowItWorks";
import { Clock, DollarSign, Shield, Star } from "lucide-react";

interface P2POffer {
  id: string;
  type: "buy" | "sell";
  price: number;
  available: number;
  min: number;
  max: number;
  paymentMethods: string[];
  merchant: {
    name: string;
    completedTrades: number;
    completion: number;
    avgResponseTime: string;
  };
}

const MOCK_OFFERS: P2POffer[] = [
  // Sellers
  {
    id: "s1",
    type: "sell",
    price: 1.02,
    available: 50000,
    min: 100,
    max: 10000,
    paymentMethods: ["Bank Transfer", "Wise"],
    merchant: {
      name: "Dubai Exchange",
      completedTrades: 1234,
      completion: 99.8,
      avgResponseTime: "< 5 min",
    },
  },
  {
    id: "s2",
    type: "sell",
    price: 1.03,
    available: 25000,
    min: 500,
    max: 25000,
    paymentMethods: ["Bank Transfer", "Revolut"],
    merchant: {
      name: "Crypto Master",
      completedTrades: 856,
      completion: 99.5,
      avgResponseTime: "< 10 min",
    },
  },
  {
    id: "s3",
    type: "sell",
    price: 1.025,
    available: 75000,
    min: 1000,
    max: 75000,
    paymentMethods: ["Bank Transfer", "Wise", "PayPal"],
    merchant: {
      name: "Global Crypto",
      completedTrades: 3421,
      completion: 99.9,
      avgResponseTime: "< 3 min",
    },
  },
  {
    id: "s4",
    type: "sell",
    price: 1.015,
    available: 100000,
    min: 100,
    max: 100000,
    paymentMethods: ["Bank Transfer", "Wise", "Revolut", "PayPal"],
    merchant: {
      name: "Silk Exchange Pro",
      completedTrades: 5632,
      completion: 100,
      avgResponseTime: "< 1 min",
    },
  },
  // Buyers
  {
    id: "1",
    type: "sell",
    price: 1.02,
    available: 50000,
    min: 100,
    max: 10000,
    paymentMethods: ["Bank Transfer", "Wise"],
    merchant: {
      name: "Dubai Exchange",
      completedTrades: 1234,
      completion: 99.8,
      avgResponseTime: "< 5 min",
    },
  },
  {
    id: "2",
    type: "sell",
    price: 1.03,
    available: 25000,
    min: 500,
    max: 25000,
    paymentMethods: ["Bank Transfer", "Revolut"],
    merchant: {
      name: "Crypto Master",
      completedTrades: 856,
      completion: 99.5,
      avgResponseTime: "< 10 min",
    },
  },
  {
    id: "3",
    type: "buy",
    price: 1.01,
    available: 35000,
    min: 100,
    max: 35000,
    paymentMethods: ["Bank Transfer", "Wise", "Revolut"],
    merchant: {
      name: "SLK Trader Pro",
      completedTrades: 2156,
      completion: 100,
      avgResponseTime: "< 2 min",
    },
  },
  {
    id: "4",
    type: "buy",
    price: 1.0,
    available: 15000,
    min: 100,
    max: 15000,
    paymentMethods: ["Bank Transfer"],
    merchant: {
      name: "Fast Crypto",
      completedTrades: 543,
      completion: 98.9,
      avgResponseTime: "< 15 min",
    },
  },
];

import { TradeDialog } from "./TradeDialog";
import { InstantExchange } from "./InstantExchange";

export default function Exchange() {
  const [activeTab, setActiveTab] = useState("buy");
  const [selectedCrypto, setSelectedCrypto] = useState("USDC");
  const [selectedFiat, setSelectedFiat] = useState("USD");
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<string[]>([]);
  const [selectedOffer, setSelectedOffer] = useState<P2POffer | null>(null);
  const [showTradeDialog, setShowTradeDialog] = useState(false);

  return (
    <MainLayout>
      <HowItWorks />
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex justify-between items-center">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold">P2P Trading</h1>
            <p className="text-muted-foreground">
              Buy and sell crypto with your preferred payment method
            </p>
          </div>
          <Button className="bg-[#FB6415] hover:bg-[#FB6415]/90">
            Post New Ad
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex gap-4">
                <Select
                  value={selectedCrypto}
                  onValueChange={setSelectedCrypto}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={selectedFiat} onValueChange={setSelectedFiat}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD</SelectItem>
                    <SelectItem value="EUR">EUR</SelectItem>
                    <SelectItem value="GBP">GBP</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  className={
                    paymentMethod.includes("Bank Transfer") ? "bg-muted" : ""
                  }
                  onClick={() =>
                    setPaymentMethod((prev) =>
                      prev.includes("Bank Transfer")
                        ? prev.filter((m) => m !== "Bank Transfer")
                        : [...prev, "Bank Transfer"],
                    )
                  }
                >
                  Bank Transfer
                </Button>
                <Button
                  variant="outline"
                  className={paymentMethod.includes("Wise") ? "bg-muted" : ""}
                  onClick={() =>
                    setPaymentMethod((prev) =>
                      prev.includes("Wise")
                        ? prev.filter((m) => m !== "Wise")
                        : [...prev, "Wise"],
                    )
                  }
                >
                  Wise
                </Button>
                <Button
                  variant="outline"
                  className={
                    paymentMethod.includes("Revolut") ? "bg-muted" : ""
                  }
                  onClick={() =>
                    setPaymentMethod((prev) =>
                      prev.includes("Revolut")
                        ? prev.filter((m) => m !== "Revolut")
                        : [...prev, "Revolut"],
                    )
                  }
                >
                  Revolut
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="buy">Buy</TabsTrigger>
                <TabsTrigger value="sell">Sell</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  {MOCK_OFFERS.filter((offer) => offer.type === activeTab)
                    .filter(
                      (offer) =>
                        paymentMethod.length === 0 ||
                        paymentMethod.some((m) =>
                          offer.paymentMethods.includes(m),
                        ),
                    )
                    .map((offer) => (
                      <Card key={offer.id}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <div>
                                <h3 className="font-semibold flex items-center gap-2">
                                  {offer.merchant.name}
                                  <Badge variant="secondary" className="ml-2">
                                    <Star className="h-3 w-3 mr-1 fill-current" />
                                    {offer.merchant.completion}%
                                  </Badge>
                                </h3>
                                <div className="flex gap-4 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center">
                                    <Shield className="h-4 w-4 mr-1" />
                                    {offer.merchant.completedTrades} trades
                                  </span>
                                  <span className="flex items-center">
                                    <Clock className="h-4 w-4 mr-1" />
                                    {offer.merchant.avgResponseTime}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold">
                                ${offer.price}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                Available: {offer.available} {selectedCrypto}
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 flex items-center justify-between">
                            <div className="flex gap-2">
                              {offer.paymentMethods.map((method) => (
                                <Badge key={method} variant="outline">
                                  {method}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center gap-4">
                              <div className="text-sm text-muted-foreground">
                                Limit: {offer.min}-{offer.max} {selectedFiat}
                              </div>
                              <Button
                                className="bg-[#FB6415] hover:bg-[#FB6415]/90"
                                onClick={() => {
                                  setSelectedOffer(offer);
                                  setShowTradeDialog(true);
                                }}
                              >
                                {activeTab === "buy" ? "Buy" : "Sell"}
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="mt-8">
          <InstantExchange />
        </div>

        {selectedOffer && showTradeDialog && (
          <TradeDialog
            open={showTradeDialog}
            onClose={() => setShowTradeDialog(false)}
            offer={selectedOffer}
            type={activeTab as "buy" | "sell"}
          />
        )}
      </div>
    </MainLayout>
  );
}
