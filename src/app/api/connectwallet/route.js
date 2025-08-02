import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export const POST = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { address } = data;

    if (!address) {
      return NextResponse.json({ message: "Wallet address required" }, { status: 400 });
    }

    // ✅ FIX: Correct use of findUnique with `where`
    const getWalletInfo = await prisma.wallet.findUnique({
      where: { walletAddress: address },
    });

    if (getWalletInfo) {
      return NextResponse.json({ message: "success" }, { status: 200 });
    }

    await prisma.wallet.create({
      data: {
        email: session.user.email,
        walletAddress: address,
      },
    });

    return NextResponse.json({ message: "Wallet added successfully" }, { status: 200 });
  } catch (error) {
    console.error("POST /api/wallet error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};


