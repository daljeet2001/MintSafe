// /app/api/requests/route.ts
import { NextResponse } from "next/server";
import prisma from "@repo/db/client"; // or wherever your prisma instance is

export async function GET() {
  try {
    const transactions = await prisma.requestedTransactions.findMany({
      where: {
        status: "Processing", // optional: only pending
      },
      include: {
        merchant: {
          select: {
            name: true,
            number: true,
          },
        },
      },
      orderBy: {
        startTime: "desc",
      },
    });
    console.log("Found:", transactions.length);

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Failed to fetch requested transactions", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}
