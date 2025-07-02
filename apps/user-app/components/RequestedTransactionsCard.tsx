"use client";

import { useState,useEffect} from "react";
import { User, BadgeCheck, BadgeX } from "lucide-react";


interface Transaction {
  id: number;
  amount: number;
  status: string;
  merchant: {
    name?: string | null;
    number: string;
  };
}

export const RequestedTransactionsCard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [errors, setErrors] = useState<Record<number, string>>({});


  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await fetch("/api/requested-transactions");
        const data = await res.json();
        setTransactions(data);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    };

    fetchTransactions();
  }, []);

 const handleApprove = async (id: number) => {
  try {
    const res = await fetch("/api/approve-request", {
      method: "POST",
      body: JSON.stringify({ requestId: id }),
    });

    const data = await res.json();

    if (!res.ok) {
      setErrors((prev) => ({ ...prev, [id]: data.error || "Failed to approve" }));
      return;
    }

setTransactions((prev) => prev.filter((t) => t.id !== id));
    setErrors((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });

    console.log("Approved:", id);
  } catch (err) {
    console.error("Approval error:", err);
    setErrors((prev) => ({ ...prev, [id]: "Unexpected error" }));
  }
};


  const handleDecline = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
    console.log("Declined:", id);
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md w-full max-w-md h-[228px]">
      <h2 className="text-base font-semibold mb-3">Pending Payments</h2>

      <div className="space-y-3 overflow-y-auto h-[170px] pr-1">
        {transactions.length === 0 ? (
          <p className="text-sm text-gray-500">No pending payments.</p>
        ) : (
          transactions.map((tx) => (
            <div
              key={tx.id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div className="flex items-center gap-2">
                <div className="bg-gray-100 p-1 rounded-full">
                  <User className="w-4 h-4 text-gray-600" />
                </div>
                <div className="leading-tight">
                  <p className="text-xs font-medium text-gray-800">
                    {tx.merchant.name || "Anonymous"}
                  </p>
                  <p className="text-[10px] text-gray-500">{tx.merchant.number}</p>
                  <p className="text-[10px] text-blue-500 font-semibold">
                    ₹{(tx.amount / 100).toLocaleString("en-IN")}
                  </p>
                  {errors[tx.id] && (
                  <p className="text-[10px] text-red-600 mt-1">
                    {errors[tx.id]}
                  </p>
                )}

                </div>
              </div>

              <div className="flex gap-1">
              <button
                onClick={() => handleApprove(tx.id)}
                className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-700 hover:bg-green-200 font-medium"
              >
                Approve
              </button>
              <button
                onClick={() => handleDecline(tx.id)}
                className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-700 hover:bg-red-200 font-medium"
              >
                Decline
              </button>
            </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
};

