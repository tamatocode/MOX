import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const POST = async (request) => {
  try {
    const info = await request.json();
    const subInfo = await prisma.subscription.findUnique({
      where: { id: info.id },
    });
    if (!subInfo) {
      return NextResponse.json(
        { message: "subscription not found" },
        { status: 404 }
      );
    }
    return NextResponse.json({ message: subInfo }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
