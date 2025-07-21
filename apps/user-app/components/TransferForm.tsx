"use client";
import { useSession } from "next-auth/react";
import {
  User as UserIcon,
  ChevronDown,
  CheckCircle,
  Check,
  BadgeCheck,
  BadgeX,
  XCircle,
  Send,
} from "lucide-react";
import { useState, useEffect } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

interface User {
  id: number;
  name?: string | null;
  email: string;
  number: string;
}

export const TransferForm = ({
  balance,
  available,
}: {
  balance: string;
  available: string;
}) => {
  const [amount, setAmount] = useState(1000); // in paise
  const [selectedUser, setSelectedUser] = useState(0);
  const [users, setUsers] = useState<User[]>([]);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleUserSelect = (idx: number) => setSelectedUser(idx);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
      }
    };
    fetchUsers();
  }, []);

  const handleRequest = async () => {
    const user = users[selectedUser];
    if (!user?.number) return;

    try {
      setStatus("idle");
      const res = await p2pTransfer(user.number, amount);
      console.log("Request result:", res);
      setStatus("success");
    } catch (err) {
      console.error("Request failed:", err);
      setStatus("error");
    }
  };

  const getButtonStyle = () => {
    if (status === "success") return "bg-green-600 hover:bg-green-700";
    if (status === "error") return "bg-red-600 hover:bg-red-700";
    return "bg-[#F5B041] hover:bg-[#D68910]";
  };

  const getButtonIcon = () => {
    if (status === "success") return <BadgeCheck className="w-4 h-4" />;
    if (status === "error") return <BadgeX className="w-4 h-4" />;
    return <Send className="w-4 h-4" />;
  };

  const getButtonText = () => {
    if (status === "success") return "Transfer Succesful";
    if (status === "error") return "Transfer Failed";
    return "Send Money";
  };

  const isExceeding = amount > Number(available) * 100;
  const existingUser=useSession().data?.user!
//   console.log(existingUser)

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md space-y-6">
      <h2 className="text-xl font-semibold text-[#1E1E1F]">Transfer Money</h2>

      {/* Wallet info */}
      <div className="bg-gray-100 rounded-xl p-4 space-y-2 shadow-inner">
        <div className="text-sm font-semibold text-gray-800">MintSafe Wallet</div>
        <div className="text-xs text-gray-500">₹{balance}</div>

        <div className="text-xs text-gray-400">
          Available: ₹{Number(available).toLocaleString("en-IN")}
        </div>
      </div>

      {/* Amount Input */}
      <div className="flex justify-between items-center bg-gray-100 py-4 px-6 rounded-xl text-lg font-semibold text-[#1E1E1F] shadow-inner">
        <span className="text-gray-500">Amount(₹)</span>
        <input
          type="number"
          step="0.01"
          min="0"
          value={(amount / 100).toFixed(2)}
          onChange={(e) => {
            const val = parseFloat(e.target.value);
            if (!isNaN(val)) setAmount(Math.round(val * 100));
          }}
          className={`text-xl font-bold bg-transparent outline-none text-right w-28 ${
            isExceeding ? "text-red-500" : ""
          }`}
        />
      </div>
      {isExceeding && (
        <p className="text-xs text-red-500 pt-1">Insufficient balance</p>
      )}

      {/* User Select */}
      <div>
        <div className="flex justify-between items-center text-sm font-medium text-[#1E1E1F] mb-2">
          <span>Select user</span>
          <button className="text-[#F5B041] hover:underline text-sm">Invite new</button>
        </div>

        <div className="bg-gray-50 rounded-xl shadow-sm">
          {users.filter((user) => user.email !== existingUser.email) 
          .map((user, idx) => (
            <div
              key={user.number}
              className={`flex items-center justify-between px-4 py-3 border-b last:border-none cursor-pointer rounded-xl ${
                idx === selectedUser ? "bg-white" : "hover:bg-gray-100"
              }`}
              onClick={() => handleUserSelect(idx)}
            >
              <div className="flex items-center gap-3">
                <UserIcon className="w-4 h-4 text-[#F5B041]" />
                <div className="text-sm">
                  <div className="font-medium text-[#1E1E1F]">
                    {user.name || "anonymous"}
                  </div>
                  <div className="text-xs text-gray-500">{user.number}</div>
                </div>
              </div>
              {idx === selectedUser && (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <button
        className={`${getButtonStyle()} text-white w-full py-3 rounded-full font-semibold flex justify-center items-center gap-2 transition`}
        onClick={handleRequest}
      >
        {getButtonIcon()}
        {getButtonText()}
      </button>
    </div>
  );
};


