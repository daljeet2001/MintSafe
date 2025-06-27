import { Card } from "@repo/ui/card";

export const BalanceCard = ({amount, locked}: {
    amount: number;
    locked: number;
}) => {
    return <Card title={"Balance"}>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div className='text-sm font-medium text-gray-800'>
                Unlocked balance
            </div>
            <div className='text-sm font-semibold text-green-600 mt-1'>
                ₹{(amount / 100).toFixed(2)}
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
            <div className='text-sm font-medium text-gray-800'>
                Total Locked Balance
            </div>
             <div className='text-sm font-semibold text-green-600 mt-1'>
                ₹{(locked / 100).toFixed(2)}
            </div>
        </div>
        <div className="flex justify-between border-b border-slate-300 py-2">
          <div className='text-sm font-medium text-gray-800'>
                Total Balance
            </div>
             <div className='text-sm font-semibold text-green-600 mt-1'>
                ₹{(locked+amount / 100).toFixed(2)}
            </div>
        </div>
    </Card>
}