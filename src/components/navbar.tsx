import { Link } from "react-router-dom";
import { ConnectButton } from "@/components/wallet/ConnectButton";

export function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <div className="mr-4 flex items-center space-x-6">
          <Link to="/" className="font-bold text-[#FB6415]">
            SILK ROAD
          </Link>
          <div className="flex items-center space-x-4">
            <Link
              to="/marketplace"
              className="text-muted-foreground hover:text-foreground"
            >
              Marketplace
            </Link>
            <Link
              to="/rwa"
              className="text-muted-foreground hover:text-foreground"
            >
              RWA
            </Link>
            <Link
              to="/raffles"
              className="text-muted-foreground hover:text-foreground"
            >
              Raffles
            </Link>
            <Link
              to="/exchange"
              className="text-muted-foreground hover:text-foreground"
            >
              Exchange
            </Link>
          </div>
        </div>
        <div className="flex flex-1 items-center space-x-2 justify-end">
          <ConnectButton />
        </div>
      </div>
    </nav>
  );
}
