import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAccount } from "wagmi";
import { PaymentMethod } from "@/types/marketplace";
import { Shield } from "lucide-react";

interface PaymentDialogProps {
  open: boolean;
  onClose: () => void;
  amount: number;
  paymentMethod: PaymentMethod;
  escrowRequired: boolean;
  onConfirm: () => void;
}

export function PaymentDialog({
  open,
  onClose,
  amount,
  paymentMethod,
  escrowRequired,
  onConfirm,
}: PaymentDialogProps) {
  const { address } = useAccount();

  const getPaymentInstructions = () => {
    switch (paymentMethod) {
      case "slk":
        return (
          <div className="space-y-4">
            <p>You are about to pay {amount} SLK tokens.</p>
            {escrowRequired ? (
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Escrow Protected Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Tokens will be held in the escrow contract until you confirm
                    receipt
                  </p>
                </div>
              </div>
            ) : null}
            <Button className="w-full" onClick={onConfirm}>
              Confirm Payment
            </Button>
          </div>
        );

      case "crypto":
        return (
          <div className="space-y-4">
            <p>Send {amount} USDC to:</p>
            <Card className="p-4">
              <code className="text-sm break-all">{address}</code>
            </Card>
            {escrowRequired && (
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Escrow Protected Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Funds will be held in the escrow contract until you confirm
                    receipt
                  </p>
                </div>
              </div>
            )}
            <Button className="w-full" onClick={onConfirm}>
              I've Sent the Payment
            </Button>
          </div>
        );

      case "fiat":
        return (
          <div className="space-y-4">
            <p>Bank Transfer Details:</p>
            <Card className="p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Bank Name:</span>
                <span>Example Bank</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Account Number:</span>
                <span>XXXX-XXXX-XXXX</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Reference:</span>
                <span>ORDER-{Math.random().toString(36).slice(2, 8)}</span>
              </div>
            </Card>
            {escrowRequired && (
              <div className="flex items-center gap-2 p-4 bg-muted rounded-lg">
                <Shield className="h-5 w-5 text-primary" />
                <div>
                  <p className="font-medium">Escrow Protected Payment</p>
                  <p className="text-sm text-muted-foreground">
                    Upload your payment receipt for verification
                  </p>
                </div>
              </div>
            )}
            <Button className="w-full" onClick={onConfirm}>
              I've Sent the Payment
            </Button>
          </div>
        );
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Complete Payment</DialogTitle>
        </DialogHeader>
        {getPaymentInstructions()}
      </DialogContent>
    </Dialog>
  );
}
