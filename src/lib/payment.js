import { ethers } from "ethers";
import { web3 } from "@hicaru/bearby.js";
import {
  StellarWalletsKit,
  WalletNetwork,
  xBullModule,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";
export const Provider = async () => {
  if (window.ethereum) {
    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    return signer;
  } else {
    alert("MetaMask not found");
  }
};

const ERC20_ABI = [
  "function transfer(address to, uint amount) returns (bool)",
  "function decimals() view returns (uint8)",
];

export const sendToken = async (toAddress, amount) => {
  try {
    const signer = await Provider();
    const tokenContract = new ethers.Contract(
      "0x11fE4B6AE13d2a6055C8D9cF65c55bac32B5d844",
      ERC20_ABI,
      signer
    );
    const parsedAmount = ethers.parseEther(amount.toString());
    const tx = await tokenContract.transfer(toAddress, parsedAmount);
    await tx.wait();
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const fetchAmountETH = async () => {
  try {

    const provider = new ethers.BrowserProvider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = await provider.getSigner();
    const address = await signer.getAddress();

    const balance = await provider.getBalance(address);
    const ethBalance = ethers.formatEther(balance);

    return {
      address:address,
      balance: ethBalance.toString()
    }
    
   
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
};

export const fetchAmountMasa = async () => {
  try {
    const connected = await web3.wallet.connect();
    if (!connected) {
      throw new Error("Bearby wallet is not connect");
    }
    const res = await fetch("/api/fetchmassawalletamount", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ address: web3.wallet.account.base58 }),
    });

    const data = await res.json();
    return{
      address:web3.wallet.account.base58,
      balance:data.balance
    }
  } catch (error) {
    console.error("Error fetching Massa balance:", error);
    return null;
  }
};

export const sendTokenMassa = async (amount, address) => {
  try {
    const connected = await web3.wallet.connect();
    if (!connected) {
      throw new Error("Bearby wallet is not connect");
    }

    const txHash = await web3.massa.payment(amount, address);
    console.log(txHash);
  } catch (error) {
    console.log(error);
  }
};

export const fetchAmountStellar = async () => {
  try {
    // Initialize the kit once (singleton)
    const kit = new StellarWalletsKit({
      network: WalletNetwork.PUBLIC,
      selectedWalletId: XBULL_ID,
      modules: [new xBullModule()],
    });

    // Optionally show modal to let user pick/connect wallet
    await kit.openModal({
      onWalletSelected: async (option) => {
        await kit.setWallet(option.id);
      },
    });

    // Request public key (this automatically triggers xBull UI if needed)
    const { address: publicKey } = await kit.getAddress();

    const response = await fetch(
      `https://horizon-testnet.stellar.org/accounts/${publicKey}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch account data from Horizon Testnet");
    }

    const data = await response.json();

    return{
      address:publicKey,
      balance:data?.balances[0]?.balance ?? null
    }

  } catch (error) {
    console.error(
      "Error fetching Stellar balance via Stellar‑Wallets‑Kit:",
      error
    );
    return null;
  }
};
