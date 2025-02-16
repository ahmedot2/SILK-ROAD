import { useState } from "react";
import { MainLayout } from "@/layouts/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Clock, Shield, Star } from "lucide-react";
import { HowItWorks } from "./HowItWorks";
import { TradeDialog } from "./TradeDialog";
import { InstantExchange } from "./InstantExchange";

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
  {
    id: "1",
    type: "buy",
    price: 0.99,
    available: 10000,
    min: 100,
    max: 5000,
    paymentMethods: ["Bank Transfer", "Wise"],
    merchant: {
      name: "CryptoTrader",
      completedTrades: 156,
      completion: 99,
      avgResponseTime: "5 mins",
    },
  },
  {
    id: "2",
    type: "buy",
    price: 0.98,
    available: 5000,
    min: 500,
    max: 10000,
    paymentMethods: ["Bank Transfer", "Revolut"],
    merchant: {
      name: "GlobalExchange",
      completedTrades: 89,
      completion: 98,
      avgResponseTime: "10 mins",
    },
  },
  {
    id: "3",
    type: "sell",
    price: 1.01,
    available: 8000,
    min: 100,
    max: 8000,
    paymentMethods: ["Bank Transfer", "Wise", "Revolut"],
    merchant: {
      name: "CryptoKing",
      completedTrades: 245,
      completion: 100,
      avgResponseTime: "2 mins",
    },
  },
  {
    id: "4",
    type: "sell",
    price: 1.02,
    available: 15000,
    min: 1000,
    max: 15000,
    paymentMethods: ["Bank Transfer"],
    merchant: {
      name: "SecureTrader",
      completedTrades: 178,
      completion: 97,
      avgResponseTime: "8 mins",
    },
  },
];

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
      <div className="space-y-6">
        <HowItWorks />
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold">Exchange</h1>
              <p className="text-muted-foreground">
                Trade crypto securely with multiple options
              </p>
            </div>
          </div>

          <Tabs defaultValue="p2p" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="p2p">P2P Exchange</TabsTrigger>
              <TabsTrigger value="instant">Instant Exchange</TabsTrigger>
            </TabsList>

            <TabsContent value="p2p" className="space-y-6">
              <div className="flex justify-end">
                <Button className="bg-[#FB6415] hover:bg-[#FB6415]/90">
                  Post New Ad
                </Button>
              </div>

              <Card>
                <CardHeader>
                  <div className="flex flex-col sm:flex-row gap-4 justify-between">
                    <div className="flex flex-col sm:flex-row gap-4">
                      <Select
                        value={selectedCrypto}
                        onValueChange={setSelectedCrypto}
                      >
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USDC">USDC</SelectItem>
                          <SelectItem value="USDT">USDT</SelectItem>
                          <SelectItem value="ETH">ETH</SelectItem>
                        </SelectContent>
                      </Select>

                      <Select
                        value={selectedFiat}
                        onValueChange={setSelectedFiat}
                      >
                        <SelectTrigger className="w-full sm:w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD</SelectItem>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="GBP">GBP</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className={
                          paymentMethod.includes("Bank Transfer")
                            ? "bg-muted"
                            : ""
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
                        size="sm"
                        className={
                          paymentMethod.includes("Wise") ? "bg-muted" : ""
                        }
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
                        size="sm"
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
                                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                  <div className="space-y-2">
                                    <h3 className="font-semibold flex items-center gap-2">
                                      {offer.merchant.name}
                                      <Badge
                                        variant="secondary"
                                        className="ml-2"
                                      >
                                        <Star className="h-3 w-3 mr-1 fill-current" />
                                        {offer.merchant.completion}%
                                      </Badge>
                                    </h3>
                                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
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
                                  <div className="text-right">
                                    <div className="text-2xl font-bold">
                                      ${offer.price}
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                      Available: {offer.available}{" "}
                                      {selectedCrypto}
                                    </div>
                                  </div>
                                </div>

                                <div className="mt-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                  <div className="flex flex-wrap gap-2">
                                    {offer.paymentMethods.map((method) => (
                                      <Badge key={method} variant="outline">
                                        {method}
                                      </Badge>
                                    ))}
                                  </div>
                                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                    <div className="text-sm text-muted-foreground">
                                      Limit: {offer.min}-{offer.max}{" "}
                                      {selectedFiat}
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
            </TabsContent>

            <TabsContent value="instant">
              <InstantExchange />
            </TabsContent>
          </Tabs>

          {selectedOffer && showTradeDialog && (
            <TradeDialog
              open={showTradeDialog}
              onClose={() => setShowTradeDialog(false)}
              offer={selectedOffer}
              type={activeTab as "buy" | "sell"}
            />
          )}
        </div>
      </div>
    </MainLayout>
  );
}
