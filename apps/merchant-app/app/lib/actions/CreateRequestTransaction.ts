"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function RequestTransaction(To: string, amount: number) {
    
    const session = await getServerSession(authOptions);
    if (!session?.merchant || !session.merchant?.id) {
        return {
            message: "Unauthenticated request"
        }
    }
    await prisma.requestedTransactions.create({
        data: {
            To,
            status: "Processing",
            merchantId: Number(session?.merchant?.id),
            amount: amount *100,
            startTime:new Date()
        }
    });

    return {
        message: "Done"
    }
}
