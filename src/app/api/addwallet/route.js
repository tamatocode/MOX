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
    const wallet = data.wallet?.trim();

    if (!wallet) {
      return NextResponse.json({ error: "Required Wallet" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!user.wallet) {
      const updated = await prisma.user.update({
        where: { email: session.user.email },
        data: {
          wallet,
          point:500,
        },
      });

      return NextResponse.json(
        { message: "Wallet connected", user: updated },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { message: "Wallet already connected" },
      { status: 200 }
    );
  } catch (error) {
    console.error("POST /connectwallet error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
