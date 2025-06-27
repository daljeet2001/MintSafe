import prisma from "@repo/db/client";
import { AddMoney } from "../../../components/AddMoneyCard";
import { BalanceCard } from "../../../components/BalanceCard";
import { AllTransactions } from "../../../components/AllTransactions";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getBalance() {
  const session = await getServerSession(authOptions);
  const balance = await prisma.balance.findFirst({
    where: { userId: Number(session?.user?.id) },
  });

  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
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
  const [onramp, p2p] = await Promise.all([
    getOnRampTransactions(),
    getP2PTransactions(),
  ]);

  const allTransactions = [...onramp, ...p2p].sort(
    (a, b) => b.time.getTime() - a.time.getTime()
  );

  return (
    <div className="min-h-screen w-full bg-gray-100 py-6 px-4 md:px-10">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Left section: Add Money */}
        <div className="space-y-4">
          <AddMoney />
          <SendCard />  
        </div>

        {/* right section: Balance + Transactions */}
        <div className="lg:col-span-2 space-y-4">
          <BalanceCard amount={balance.amount} locked={balance.locked} />
          <AllTransactions transactions={allTransactions} />
        </div>
       
      </div>
    </div>
  );
}
