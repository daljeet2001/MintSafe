"use client";

import { useState, useRef } from "react";
import { CheckCircle, Phone, Send, XCircle,BadgeCheck,BadgeX } from "lucide-react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export const TransferCard = ({balance,available}:{balance:string,available:string} )=> {
  const [amount, setAmount] = useState(10000); // in paise
  const [editing, setEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const isValid = phoneNumber.length === 10;

  const handleTransfer = async () => {
    try {
      setStatus("idle");
      const res:any = await p2pTransfer(phoneNumber, amount);
      console.log("Response:", res);
      if(res.message=="User not found"){
        setStatus("error")
        return
      }
      setStatus("success");
    } catch (err) {
      console.error("Error:", err);
      setStatus("error");
    }
  };

  const getButtonStyle = () => {
    if (status === "success") return "bg-green-600 hover:bg-green-700";
    if (status === "error") return "bg-red-600 hover:bg-red-700";
    return "bg-[#14BA6C] hover:bg-[#12a35e]";
  };

  const getButtonIcon = () => {
    if (status === "success") return <BadgeCheck className="w-4 h-4" />;
    if (status === "error") return <BadgeX className="w-4 h-4" />;
    return <Send className="w-4 h-4" />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl w-full p-6 space-y-5">
      {/* Phone Input */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-[#1E1E1F]">Recipient Number</label>
        <div
          className={`flex items-center px-4 py-3 rounded-xl bg-white shadow-inner transition relative ${
            isValid
              ? "border border-gray-200 focus-within:ring-[#14BA6C]"
              : "border border-red-500 focus-within:ring-red-500"
          } focus-within:ring-2`}
        >
          <Phone className={`w-4 h-4 ${isValid ? "text-gray-500" : "text-red-500"}`} />
          <span className="ml-3 text-sm text-gray-700 font-medium select-none">+91</span>
          <input
            type="tel"
            inputMode="numeric"
            maxLength={10}
            placeholder="Enter 10-digit number"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="ml-3 w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
          />
          {isValid && <CheckCircle className="w-5 h-5 text-[#14BA6C] absolute right-3" />}
        </div>
        {!isValid && phoneNumber.length > 0 && (
          <p className="text-xs text-red-500 pl-1">Please enter a valid 10-digit number</p>
        )}
      </div>

      {/* Amount Section */}

      {/* Amount Section */}
<div className="bg-gray-100 rounded-xl p-4 space-y-2">
  <div className="text-sm font-semibold text-gray-800">MintSafe Wallet</div>
  <div className="text-xs text-gray-500">₹{balance}</div>

  {/* 🔴 Conditional styling if amount exceeds available */}
  {editing ? (
    <input
      ref={inputRef}
      type="number"
      step="0.01"
      min="0"
      value={(amount / 100).toFixed(2)}
      onChange={(e) => {
        const val = parseFloat(e.target.value);
        if (!isNaN(val)) setAmount(Math.round(val * 100));
      }}
      onBlur={() => setEditing(false)}
      onKeyDown={(e) => e.key === "Enter" && setEditing(false)}
      className={`text-3xl font-bold bg-transparent outline-none w-full tracking-wide ${
        amount > Number(available) * 100 ? "text-red-500" : "text-[#1E1E1F]"
      }`}
      autoFocus
    />
  ) : (
    <div
      className={`text-3xl font-bold tracking-wide cursor-pointer ${
        amount > Number(available) * 100 ? "text-red-500" : "text-[#1E1E1F]"
      }`}
      onClick={() => setEditing(true)}
    >
      ₹{(amount / 100).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
    </div>
  )}

  <div className="text-xs text-gray-400">
    Available: ₹{Number(available).toLocaleString("en-IN")}
  </div>

  {/* ❌ Optional error message */}
  {amount > Number(available) * 100 && (
    <p className="text-xs text-red-500 pt-1">Insufficient balance</p>
  )}
</div>





      {/* Submit Button with Dynamic Styling */}
      <button
        disabled={!isValid}
        className={`${getButtonStyle()} text-white w-full py-3 rounded-full font-semibold flex justify-center items-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed`}
        onClick={handleTransfer}
      >
        {getButtonIcon()}
        {status === "success"
          ? "Transfer Successful"
          : status === "error"
          ? "Transfer Failed"
          : "Send Money"}
      </button>
    </div>
  );
};



