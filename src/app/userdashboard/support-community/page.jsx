"use client";
import React from "react";
import { Twitter, Send } from "lucide-react";
import { useTheme } from "../../../context/themeContext";

function CommunitySupportPage() {
  const { isDarkMode, toggleTheme, themeClasses } = useTheme();

  return (
    <div
      className={`min-h-screen py-16 px-6 flex flex-col items-center ${
        isDarkMode ? "bg-slate-900 text-white" : "bg-gray-50 text-gray-900"
      }`}
    >
      <h1
        className={`text-4xl font-bold mb-4 text-center ${
          isDarkMode ? "text-purple-400" : "text-purple-600"
        }`}
      >
        Community Support
      </h1>
      <p
        className={`mb-10 text-center max-w-xl ${
          isDarkMode ? "text-slate-300" : "text-gray-600"
        }`}
      >
        Stay connected and get support from our community on your favorite
        platforms. Join us on Twitter or Telegram to receive updates, share
        feedback, or ask for help.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl w-full">
        {/* Twitter Card */}
        <a
          href="https://x.com/RecurXPay"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${
            isDarkMode
              ? "bg-gradient-to-r from-purple-800 to-indigo-900"
              : "bg-gradient-to-r from-purple-500 to-indigo-600"
          }`}
        >
          <div
            className={`p-3 rounded-full ${
              isDarkMode ? "bg-slate-800" : "bg-white/20"
            }`}
          >
            <Twitter className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Join us on Twitter
            </h2>
            <p
              className={`text-sm ${
                isDarkMode ? "text-slate-300" : "text-blue-100"
              }`}
            >
              Follow us for the latest updates and announcements.
            </p>
          </div>
        </a>

        {/* Telegram Card */}
        <a
          href="https://t.me/RecurXPay_Community"
          target="_blank"
          rel="noopener noreferrer"
          className={`flex items-center gap-4 p-6 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-105 ${
            isDarkMode
              ? "bg-gradient-to-r from-purple-800 to-indigo-900"
              : "bg-gradient-to-r from-purple-500 to-indigo-600"
          }`}
        >
          <div
            className={`p-3 rounded-full ${
              isDarkMode ? "bg-slate-800" : "bg-white/20"
            }`}
          >
            <Send className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">
              Join our Telegram
            </h2>
            <p
              className={`text-sm ${
                isDarkMode ? "text-slate-300" : "text-blue-100"
              }`}
            >
              Chat with the community and ask questions in real time.
            </p>
          </div>
        </a>
      </div>
    </div>
  );
}

export default CommunitySupportPage;
