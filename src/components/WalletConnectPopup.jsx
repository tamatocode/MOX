"use client";

import { useConnect } from "wagmi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function WalletConnectPopup({ onConnect, isOpen }) {
  const { connect, connectors, error, isPending } = useConnect();
  const [selectedConnector, setSelectedConnector] = useState(null);

  // Use only the WalletConnect connector
  const walletConnectConnector = connectors.find((connector) => connector.id === "walletConnect");

  useEffect(() => {
    if (error) {
      console.error("WalletConnectPopup: Connection error", error);
      toast.error(`Failed to connect wallet: ${error.message}`);
      setSelectedConnector(null);
    }
  }, [error]);

  useEffect(() => {
    if (!isOpen) {
      setSelectedConnector(null);
    }
  }, [isOpen]);

  const handleConnect = async (connector) => {
    setSelectedConnector(connector.id);
    try {
      const result = await connect({ connector });
      if (result?.account) {
        console.log("WalletConnectPopup: Wallet connected", { address: result.account });
        toast.success("Wallet connected successfully");
        onConnect(result.account);
      }
    } catch (err) {
      console.error("WalletConnectPopup: Failed to connect", err);
      setSelectedConnector(null);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div className="relative bg-background border border-primary/20 shadow-xl rounded-lg p-6 sm:max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-4">
          Connect Your Wallet
        </h2>
        <p className="text-center text-foreground/80 mb-6">Please connect your wallet to continue.</p>
        <div className="grid gap-3">
          {walletConnectConnector ? (
            <button
              onClick={() => handleConnect(walletConnectConnector)}
              disabled={isPending || selectedConnector === walletConnectConnector.id}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending && selectedConnector === walletConnectConnector.id ? (
                <span>Connecting...</span>
              ) : (
                <span>Connect with WalletConnect</span>
              )}
            </button>
          ) : (
            <p className="text-center text-foreground/80">
              WalletConnect not available. Please ensure WalletConnect is configured.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}