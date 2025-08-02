import { web3 } from "@hicaru/bearby.js";
import React, { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Wallet } from "lucide-react";
import { addMerchantMassaWallet } from "../massacontract";

function ConnectMassaWallet() {
  const [connected, setConnected] = useState(false);
  const [wallet, setWallet] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    checkWalletConnection();
  }, []);

  async function checkWalletConnection() {
    try {
      setLoading(true);
      const w = await web3.wallet.connect();
      if (w) {
        setConnected(true);
        setWallet(web3.wallet.account.base58);
      }
    } catch (error) {
      setConnected(false);
      setWallet("");
    } finally {
      setLoading(false);
    }
  }

  async function connectWallet() {
    try {
      setLoading(true);
      const w = await web3.wallet.connect();
      if (w) {
        setConnected(true);
        setWallet(web3.wallet.account.base58);
        const res = await addMerchantMassaWallet(web3.wallet.account.base58);
        if (!res) {
          return;
        }
      }
    } catch (error) {
      setConnected(false);
      setWallet("");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  async function disconnectWallet() {
    try {
      const disconnected = await web3.wallet.disconnect();
      console.log(disconnected);
      setConnected(false);
      setWallet("");
    } catch (error) {
      console.log(error);
      setConnected(true);
      setWallet(wallet);
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-4">
      {/* Connected Wallet Section */}
      {connected && (
        <div>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-orange-600" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Massa Wallet</div>
                  <div className="text-sm text-gray-500">
                    Wallet connected successfully
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                  Connected
                </div>
                <button
                  onClick={disconnectWallet}
                  className="text-red-600 hover:text-red-800 text-xs px-2 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  Disconnect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connect Section */}
      <div>
       
        {!connected && (
          <Button
            onClick={connectWallet}
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
          >
            {loading ? "Connecting..." : "Connect Wallet"}
          </Button>
        )}
      </div>
    </div>
  );
}

export default ConnectMassaWallet;
