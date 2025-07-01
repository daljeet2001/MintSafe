"use client";

import { X, HandCoins } from "lucide-react";
import { useState } from "react";
import { RequestForm } from "./RequestForm";

export const RequestCard = ({
  pending,
  received,
}: {
  pending: number;
  received: number;
}) => {
  const [showRequestModal, setShowRequestModal] = useState(false);

  const pendingAmount = (pending / 100).toFixed(2);
  const receivedAmount = (received / 100).toFixed(2);
  const totalRequested = ((pending + received) / 100).toFixed(2);

  return (
    <>
      <div className="bg-white text-[#1E1E1F] p-6 rounded-2xl shadow-lg w-full max-w-md ">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm text-gray-500">Total Requested</h2>
            <p className="text-3xl font-bold text-indigo-500">₹{totalRequested}</p>
          </div>
          <div className="bg-indigo-500 p-3 rounded-full">
            <HandCoins className="text-white w-6 h-6" />
          </div>
        </div>

        {/* Breakdown */}
        <div className="mt-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Received</span>
            <span className="font-medium text-indigo-500">₹{receivedAmount}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Pending Requests</span>
            <span className="font-medium text-indigo-400">₹{pendingAmount}</span>
          </div>
     
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setShowRequestModal(true)}
            className="bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-full shadow hover:bg-indigo-600 transition"
          >
            Request
          </button>
      
        </div>
      </div>

      {/* Request Modal */}
      {showRequestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-md relative">
            <button
              onClick={() => setShowRequestModal(false)}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
            <RequestForm />
          </div>
        </div>
      )}
    </>
  );
};
