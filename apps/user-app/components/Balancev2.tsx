"use client";
import { Wallet, X } from "lucide-react";
import { useState,useEffect } from "react";
import { TransferCard } from "./Transferv2";
import {TransferForm} from "./TransferForm"
import { DepositCard } from "./DepositCardv2";


export const BalanceCard = () => {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showDeposit, setShowDeposit] = useState(false);
  const [amount, setAmount] = useState(0);
  const [locked, setLocked] = useState(0);

  const unlocked = (amount / 100).toFixed(2);
  const lockedAmount = (locked / 100).toFixed(2);
  const total = ((amount + locked) / 100).toFixed(2);

  const fetchBalance = async () => {
    try {
      const res = await fetch("/api/balance");
      const data = await res.json();
      setAmount(data.amount);
      setLocked(data.locked);
    } catch (error) {
      console.error("Error fetching balance:", error);
    }
  };

  useEffect(() => {
    fetchBalance(); // initial fetch
    const interval = setInterval(fetchBalance, 3000); // refetch every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="bg-white text-[#1E1E1F] p-6 rounded-2xl shadow-lg w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm text-gray-500">Total Balance</h2>
            <p className="text-3xl font-bold text-[#F5B041]">₹{total}</p>
          </div>
          <div className="bg-[#F5B041] p-3 rounded-full">
            <Wallet className="text-white w-6 h-6" />
          </div>
        </div>

        {/* Breakdown */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Unlocked Balance</span>
            <span className="font-medium text-[#F5B041]">₹{unlocked}</span>
          </div>
          <div className="flex justify-between text-xs">
            <span className="text-gray-400">Locked Balance</span>
            <span className="text-[#F5B041] opacity-70 ">₹{lockedAmount}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setShowTransfer(true)}
            className="bg-[#F5B041] text-white text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-[#D68910] transition"
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
            <TransferForm balance={total} available={unlocked} />
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




