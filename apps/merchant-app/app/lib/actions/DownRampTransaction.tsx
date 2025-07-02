// "use server";

// import prisma from "@repo/db/client";
// import { getServerSession } from "next-auth";
// import { authOptions } from "../auth";

// export async function createDownRampTransaction(provider: string, amount: number) {
    
//     const session = await getServerSession(authOptions);
//     if (!session?.merchant || !session.merchant?.id) {
//         return {
//             message: "Unauthenticated request"
//         }
//     }
//     // Ideally the token should come from the banking provider (hdfc/axis)
//     const token = (Math.random() * 1000).toString();
//     await prisma.downRampTransaction.create({
//         data: {
//             provider,
//             status: "Processing",
//             startTime: new Date(),
//             token: token,
//             merchantId: Number(session?.merchant?.id),
//             amount: amount *100
//         }
//     });

//     return {
//         message: "Done"
//     }
// }

"use server";

import prisma from "@repo/db/client";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";

export async function createDownRampTransaction(provider: string, amount: number) {
  const session = await getServerSession(authOptions);
  const merchantId = Number(session?.merchant?.id);

  if (!merchantId) {
    return {
      message: "Unauthenticated request",
    };
  }

  const token = (Math.random() * 1000).toString();

  try {
    await prisma.$transaction(async (tx) => {
      // ✅ Step 1: Get merchant balance
      const balance = await tx.merchantBalance.findFirst({
        where: { merchantId },
      });

      if (!balance) throw new Error("Merchant balance not found");

      const amountInPaise = amount * 100;
    //   will add this check later on
      if (balance.amount < amountInPaise) {
        throw new Error("Insufficient balance");
      }

      // ✅ Step 2: Deduct balance
      await tx.merchantBalance.update({
        where: { id: balance.id },
        data: {
          amount: {
            decrement: amountInPaise,
          },
        },
      });

      // ✅ Step 3: Create downRampTransaction
      await tx.downRampTransaction.create({
        data: {
          provider,
          status: "Processing",
          startTime: new Date(),
          token,
          merchantId,
          amount: amountInPaise,
        },
      });
    });

    return {
      message: "Transaction initiated and balance deducted",
    };
  } catch (e) {
    console.error("Downramp error:", e);
    return {
      message: "Error: " + (e as Error).message,
    };
  }
}

