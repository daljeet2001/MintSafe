// components/merchant/AnimatedCounters.tsx
"use client";
import { useEffect, useState } from "react";

const Counter = ({ value, label }: { value: number; label: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const duration = 1000;
    const stepTime = Math.abs(Math.floor(duration / end));

    const timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, stepTime);

    return () => clearInterval(timer);
  }, [value]);

  return (
    <div className="text-center">
      <div className="text-4xl font-bold text-indigo-600">{count}+</div>
      <p className="text-gray-700 text-sm mt-2">{label}</p>
    </div>
  );
};

export default function AnimatedCounters() {
  return (
    <section className="py-16 bg-white text-black">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-6">
        <Counter value={50000} label="Transactions Daily" />
        <Counter value={10000} label="Active Merchants" />
        <Counter value={99} label="Uptime Guarantee (%)" />
      </div>
    </section>
  );
}