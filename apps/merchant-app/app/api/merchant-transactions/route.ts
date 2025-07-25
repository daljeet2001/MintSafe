// app/api/merchant-transactions/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client"

type Transaction = {
  time: Date;
  amount: number;
  status: string;
  provider: string;
};


export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.merchant?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  // Requested Transactions
  const requested = await prisma.requestedTransactions.findMany({
    where: { merchantId: Number(session.merchant.id) },
  });

  const requestedFormatted = requested.map((t:any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.To,
  }));

  // DownRamp Transactions
  const downRamp = await prisma.downRampTransaction.findMany({
    where: { merchantId: Number(session.merchant.id) },
  });

  const downRampFormatted = downRamp.map((t:any) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));

  // Merge and sort
  const all = [...requestedFormatted, ...downRampFormatted].sort(
    (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()
  );

  return new Response(JSON.stringify(all));
}
