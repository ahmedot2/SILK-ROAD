import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth";
import { generateNonce } from "@/lib/auth";
import { useConnect, useAccount, useSignMessage } from "wagmi";

export function ConnectWallet() {
  const { connect, connectors, isLoading: isConnecting } = useConnect();
  const { address, isConnected } = useAccount();
  const { signMessage } = useSignMessage();
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const { setUser, setToken, setError } = useAuthStore();

  const handleConnect = async () => {
    try {
      // Connect wallet
      await connect({ connector: connectors[0] });
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setError("Failed to connect wallet");
    }
  };

  const handleAuthenticate = async () => {
    if (!address) return;

    try {
      setIsAuthenticating(true);

      // First, get the nonce from the server
      const nonceResponse = await fetch(`/api/auth/nonce?address=${address}`, {
        headers: {
          Accept: "application/json",
        },
      });
      if (!nonceResponse.ok) throw new Error("Failed to get nonce");
      const { nonce } = await nonceResponse.json();

      // Create the message to sign
      const message = `Welcome to Silk Road!\n\nPlease sign this message to verify your wallet ownership.\n\nNonce: ${nonce}`;

      // Request signature
      const signature = await signMessage({ message });

      // Call backend to authenticate
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, signature, nonce }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      // Update auth store
      setUser(data.user);
      setToken(data.token);
    } catch (error) {
      console.error("Authentication failed:", error);
      setError("Authentication failed");
    } finally {
      setIsAuthenticating(false);
    }
  };

  if (isConnected && address) {
    return (
      <Button
        onClick={handleAuthenticate}
        disabled={isAuthenticating}
        className="bg-[#FB6415] hover:bg-[#FB6415]/90"
      >
        {isAuthenticating ? "Authenticating..." : "Authenticate Wallet"}
      </Button>
    );
  }

  return (
    <Button
      onClick={handleConnect}
      disabled={isConnecting}
      className="bg-[#FB6415] hover:bg-[#FB6415]/90"
    >
      {isConnecting ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
