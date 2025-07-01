"use client";

import { User, ChevronDown } from "lucide-react";
import { useState } from "react";

const DUMMY_USERS = [
  { name: "Daljeet Singh", identifier: "7973065721" },
  { name: "Simranjeet", identifier: "8728058499" },
  { name: "Inderjeet", identifier: "7340768733" },
];

export const RequestForm = () => {
  const [amount, setAmount] = useState(1000); // in paise
  const [selectedUser, setSelectedUser] = useState(0);
  const [editing, setEditing] = useState(false);

  const handleUserSelect = (idx: number) => setSelectedUser(idx);

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
          value= {(amount / 100).toFixed(2)}
          onChange={(e) => {
            const val =  parseFloat(e.target.value);
            if (!isNaN(val)) setAmount(Math.round(val * 100));
          }}
          className="text-xl font-bold bg-transparent outline-none text-right w-28"
        />
      </div>

      {/* User Select */}
      <div>
        <div className="flex justify-between items-center text-sm font-medium text-[#1E1E1F] mb-2">
          <span>Select user</span>
          <button className="text-indigo-600 hover:underline text-sm">
            Invite new
          </button>
        </div>

        <div className="bg-gray-50 rounded-xl shadow-sm">
          {DUMMY_USERS.map((user, idx) => (
            <div
              key={user.identifier}
              className={`flex items-center justify-between px-4 py-3 border-b last:border-none cursor-pointer rounded-xl ${
                idx === selectedUser ? "bg-white" : "hover:bg-gray-100"
              }`}
              onClick={() => handleUserSelect(idx)}
            >
              <div className="flex items-center gap-3">
                <User className="w-4 h-4 text-indigo-600" />
                <div className="text-sm">
                  <div className="font-medium text-[#1E1E1F]">{user.name}</div>
                  <div className="text-xs text-gray-500">{user.identifier}</div>
                </div>
              </div>
              {idx === selectedUser && (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Send Request Button */}
      <button
        className="w-full py-3 bg-indigo-600 text-white font-semibold text-sm rounded-full hover:bg-indigo-700 transition"
        onClick={() => {
          const user = DUMMY_USERS[selectedUser];
        }}
      >
        Send Request
      </button>
    </div>
  );
};
