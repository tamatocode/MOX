"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "./ui/dialog";
import { TrendingUp } from "lucide-react";
import { sendToken, sendTokenMassa } from "../lib/payment";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "./ui/select";

export default function SendToken({ address }) {
  const [open, setOpen] = useState(false);
  const [toAddress, setToAddress] = useState("");
  const [amount, setAmount] = useState("");
  const [blockchain, setBlockchain] = useState("monad");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (address) {
      setToAddress(address);
    }
  }, [address]);

  const handleSend = async () => {
    if (!toAddress || !amount || !blockchain) {
      alert("Please complete all fields");
      return;
    }
    try {
      setLoading(true);
      if (blockchain === "monad") {
        await sendToken(toAddress, parseFloat(amount)); // assuming this signature
        setOpen(false);
      }
      if (blockchain === "massa") {
        await sendTokenMassa(amount, address);
      }
      setToAddress("");
      setAmount("");
    } catch (err) {
      console.error(err);
      alert("❌ Error sending token");
    } finally {
      setLoading(false);
    }
  };

  // if (!authenticated) return null;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-16 h-16 rounded-full p-0 flex items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center gap-1 text-xs">
            <TrendingUp className="h-4 w-4" />
            <span>Send</span>
          </div>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md">
    
        <div className="grid gap-4 py-4">
          <div>
            <label className="text-sm font-medium">To Address</label>
            <Input
              placeholder="0xRecipientAddress"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
            />
          </div>
          <div>
            <label className="text-sm font-medium">Amount</label>
            <Input
              placeholder="10"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Blockchain</label>
            <Select value={blockchain} onValueChange={setBlockchain}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Blockchain" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="monad">Monad</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            onClick={handleSend}
            disabled={loading || !toAddress || !amount}
          >
            {loading ? "Sending..." : "Send Token"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
