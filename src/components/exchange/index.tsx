import { MainLayout } from "@/layouts/MainLayout";
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
import { HowItWorks } from "./HowItWorks";

export default function Exchange() {
  return (
    <MainLayout>
      <HowItWorks />
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold">P2P Exchange</h1>

        <Card className="bg-card">
          <CardHeader>
            <CardTitle>Exchange</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm">You Pay</label>
              <div className="flex gap-2">
                <Input type="number" placeholder="0.00" />
                <Select defaultValue="USDC">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm">You Receive</label>
              <div className="flex gap-2">
                <Input type="number" placeholder="0.00" />
                <Select defaultValue="ETH">
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Select token" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USDC">USDC</SelectItem>
                    <SelectItem value="ETH">ETH</SelectItem>
                    <SelectItem value="USDT">USDT</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button className="w-full">Find Offers</Button>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
}
