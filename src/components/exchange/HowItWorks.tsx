import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeftRight, ShieldCheck, Wallet, BadgeCheck } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Wallet className="h-8 w-8 text-primary" />,
      title: "Connect Wallet",
      description: "Connect your wallet to start trading crypto and SLK tokens",
    },
    {
      icon: <ArrowLeftRight className="h-8 w-8 text-primary" />,
      title: "Choose Pairs",
      description: "Select your preferred trading pairs and payment methods",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Secure Escrow",
      description: "Trade with confidence using our secure escrow system",
    },
    {
      icon: <BadgeCheck className="h-8 w-8 text-primary" />,
      title: "Complete Trade",
      description: "Confirm receipt and complete your P2P transaction",
    },
  ];

  return (
    <div className="py-12 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Trade cryptocurrencies and SLK tokens securely through our P2P
            exchange platform
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
