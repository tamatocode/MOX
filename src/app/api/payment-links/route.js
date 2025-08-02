import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { ethers } from "ethers";
import { getContract } from "../../../lib/contract";
import { prisma } from "../../../lib/prisma";

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const merchant = await prisma.merchant.findUnique({
    where: { email: session.user.email },
  });
  if (!merchant.wallet) return NextResponse.json({ error: "Wallet not connected" }, { status: 400 });

  const { amount, description } = await request.json();
  const provider = new ethers.JsonRpcProvider(process.env.MONAD_TESTNET_RPC_URL);
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);
  const contract = getContract(wallet);

  try {
    const tx = await contract.createPaymentLink(ethers.parseEther(amount.toString()), description);
    await tx.wait();
    const linkId = (await contract.paymentLinkCounter()).toString();
    return NextResponse.json({ success: true, linkId });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create payment link" }, { status: 500 });
  }
}