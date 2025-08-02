import { ethers } from "ethers";
import PaymentGateWayABI from "./abi.json";

// 0x094972B001302470EF255295D6F6d8394259d707
const contractAddress = "0x094972B001302470EF255295D6F6d8394259d707";

export async function getProvider() {
  if (typeof window === "undefined") throw new Error("No window object");

  const eth = window.ethereum;

  if (!eth) {
    throw new Error("No Ethereum provider found");
  }

  if (!eth.isMetaMask) {
    throw new Error("MetaMask is not the active wallet. Please disable other wallet extensions like Phantom.");
  }

  // Request accounts from MetaMask
  await eth.request({ method: "eth_requestAccounts" });

  const provider = new ethers.BrowserProvider(eth);
  const signer = await provider.getSigner();
  const contract = new ethers.Contract(contractAddress, PaymentGateWayABI, signer);

  return contract;
}
