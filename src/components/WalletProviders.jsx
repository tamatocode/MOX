import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { MetaMaskWallet, MassaWallet, StellarWallet } from "../lib/wallets";
// import { useTheme } from "../context/themeContext";
import { useSession } from "next-auth/react";
import { Wallet, Copy, Check, LogOut, ChevronDown } from "lucide-react";

function WalletProviders() {
  const [address, setAddress] = useState("");
  const [isConnect, setIsConnected] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  // const { themeClasses } = useTheme();
  const { data: session } = useSession();

  useEffect(() => {
    async function addWalletAddress() {
      try {
        await fetch("/api/addwallet", {
          method: "POST",
          body: JSON.stringify({ wallet: address }),
        });
      } catch (error) {
        console.log(error);
      }
    }
    addWalletAddress();
  }, [address]);

  const handleWalletConnect = async (walletName) => {
    try {
      let ad = "";
      if (walletName === "MetaMask") {
        ad = await MetaMaskWallet();
      } else if (walletName === "Massa") {
        ad = await MassaWallet();
      } else if (walletName === "Stellar") {
        ad = await StellarWallet();
      }
      setAddress(ad);
      setIsConnected(true);

      if (address.length > 0) {
        await fetch("/api/addwallet", {
          method: "POST",
          body: JSON.stringify({ wallet: ad }),
        });
        setAddress(ad);
        setIsConnected(true);
      }
    } catch (err) {
      console.error("Wallet connect failed:", err);
    }
  };

  // Copy wallet address to clipboard
  const copyToClipboard = async (address) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const generateAvatar = (address) => {
    if (!address) return null;
    const colors = [
      "from-blue-500 to-blue-600",
      "from-green-500 to-green-600",
      "from-purple-500 to-purple-600",
      "from-red-500 to-red-600",
      "from-yellow-500 to-yellow-600",
      "from-indigo-500 to-indigo-600",
    ];
    const colorIndex = parseInt(address.slice(2, 4), 16) % colors.length;
    const initials = address.slice(2, 4).toUpperCase();

    return (
      <div
        className={`w-10 h-10 rounded-full bg-gradient-to-br ${colors[colorIndex]} flex items-center justify-center text-white font-bold text-sm shadow-lg`}
      >
        {initials}
      </div>
    );
  };

  const renderProfileImage = () => {
    if (session?.user?.image) {
      return (
        <img
          src={session.user.image}
          alt="Profile"
          className="w-10 h-10 rounded-full object-cover border-2 border-purple-400/50 shadow-lg"
        />
      );
    }
    return generateAvatar(address);
  };

  if (isConnect) {
    return (
      <>
        <div className="relative dropdown-container">
          <button
            onClick={() => setShowDropdown((prev) => !prev)}
            className={`flex items-center gap-2 hover: rounded-lg px-2 py-1 transition-all duration-200 border border-transparent`}
          >
            {renderProfileImage()}
            <ChevronDown
              className={`h-4 w-4 transition-transform duration-200 ${
                showDropdown ? "rotate-180" : ""
              }`}
            />
          </button>

          {showDropdown && (
            <div
              className={`absolute top-full mt-2 right-0  backdrop-blur-md  rounded-xl shadow-2xl border  min-w-80 z-50`}
            >
              {/* Profile Header */}
              <div
                className={`flex items-center gap-3 p-4 border-b `}
              >
                <div className="flex-1">
                  <div className={`font-semibold $`}>
                    {session?.user?.name || "Wallet User"}
                  </div>
                  <div className={`text-sm `}>
                    {address ? (
                      <>
                        {address.slice(0, 6)}...
                        {address.slice(-4)}
                      </>
                    ) : (
                      session?.user?.email
                    )}
                  </div>
                </div>
              </div>
              {/* Wallet Address Section */}
              {address && (
                <div className={`p-4 border-b `}>
                  <div
                    className={`text-sm  mb-2 flex items-center gap-2`}
                  >
                    <Wallet className="h-4 w-4" />
                    Wallet Address:
                  </div>
                  <div className="relative group">
                    <div
                      className={`text-xs font-mono  p-3 rounded-lg border  pr-12 break-all `}
                    >
                      {address}
                    </div>
                    <button
                      onClick={() => copyToClipboard(address)}
                      className={`absolute right-2 top-3  hover:text-purple-400 transition-colors p-1 rounded `}
                      title="Copy address"
                    >
                      {copySuccess ? (
                        <Check className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {copySuccess && (
                    <div className="text-xs text-green-400 mt-2 flex items-center gap-1">
                      <Check className="h-3 w-3" />
                      Address copied to clipboard!
                    </div>
                  )}
                </div>
              )}

              {/* Logout Button */}
              <div className="p-4">
                <button
                  onClick={() => {
                    setAddress("");
                    setIsConnected(false);
                    setShowDropdown(false);
                  }}
                  className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 font-medium shadow-lg"
                >
                  <LogOut className="h-4 w-4" />
                  Disconnect Wallet
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  return (
    <div
      className={`flex items-center justify-center `}
    >
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline" className="px-6 py-3">
            Connect Wallet
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Connect Your Wallet</DialogTitle>
            <DialogDescription>
              Choose a wallet provider to connect to your account.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 py-4">
            <Card className="cursor-pointer transition-colors p-1">
              <CardContent className="p-4">
                <div
                  className="flex items-center gap-4"
                  onClick={() => handleWalletConnect("MetaMask")}
                >
                  <img
                    className="w-12 h-12 rounded-lg"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJZaVpfhv3kgZA46GoqfVNIFhR6pXIdX4_Rg&s"
                    alt="MetaMask"
                  />
                  <div>
                    <h3 className="font-semibold">MetaMask</h3>
                    <p className="text-sm text-gray-600">
                      Connect using MetaMask wallet
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="text-center mt-5">Powered by Recurx</div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="w-full">
                Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default WalletProviders;
