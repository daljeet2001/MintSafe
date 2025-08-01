"use client";
//Withdraw card
import { Building, Plus, Minus, ChevronDown } from "lucide-react";
import { useState, useRef } from "react";
import {createDownRampTransaction} from "../app/lib/actions/DownRampTransaction"


const SUPPORTED_BANKS = [
  { name: "HDFC Bank", redirectUrl:"https://netbanking.hdfcbank.com", selected: true },
  { name: "Axis Bank", redirectUrl:"https://axisbank.com", selected: false },
  { name: "Yes Bank", redirectUrl:"https://www.yesbank.in/",selected:false },
];

export const DepositCard = () => {
  const [amount, setAmount] = useState(15000); // in paise
  const [editing, setEditing] = useState(false);
  const [selectedBank, setSelectedBank] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleBankSelect = (idx: number) => setSelectedBank(idx);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    if (!isNaN(val)) {
      setAmount(Math.round(val * 100));
    }
  };

  const handleBlur = () => {
    setEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setEditing(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md space-y-6">
      <h2 className="text-xl font-semibold text-[#1E1E1F]">Top Down</h2>

      <p className="text-sm text-gray-600">
        Select amount to transfer from your wallet
      </p>

      {/* Amount Selector */}
      <div className="flex justify-between items-center bg-gray-100 py-4 px-6 rounded-xl text-lg font-semibold text-[#1E1E1F] shadow-inner">
        <button
          onClick={() => setAmount(Math.max(0, amount - 500))}
          className="text-gray-500 hover:text-[#14BA6C]"
        >
          <Minus className="w-5 h-5" />
        </button>

        {/* Editable Amount */}
        {editing ? (
          <input
            ref={inputRef}
            type="number"
            step="0.01"
            min="0"
            value={(amount / 100).toFixed(2)}
            onChange={handleAmountChange}
            onBlur={handleBlur}
            onKeyDown={handleKeyDown}
            className="text-2xl font-bold bg-transparent outline-none text-center w-28"
            autoFocus
          />
        ) : (
          <span
            className="text-2xl font-bold tracking-wide cursor-pointer"
            onClick={() => setEditing(true)}
          >
            ₹{(amount / 100).toFixed(2)}
          </span>
        )}

        <button
          onClick={() => setAmount(amount + 500)}
          className="text-gray-500 hover:text-[#14BA6C]"
        >
          <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* Bank Select */}
      <div>
        <div className="flex justify-between items-center text-sm font-medium text-[#1E1E1F] mb-2">
          <span>Payment method</span>
          <button className="text-indigo-600 hover:underline text-sm">
            Change
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl shadow-sm">
          {SUPPORTED_BANKS.map((bank, idx) => (
            <div
              key={bank.name}
              className={`flex items-center justify-between px-4 py-3 border-b last:border-none cursor-pointer rounded-xl ${
                idx === selectedBank ? "bg-white" : "hover:bg-gray-100"
              }`}
              onClick={() => handleBankSelect(idx)}
            >
              <div className="flex items-center gap-3">
                <Building className="w-4 h-4 text-indigo-600" />
                <div className="text-sm">
                  <div className="font-medium text-[#1E1E1F]">{bank.name}</div>
                </div>
              </div>
              {idx === selectedBank && (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Confirm Button */}
      <button className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-sm rounded-full  transition"
          onClick={async () => {
            const provider = SUPPORTED_BANKS[selectedBank]!;
            await createDownRampTransaction(provider.name, amount/100);
            window.location.href = provider.redirectUrl || "";
            }}>
        Confirm Top Down
      </button>
    </div>
  );
};
