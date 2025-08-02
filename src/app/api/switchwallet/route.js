import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../../../lib/auth";
import { getServerSession } from "next-auth/next";

export const POST = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    if (!data.walletAddress) {
      return NextResponse.json(
        { message: "No wallet provided" },
        { status: 402 }
      );
    }

    await prisma.user.update({
      where: {
        email: session.user.email,
      },
      data: {
        wallet: data.walletAddress,
      },
    });
    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal server Error" },
      { status: 500 }
    );
  }
};
