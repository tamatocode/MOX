import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { prisma } from "../../../lib/prisma";
import { authOptions } from "../../../lib/auth";

export const POST = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userEmail = session.user.email;

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email: userEmail },
    });

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If referral code already exists, return it
    if (user.referralCode) {
      return NextResponse.json(
        { referralCode: user.referralCode },
        { status: 200 }
      );
    }

    // Generate a unique referral code (e.g., USERID + random string)
    const generateReferralCode = async () => {
      let code;
      let exists = true;

      while (exists) {
        const random = Math.random().toString(36).substring(2, 7).toUpperCase(); // e.g., 'A9X3K'
        code = `REF-${random}`;
        const found = await prisma.user.findUnique({
          where: { email:userEmail },
        });
        exists = !!found.referralCode;
      }

      return code;
    };

    const referralCode = await generateReferralCode();

    // Update the user with the generated referral code
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: { referralCode },
    });

    return NextResponse.json(
      { referralCode: updatedUser.referralCode },
      { status: 200 }
    );
  } catch (error) {
    console.error("Referral code generation error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
};

export const GET = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email }});
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // If referral code already exists, return it
    if (!user.referralCode) {
      return NextResponse.json({ message: "Not Exists" }, { status: 200 });
    }
    return NextResponse.json({ message: user.referralCode }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: "Not Exists" }, { status: 200 });
  }
};
