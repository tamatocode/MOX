'use client'
import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "../../../components/ui/card";
import { ExternalLink, Globe, Server, Zap } from "lucide-react";
import { useTheme } from "../../../context/themeContext";


function Page() {
      const { themeClasses } = useTheme();
  const networks = [
    {
      name: "Massa",
      description: "Decentralized blockchain with autonomous smart contracts",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-gradient-to-br from-purple-500 to-pink-500",
      links: [
        {
          label: "Testnet Explorer & RPC",
          url: "https://test.massa.net",
          type: "explorer"
        }
      ]
    },
    {
      name: "TON",
      description: "Fast, secure and scalable blockchain",
      icon: <Globe className="h-5 w-5" />,
      color: "bg-gradient-to-br from-blue-500 to-cyan-500",
      links: [
        {
          label: "Testnet Explorer",
          url: "https://testnet.tonscan.org",
          type: "explorer"
        },
        {
          label: "HTTP API RPC",
          url: "https://testnet.toncenter.com",
          type: "rpc"
        }
      ]
    },
    {
      name: "Polygon",
      description: "Ethereum scaling and infrastructure development",
      icon: <Server className="h-5 w-5" />,
      color: "bg-gradient-to-br from-violet-500 to-purple-500",
      links: [
        {
          label: "PoS (Amoy) RPC",
          url: "https://rpc-amoy.polygon.technology/",
          type: "rpc"
        },
        {
          label: "zkEVM (Cardona) RPC",
          url: "https://rpc.cardona.zkevm-rpc.com",
          type: "rpc"
        }
      ]
    },
    {
      name: "Binance Smart Chain",
      description: "High-performance blockchain for DeFi applications",
      icon: <Zap className="h-5 w-5" />,
      color: "bg-gradient-to-br from-yellow-500 to-orange-500",
      links: [
        {
          label: "Testnet RPC (BSC)",
          url: "https://data-seed-prebsc-1-s3.bnbchain.org:8545",
          type: "rpc"
        }
      ]
    },
    {
      name: "Stellar",
      description: "Open network for storing and moving money",
      icon: <Globe className="h-5 w-5" />,
      color: "bg-gradient-to-br from-green-500 to-emerald-500",
      links: [
        {
          label: "Horizon Testnet Endpoint",
          url: "https://horizon-testnet.stellar.org",
          type: "rpc"
        }
      ]
    }
  ];

  const getTypeIcon = (type) => {
    switch (type) {
      case 'explorer':
        return <Globe className="h-3 w-3" />;
      case 'rpc':
        return <Server className="h-3 w-3" />;
      default:
        return <ExternalLink className="h-3 w-3" />;
    }
  };

  const getTypeBadge = (type) => {
    const baseClasses = "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium";
    switch (type) {
      case 'explorer':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'rpc':
        return `${baseClasses} bg-green-100 text-green-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <div className={`min-h-screen ${themeClasses.background}  ${themeClasses.textPrimary} ${themeClasses.textMuted} p-6`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Blockchain Testnet Explorer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Access testnet environments and RPC endpoints for popular blockchain networks
          </p>
        </div>

        {/* Networks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {networks.map((network, index) => (
            <Card 
              key={network.name} 
              className={`group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 shadow-lg ${themeClasses.cardBackground} ${themeClasses.cardBorder} overflow-hidden`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-3 rounded-lg ${network.color} text-white shadow-lg`}>
                    {network.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-500">
                    #{index + 1}
                  </span>
                </div>
                <CardTitle className={`text-xl font-bold  transition-colors ${themeClasses.textPrimary}`}>
                  {network.name}
                </CardTitle>
                <p className={`text-sm  mt-2 ${themeClasses.textSecondary}`}>
                  {network.description}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {network.links.map((link, linkIndex) => (
                    <div key={linkIndex} className="group/link">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium ">
                          {link.label}
                        </span>
                        <span className={getTypeBadge(link.type)}>
                          {getTypeIcon(link.type)}
                          <span className="ml-1 capitalize">{link.type}</span>
                        </span>
                      </div>
                      <a
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-3  rounded-lg  transition-colors group/link "
                      >
                        <span className="text-sm font-mono  group-hover/link:text-blue-600 transition-colors truncate">
                          {link.url.replace(/^https?:\/\//, '')}
                        </span>
                        <ExternalLink className="h-4 w-4 text-gray-400 group-hover/link:text-blue-600 transition-colors flex-shrink-0 ml-2" />
                      </a>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Always verify endpoints before use in production environments
          </p>
        </div>
      </div>
    </div>
  );
}

export default Page;