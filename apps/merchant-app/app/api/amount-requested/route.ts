// app/api/requested-amounts/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client"

type Transaction = {
  status: string;
  amount: number;
};


export async function GET(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.merchant?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const txns = await prisma.requestedTransactions.findMany({
    where: {
      merchantId: Number(session.merchant.id),
    },
  });

  let pendingRequested = 0;
  let receivedRequested = 0;

  txns.forEach((t:Transaction) => {
    const status = t.status.toLowerCase();
    if (status === "processing") {
      pendingRequested += t.amount;
    } else if (status === "success") {
      receivedRequested += t.amount;
    }
  });

  return new Response(
    JSON.stringify({ pendingRequested, receivedRequested }),
    { status: 200 }
  );
}
