"use client";

import { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
}

export const Button = ({ onClick, children }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      type="button"
       className="bg-indigo-500 hover:bg-indigo-600 transition-colors text-white px-4 py-2 rounded-lg text-sm font-medium transition"
    >
      {children}
    </button>
  );
};
