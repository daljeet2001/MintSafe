import { ArrowDownRight, ArrowUpRight, IndianRupee } from "lucide-react";

export const Transactions = ({transactions}
:{
  transactions:{
    time:Date,
    amount:number,
    status:string,
    provider:string,
  }[]
}) => {
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
        const isOutgoing = ["hdfc bank", "axis bank", "yes bank"]
          .some(p => tx.provider.toLowerCase().includes(p));
        const amount = (tx.amount / 100).toFixed(2);

        let icon = isOutgoing
          ? <ArrowUpRight className="w-5 h-5 text-white" />
          : <ArrowDownRight className="w-5 h-5 text-white" />;

        let amountClass = "text-green-600";
        let iconBg = "bg-[#14BA6C]";

        if (isFailed) {
          amountClass = "text-red-600";
          iconBg = "bg-red-500";
        } else if (isProcessing) {
          amountClass = "text-amber-500 animate-pulse";
          iconBg = "bg-amber-500";
        } else if (isOutgoing) {
          // Successful outgoing tx like downramp or p2p sent
          amountClass = "text-red-600";
          iconBg = "bg-red-500";
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
                    {tx.time.toLocaleDateString()}
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
