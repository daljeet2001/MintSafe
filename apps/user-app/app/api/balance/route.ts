// /app/api/balance/route.ts (or /pages/api/balance.ts if using pages router)
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";
import prisma from "@repo/db/client";

export async function GET(_: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const balance = await prisma.balance.findFirst({
    where: { userId: Number(session.user.id) },
  });

  return new Response(
    JSON.stringify({
      amount: balance?.amount || 0,
      locked: balance?.locked || 0,
    })
  );
}
