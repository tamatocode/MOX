import { NextResponse } from "next/server";
import { prisma } from "../../../lib/prisma";

export const GET = async () => {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        point: "desc",
      },
      select: {
        name: true,
        image: true,
        point: true,
      },
    });

    if (!users || users.length === 0) {
      return NextResponse.json({ message: "No Users" }, { status: 200 });
    }

    return NextResponse.json({ message: users }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message || error }, { status: 500 });
  }
};
    