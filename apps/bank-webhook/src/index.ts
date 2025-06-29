import express from "express";
import db from "@repo/db/client";
const app = express();

app.use(express.json())

app.post("/hdfcWebhook", async (req, res) => {
    //TODO: Add zod validation here?
    //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
    //TODO: Check if this onRamp transaction is processing or not
    const paymentInformation: {
        token: string;
        userId: string;
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_identifier,
        amount: req.body.amount
    };

    try {
        console.log("Received webhook:", paymentInformation);
        console.log("User exists?", await db.user.findUnique({ where: { id: Number(paymentInformation.userId) } }));
        console.log("Existing balance?", await db.balance.findUnique({ where: { userId: Number(paymentInformation.userId) } }));
       

    const response=await db.$transaction([
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
                    token: paymentInformation.token
                }, 
                data: {
                    status: "Success",
                }
            })
        ]);
        res.json({
            message: "Captured"
        })
    } catch(e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})

app.listen(3003);


// import express from "express";
// import db from "@repo/db/client";
// const app = express();

// app.use(express.json())

// app.post("/hdfcWebhook", async (req, res) => {
//     //TODO: Add zod validation here?
//     //TODO: HDFC bank should ideally send us a secret so we know this is sent by them
//     //TODO: Check if this onRamp transaction is processing or not
//     const paymentInformation: {
//         token: string;
//         userId: string;
//         amount: string
//     } = {
//         token: req.body.token,
//         userId: req.body.user_identifier,
//         amount: req.body.amount
//     };

//     try {
//         await db.$transaction([
//             db.balance.updateMany({
//                 where: {
//                     userId: Number(paymentInformation.userId)
//                 },
//                 data: {
//                     amount: {
//                         // You can also get this from your DB
//                         increment: Number(paymentInformation.amount)
//                     }
//                 }
//             }),
//             db.onRampTransaction.updateMany({
//                 where: {
//                     token: paymentInformation.token
//                 }, 
//                 data: {
//                     status: "Success",
//                 }
//             })
//         ]);

//         res.json({
//             message: "Captured"
//         })
//     } catch(e) {
//         console.error(e);
//         res.status(411).json({
//             message: "Error while processing webhook"
//         })
//     }

// })

// app.listen(3003);