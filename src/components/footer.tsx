import { Link } from "react-router-dom";
import { Github, Twitter, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-3">
            <h3 className="font-bold">Silk Road</h3>
            <p className="text-sm text-muted-foreground">
              A decentralized marketplace for real-world assets, P2P trading,
              and raffles.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold">Platform</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  to="/marketplace"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Marketplace
                </Link>
              </li>
              <li>
                <Link
                  to="/rwa"
                  className="text-muted-foreground hover:text-foreground"
                >
                  RWA
                </Link>
              </li>
              <li>
                <Link
                  to="/raffles"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Raffles
                </Link>
              </li>
              <li>
                <Link
                  to="/exchange"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Exchange
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Whitepaper
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  API
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Status
                </a>
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold">Legal</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-foreground"
                >
                  Compliance
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Silk Road. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
