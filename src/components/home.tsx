import { MainLayout } from "@/layouts/MainLayout";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Shield,
  Coins,
  BarChart3,
  Globe as GlobeIcon,
} from "lucide-react";
import { Globe } from "@/components/ui/globe";
import { GridPattern } from "@/components/ui/grid-pattern";

function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <div className="relative flex flex-col items-center justify-center min-h-[90vh] space-y-8 text-center overflow-hidden bg-background">
        <GridPattern
          width={32}
          height={32}
          className="absolute inset-0 h-full w-full [mask-image:radial-gradient(900px_circle_at_center,white,transparent)] opacity-50"
          squares={[
            [1, 1],
            [1, 3],
            [3, 1],
            [3, 3],
            [4, 4],
            [5, 2],
            [5, 5],
            [6, 6],
            [7, 1],
            [8, 4],
            [8, 8],
          ]}
        />
        <div className="relative z-10 space-y-8">
          <h1 className="text-4xl md:text-7xl font-bold tracking-tight">
            Welcome to <span className="text-[#FB6415]">Silk Road</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-[600px]">
            A decentralized marketplace for real-world assets, P2P trading, and
            raffles
          </p>
          <div className="flex gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8 bg-[#FB6415] hover:bg-[#FB6415]/90"
            >
              Get Started <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 border-[#FB6415] text-[#FB6415] hover:bg-[#FB6415]/10"
            >
              Learn More
            </Button>
          </div>
        </div>
        <Globe className="opacity-75" />
      </div>

      {/* Features Section */}
      <div className="relative py-24">
        <div className="container relative z-10">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose <span className="text-[#FB6415]">Silk Road</span>?
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="relative z-10 space-y-4 text-center p-6 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-background/80 transition-all duration-300 border border-[#FB6415]/20 hover:border-[#FB6415]/40 shadow-[0_0_15px_rgba(251,100,21,0.1)] hover:shadow-[0_0_30px_rgba(251,100,21,0.2)]">
              <div className="w-12 h-12 rounded-full bg-[#FB6415]/10 flex items-center justify-center mx-auto">
                <Shield className="h-6 w-6 text-[#FB6415]" />
              </div>
              <h3 className="font-semibold">Secure Trading</h3>
              <p className="text-muted-foreground">
                Built-in escrow system and multi-signature wallets for safe
                transactions
              </p>
            </div>
            <div className="relative z-10 space-y-4 text-center p-6 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-background/80 transition-all duration-300 border border-[#FB6415]/20 hover:border-[#FB6415]/40 shadow-[0_0_15px_rgba(251,100,21,0.1)] hover:shadow-[0_0_30px_rgba(251,100,21,0.2)]">
              <div className="w-12 h-12 rounded-full bg-[#FB6415]/10 flex items-center justify-center mx-auto">
                <Coins className="h-6 w-6 text-[#FB6415]" />
              </div>
              <h3 className="font-semibold">Multiple Payment Options</h3>
              <p className="text-muted-foreground">
                Support for SLK tokens, cryptocurrencies, and fiat payments
              </p>
            </div>
            <div className="relative z-10 space-y-4 text-center p-6 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-background/80 transition-all duration-300 border border-[#FB6415]/20 hover:border-[#FB6415]/40 shadow-[0_0_15px_rgba(251,100,21,0.1)] hover:shadow-[0_0_30px_rgba(251,100,21,0.2)]">
              <div className="w-12 h-12 rounded-full bg-[#FB6415]/10 flex items-center justify-center mx-auto">
                <BarChart3 className="h-6 w-6 text-[#FB6415]" />
              </div>
              <h3 className="font-semibold">Asset Tokenization</h3>
              <p className="text-muted-foreground">
                Fractional ownership of real-world assets through tokenization
              </p>
            </div>
            <div className="relative z-10 space-y-4 text-center p-6 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-background/80 transition-all duration-300 border border-[#FB6415]/20 hover:border-[#FB6415]/40 shadow-[0_0_15px_rgba(251,100,21,0.1)] hover:shadow-[0_0_30px_rgba(251,100,21,0.2)]">
              <div className="w-12 h-12 rounded-full bg-[#FB6415]/10 flex items-center justify-center mx-auto">
                <GlobeIcon className="h-6 w-6 text-[#FB6415]" />
              </div>
              <h3 className="font-semibold">Global Marketplace</h3>
              <p className="text-muted-foreground">
                Connect with buyers and sellers worldwide in our P2P marketplace
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative py-24">
        <div className="container relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="relative z-10 space-y-2 p-6 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-background/80 border border-[#FB6415]/20 hover:border-[#FB6415]/40 shadow-[0_0_15px_rgba(251,100,21,0.1)]">
              <h3 className="text-4xl font-bold text-[#FB6415]">$10M+</h3>
              <p className="text-muted-foreground">Trading Volume</p>
            </div>
            <div className="relative z-10 space-y-2 p-6 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-background/80 border border-[#FB6415]/20 hover:border-[#FB6415]/40 shadow-[0_0_15px_rgba(251,100,21,0.1)]">
              <h3 className="text-4xl font-bold text-[#FB6415]">50K+</h3>
              <p className="text-muted-foreground">Active Users</p>
            </div>
            <div className="relative z-10 space-y-2 p-6 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-background/80 border border-[#FB6415]/20 hover:border-[#FB6415]/40 shadow-[0_0_15px_rgba(251,100,21,0.1)]">
              <h3 className="text-4xl font-bold text-[#FB6415]">1000+</h3>
              <p className="text-muted-foreground">Assets Listed</p>
            </div>
            <div className="relative z-10 space-y-2 p-6 rounded-xl bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 hover:bg-background/80 border border-[#FB6415]/20 hover:border-[#FB6415]/40 shadow-[0_0_15px_rgba(251,100,21,0.1)]">
              <h3 className="text-4xl font-bold text-[#FB6415]">100+</h3>
              <p className="text-muted-foreground">Countries</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative py-24">
        <div className="container relative z-10 text-center space-y-8">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="text-muted-foreground max-w-[600px] mx-auto">
            Join thousands of users already trading on Silk Road
          </p>
          <Button size="lg" className="bg-[#FB6415] hover:bg-[#FB6415]/90">
            Connect Wallet <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </MainLayout>
  );
}

export default Home;
