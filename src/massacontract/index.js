import {
  Account,
  Args,
  JsonRpcProvider,
  SmartContract,
  Mas,
} from "@massalabs/massa-web3";

const CONTRACT_ADDRESS = "AS1hJm1JyPdiCegvZX1RrEnimcFkfW7oUkS1LtGxCAwDnFamadg2";

const PRIVATE_KEY = process.env.MASSA_PRIVATE_KEY;

export const Provider = async () => {
  try {
    if (!PRIVATE_KEY) {
      throw new Error("Private Key requried");
    }
    console.log(PRIVATE_KEY);

    let account = await Account.fromPrivateKey(PRIVATE_KEY);
    let provider = JsonRpcProvider.fromRPCUrl(
      "https://buildnet.massa.net/api/v2",
      account
    );
    let contract = new SmartContract(provider, CONTRACT_ADDRESS);
    return contract;
  } catch (error) {
    console.log(error);
    return error;
  }
};

export const addMerchantMassaWallet = async (userWalletAddress) => {
  try {
    const contract = await Provider();
    const args = new Args().addString(userWalletAddress.toString());
    const tx = await contract.call("addMerchant", args);
    console.log(tx);
    return true;
  } catch (error) {
    console.log(error);
  }
};

export const createSubscriptionPlanMassaWallet = async (
  amount,
  interval,
  name
) => {
  try {
    const contract = await Provider();
    const args = new Args().addU64(amount).addU64(interval).addString(name);
    const tx = await contract.call("createSubscriptionPlan", args, {
      coins: Mas.fromString("0.000001"),
      maxGas: 3_000_000n,
    });
    console.log(tx);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const createPaymentLinkMassaWallet = async (amount, description) => {
  try {
    const contract = await Provider();
    const args = new Args().addU64(amount).addString(description);
    const tx = await contract.call("createPaymentLink", args, {
      coins: Mas.fromString("0.000001"),
      maxGas: 3_000_000n,
    });
    console.log("Payment link created:", tx);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const processPaymentMassa = async (amount, address) => {
  try {
    const contract = await Provider();
    const res = await contract.read("getPaymentLinkCounter", new Args());
    const decoded = new Args(res.value).nextU64();

    const args = new Args().addU64(decoded).addString(address);
    const tx = await contract.call("processPayment", args, {
      coins: Mas.fromMas(BigInt(amount)),
      maxGas: 3_000_000n,
    });

    console.log(tx);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
