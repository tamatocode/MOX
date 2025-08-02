import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const POST = async (request) => {
  try {
    const data = await request.json();
    const { email, name, phonenumber, address, subscriptionid } = data;

    await prisma.subscriber.create({
      data: {
        email,
        name,
        phoneNumber: phonenumber,
        address,
        subscriptionId: subscriptionid,
      },
    });

    return NextResponse.json({ message: "success" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
};
