import { prisma } from "../../../lib/prisma";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    // Get all active subscribers with recurring subscriptions
    const activeSubscribers = await prisma.subscriber.findMany({
      where: {
        subscription: {
          recurring: false,
          billingTime: 20 // assuming 30 days = monthly
        }
      },
      include: {
        subscription: true
      }
    });

    // Calculate total monthly revenue
    const monthlyRevenue = activeSubscribers.reduce((acc, sub) => {
      return acc + (sub.subscription?.amount || 0);
    }, 0);

    return NextResponse.json({
      activeSubscribersCount: activeSubscribers.length,
      monthlyRevenue,
      activeSubscribers
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
