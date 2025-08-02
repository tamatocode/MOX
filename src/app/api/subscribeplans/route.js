import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export const GET = async (request) => {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const planInfo = await prisma.subscriber.findMany({
      where: {
        email: session.user.email,
      },
    });
    if (!planInfo) {
      return NextResponse.json({ message: [] }, { status: 200 });
    }

    return NextResponse.json({ message: planInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
