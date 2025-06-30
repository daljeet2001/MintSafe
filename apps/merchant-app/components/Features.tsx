"use client";
import { Wallet, ShieldCheck, Store } from "lucide-react";

const features = [
  {
    icon: <Wallet size={32} className="text-indigo-500" />,
    title: "Fast Payouts",
    desc: "Receive your payments instantly with our real-time settlement system.",
  },
  {
    icon: <ShieldCheck size={32} className="text-indigo-500" />,
    title: "Secure Transactions",
    desc: "Bank-grade encryption and fraud protection for peace of mind.",
  },
  {
    icon: <Store size={32} className="text-indigo-500" />,
    title: "Merchant Tools",
    desc: "Track sales and customer behavior with smart insights.",
  },
];

export default function Features() {
  return (
    <section className="py-16 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-3 gap-8">
        {features.map(({ icon, title, desc }, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-md text-center">
            <div className="flex justify-center mb-4">{icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
            <p className="text-sm text-gray-500">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
