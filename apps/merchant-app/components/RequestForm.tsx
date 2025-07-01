"use client";

import { User as UserIcon, ChevronDown, CheckCircle, XCircle, Send } from "lucide-react";
import { useState, useEffect } from "react";
import { RequestTransaction } from "../app/lib/actions/CreateRequestTransaction";

interface User {
  id: number;
  name?: string | null;
  email: string;
  number: string;
}

export const RequestForm = () => {
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
      const res = await RequestTransaction(user.number, amount);
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
    return "bg-indigo-600 hover:bg-indigo-700";
  };

  const getButtonIcon = () => {
    if (status === "success") return <CheckCircle className="w-4 h-4" />;
    if (status === "error") return <XCircle className="w-4 h-4" />;
    return <Send className="w-4 h-4" />;
  };

  const getButtonText = () => {
    if (status === "success") return "Request Sent";
    if (status === "error") return "Request Failed";
    return "Send Request";
  };

  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl w-full max-w-md space-y-6">
      <h2 className="text-xl font-semibold text-[#1E1E1F]">Request Money</h2>

      <p className="text-sm text-gray-600">
        Select user and enter amount you want to request
      </p>

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
          className="text-xl font-bold bg-transparent outline-none text-right w-28"
        />
      </div>

      {/* User Select */}
      <div>
        <div className="flex justify-between items-center text-sm font-medium text-[#1E1E1F] mb-2">
          <span>Select user</span>
          <button className="text-indigo-600 hover:underline text-sm">Invite new</button>
        </div>

        <div className="bg-gray-50 rounded-xl shadow-sm">
          {users.map((user, idx) => (
            <div
              key={user.number}
              className={`flex items-center justify-between px-4 py-3 border-b last:border-none cursor-pointer rounded-xl ${
                idx === selectedUser ? "bg-white" : "hover:bg-gray-100"
              }`}
              onClick={() => handleUserSelect(idx)}
            >
              <div className="flex items-center gap-3">
                <UserIcon className="w-4 h-4 text-indigo-600" />
                <div className="text-sm">
                  <div className="font-medium text-[#1E1E1F]">{user.name || "anonymous"}</div>
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

