"use client";

import { useEffect, useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "../../components/ui/alert-dialog";
import { Star, Gift, Sparkles, Trophy, CheckCircle } from "lucide-react";
import { usePrivy } from "@privy-io/react-auth";

export default function PopupSequence() {
  const { authenticated, user } = usePrivy();
  const [popupMessage, setPopupMessage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [isAnimating, setIsAnimating] = useState(false);

  const hasPopupBeenShown = () => {
    return sessionStorage.getItem("popup_shown") === "true";
  };

  const markPopupAsShown = () => {
    sessionStorage.setItem("popup_shown", "true");
  };

  useEffect(() => {
    if (authenticated && user?.wallet?.address && !hasPopupBeenShown()) {
      setPopupMessage("You earned 500 points!");
      setShowPopup(true);
      setCurrentStep(1);
      setIsAnimating(true);
      markPopupAsShown(); // ✅ only mark once

      const timer1 = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setPopupMessage("You're in the wishlist!");
          setPopupMessage("Recurx is currently in maintenance mode. Some features may be temporarily unavailable.");
          setCurrentStep(2);
          setIsAnimating(true);
        }, 200);
      }, 1500);

      const timer2 = setTimeout(() => {
        setIsAnimating(false);
        setTimeout(() => {
          setShowPopup(false);
          setPopupMessage(null);
        }, 300);
      }, 3000);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
      };
    }
  }, [user, authenticated]);

  const particles = Array.from({ length: 12 }, (_, i) => (
    <div
      key={i}
      className="absolute w-2 h-2 bg-gradient-to-r from-slate-400 to-slate-600 rounded-full opacity-70 animate-bounce"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 2}s`,
        animationDuration: `${2 + Math.random() * 2}s`,
      }}
    />
  ));

  const getIcon = () => {
    if (currentStep === 1) {
      return <Trophy className="w-16 h-16 text-amber-500 animate-pulse" />;
    }
    return <CheckCircle className="w-16 h-16 text-emerald-500 animate-pulse" />;
  };

  const getGradient = () => {
    return currentStep === 1
      ? "from-slate-600 via-slate-700 to-slate-800"
      : "from-slate-500 via-slate-600 to-slate-700";
  };

  return (
    <AlertDialog open={showPopup} onOpenChange={setShowPopup}>
      <AlertDialogContent className="max-w-md mx-auto border-0 bg-transparent shadow-none p-0 overflow-hidden">
        <div className="relative">
          {/* Background with gradient and blur effect */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-20 blur-xl rounded-3xl`}
          />

          {/* Main content */}
          <div
            className={`relative bg-slate-900/95 backdrop-blur-xl border border-slate-600/30 rounded-3xl p-8 shadow-2xl transform transition-all duration-700 ${
              isAnimating ? "scale-105 rotate-1" : "scale-100 rotate-0"
            }`}
          >
            {/* Particles */}
            <div className="absolute inset-0 overflow-hidden rounded-3xl">
              {particles}
            </div>

            {/* Corner sparkles */}
            <Sparkles
              className="absolute top-4 right-4 w-6 h-6 text-slate-400 animate-spin"
              style={{ animationDuration: "3s" }}
            />
            <Sparkles className="absolute bottom-4 left-4 w-4 h-4 text-slate-500 animate-ping" />

            <AlertDialogHeader className="text-center space-y-6 relative z-10">
              <div className="flex justify-center">
                <div
                  className={`relative p-4 rounded-full bg-gradient-to-br ${getGradient()} shadow-xl`}
                >
                  <div className="absolute inset-0 rounded-full bg-slate-300/20 blur-md animate-pulse" />
                  <div className="relative bg-slate-100 rounded-full p-3">
                    {getIcon()}
                  </div>
                </div>
              </div>

              <AlertDialogTitle
                className={`text-3xl font-black text-white text-center transform transition-all duration-500 ${
                  isAnimating ? "scale-110" : "scale-100"
                }`}
              >
                {popupMessage}
              </AlertDialogTitle>

              <AlertDialogDescription className="text-white text-lg font-medium">
                {currentStep === 1 ? (
                  <span className="flex items-center justify-center gap-2">
                    <Star className="w-5 h-5 text-amber-400 animate-bounce" />
                    Congratulations!
                    <Star
                      className="w-5 h-5 text-amber-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-2">
                    <Gift className="w-5 h-5 text-emerald-400 animate-bounce" />
                    Welcome to the club!
                    <Gift
                      className="w-5 h-5 text-emerald-400 animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </span>
                )}
              </AlertDialogDescription>

              <div className="flex justify-center gap-2 pt-4">
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentStep === 1
                      ? "bg-slate-400 scale-125"
                      : "bg-slate-600"
                  }`}
                />
                <div
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentStep === 2
                      ? "bg-slate-400 scale-125"
                      : "bg-slate-600"
                  }`}
                />
              </div>
            </AlertDialogHeader>

            {/* Border glow */}
            <div
              className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${getGradient()} opacity-30 blur-sm animate-pulse`}
              style={{ zIndex: -1 }}
            />
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
