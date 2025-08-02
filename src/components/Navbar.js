"use client";
import { Button } from "../components/ui/button";
import { usePrivy } from "@privy-io/react-auth";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import {
  MessageCircleWarning,
  Wallet,
  Copy,
  Check,
  LogOut,
  ChevronDown,
  Coins,
  CreditCard,
} from "lucide-react";
import { signOut } from "next-auth/react";
// import { useTheme } from "../context/themeContext";
import { addMerchants } from "../smartcontractsHelpers/index";
import WalletProvider from "../components/WalletProviders";

export default function Navbar() {
  const { data: session } = useSession();
  // const { themeClasses } = useTheme();
  const { login, authenticated, user, logout } = usePrivy();
  const [points, setPoints] = useState("0");
  const [shouldAddWallet, setShouldAddWallet] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const [pointsLoading, setPointsLoading] = useState(true);

  const fetchPoints = async () => {
    try {
      setPointsLoading(true);
      const res = await fetch("/api/fetchpoints", {
        method: "GET",
      });

      if (!res.ok) throw new Error("Failed to fetch points");

      const data = await res.json();
      setPoints(data.message || "0");
    } catch (error) {
      console.error("Error fetching points:", error);
      setPoints("0");
    } finally {
      setPointsLoading(false);
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  useEffect(() => {
    if (shouldAddWallet && user?.wallet?.address) {
      (async () => {
        try {
          const info = await addMerchants(user.wallet.address);
          if (response.ok) {
            console.log("Wallet saved:", result.message);
            setShouldAddWallet(true);
          } else {
            console.error(
              "Error saving wallet:",
              result.error || result.message
            );
          }
        } catch (err) {
          console.error("Error adding merchant:", err);
        } finally {
          setShouldAddWallet(false);
        }
      })();
    }
  }, [shouldAddWallet, user?.wallet?.address]);

  const addWallet = async () => {
    try {
      await login();
    } catch (error) {
      console.error("Failed to add wallet:", error);
    }
  };

  useEffect(() => {
    const sendWallet = async () => {
      if (shouldAddWallet && user?.wallet?.address) {
        try {
          const res = await fetch("/api/addwallet", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ wallet: user.wallet.address }),
          });
          const response = await fetch("/api/connectwallet", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              address: walletAddress,
            }),
          });

          const result = await response.json();

          if (!res.ok) {
            console.error("Failed to add wallet");
          } else {
            fetchPoints();
          }
        } catch (error) {
          console.error("Error sending wallet:", error);
        } finally {
          setShouldAddWallet(false);
        }
      }
    };

    sendWallet();
  }, [shouldAddWallet, user?.wallet?.address]);

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

  // Generate avatar based on wallet address
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

  // Render user profile image or fallback avatar
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
    return generateAvatar(user?.wallet?.address);
  };

  // Format points with commas
  const formatPoints = (points) => {
    return parseInt(points).toLocaleString();
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown-container")) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav
      className={`shadow-lg transition-colors`}
    >
      <div className="flex items-center justify-center gap-2 p-2 rounded-md">
       
      </div>
      <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8`}>
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand Section */}
          <div className="flex items-center">
            {session?.user?.name && (
              <div className={`hidden sm:block ml-4 `}>
                Welcome Back,{" "}
                <span className={`font-medium`}>
                  {session.user.name}
                </span>
              </div>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <WalletProvider />
            {session?.user?.email && (
              <>
                <div
                  className={` backdrop-blur-sm rounded-lg border`}
                >
                  <div className="flex items-center gap-2 px-4 py-2">
                    <Coins className="h-4 w-4 text-purple-400" />
                    <span
                      className={` text-sm font-medium`}
                    >
                      {pointsLoading ? (
                        <div
                          className={`animate-pulse  h-4 w-12 rounded`}
                        ></div>
                      ) : (
                        <>
                          <span
                            className={` font-bold`}
                          >
                            {formatPoints(points)}
                          </span>
                          <span className="text-purple-300 ml-1">pts</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => signOut({ callbackUrl: "/signin" })}
                  className="bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 text-white border-0 shadow-lg transition-all duration-200 flex items-center gap-2"
                >
                  Log Out
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
