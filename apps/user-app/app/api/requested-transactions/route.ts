import { NextResponse } from "next/server";
import prisma from "@repo/db/client";

// ✅ Force Next.js to always re-run this function (no static cache)
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const dbUrl = process.env.DATABASE_URL;
    console.log("🔍 Connected to DB:", dbUrl?.split("@")[1] || "(no URL)");

    const transactions = await prisma.requestedTransactions.findMany({
      where: {
        status: {
          equals: "Processing",
        },
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

    console.log("✅ Fetched", transactions.length, "processing transactions");

    // Optional: log individual statuses to be extra sure
    transactions.forEach((t) => {
      console.log(`→ txn id: ${t.id} status: ${t.status}`);
    });

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("❌ Failed to fetch requested transactions", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

