import React from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useConnect, useAccount, useDisconnect } from "wagmi";
import { useAuthStore } from "@/store/auth";

export function ConnectButton() {
  const { connect, connectors, isLoading } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const setAddress = useAuthStore((state) => state.setAddress);
  const setConnected = useAuthStore((state) => state.setConnected);

  // Update auth store when wallet state changes
  React.useEffect(() => {
    setAddress(address ?? null);
    setConnected(isConnected);
  }, [address, isConnected, setAddress, setConnected]);

  if (isConnected) {
    return (
      <Button variant="outline" size="sm" onClick={() => disconnect()}>
        <Wallet className="mr-2 h-4 w-4" />
        {address?.slice(0, 6)}...{address?.slice(-4)}
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={() => connect({ connector: connectors[0] })}
      disabled={isLoading}
    >
      <Wallet className="mr-2 h-4 w-4" />
      {isLoading ? "Connecting..." : "Connect Wallet"}
    </Button>
  );
}
