"use client";
import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { Badge } from "../../../components/ui/badge";
import { Separator } from "../../../components/ui/separator";
import {
  CreditCard,
  Shield,
  Star,
  CheckCircle,
  User,
  Mail,
  Phone,
  MapPin,
  Crown,
} from "lucide-react";
import { processPayment } from "../../../smartcontractsHelpers/index";
import { processPaymentMassa } from "../../../massacontract";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "../../../components/ui/select";
import { Toaster } from "../../../components/ui/sonner";
import { processSubscriptionPayment } from "../../../stellarcontract/index";
import { connectStellarWallet } from "../../../stellarcontract/wallet";

function Page() {
  const { handler } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [subscriptionData, setSubscriptionData] = useState(null);
  const [buyerInfo, setBuyerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [selectedBlockchain, setSelectedBlockchain] = useState("");

  const handleChange = (value) => {
    setSelectedBlockchain(value);
    console.log("Selected:", value);
  };

  useEffect(() => {
    (async function fetchSubscription() {
      try {
        const response = await fetch("/api/subscriptioninfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: handler[0],
          }),
        });

        const result = await response.json();

        const transformed = {
          id: result.message.id,
          name: result.message.name,
          description: result.message.description,
          price: result.message.amount,
          currency: "USD",
          billing: result.message.billingTime + " days",
          createdBy: {
            name: "Merchant",
            avatar: "https://placehold.co/150x150",
            verified: true,
            subscribers: 1000,
          },
          features: [
            result.recurring ? "Auto-renew enabled" : "One-time payment",
            "Fast access",
            "Email support",
          ],
          rating: 4.7,
          reviews: 124,
          createdAt: "2024-01-01",
        };

        setSubscriptionData(transformed);
      } catch (error) {
        console.error("Fetch error:", error);
      }
    })();
  }, [handler]);

  const handleInputChange = (field, value) => {
    setBuyerInfo((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handlePurchase = async () => {
    try {
      if (selectedBlockchain == "massa") {
        setIsLoading(true);
        const res = await processPaymentMassa(
          subscriptionData.price,
          handler[1]
        );
        if (!res) {
          alert("Payment failded");
          setIsLoading(false);
          return;
        }
        setIsLoading(false);
        alert("Payment successful");
      }

      if (selectedBlockchain === "stellar") {
        setIsLoading(true);
        const address = await connectStellarWallet();
        if (address) {
          const res = await processSubscriptionPayment(address);
          if (!res) {
            alert("Payment failed");
            return;
          }
          const response = await fetch("/api/subscribers", {
            method: "POST",
            body: JSON.stringify({
              email: buyerInfo.email,
              name: buyerInfo.name,
              phonenumber: buyerInfo.phone,
              address: buyerInfo.address,
              subscriptionid: handler[0],
            }),
          });
          const data = await response.json();
          console.log(data);

          setIsLoading(false);
        }
      }

      if (selectedBlockchain === "polygon") {
        setIsLoading(true);
        const resProc = await processPayment();
        if (!resProc) {
          console.log("Payment failed");
          setIsLoading(false);
          return;
        }
        console.log(resProc);
        const response = await fetch("/api/subscribers", {
          method: "POST",
          body: JSON.stringify({
            email: buyerInfo.email,
            name: buyerInfo.name,
            phonenumber: buyerInfo.phone,
            address: buyerInfo.address,
            subscriptionid: handler[0],
          }),
        });
        const data = await response.json();
        console.log(data);

        setIsLoading(false);
      }
    } catch (error) {
      alert("Something went wrong");
      console.log(error);
    }
  };

  const isFormValid = buyerInfo.name && buyerInfo.email;

  if (!subscriptionData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading subscription details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Left Side - Subscription Details */}
          <div className="space-y-6">
            {/* Main Subscription Card */}
            <Card className="border-0 shadow-2xl backdrop-blur-sm">
              <CardHeader className="bg-slate-800 text-white rounded-t-lg">
                <div className="flex items-start justify-between">
                  <div className="space-y-2">
                    <CardTitle className="text-2xl font-bold">
                      {subscriptionData.name}
                    </CardTitle>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-white/20 text-white border-white/30"
                      >
                        <Crown className="w-3 h-3 mr-1" />
                        Premium
                      </Badge>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">
                          {subscriptionData.rating}
                        </span>
                        <span className="text-sm opacity-80">
                          ({subscriptionData.reviews} reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold">
                      ${subscriptionData.price}
                    </div>
                    <div className="text-sm opacity-90">
                      per {subscriptionData.billing}
                    </div>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Description */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">
                    Description
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {subscriptionData.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    What's Included
                  </h3>
                  <div className="grid grid-cols-1 gap-2">
                    {subscriptionData.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                        <span className="text-slate-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Side - Buyer Information */}
          <div className="space-y-6">
            <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm sticky top-8">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-xl flex items-center gap-2">
                  <CreditCard className="w-5 h-5 text-green-600" />
                  Complete Your Purchase
                </CardTitle>
                <CardDescription>
                  Enter your details to subscribe to this service
                </CardDescription>
              </CardHeader>

              <CardContent className="p-6 space-y-6">
                {/* Buyer Information Form */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Buyer Information
                  </h3>

                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-slate-700 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      placeholder="Enter your full name"
                      value={buyerInfo.name}
                      onChange={(e) =>
                        handleInputChange("name", e.target.value)
                      }
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-slate-700 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={buyerInfo.email}
                      onChange={(e) =>
                        handleInputChange("email", e.target.value)
                      }
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>

                  {/* Phone (Optional) */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-slate-700 flex items-center gap-2"
                    >
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={buyerInfo.phone}
                      onChange={(e) =>
                        handleInputChange("phone", e.target.value)
                      }
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {/* Address (Optional) */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="address"
                      className="text-sm font-medium text-slate-700 flex items-center gap-2"
                    >
                      <MapPin className="w-4 h-4" />
                      Address
                    </Label>
                    <Input
                      id="address"
                      placeholder="Your address"
                      value={buyerInfo.address}
                      onChange={(e) =>
                        handleInputChange("address", e.target.value)
                      }
                      className="focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <Separator />

                {/* Order Summary */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">
                    Order Summary
                  </h3>

                  <div className="bg-slate-50 rounded-lg p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Subscription</span>
                      <span className="font-medium">
                        {subscriptionData.name}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-600">Billing</span>
                      <span className="font-medium capitalize">
                        {subscriptionData.billing}
                      </span>
                    </div>
                    <Separator />
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total</span>
                      <span className="text-green-600">
                        ${subscriptionData.price} / {subscriptionData.billing}
                      </span>
                    </div>
                  </div>
                </div>

                <Separator />

                <Select onValueChange={handleChange}>
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select Blockchain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="polygon">Polygon</SelectItem>
                      <SelectItem value="massa">Massa</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>

                {/* Purchase Button */}
                <Button
                  onClick={handlePurchase}
                  disabled={!isFormValid || isLoading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  size="lg"
                >
                  {isLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-5 h-5" />
                      Buy Now - ${subscriptionData.price}
                    </div>
                  )}
                </Button>

                {/* Security Notice */}
                <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Shield className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Secure Purchase</p>
                    <p>
                      Your payment information is encrypted and secure. You can
                      cancel your subscription at any time.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
