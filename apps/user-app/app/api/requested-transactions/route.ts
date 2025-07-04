import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth"; // adjust path if needed
import prisma from "@repo/db/client";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    const userId = session?.user?.id;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // ✅ Fetch user's number using ID
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
      select: { number: true },
    });

    if (!user?.number) {
      return new NextResponse("User not found", { status: 404 });
    }

    // ✅ Fetch requested transactions with status "Processing" and matching "to"
    const transactions = await prisma.requestedTransactions.findMany({
      where: {
        status: "Processing",
        To: user.number,
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

    return NextResponse.json(transactions);
  } catch (error) {
    console.error("❌ Failed to fetch requested transactions", error);
    return new NextResponse("Server Error", { status: 500 });
  }
}

