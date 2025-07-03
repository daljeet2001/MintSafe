// app/api/merchant-balance/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client"

export async function GET(_: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.merchant?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const balance = await prisma.merchantBalance.findFirst({
    where: { merchantId: Number(session.merchant.id) },
  });

  return new Response(
    JSON.stringify({
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    })
  );
}
