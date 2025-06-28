"use client";

interface WelcomeCardProps {
  phone: string; // Always 10 digits, e.g., "9876543210"
}

export const WelcomeCard = ({ phone }: WelcomeCardProps) => {
  const masked = `+91 ${phone.slice(0, 2)}•••${phone.slice(-2)}`;

  return (
    <div className="bg-white text-[#1E1E1F] p-6 rounded-2xl shadow-lg w-full max-w-md">
      <div className="flex items-center gap-2 mb-1">
        <h2 className="text-lg font-semibold">
          Welcome back,
          <span className="text-[#14BA6C]"> {masked}</span>
          <span className="ml-1">👋</span>
        </h2>
      </div>
      <p className="text-sm text-gray-600">
        Glad to see you again on <span className="font-medium text-[#14BA6C]">MintSafe</span>.
      </p>
    </div>
  );
};



