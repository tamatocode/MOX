"use client"

import { useState, useRef } from "react"
import { motion, useAnimationControls } from "framer-motion"
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react"

// Supported coins data with proper paths
const supportedCoins = [
  {
  name: "Bitcoin",
  symbol: "BTC",
  path: "/placeholder.svg?height=100&width=100",
  color: "#C37000", 
},
{
  name: "Ethereum",
  symbol: "ETH",
  path: "/placeholder.svg?height=100&width=100",
  color: "#3C4CCF", 
},
{
  name: "Tether",
  symbol: "USDT",
  path: "/placeholder.svg?height=100&width=100",
  color: "#1C5F4A",  
},
{
  name: "USD Coin",
  symbol: "USDC",
  path: "/placeholder.svg?height=100&width=100",
  color: "#1B4E9B",
},

  {
  name: "Binance Coin",
  symbol: "BNB",
  path: "/placeholder.svg?height=100&width=100",
  color: "#2A2A2A", 
},
{
  name: "Solana",
  symbol: "SOL",
  path: "/placeholder.svg?height=100&width=100",
  color: "#0D0221",  
},
{
  name: "Cardano",
  symbol: "ADA",
  path: "/placeholder.svg?height=100&width=100",
  color: "#0A0F3C",  
},

  {
    name: "Polkadot",
    symbol: "DOT",
    path: "/placeholder.svg?height=100&width=100",
    color: "#E6007A",
  },
]
const coinSvgs = {
  BTC: <img src="/supportedCoins/bitcoin.svg" alt="Bitcoin" className="w-8 h-8" />,
  ETH: <img src="/supportedCoins/ethereum.svg" alt="Ethereum" className="w-8 h-8" />,
  USDT: <img src="/supportedCoins/tether.svg" alt="Tether" className="w-8 h-8" />,
  USDC: <img src="/supportedCoins/usdc.svg" alt="USD Coin" className="w-8 h-8" />,
  BNB: <img src="/supportedCoins/bnb.svg" alt="Binance Coin" className="w-8 h-8" />,
  SOL: <img src="/supportedCoins/solana.svg" alt="Solana" className="w-8 h-8" />,
  ADA: <img src="/supportedCoins/cardano.svg" alt="Cardano" className="w-8 h-8" />,
  DOT: <img src="/supportedCoins/polkadot.svg" alt="Polkadot" className="w-8 h-8" />,
};


// Token Card Component
function TokenCard({ coin, isActive }) {
  return (
    <motion.div
      whileHover={{ y: -10, scale: 1.05 }}
      className={`flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 ${
        isActive ? "bg-gradient-to-b from-gray-800/80 to-gray-900/80 border border-gray-700" : "hover:bg-gray-900/30"
      }`}
    >
      <div
        className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center mb-3"
        style={{ backgroundColor: `${coin.color}20` }}
      >
        <div
          className="w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: `${coin.color}40` }}
        >
          <div
              className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: coin.color }}
            >
              {coinSvgs[coin.symbol] || coin.symbol.substring(0, 1)}
            </div>
          {/* earlier code */}
          {/* <motion.div
            animate={{
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0, -5, 0],
            }}
            transition={{
              duration: 5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "reverse",
            }}
            className="flex items-center justify-center"
          >
            <div
              className="w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: coin.color }}
            >
              {coin.symbol.substring(0, 1)}
            </div>
          </motion.div> */}
        </div>
      </div>
      <h3 className="font-medium text-white">{coin.name}</h3>
      <p className="text-sm text-gray-400">{coin.symbol}</p>
    </motion.div>
  )
}

const SupportedTokens = () => {
  const [isPaused, setIsPaused] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)
  const controls = useAnimationControls()
  const containerRef = useRef(null)

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? supportedCoins.length - 1 : prev - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === supportedCoins.length - 1 ? 0 : prev + 1))
  }

  const togglePause = () => {
    setIsPaused(!isPaused)
    if (isPaused) {
      controls.start({
        x: "-100%",
        transition: {
          duration: 30,
          ease: "linear",
          repeat: Number.POSITIVE_INFINITY,
        },
      })
    } else {
      controls.stop()
    }
  }

  // Animation for token selection
  const handleTokenSelect = (index) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative py-10 w-full">
      

      {/* Mobile view - Grid layout */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:hidden">
        {supportedCoins.map((coin, index) => (
          <div key={index} onClick={() => handleTokenSelect(index)}>
            <TokenCard coin={coin} isActive={index === currentIndex} />
          </div>
        ))}
      </div>

      {/* Desktop view - Carousel */}
      <div className="hidden md:block">
        <div
          ref={containerRef}
          className="relative w-full overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, white 10%, white 90%, transparent)",
          }}
        >
          <div className="flex justify-center">
            <div className="flex gap-6 py-4 px-4">
              {supportedCoins.map((coin, index) => (
                <div key={index} className="flex-shrink-0" onClick={() => handleTokenSelect(index)}>
                  <TokenCard coin={coin} isActive={index === currentIndex} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* User controls */}
      <div className="flex justify-center items-center gap-4 mb-8">
        <button
          onClick={handlePrevious}
          className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-800/50 border border-blue-800/50 transition-colors"
          aria-label="Previous token"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
{/* this may be uncommented later - subjected to review */}
        {/* <button
          onClick={togglePause}
          className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-800/50 border border-blue-800/50 transition-colors"
          aria-label={isPaused ? "Play" : "Pause"}
        >
          {isPaused ? <Play className="h-6 w-6" /> : <Pause className="h-6 w-6" />}
        </button> */}

        <button
          onClick={handleNext}
          className="p-2 rounded-full bg-blue-900/30 hover:bg-blue-800/50 border border-blue-800/50 transition-colors"
          aria-label="Next token"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
      </div>

      {/* Token details section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mt-12 max-w-2xl mx-auto bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-800"
      >
        <div className="flex items-center gap-4">
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center"
            style={{ backgroundColor: `${supportedCoins[currentIndex].color}40` }}
          >
            <div
              className="w-12 h-12 rounded-full flex items-center justify-center font-bold text-white"
              style={{ backgroundColor: supportedCoins[currentIndex].color }}
            >
              {coinSvgs[supportedCoins[currentIndex].symbol]}
              
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold">{supportedCoins[currentIndex].name}</h3>
            <p className="text-gray-400">{supportedCoins[currentIndex].symbol}</p>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4">
          <div className="p-3 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400">Network Fee</p>
            <p className="font-medium">0.00%</p>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400">Processing Time</p>
            <p className="font-medium">~5 sec</p>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400">Min. Transaction</p>
            <p className="font-medium">5 {supportedCoins[currentIndex].symbol}</p>
          </div>
          <div className="p-3 bg-gray-800/50 rounded-lg">
            <p className="text-sm text-gray-400">Supported Networks</p>
            <p className="font-medium">3</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SupportedTokens
