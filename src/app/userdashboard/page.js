"use client";
import React, { useEffect, useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import SendToken from "../../components/SendToken";
import RecieveTokens from "../../components/RecieveToken";
import { Skeleton } from "../../components/ui/skeleton";
import { useTheme } from "../../context/themeContext";
import { Wallet, Search, User, Globe, TrendingUp } from "lucide-react";
import {
  fetchAmountETH,
  fetchAmountMasa,
  fetchAmountStellar,
} from "../../lib/payment";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";

export default function Page() {
  const [info, setInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [balance, setBalance] = useState("0.0");
  const [selectedChain, setSelectedChain] = useState("monad");
  const [isFounded, setIsFounded] = useState("");
  const { themeClasses } = useTheme(); // ✅ theme hook
  const [address, setAddress] = useState("");

  const fetchBalances = async (chain = selectedChain) => {
    try {
      if (chain === "monad") {
        const data = await fetchAmountETH();
        if (data) {
          setBalance(data.balance);
          setAddress(data.address);
        }
      } else if (chain === "massa") {
        const data = await fetchAmountMasa();
        if (data) {
          setBalance(data.balance);
          setAddress(data.address);
        }
      } else if (chain === "stellar") {
        const data = await fetchAmountStellar();
        if (data) {
          setBalance(data.balance);
          setAddress(data.address);
        }
      }
    } catch (error) {
      console.error("Failed to fetch balance", error);
      setBalance("0.0");
    }
  };

  useEffect(() => {
    fetchBalances(selectedChain);
  }, [selectedChain]);

  const findInfo = async () => {
    try {
      if (!info) return;
      setLoading(true);
      const res = await fetch("/api/findwallet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          info.includes("@")
            ? { option: "email", email: info }
            : { option: "address", address: info }
        ),
      });
      const result = await res.json();
      if (res.status == 404) {
        setIsFounded(result.message);
        setData("");
        return;
      }
      setData(result.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getChainIcon = (chain) => {
    switch (chain) {
      case "monad":
        return "🟣";
      case "massa":
        return "🟡";
      case "stellar":
        return "⚪";
      default:
        return "🌐";
    }
  };

  const getChainName = (chain) => {
    switch (chain) {
      case "monad":
        return "Monad";
      case "massa":
        return "Massa";
      case "stellar":
        return "Stellar";
      default:
        return "Unknown";
    }
  };

  return (
    <div
      className={`max-w-6xl mx-auto p-4 space-y-8  ${themeClasses.cardBackground} mt-10`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card
            className={`h-full shadow-lg ${themeClasses.background}  ${themeClasses.textMuted}`}
          >
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <Wallet className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Your Balance
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {getChainName(selectedChain)} Network
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-bold text-foreground">
                    {balance}
                  </span>
                  <span className="text-lg font-semibold text-muted-foreground">
                    {selectedChain === "monad"
                      ? "MON"
                      : selectedChain === "massa"
                      ? "MAS"
                      : selectedChain === "stellar"
                      ? "XLM"
                      : ""}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <TrendingUp className="h-4 w-4" />
                  <span>≈ $0.00 USD</span>
                </div>
              </div>

              <div className="flex flex-col items-center justify-center sm:flex-row gap-10">
                <SendToken address={""} />
                <RecieveTokens address={address} />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Chain Selection */}
        <div className="lg:col-span-1">
          <Card
            className={`h-full shadow-lg  ${themeClasses.background}  ${themeClasses.textMuted}`}
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                Network
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Select
                value={selectedChain}
                onValueChange={(value) => {
                  setSelectedChain(value);
                  fetchBalances(value);
                }}
              >
                <SelectTrigger className="w-full border-2 border-green-200 dark:border-green-700 hover:border-green-300 dark:hover:border-green-600 transition-colors">
                  <SelectValue placeholder="Choose chain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monad">
                    <div className="flex items-center gap-2">
                      <span>🟣</span>
                      <span>Monad</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>

              <div className="text-center p-4  rounded-lg">
                <div className="text-2xl mb-1">
                  {getChainIcon(selectedChain)}
                </div>
                <div className="text-sm font-medium text-muted-foreground">
                  {getChainName(selectedChain)}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search Wallet Info */}
      <Card
        className={`shadow-lg ${themeClasses.background}  ${themeClasses.textMuted}`}
      >
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-xl">
            <Search className="h-5 w-5 " />
            Search Wallet Info
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                onChange={(e) => setInfo(e.target.value)}
                placeholder="Search by email or wallet address"
                className="pl-10"
              />
            </div>
            <Button onClick={findInfo} disabled={loading}>
              {loading ? "Searching..." : "Search"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading */}
      {loading && (
        <Card className="border-2 border-gray-300 dark:border-gray-600">
          <CardContent className="space-y-4 py-6">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </CardContent>
        </Card>
      )}

      {isFounded && (
        <Card className="border-2 border-indigo-200 dark:border-indigo-700 shadow-lg">
          <CardContent className="space-y-4">{isFounded}</CardContent>
        </Card>
      )}
      {/* Search Result */}
      {data && (
        <Card className="border-2 border-indigo-200 dark:border-indigo-700 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl">
              <User className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
              User Info
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="text-lg font-medium">{data.email}</div>
              </div>
              <div className="p-4 bg-white/50 dark:bg-gray-800/50 rounded-lg">
                <div className="text-sm text-muted-foreground">Wallet</div>
                <div className="text-lg font-medium break-all">
                  {data.wallet}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <SendToken address={data.wallet} />
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
