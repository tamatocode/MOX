"use client";
import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
// import { useTheme } from "../../context/themeContext";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import { useRouter } from "next/navigation";

function Layout({ children }) {
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("/api/auth/session");
        const session = await response.json();
        if (session && session.user) {
          if (session.user.role === "user") {
            router.push("/userdashboard");
            return;
          } else {
            router.push("/dashboard");
            return;
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      }
    };

    checkAuth();
  }, []);

  // const { themeClasses } = useTheme();

  return (
    <div
      className={`flex flex-col min-h-screen`}
    >
      <div className="flex flex-1 flex-row">
        <div className="my-2">
          <Sidebar />
        </div>
        <main className="flex-1 p-4 overflow-auto">
          <Navbar />
          <TonConnectUIProvider manifestUrl="https://localhost:3000/tonconnect-manifest.json">
            {children}
          </TonConnectUIProvider>
        </main>
      </div>
      
      
    </div>
  );
}

export default Layout;
