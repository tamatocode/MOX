"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";
import { useTheme } from "../context/themeContext"; // Adjust path as needed

export default function DashboardCharts({ revenueData, dailyData }) {
  const { isDarkMode } = useTheme();

  // Custom tooltip for better formatting with theme support
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-lg shadow-xl ${
            isDarkMode
              ? "bg-slate-800 border border-slate-600"
              : "bg-white border border-gray-300"
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            {`${label}`}
          </p>
          {payload.map((entry, index) => (
            <p
              key={index}
              className="text-sm font-medium"
              style={{ color: entry.color }}
            >
              {`${
                entry.dataKey === "revenue" ? "$" : ""
              }${entry.value.toLocaleString()}`}
              {entry.dataKey === "revenue" ? "" : " transactions"}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const DailyTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div
          className={`p-3 rounded-lg shadow-xl ${
            isDarkMode
              ? "bg-slate-800 border border-slate-600"
              : "bg-white border border-gray-300"
          }`}
        >
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            {`${label}`}
          </p>
          <p className="text-sm font-medium text-blue-500">
            ${payload[0].value.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  // Theme-based colors
  const gridColor = isDarkMode ? "#475569" : "#E5E7EB";
  const textColor = isDarkMode ? "#94A3B8" : "#6B7280";
  const tooltipBg = isDarkMode ? "#1E293B" : "#FFFFFF";
  const tooltipBorder = isDarkMode ? "#475569" : "#D1D5DB";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Revenue Trend Chart */}
      <Card
        className={`col-span-1 lg:col-span-2 ${
          isDarkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Revenue & Transaction Trends
          </CardTitle>
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Monthly performance overview
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            {revenueData?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                {/* [original AreaChart JSX here] */}
                {/* ... KEEP YOUR CHART CODE EXACTLY HERE ... */}
                {/* Omitted for brevity */}
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 dark:text-slate-400">
                No data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Daily Revenue Wave Chart */}
      <Card
        className={
          isDarkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        }
      >
        <CardHeader>
          <CardTitle
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Daily Revenue
          </CardTitle>
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            This week's performance
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {dailyData?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                {/* [original Daily AreaChart JSX here] */}
                {/* ... KEEP YOUR CHART CODE EXACTLY HERE ... */}
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 dark:text-slate-400">
                No data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Transaction Volume Bar Chart */}
      <Card
        className={
          isDarkMode
            ? "bg-slate-800 border-slate-700"
            : "bg-white border-gray-200"
        }
      >
        <CardHeader>
          <CardTitle
            className={`text-lg font-semibold ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Transaction Volume
          </CardTitle>
          <p
            className={`text-sm ${
              isDarkMode ? "text-slate-300" : "text-gray-600"
            }`}
          >
            Weekly transaction count
          </p>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            {dailyData?.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                {/* [original BarChart JSX here] */}
                {/* ... KEEP YOUR CHART CODE EXACTLY HERE ... */}
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-400 dark:text-slate-400">
                No data available
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
