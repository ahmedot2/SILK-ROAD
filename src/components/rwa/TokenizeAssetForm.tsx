import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AssetType, TokenizedAsset } from "@/types/rwa";

export function TokenizeAssetForm() {
  const [step, setStep] = useState(1);

  const renderBasicInfo = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Asset Name</label>
        <Input placeholder="Enter asset name" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Asset Type</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select asset type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="real_estate">Real Estate</SelectItem>
            <SelectItem value="private_equity">Private Equity</SelectItem>
            <SelectItem value="fund">Fund</SelectItem>
            <SelectItem value="debt">Debt</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Description</label>
        <Textarea placeholder="Describe your asset" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Asset Value (USD)</label>
        <Input type="number" placeholder="0.00" />
      </div>
    </div>
  );

  const renderTokenMetrics = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Token Symbol</label>
        <Input placeholder="e.g. PROP" />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Token Supply</label>
        <Input type="number" placeholder="Total number of tokens" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Min Investment</label>
          <Input type="number" placeholder="0.00" />
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium">Max Investment</label>
          <Input type="number" placeholder="0.00" />
        </div>
      </div>
    </div>
  );

  const renderCompliance = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Jurisdiction</label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select jurisdiction" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="us">United States</SelectItem>
            <SelectItem value="eu">European Union</SelectItem>
            <SelectItem value="uk">United Kingdom</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Investor Requirements</label>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>KYC Required</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>Accreditation Required</span>
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Tokenize Asset</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex justify-between mb-4">
            {[1, 2, 3].map((s) => (
              <div
                key={s}
                className={`h-2 w-1/3 ${s === step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          {step === 1 && renderBasicInfo()}
          {step === 2 && renderTokenMetrics()}
          {step === 3 && renderCompliance()}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              onClick={() =>
                step === 3 ? console.log("Submit") : setStep((s) => s + 1)
              }
            >
              {step === 3 ? "Submit" : "Next"}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
