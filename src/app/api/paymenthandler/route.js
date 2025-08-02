import { NextResponse } from "next/server";
import {prisma} from "../../../lib/prisma";

export const POST = async (request) => {
  try {
    const data = await request.json();
    const { subscribitionid, clientid, clientSecret } = await data;
    if (!subscribitionid || !clientid || !clientSecret) {
      return NextResponse.json(
        { message: "All parameters are required" },
        { status: 401 }
      );
    }

    const subInfo = await prisma.subscription.findUnique({
      where: {
        id: subscribitionid,
      },
    });
    if (!subInfo) {
      return NextResponse.json(
        { message: "Subscription not found" },
        { status: 404 }
      );
    }

    const apiInfo = await prisma.apiKey.findUnique({
      where: {
        clientId: clientid,
        clientSecret: clientSecret,
      },
    });
    if (!apiInfo) {
      return NextResponse.json(
        { message: "Invalid client secret and id" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        message: "success",
        redirect: `http://localhost:3000/checkout/${subscribitionid}`,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
};
