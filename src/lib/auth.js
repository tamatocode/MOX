import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "./prisma";
import { cookies } from "next/headers";

let ID;
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role;
      return session;
    },

    async signIn({ user, account, profile, email, credentials }) {
      const cookieStore = await cookies();
      const ref = cookieStore.get("ref");

      // No referral code — allow normal sign in
      if (!ref?.value) return true;

      const referralCode = JSON.parse(ref.value);

      // Get the referring user by their referral code
      const referringUser = await prisma.user.findUnique({
        where: { referralCode },
      });

      if (!referringUser || !user?.email) return true;

      // ✅ Only access id after null check
      ID = referringUser.id;

      // Update referrer's point
      await prisma.user.update({
        where: { id: referringUser.id },
        data: {
          role: role,
          point: {
            increment: 75,
          },
        },
      });
      // Update new user with referredBy field
      return true;
    },
    secret: process.env.NEXTAUTH_SECRET,
  },
  events: {
    async signIn({ user, account }) {
      const cookieStore = await cookies();
      const role = cookieStore.get("role");
      const roleInfo = JSON.parse(role.value);
      const findRoleExists = await prisma.user.findUnique({
        where: {
          email: user.email,
        },
      });
      if (roleInfo != findRoleExists.role) {
        await prisma.user.update({
          where: {
            email: user.email,
          },
          data: {
            role: roleInfo,
          },
        });
      }else{
        return false
      }
      
      await prisma.user.update({
        where: { email: user.email },
        data: {
          referredBy: ID,
        },
      });
    },
  },
};
