import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowRight, Zap } from "lucide-react";
import { useState } from "react";

export function InstantExchange() {
  const [fromCurrency, setFromCurrency] = useState("USDC");
  const [toCurrency, setToCurrency] = useState("ETH");
  const [amount, setAmount] = useState("");

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5 text-[#FB6415]" />
          Instant Exchange
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">You Send</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="flex-1"
              />
              <Select value={fromCurrency} onValueChange={setFromCurrency}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => {
                const temp = fromCurrency;
                setFromCurrency(toCurrency);
                setToCurrency(temp);
              }}
            >
              <ArrowRight className="h-4 w-4 rotate-90" />
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">You Receive</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <Input
                type="number"
                placeholder="0.00"
                value={amount ? (Number(amount) * 0.99).toFixed(6) : ""}
                readOnly
                className="flex-1"
              />
              <Select value={toCurrency} onValueChange={setToCurrency}>
                <SelectTrigger className="w-full sm:w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ETH">ETH</SelectItem>
                  <SelectItem value="BTC">BTC</SelectItem>
                  <SelectItem value="USDC">USDC</SelectItem>
                  <SelectItem value="USDT">USDT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm">
            <span className="text-muted-foreground">Exchange Rate</span>
            <span>
              1 {fromCurrency} = 0.99 {toCurrency}
            </span>
          </div>
          <div className="flex flex-col sm:flex-row justify-between gap-2 text-sm">
            <span className="text-muted-foreground">Network Fee</span>
            <span>0.1%</span>
          </div>
          <Button className="w-full bg-[#FB6415] hover:bg-[#FB6415]/90">
            <Zap className="h-4 w-4 mr-2" /> Instant Exchange
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
