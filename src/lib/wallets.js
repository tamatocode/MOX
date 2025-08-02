import { ethers } from "ethers";
import { web3 } from "@hicaru/bearby.js";
import {
  StellarWalletsKit,
  WalletNetwork,
  allowAllModules,
  XBULL_ID,
} from "@creit.tech/stellar-wallets-kit";

export const MetaMaskWallet = async () => {
  try {
    const provider = window.ethereum;
    if (!provider) {
      throw new Error("MetaMask not found");
    }
    await provider.request({ method: "eth_requestAccounts" });
    const wallet = new ethers.BrowserProvider(provider);
    const signer = await wallet.getSigner();
    const address = await signer.getAddress();
    return address;
  } catch (error) {
    console.log(error);
  }
};

export const MassaWallet = async () => {
  try {
    const connected = await web3.wallet.connect();
    if (!connected) {
      throw new Error("BearBy wallet is required");
    }
    return web3.wallet.account.base58;
  } catch (error) {
    return error;
  }
};

export const StellarWallet = async () => {
  try {
    const connect = new StellarWalletsKit({
      network: WalletNetwork.TESTNET,
      selectedWalletId: XBULL_ID,
      modules: allowAllModules(),
    });
    const WALLET_ADDRESS = await new Promise((resolve, reject) => {
      connect.openModal({
        onWalletSelected: async (option) => {
          await connect.setWallet(option.id);
          const { address } = await connect.getAddress();
          if (address) {
            resolve(address);
          } else {
            reject("Error");
          }
        },
      });
    });

    return WALLET_ADDRESS;
  } catch (error) {
    return error;
  }
};
