import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client"
import { BalanceCard } from "../../components/Balancev2";
import { Transactions } from "../../components/Transactionsv2";
import { HeroSection } from "../../components/HeroSection";
import { FeaturesGrid } from "../../components/FeaturedGrid";
import { SupportBanner } from "../../components/SupportBanner";
import { BusinessSection } from "../../components/BusinessSection";
import { WelcomeCard } from "../../components/WelcomeCard";
import { Testimonials } from "../../components/Testimonials";


async function getBalance() {
  const session = await getServerSession(authOptions);
  // console.log("Session:", session);
  const balance = await prisma.balance.findFirst({
    where: { userId: Number(session?.user?.id) },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}
export async function getUserPhoneNumber() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { id: Number(session?.user?.id) },
    select: { number: true },
  });

  return user?.number || "Unknown";
}


async function getP2PTransactions() {
  const session = await getServerSession(authOptions);

  const userWithTransfers = await prisma.user.findUnique({
    where: { id: Number(session?.user?.id) },
    include: {
      sentTransfers: true,
      receivedTransfers: true,
    },
  });

  const sent = userWithTransfers?.sentTransfers || [];
  const received = userWithTransfers?.receivedTransfers || [];

  return [
    ...sent.map((t) => ({
      amount: t.amount,
      time: t.timestamp,
      provider: "P2P (Sent)",
      status: "Success",
    })),
    ...received.map((t) => ({
      amount: t.amount,
      time: t.timestamp,
      provider: "P2P (Received)",
      status: "Success",
    })),
  ];
}

async function getOnRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.onRampTransaction.findMany({
    where: {
      userId: Number(session?.user?.id),
    },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}

export default async function DashboardPage() {
  const balance = await getBalance();
  const userPhone = await getUserPhoneNumber();
  const [onramp, p2p] = await Promise.all([
    getOnRampTransactions(),
    getP2PTransactions(),
  ]);

  const allTransactions = [...onramp, ...p2p].sort(
    (a, b) => b.time.getTime() - a.time.getTime()
  );

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
        {/* Top Section - Welcome and Financial Overview */}
     <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
  {/* Left Column - Welcome and Balance */}
  <div className="space-y-6">
    <WelcomeCard phone={userPhone}/>
    <BalanceCard amount={balance.amount} locked={balance.locked} />
  </div>

  {/* Right Section - Transactions spanning 2 cols */}
  <div className="lg:col-span-2">
    <Transactions transactions={allTransactions} />
  </div>
</div>


        {/* Testimonials Section */}
        <div className="mt-8">
          <Testimonials />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Marketing Sections */}
        <div className="space-y-12">
          <HeroSection />
          <FeaturesGrid />
          <SupportBanner />
          <BusinessSection />
        </div>
      </div>
    </div>
  );
}
