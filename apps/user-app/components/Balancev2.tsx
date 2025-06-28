"use client";
import { Wallet, X } from "lucide-react";
import { useState } from "react";
import { TransferCard } from "./Transferv2";
import { DepositCard } from "./DepositCardv2";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);

  const unlocked = (amount / 100).toFixed(2);
  const lockedAmount = (locked / 100).toFixed(2);
  const total = ((amount + locked) / 100).toFixed(2);

  return (
    <>
      <div className="bg-white text-[#1E1E1F] p-6 rounded-2xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm text-gray-500">Total Balance</h2>
            <p className="text-3xl font-bold text-[#14BA6C]">₹{total}</p>
          </div>
          <div className="bg-[#14BA6C] p-3 rounded-full">
            <Wallet className="text-white w-6 h-6" />
          </div>
        </div>

        {/* Breakdown */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Unlocked Balance</span>
            <span className="font-medium text-green-600">₹{unlocked}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Locked Balance</span>
            <span className="text-green-500">₹{lockedAmount}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setShowTransfer(true)}
            className="bg-[#14BA6C] text-white text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-[#12a35e] transition"
          >
            Transfer
          </button>
          <button
            onClick={() => setShowDeposit(true)}
            className="bg-gray-100 text-sm text-gray-700 font-medium px-4 py-2 rounded-full hover:bg-gray-200 transition"
          >
            Deposit
          </button>
        </div>
      </div>

      {/* Transfer Modal */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowTransfer(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <TransferCard balance={total} available={unlocked} />
          </div>
        </div>
      )}

      {/* Deposit Modal */}
      {showDeposit && (
        <div className="fixed inset-0  z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowDeposit(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <DepositCard />
          </div>
        </div>
      )}
    </>
  );
};




