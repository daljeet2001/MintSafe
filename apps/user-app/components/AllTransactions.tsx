import { Card } from "@repo/ui/card";

export const AllTransactions = ({
  transactions,
}: {
  transactions: {
    time: Date;
    amount: number;
    status: string;
    provider: string;
  }[];
}) => {
  if (!transactions.length) {
    return (
      <Card title="All Transactions">
        <div className="text-center text-sm text-gray-500 pb-8 pt-8">
          No recent transactions
        </div>
      </Card>
    );
  }

  return (
    <Card title="All Transactions">
      <div className="pt-2 space-y-4">
        {transactions.map((t, i) => {
          const isFailed = t.status.toLowerCase() === "failure";
          const isProcessing = t.status.toLowerCase() === "processing";
          const isP2PSent = t.provider === "P2P (Sent)";
          const amount = (t.amount / 100).toFixed(2);

          let amountClass = "text-green-600";
          let amountPrefix = "+₹";

          if (isFailed) {
            amountClass = "text-red-600";
            amountPrefix = "₹";
          } else if (isProcessing) {
            amountClass = "text-amber-500 animate-pulse";
            amountPrefix = "₹";
          } else if (isP2PSent) {
            amountClass = "text-red-600";
            amountPrefix = "-₹";
          }

          return (
            <div
              key={i}
              className="flex items-start justify-between border-b pb-3 last:border-b-0"
            >
              <div>
                <div className="text-sm font-medium text-gray-800">
                  Received ₹{t.amount / 100}
                  <span className="ml-2 inline-block text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                    {t.provider}
                  </span>
                </div>
                <div className="text-xs text-gray-500">
                  {t.time.toLocaleDateString()} —        <span
                className={`text-xs font-semibold ${
                  isFailed
                    ? "text-red-600"
                    : isProcessing
                    ? "text-amber-500"
                    : "text-green-600"
                }`}
              >
                {t.status}
              </span>
                </div>
              </div>

              <div className={`text-sm font-semibold mt-1 ${amountClass}`}>
                {amountPrefix}
                {amount}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
