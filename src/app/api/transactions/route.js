import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const transactions = await prisma.transaction.findMany({
    where: { merchant: { email: session.user.email } },
  });
  return NextResponse.json(transactions);
}

export async function POST(request) {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { amount, status, linkId } = await request.json();
  const transaction = await prisma.transaction.create({
    data: {
      amount,
      status,
      linkId,
      merchant: { connect: { email: session.user.email } },
    },
  });

  await prisma.user.update({
    where: {
      merchant: session.user.id,
    },
    data: {
      point: {
        increment: 25,
      },
    },
  });
  return NextResponse.json(transaction);
}
