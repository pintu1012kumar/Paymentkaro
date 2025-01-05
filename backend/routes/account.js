// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db.js');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({ userId: req.userId });
  
    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }
  
    res.json({
        message: "User created successfully with these amt.",
      balance: account.balance
    });
    
    
  });

//   router.post("/transfer", authMiddleware, async (req, res) => {
//     const  session = await mongoose.startSession();
    
//       session.startTransaction();
//       const { amount, to } = req.body;
    
//       // Fetch the accounts within the transaction
//       const account = await Account.findOne({ userId: req.userId }).session(
//         session
//       );
    
//       if (!account || account.balance < account) {
//         await session.abortTransaction();
//         return res.status(400).json({
//           message: "Insufficient balance",
//         });
//       }
    
//       const toAccount = await Account.findOne({ userId: to }).session(session);
    
//       if (!toAccount) {
//         await session.abortTransaction();
//         return res.status(400).json({
//           message: "Invalid account",
//         });
//       }
    
//       // Perform the transfer
//       await Account.updateOne(
//         { userId: req.userId },
//         { $inc: { balance: -amount } }
//       ).session(session);
//       await Account.updateOne(
//         { userId: to },
//         { $inc: { balance: amount } }
//       ).session(session);
    
//       // Commit the transaction
//       await session.commitTransaction();
//       res.json({
//         message: "Transfer successful",
//       });
//     });


router.post("/transfer", authMiddleware, async (req, res) => {
    const { amount, to } = req.body;

    try {
        // Fetch the sender's account
        const account = await Account.findOne({ userId: req.userId });

        if (!account || account.balance < amount) {
            return res.status(400).json({
                message: "Insufficient balance",
            });
        }

        // Fetch the recipient's account
        const toAccount = await Account.findOne({ userId: to });

        if (!toAccount) {
            return res.status(400).json({
                message: "Invalid account",
            });
        }

        // Perform the transfer (sequential updates)
        await Account.updateOne(
            { userId: req.userId },
            { $inc: { balance: -amount } }
        );

        await Account.updateOne(
            { userId: to },
            { $inc: { balance: amount } }
        );

        // Respond with success
        res.json({
            message: "Transfer successful",
        });
    } catch (error) {
        console.error("Transfer error:", error);
        res.status(500).json({
            message: "An error occurred during the transfer",
        });
    }
});

module.exports = router;