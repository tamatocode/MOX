import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export const POST = async (request) => {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    const data = await request.json();
    if (!data.option) {
      return NextResponse.json({ message: "Option required" });
    }

    if (data.option === "address") {
      const info = await prisma.user.findMany({
        where: {
          wallet: data.address,
        },
        select: {
          email: true,
          wallet: true,
        },
      });
      if (!info || info.length == 0) {
        return NextResponse.json(
          { message: "Address not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "success", data: info },
        { status: 200 }
      );
    }
    if (data.option === "email") {
      const info = await prisma.user.findUnique({
        where: {
          email: data.email,
        },
        select: {
          email: true,
          wallet: true,
        },
      });
      if (!info || info.length == 0) {
        return NextResponse.json(
          { message: "Email not found" },
          { status: 404 }
        );
      }
      return NextResponse.json(
        { message: "success", data: info },
        { status: 200 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Eror" },
      { status: 500 }
    );
  }
};
