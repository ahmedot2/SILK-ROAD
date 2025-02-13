import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Store, Wallet, BadgeCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Store className="h-8 w-8 text-primary" />,
      title: "List Items",
      description:
        "Create listings for items you want to sell with detailed information",
    },
    {
      icon: <Wallet className="h-8 w-8 text-primary" />,
      title: "Multiple Payments",
      description: "Accept SLK tokens, crypto, or fiat payments from buyers",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Secure Escrow",
      description:
        "Trade safely with built-in escrow protection for all transactions",
    },
    {
      icon: <BadgeCheck className="h-8 w-8 text-primary" />,
      title: "Build Trust",
      description: "Earn ratings and badges to become a verified seller",
    },
  ];

  return (
    <div className="py-12 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Buy and sell items securely using our P2P marketplace platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <Card key={index} className="relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full" />
              <CardContent className="pt-6">
                <div className="mb-4">{step.icon}</div>
                <h3 className="font-semibold mb-2">{step.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
