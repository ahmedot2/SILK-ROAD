import { Card, CardContent } from "@/components/ui/card";
import { Ticket, Trophy, Users, Wallet } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <Ticket className="h-8 w-8 text-primary" />,
      title: "Buy Tickets",
      description: "Purchase raffle tickets using SLK tokens or crypto",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Join Pool",
      description: "Enter decentralized prize pools with other participants",
    },
    {
      icon: <Trophy className="h-8 w-8 text-primary" />,
      title: "Win Prizes",
      description: "Win exclusive NFTs, tokens, and real-world assets",
    },
    {
      icon: <Wallet className="h-8 w-8 text-primary" />,
      title: "Claim Rewards",
      description: "Instantly receive your prizes in your wallet",
    },
  ];

  return (
    <div className="py-12 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Participate in decentralized raffles for a chance to win exclusive
            prizes
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
