"use client";

import React, { Suspense, useEffect, useState } from "react";
import axios from "axios";
import { ClipboardCopy, Share2 } from "lucide-react";
import { useTheme } from "../../../context/themeContext"; // Adjust path as needed

function Page() {
  const { isDarkMode } = useTheme();
  const [referralCode, setReferralCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded,setLoaded] = useState(false)
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const referralUrl = `https://www.recurx.xyz/signin?ref=${referralCode}`;

  const fetchReferralDetails = async () => {
    try {
      setLoaded(false)
      const res = await axios.get("/api/referral");
      if (res.data.message) {
        setReferralCode(res.data.message);
        setLoaded(true)
      }
      
    } catch (err) {
      console.error(err);
    }
  };

  const generateReferralCode = async () => {
    try {
      setIsLoading(true);
      const res = await axios.post("/api/referral");
      setReferralCode(res.data.referralCode);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const shareLink = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Join me on Recurx",
          text: "Check this out and earn rewards!",
          url: referralUrl,
        });
      } catch (err) {
        console.error("Sharing failed:", err);
      }
    } else {
      alert("Web Share API not supported in this browser.");
    }
  };

  useEffect(() => {
    fetchReferralDetails();
  }, []);

  return (
    <div className={`min-h-screen py-10 px-4 ${
      isDarkMode 
        ? 'bg-slate-900 text-white' 
        : 'bg-gray-50 text-gray-900'
    }`}>
      <div className={`max-w-xl mx-auto rounded-xl shadow-lg p-8 ${
        isDarkMode 
          ? 'bg-slate-800 border border-slate-700' 
          : 'bg-white border border-gray-200'
      }`}>
        <h2 className={`text-2xl font-bold mb-4 ${
          isDarkMode ? 'text-purple-300' : 'text-purple-600'
        }`}>
          Invite & Earn
        </h2>

        <Suspense fallback={
          <div className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
            Loading...
          </div>
        }>
          {referralCode !== "Not Exists" ? (
            <div className="space-y-4">
              <div>
                <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
                  Your referral code:
                </p>
                <div className={`px-4 py-2 rounded-md font-mono text-lg mt-1 break-words ${
                  isDarkMode 
                    ? 'bg-slate-700 text-purple-400' 
                    : 'bg-gray-100 text-purple-600 border border-gray-300'
                }`}>
                  {referralUrl}
                </div>
              </div>
              <div className="flex gap-4 mt-2">
                <button
                  onClick={copyToClipboard}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-colors ${
                    isDarkMode
                      ? 'bg-slate-600 hover:bg-slate-500 text-white'
                      : 'bg-gray-600 hover:bg-gray-500 text-white'
                  }`}
                >
                  <ClipboardCopy className="w-4 h-4" />
                  {copied ? "Copied!" : "Copy"}
                </button>
                <button
                  onClick={shareLink}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md transition-colors"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className={isDarkMode ? 'text-gray-400' : 'text-gray-500'}>
                You haven't generated your referral code yet.
              </p>
              <button
                onClick={generateReferralCode}
                disabled={isLoading}
                className="bg-gradient-to-r from-purple-600 to-indigo-700 hover:opacity-90 text-white px-6 py-2 rounded-lg shadow disabled:opacity-50 transition-opacity"
              >
                {isLoading ? "Generating..." : "Generate Referral Code"}
              </button>
              {error && (
                <p className="text-red-500 text-sm">{error}</p>
              )}
            </div>
          )}
        </Suspense>
      </div>
    </div>
  );
}

export default Page;