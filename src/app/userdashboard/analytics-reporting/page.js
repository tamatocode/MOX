import Sidebar from "../../../components/Sidebar";
import Navbar from "../../../components/Navbar";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../../lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "../../../lib/prisma";

export default async function AnalyticsReporting() {
  const session = await getServerSession(authOptions);
  if (!session) redirect("/sign-in");

  const merchant = await prisma.merchant.findUnique({
    where: { email: session.user.email },
  });
  if (!merchant.wallet) redirect("/dashboard/wallet-integration");

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        <div className="p-8">
          <h1 className="text-2xl font-bold mb-4">Analytics & Reporting</h1>
          <p>View financial reports and performance metrics here.</p>
        </div>
      </div>
    </div>
  );
}