import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TokenizedAsset } from "@/types/rwa";
import { FileCheck, Users, Wallet } from "lucide-react";

interface AssetCardProps {
  asset: TokenizedAsset;
  onInvest: () => void;
}

export function AssetCard({ asset, onInvest }: AssetCardProps) {
  return (
    <Card className="bg-card hover:shadow-lg transition-shadow">
      <CardHeader>
        <img
          src={asset.imageUrl}
          alt={asset.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <CardTitle className="flex items-center justify-between">
          <span>{asset.name}</span>
          <Badge
            variant={asset.status === "approved" ? "default" : "secondary"}
          >
            {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-muted-foreground">{asset.description}</p>

        <div className="grid grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            <div>
              <p className="font-medium">${asset.tokenMetrics.tokenPrice}</p>
              <p className="text-muted-foreground">Token Price</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            <div>
              <p className="font-medium">{asset.tokenMetrics.totalSupply}</p>
              <p className="text-muted-foreground">Total Supply</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FileCheck className="h-4 w-4" />
            <div>
              <p className="font-medium">
                {asset.compliance.jurisdictions.length}
              </p>
              <p className="text-muted-foreground">Jurisdictions</p>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Investment Progress</span>
            <span>
              {asset.availableSupply}/{asset.totalSupply}
            </span>
          </div>
          <Progress value={(asset.availableSupply / asset.totalSupply) * 100} />
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={onInvest} className="w-full">
          Invest Now
        </Button>
      </CardFooter>
    </Card>
  );
}
