// /api/approve-request.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@repo/db/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../../lib/auth";

export async function POST(req: NextRequest) {
  const { requestId } = await req.json();
  const request = await prisma.requestedTransactions.findUnique({
    where: { id: requestId },
  });

  if (!request) {
    return NextResponse.json({ error: "Request not found" }, { status: 404 });
  }

  await prisma.$transaction([
    prisma.requestedTransactions.update({
      where: { id: requestId },
      data: { status: "Failure" },
    }),

  ]);

  return NextResponse.json({ message: "Request approved" });
}