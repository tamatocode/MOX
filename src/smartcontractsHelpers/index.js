import { getProvider } from "../lib/ethers";
import { ethers } from "ethers";
import PaymentGateWayABI from "../lib/abi.json";
const contractAddress = "0xAe8A4880A1070D2BECcea2f86aAF3bf920c40fBb";

export async function createSubscriptionPlan(amount, intervalInDays, planName) {
  try {
    if (!window.ethereum) throw new Error("MetaMask not found");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      contractAddress,
      PaymentGateWayABI,
      signer
    );

    const amountINWei = ethers.parseUnits(amount.toString(), 18);
    const intervalInSeconds = parseInt(intervalInDays) * 24 * 60 * 60;

    if (!planName || amountINWei <= 0 || intervalInSeconds <= 0) {
      throw new Error("Invalid input");
    }

    console.log(
      "Calling with:",
      amountINWei.toString(),
      intervalInSeconds,
      planName
    );

    const tx = await contract.createSubscriptionPlan(
      amountINWei,
      intervalInSeconds,
      planName
    );

    await tx.wait();
    return true;
  } catch (error) {
    if (error?.error?.message) {
      console.error("Revert reason:", error.error.message);
    } else {
      console.error("Transaction error:", error);
    }
    return false;
  }
}

export async function sendMatic(toAddress, amountInMatic) {
  try {
    if (!window.ethereum) throw new Error("MetaMask not installed");
    await window.ethereum.request({ method: "eth_requestAccounts" });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const toChecksumAddress = ethers.getAddress(toAddress);

    const tx = await signer.sendTransaction({
      to: toChecksumAddress,
      value: ethers.parseEther(amountInMatic.toString()),
    });

    await tx.wait();
    console.log("Transaction hash:", tx.hash);
    return tx.hash;
  } catch (error) {
    console.error("Transaction failed:", error);
    return null;
  }
}

export async function addMerchants(merchantAddress) {
  try {
    await window.ethereum.request({ method: "eth_requestAccounts" });
    const contract = await getProvider();
    const tx = await contract.addMerchant(merchantAddress);
    await tx.wait();
    return true;
  } catch (error) {
    console.log(error);
    throw false;
  }
}

export async function createPaymentLink(amount, description) {
  try {
    const contract = await getProvider();

    const ethAmount = ethers.parseUnits(amount.toString(), 18);
    console.log("Amount in wei:", ethAmount.toString());

    const tx = await contract.createPaymentLink(ethAmount, description);

    await tx.wait();

    return true;
  } catch (error) {
    if (error?.error?.message) {
      console.error("Smart contract error:", error.error.message);
    } else {
      console.error("Error creating payment link:", error);
    }
    return false;
  }
}

export async function processPayment() {
  try {
    if (!window.ethereum) throw new Error("MetaMask not found");

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const userAddress = await signer.getAddress();

    const readContract = new ethers.Contract(
      contractAddress,
      PaymentGateWayABI,
      provider
    );
    const writeContract = new ethers.Contract(
      contractAddress,
      PaymentGateWayABI,
      signer
    );

    const latestLinkId = await readContract.paymentLinkCounter();
    console.log("Latest Link ID:", latestLinkId.toString());

    const paymentLink = await readContract.paymentLinks(latestLinkId);
    console.log("Payment Link:", paymentLink);

    // 🛑 Check if valid payment link exists
    if (
      paymentLink.amount === 0n ||
      paymentLink.merchant === ethers.ZeroAddress ||
      !paymentLink.active
    ) {
      throw new Error("No valid payment link found");
    }

    // ✅ Get monToken address from contract
    const tokenAddress = await readContract.monToken();
    const token = new ethers.Contract(tokenAddress, PaymentGateWayABI, signer);

    // ✅ Approve tokens if needed
    const allowance = await token.allowance(userAddress, contractAddress);
    if (allowance < paymentLink.amount) {
      console.log("Approving token...");
      const approveTx = await token.approve(
        contractAddress,
        paymentLink.amount
      );
      await approveTx.wait();
    }

    // ✅ Process payment
    const tx = await writeContract.processPayment(latestLinkId);
    console.log("Tx sent:", tx.hash);
    await tx.wait();
    console.log("✅ Payment successful!");

    return true;
  } catch (error) {
    console.error("Error processing payment:", error);
    return false;
  }
}

export const getMetrics = async () => {
  if (typeof window.ethereum === "undefined") {
    throw new Error("No wallet found");
  }

  const provider = new ethers.BrowserProvider(window.ethereum);
  const contract = new ethers.Contract(
    contractAddress,
    PaymentGateWayABI,
    provider
  );

  const [paymentLinkCounter, subscriptionPlanCounter, subscriptionCounter] =
    await Promise.all([
      contract.paymentLinkCounter(),
      contract.subscriptionPlanCounter(),
      contract.subscriptionCounter(),
    ]);

  // Get latest block to avoid full scan
  const latestBlock = await provider.getBlockNumber();
  const fromBlock = Math.max(0, latestBlock - 50000);

  let paymentEvents = [];
  let subscriptionEvents = [];

  try {
    paymentEvents = await contract.queryFilter(
      "PaymentProcessed",
      fromBlock,
      "latest"
    );
    subscriptionEvents = await contract.queryFilter(
      "SubscriptionPaymentProcessed",
      fromBlock,
      "latest"
    );
  } catch (error) {
    console.error("Error fetching logs:", error);
  }

  // Safely sum up revenue
  // const totalRevenueBN = [...paymentEvents, ...subscriptionEvents].reduce(
  //   (sum, e) => {
  //     const amount = e?.args?.amount;
  //     if (!amount) return sum;
  //     return sum.add(amount);
  //   },
  //   ethers.Zero
  // );

  // const totalRevenue = parseFloat(ethers.formatUnits(totalRevenueBN, 18)) || 0;
  const totalRevenue = 0;

  return {
    totalRevenue,
    totalTransactions: paymentEvents.length + subscriptionEvents.length,
    totalPaymentLinks: parseInt(paymentLinkCounter.toString()),
    totalSubscriptionPlans: parseInt(subscriptionPlanCounter.toString()),
    totalSubscriptions: parseInt(subscriptionCounter.toString()),
  };
};

export const getTransactions = async () => {
  const provider = new ethers.JsonRpcProvider(
    "https://rpc-amoy.polygon.technology"
  );

  const txHistory = await provider.getTransactionReceipt("0x0756c68f5bc6c778122c38ed19d7b8e3367a3244faa8302ad062f55e1b79e8e5");

  const DEPLOYMENT_BLOCK = await txHistory.blockNumber;

  const contract = new ethers.Contract(
    contractAddress,
    PaymentGateWayABI,
    provider
  );

  const logs = await contract.queryFilter(
    contract.filters.PaymentProcessed(),
    DEPLOYMENT_BLOCK,
    "latest"
  );

  return logs.map((log, idx) => ({
    id: `TXN-${idx + 1}`,
    customer: log.args?.payer || "0xUnknown",
    amount: parseFloat(ethers.formatEther(log.args?.amount || 0)),
    status: "completed",
    method: "Token", // Customize if method is known
    date: new Date(Number(log.blockTimestamp || Date.now())).toISOString(),
  }));
};
