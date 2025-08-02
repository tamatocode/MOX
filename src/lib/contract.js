import { ethers } from "ethers";
// import PaymentGatewayABI from "../../contracts/PaymentGateway.json";

export function getContract(signerOrProvider) {
  return new ethers.Contract(
    process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_ADDRESS,
    PaymentGatewayABI.abi,
    signerOrProvider
  );
}