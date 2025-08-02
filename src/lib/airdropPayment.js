import { ethers } from "ethers";

const METAMASK_ADDRESS = "0xdBdAe0261C2DDcaCA866833469886287C82A961a";

// Fetch ETH price in USD (using CoinGecko API)
const getEthPriceInUSD = async () => {
  const res = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd");
  const data = await res.json();
  return data.ethereum.usd;
};

export const SendPaymentMetaMask = async (amountInUSD) => {
  try {
    const eth = window.ethereum;

    if (!eth) {
      throw new Error("No Ethereum provider found");
    }

    if (!eth.isMetaMask) {
      throw new Error(
        "MetaMask is not the active wallet. Please disable other wallet extensions like Phantom."
      );
    }

    // Get ETH price and convert USD to ETH
    const ethPrice = await getEthPriceInUSD();
    const amountInETH = (amountInUSD / ethPrice).toFixed(6); // Optional: limit to 6 decimal places

    // Request account access
    await eth.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(eth);
    const signer = await provider.getSigner();

    const tx = await signer.sendTransaction({
      to: METAMASK_ADDRESS,
      value: ethers.parseEther(amountInETH),
    });

    console.log("Transaction Hash:", tx.hash);
    return tx.hash;

  } catch (error) {
    console.error("Payment error:", error);
    return false;
  }
};
