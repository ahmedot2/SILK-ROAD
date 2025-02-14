import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { Shield, AlertCircle } from "lucide-react";

interface TradeDialogProps {
  open: boolean;
  onClose: () => void;
  offer: any;
  type: "buy" | "sell";
}

export function TradeDialog({ open, onClose, offer, type }: TradeDialogProps) {
  const [step, setStep] = useState(1);
  const [amount, setAmount] = useState("");
  const [agreed, setAgreed] = useState(false);

  const renderStep1 = () => (
    <div className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Amount to {type}</label>
        <Input
          type="number"
          placeholder={`Enter amount (${offer.min}-${offer.max})`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium">Total Cost</label>
        <div className="text-2xl font-bold">
          ${(Number(amount) * offer.price).toFixed(2)}
        </div>
      </div>

      <Card className="p-4 bg-muted/50">
        <div className="flex items-center gap-2 text-sm">
          <Shield className="h-4 w-4 text-primary" />
          <div>
            <p className="font-medium">Secure Trade</p>
            <p className="text-muted-foreground">
              Funds will be held in escrow until both parties confirm
            </p>
          </div>
        </div>
      </Card>

      <div className="flex items-start gap-2">
        <input
          type="checkbox"
          id="agreement"
          className="mt-1"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label htmlFor="agreement" className="text-sm text-muted-foreground">
          I agree to the terms of trade and understand that all transactions are
          final
        </label>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-4">
      <Card className="p-4 space-y-4">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Amount:</span>
          <span className="font-medium">{amount} USDC</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Price:</span>
          <span className="font-medium">${offer.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Total:</span>
          <span className="font-medium">
            ${(Number(amount) * offer.price).toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Payment Method:</span>
          <div className="flex gap-2">
            {offer.paymentMethods.map((method: string) => (
              <Badge key={method} variant="outline">
                {method}
              </Badge>
            ))}
          </div>
        </div>
      </Card>

      <div className="bg-muted/50 p-4 rounded-lg space-y-2">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-primary" />
          <span className="font-medium">Payment Instructions</span>
        </div>
        <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
          <li>Send payment using one of the accepted payment methods</li>
          <li>Click "I've Sent Payment" once transfer is complete</li>
          <li>Wait for seller to confirm receipt</li>
          <li>Crypto will be released from escrow</li>
        </ol>
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {type === "buy" ? "Buy" : "Sell"} {offer.available} USDC
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          <div className="flex justify-between mb-4">
            {[1, 2].map((s) => (
              <div
                key={s}
                className={`h-2 w-1/2 ${s === step ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>

          {step === 1 && renderStep1()}
          {step === 2 && renderStep2()}

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            <Button
              onClick={() => (step === 2 ? onClose() : setStep((s) => s + 1))}
              disabled={step === 1 && (!amount || !agreed)}
            >
              {step === 2 ? "I've Sent Payment" : "Continue"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
