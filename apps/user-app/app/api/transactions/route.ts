// app/api/transactions/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  // Step 1: Get user with number
  const user = await prisma.user.findUnique({
    where: { id: Number(session.user.id) },
    include: {
      sentTransfers: true,
      receivedTransfers: true,
    },
  });

  if (!user?.number) {
    return new Response(JSON.stringify({ error: "User number not found" }), { status: 404 });
  }

  // Step 2: Parallel fetch other transactions
  const [onrampTxns, requestedTxns] = await Promise.all([
    prisma.onRampTransaction.findMany({
      where: { userId: Number(session.user.id) },
    }),
    prisma.requestedTransactions.findMany({
      where: {
        status: { equals: "Success" },
        To: user.number,
      },
    }),
  ]);

  // P2P Transfers
  const sent = user.sentTransfers || [];
  const received = user.receivedTransfers || [];

  const p2p = [
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

  // OnRamp
  const onramp = onrampTxns.map((t) => ({
    amount: t.amount,
    time: t.startTime,
    provider: t.provider,
    status: t.status,
  }));

  // Requested Transactions (Success → To = user's number)
  const requested = requestedTxns.map((t) => ({
    amount: t.amount,
    time: t.startTime,
    provider: "Requested",
    status: t.status,
  }));

  // Merge and sort
  const allTransactions = [...onramp, ...p2p, ...requested].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return new Response(JSON.stringify(allTransactions));
}

