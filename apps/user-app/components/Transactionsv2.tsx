"use client"
import {useState,useEffect} from "react"
import { ArrowDownRight, ArrowUpRight, IndianRupee } from "lucide-react";
type Transaction = {
  amount: number;
  time:  Date;
  provider: string;
  status: string;
};


export const Transactions = () => {
   const [transactions, setTransactions] = useState<Transaction[]>([]);

  const fetchTransactions = async () => {
    try {
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    } catch (err) {
      console.error("Failed to load transactions:", err);
    }
  };

  useEffect(() => {
    fetchTransactions(); // initial
    const interval = setInterval(fetchTransactions, 3000); // poll every 3s
    return () => clearInterval(interval);
  }, []);

  if(!transactions.length){
    return (
      <div className="bg-white text-[#1E1E1F] p-6 rounded-2xl shadow-lg h-[476px] flex items-center justify-center">
        <p className="text-sm text-gray-500">No recent transactions</p>
      </div>
    );
  }
  return (
    <div className="bg-white text-[#1E1E1F] p-6 rounded-2xl shadow-lg h-[476px] flex flex-col">
      <h2 className="text-lg font-semibold mb-4">Recent Transactions</h2>
      
      {/* Scrollable container */}
      <ul className="space-y-4 overflow-y-auto pr-2 flex-1">
        {transactions.map((tx,i) => {
          const isFailed = tx.status.toLowerCase() === "failure";
          const isProcessing = tx.status.toLowerCase() === "processing";
          const isP2PSent = tx.provider === "P2P (Sent)";
          const amount = (tx.amount / 100).toFixed(2);
          const Requested=tx.provider.toLowerCase()==="requested";

          let amountClass = "text-green-600";
          let icon = <ArrowDownRight className="w-5 h-5 text-white" />;
          let iconBg = "bg-[#14BA6C]";

          if (isFailed) {
            amountClass = "text-red-600";
            icon = <ArrowUpRight className="w-5 h-5 text-white" />;
            iconBg = "bg-red-500";
          } else if (isProcessing) {
            amountClass = "text-amber-500 animate-pulse";
            icon = <ArrowDownRight className="w-5 h-5 text-white" />;
            iconBg = "bg-amber-500";
          } else if (isP2PSent) {
            amountClass = "text-red-600";
            icon = <ArrowUpRight className="w-5 h-5 text-white" />;
            iconBg = "bg-red-500";
          }
          else if(Requested){
            amountClass="text-red-600"
            icon = <ArrowUpRight className="w-5 h-5 text-white" />;
            iconBg="bg-red-500"
          }

          return (
            <li
              key={i}
              className="flex items-center justify-between border-b border-gray-200 pb-3"
            >
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${iconBg}`}>{icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-800">
                    {tx.provider}
                    <span className="ml-2 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800">
                      {tx.status}
                    </span>
                  </p>
               <p className="text-xs text-gray-500">
               {new Date(tx.time).toLocaleDateString()}
               </p>

                </div>
              </div>

              <div className={`flex items-center gap-1 text-sm font-semibold ${amountClass}`}>
                <IndianRupee className="w-4 h-4" />
                {amount}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
