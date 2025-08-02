import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { prisma } from "../../../lib/prisma";

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const info = await prisma.user.findUnique({
        where:{
            email:session.user.email
        },
        select:{
            point:true
        }
    })
   
    return NextResponse.json({ message: info.point }, { status: 200 });
  } catch (error) {
    console.error("POST /api/wallet error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};
