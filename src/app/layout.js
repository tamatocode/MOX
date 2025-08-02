import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { getServerSession } from "next-auth";
import { authOptions } from "../lib/auth";



import PrivyContext from "../context/privyContext";
import { Providers } from "../context/sessionContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "MAUX",
  description: "A Decentralized Subscription Payment Gateway",
  
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        
            
            
           
              
              <Providers>
                <PrivyContext>{children}</PrivyContext>
              </Providers>
              {/* <Analytics /> */}
              {/* <SpeedInsights /> */}
              
        
        
      </body>
    </html>
  );
}
