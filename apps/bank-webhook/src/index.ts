import express from "express";
import db from "@repo/db/client";
const app = express();
app.use(express.json());
//testing
app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here?
  //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
  //TODO: Check if this onRamp transaction is processing or not
  const paymentInformation: {
    token: string;
    userId: string;
    amount: string;
  } = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };

  try {
    console.log("Received webhook:", paymentInformation);
    console.log(
      "User exists?",
      await db.user.findUnique({
        where: { id: Number(paymentInformation.userId) },
      })
    );
    console.log(
      "Existing balance?",
      await db.balance.findUnique({
        where: { userId: Number(paymentInformation.userId) },
      })
    );
    console.log("new changes testing");

    const response = await db.$transaction([
      db.balance.upsert({
        where: {
          userId: Number(paymentInformation.userId),
        },
        update: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
        create: {
          userId: Number(paymentInformation.userId),
          amount: Number(paymentInformation.amount),
          locked: 0,
        },
      }),
      db.onRampTransaction.updateMany({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.json({
      message: "Captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});
app.post("/hdfcWebhookMerchant", async (req, res) => {
  // Parse request body for merchant withdrawal
  const paymentInformation: {
    token: string;
    merchantId: string;
    amount: string;
  } = {
    token: req.body.token,
    merchantId: req.body.merchant_identifier,
    amount: req.body.amount,
  };

  try {
    console.log("Received merchant webhook:", paymentInformation);
    console.log(
      "Merchant exists?",
      await db.merchant.findUnique({
        where: { id: Number(paymentInformation.merchantId) },
      })
    );

    console.log(
      "Merchant balance?",
      await db.merchantBalance.findUnique({
        where: { merchantId: Number(paymentInformation.merchantId) },
      })
    );

    // ✅ Update only the transaction status — balance already deducted during initiation
    const response = await db.downRampTransaction.updateMany({
      where: {
        token: paymentInformation.token,
      },
      data: {
        status: "Success",
      },
    });

    res.json({ message: "Merchant withdrawal marked successful" });
  } catch (e) {
    console.error(e);
    res
      .status(411)
      .json({ message: "Error while processing merchant webhook" });
  }
});

app.listen(3003);
