import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { randomBytes } from "crypto";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const merchantId = Number(session.user.id);
    if (isNaN(merchantId)) {
      return NextResponse.json(
        { error: "Invalid merchant ID" },
        { status: 400 }
      );
    }
    const data = await prisma.apiKey.findMany({
      where: {
        merchantId: merchantId,
      },
    });
    return NextResponse.json({ message: data }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 });
  }
};

export const POST = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await request.json();
    const { key } = await data;
    if (!key) {
      return NextResponse.json({ message: "Key is required" }, { status: 402 });
    }
    const clientId = randomBytes(16).toString("hex");
    const clientSecret = randomBytes(32).toString("hex");
    await prisma.apiKey.create({
      data: {
        key: key,
        merchantId: Number(session.user.id),
        clientId,
        clientSecret,
      },
    });
    return NextResponse.json({ message: "Success" }, { status: 200 });
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: error }, { status: 500 });
  }
};
