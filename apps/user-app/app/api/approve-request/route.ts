// /api/approve-request.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id; // the one approving

  const { requestId } = await req.json();

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const request = await prisma.requestedTransactions.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  const recipientId = request.merchantId; // the merchant who requested
  const amount = request.amount;

  // ✅ Check approver (user) balance
  const userBalance = await prisma.balance.findUnique({
    where: { userId: userId },
  });

  if (!userBalance || userBalance.amount < amount) {
    return NextResponse.json({ error: "Insufficient balance" }, { status: 400 });
  }

  // ✅ Execute transaction
  await prisma.$transaction([
    prisma.balance.update({
      where: { userId: userId },
      data: {
        amount: { decrement: amount },
      },
    }),
    prisma.merchantBalance.update({
      where: { merchantId: recipientId },
      data: {
        amount: { increment: amount },
      },
    }),
    prisma.requestedTransactions.update({
      where: { id: requestId },
      data: { status: "Success" },
    }),
  ]);

  return NextResponse.json({ message: "Request approved" });
}
