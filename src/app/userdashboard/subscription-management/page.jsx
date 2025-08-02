"use client";

import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import { Badge } from "../../../components/ui/badge";
import { useTheme } from "../../../context/themeContext";
import { useEffect, useState} from "react";
import {
  Calendar,
  DollarSign,
  Package,
  CheckCircle2,
} from "lucide-react";

function Page() {
  const { themeClasses } = useTheme();
  const [subscription, setSubscription] = useState([]);

  useEffect(() => {
    (async function fetchSubscription() {
      try {
        const res = await fetch("/api/subscribeplans", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          const errData = await res.json();
          throw new Error(errData.error || "Failed to fetch subscriptions");
        }

        const data = await res.json();
        setSubscription(data.message);
      } catch (error) {
        console.error("Error fetching subscriptions:", error);
        setError(error.message || "Unexpected error occurred");
      }
    })();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;

  const paginatedSubscriptions = subscription.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(subscription.length / itemsPerPage);

  return (
    <div className={`flex-1 p-8 ${themeClasses.background}`}>
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className={`text-3xl font-bold ${themeClasses.textPrimary}`}>
            Subscription Management
          </h1>
        </div>
        <p className={`${themeClasses.textSecondary} text-lg`}>
          Manage your subscription plans on the blockchain
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Existing Plans */}
        <div className="">
          <Card
            className={`${themeClasses.cardBackground} ${themeClasses.cardBorder} border`}
          >
            <CardHeader>
              <CardTitle
                className={`flex items-center ${themeClasses.textPrimary}`}
              >
                <Package className="w-5 h-5 mr-2" />
                Your Subscription Plans
              </CardTitle>
              <CardDescription className={themeClasses.textSecondary}>
                Manage your existing subscription plans
              </CardDescription>
            </CardHeader>
            <CardContent>
              {subscription?.length === 0 ? (
                <div className="text-center py-12">
                  <Package
                    className={`w-12 h-12 mx-auto ${themeClasses.textMuted} mb-4`}
                  />
                  <h3
                    className={`text-lg font-medium ${themeClasses.textPrimary} mb-2`}
                  >
                    No subscription plans yet
                  </h3>
                </div>
              ) : (
                <div className="space-y-4">
                  {paginatedSubscriptions.map((plan, index) => (
                    <div
                      key={index}
                      className={`p-4 rounded-lg border ${themeClasses.cardBorder} ${themeClasses.hover} transition-colors`}
                    >
                      <span>Subscription ID: {plan.id}</span>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center">
                          <CheckCircle2 className="w-5 h-5 text-green-500 mr-2" />
                          <h4
                            className={`font-semibold ${themeClasses.textPrimary}`}
                          >
                            {plan.name}
                          </h4>
                        </div>
                        <Badge variant="secondary">
                          {plan.recurring == true
                            ? "Recurring"
                            : "Non-recurring"}
                        </Badge>
                      </div>

                      {plan.description && (
                        <p
                          className={`${themeClasses.textSecondary} text-sm mb-3`}
                        >
                          {plan.description}
                        </p>
                      )}

                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center">
                            <DollarSign
                              className={`w-4 h-4 ${themeClasses.textMuted} mr-1`}
                            />
                            <span
                              className={`font-medium ${themeClasses.textPrimary}`}
                            >
                              {plan.amount}
                            </span>
                          </div>
                          <div className="flex items-center">
                            <Calendar
                              className={`w-4 h-4 ${themeClasses.textMuted} mr-1`}
                            />
                            <span
                              className={`text-sm ${themeClasses.textSecondary}`}
                            >
                              Every {plan.billingTime} days
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {subscription.length > itemsPerPage && (
            <div className="flex justify-between items-center mt-6">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </Button>
              <span className={`${themeClasses.textSecondary} text-sm`}>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Page;
