import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  // Optionally return all subscriptions of the user
  const subscriptions = await prisma.subscription.findMany({
    where: {
      UserId: session.user.id,
    },
  });

  return NextResponse.json(subscriptions);
}

export const POST = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const data = await request.json();

    const { name, description, amount, interval, recurring } = data;

    // Validate fields explicitly to allow 0 and false
    if (
      name === undefined ||
      description === undefined ||
      amount === undefined ||
      interval === undefined ||
      recurring === undefined
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    const newSubscription = await prisma.subscription.create({
      data: {
        name,
        description,
        amount: parseFloat(amount),
        billingTime: parseInt(interval),
        recurring: Boolean(recurring),
        UserId: session.user.id,
      },
    });

    return NextResponse.json(newSubscription, { status: 201 });
  } catch (error) {
    console.error("Subscription creation error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
