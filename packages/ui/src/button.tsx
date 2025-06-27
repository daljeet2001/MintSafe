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
      className="text-white bg-[#00d27f] hover:bg-[#00b46c] focus:outline-none focus:ring-4 focus:ring-[#00d27f]/40 font-medium rounded-lg text-sm px-5 py-2.5 transition duration-200 shadow-md hover:shadow-lg"
    >
      {children}
    </button>
  );
};
