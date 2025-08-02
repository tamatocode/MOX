"use client";

import React, { useEffect, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  Medal,
  Award,
} from "lucide-react";
import { useTheme } from "../../../context/themeContext";

export default function UserLeaderboard() {
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 100;

  const getRankIcon = (rank) => {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Award className="w-5 h-5 text-orange-500" />;
    return <span className={`font-bold ${themeClasses.textPrimary}`}>#{rank}</span>;
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/leaderboard"); // Adjust this path if your route is different
        const data = await res.json();
        if (res.ok && Array.isArray(data.message)) {
          setUsers(data.message);
        } else {
          setError("Invalid data format");
        }
      } catch (err) {
        setError("Failed to load leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = users.slice(startIndex, endIndex);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  // Generate pagination numbers with ellipsis
  const getPaginationRange = () => {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    // Always show first page
    range.push(1);

    // Add pages around current page
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Always show last page if there's more than 1 page
    if (totalPages > 1) {
      range.push(totalPages);
    }

    // Remove duplicates and sort
    const uniqueRange = [...new Set(range)].sort((a, b) => a - b);

    // Add ellipsis where there are gaps
    let prev = 0;
    for (const page of uniqueRange) {
      if (page - prev > 1) {
        rangeWithDots.push('...');
      }
      rangeWithDots.push(page);
      prev = page;
    }

    return rangeWithDots;
  };

  if (loading) {
    return (
      <div className={`text-center ${themeClasses.textPrimary} mt-10`}>
        Loading leaderboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400 mt-10">{error}</div>
    );
  }

  return (
    <div className={`min-h-screen p-6 ${themeClasses.textPrimary}`}>
      <div className={`${themeClasses.cardBackground} rounded-lg shadow-lg overflow-hidden border ${themeClasses.border}`}>
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-800 to-indigo-900 px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Trophy className="w-6 h-6" />
            Top Users Leaderboard
          </h2>
          <p className="text-indigo-200 mt-1">Ranked by total points earned</p>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className={`${themeClasses.hoverBackground} ${themeClasses.textMuted}`}>
              <tr>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Rank</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-xs font-medium uppercase tracking-wider">Points</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user, index) => {
                const globalRank = startIndex + index + 1;
                return (
                  <tr 
                    key={user.name} 
                    className={`hover:${themeClasses.hoverBackground} transition-colors duration-150`}
                  >
                    <td className="px-6 py-4">
                      <div className={`flex items-center ${themeClasses.textPrimary}`}>
                        {getRankIcon(globalRank)}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center text-white font-semibold text-sm">
                          {user.name?.split(" ").map((s) => s[0]).join("")}
                        </div>
                        <div className={`ml-4 text-sm font-medium ${themeClasses.textPrimary}`}>
                          {user.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-indigo-400">
                        {user.point?.toLocaleString() || 0}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className={`${themeClasses.cardBackground} px-4 py-3 border-t ${themeClasses.border} sm:px-6`}>
            <div className="flex items-center justify-between">
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className={`text-sm ${themeClasses.textMuted}`}>
                    Showing{" "}
                    <span className={`font-medium ${themeClasses.textPrimary}`}>{startIndex + 1}</span>{" "}
                    to{" "}
                    <span className={`font-medium ${themeClasses.textPrimary}`}>{Math.min(endIndex, users.length)}</span>{" "}
                    of{" "}
                    <span className={`font-medium ${themeClasses.textPrimary}`}>{users.length}</span>{" "}
                    results
                  </p>
                </div>
                <div>
                  <nav className="inline-flex rounded-md shadow-sm -space-x-px">
                    {/* Previous Button */}
                    <button
                      onClick={() => goToPage(currentPage - 1)}
                      disabled={currentPage === 1}
                      className={`px-2 py-2 rounded-l-md border ${themeClasses.border} ${themeClasses.hoverBackground} text-sm ${themeClasses.textMuted} hover:${themeClasses.cardBackground} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    {/* Page Numbers */}
                    {getPaginationRange().map((page, index) => {
                      if (page === '...') {
                        return (
                          <span
                            key={`ellipsis-${index}`}
                            className={`px-4 py-2 border ${themeClasses.border} ${themeClasses.hoverBackground} text-sm ${themeClasses.textMuted}`}
                          >
                            ...
                          </span>
                        );
                      }

                      return (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`px-4 py-2 border text-sm font-medium transition-colors ${
                            currentPage === page
                              ? "bg-indigo-700 text-white border-indigo-500 z-10"
                              : `${themeClasses.hoverBackground} ${themeClasses.textMuted} ${themeClasses.border} hover:${themeClasses.cardBackground}`
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}

                    {/* Next Button */}
                    <button
                      onClick={() => goToPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className={`px-2 py-2 rounded-r-md border ${themeClasses.border} ${themeClasses.hoverBackground} text-sm ${themeClasses.textMuted} hover:${themeClasses.cardBackground} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </nav>
                </div>
              </div>

              {/* Mobile Pagination */}
              <div className="flex-1 flex justify-between sm:hidden">
                <button
                  onClick={() => goToPage(currentPage - 1)}
                  disabled={currentPage === 1}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${themeClasses.border} ${themeClasses.hoverBackground} ${themeClasses.textMuted} hover:${themeClasses.cardBackground} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                >
                  Previous
                </button>
                <span className={`px-4 py-2 text-sm ${themeClasses.textPrimary}`}>
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => goToPage(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className={`px-4 py-2 border rounded-md text-sm font-medium ${themeClasses.border} ${themeClasses.hoverBackground} ${themeClasses.textMuted} hover:${themeClasses.cardBackground} disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}