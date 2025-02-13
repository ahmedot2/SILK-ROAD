import { Card, CardContent } from "@/components/ui/card";
import { FileCheck2, Landmark, ShieldCheck, Users } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <FileCheck2 className="h-8 w-8 text-primary" />,
      title: "Asset Submission",
      description:
        "Submit your asset details and documentation for verification",
    },
    {
      icon: <ShieldCheck className="h-8 w-8 text-primary" />,
      title: "Compliance Setup",
      description: "Configure KYC/AML requirements and investment restrictions",
    },
    {
      icon: <Landmark className="h-8 w-8 text-primary" />,
      title: "Token Creation",
      description: "Deploy compliant security tokens with automated checks",
    },
    {
      icon: <Users className="h-8 w-8 text-primary" />,
      title: "Distribution",
      description: "Manage investor onboarding and token distribution",
    },
  ];

  return (
    <div className="py-12 bg-muted/50">
      <div className="container mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our platform simplifies the process of tokenizing real-world assets
            while ensuring compliance and security at every step
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
