"use client";
import { useEffect, useState } from "react";
import { ToggleRight, Quote, Globe } from "lucide-react"; // example icons

interface CounterProps {
  value: number;
  label: string;
  title: string;
  icon: React.ReactNode;
}

const Counter = ({ value, label, title, icon }: CounterProps) => {
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
    <div className="text-center space-y-3">
 
      <div className="text-4xl font-extrabold text-gray-900">
        {Math.floor(count / 1000)}K+
      </div>
      <div className="text-indigo-600 font-medium text-sm">{label}</div>
    </div>
  );
};

export default function AnimatedCounters() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12 px-6">
        <Counter
          value={40000}
          label="Transactions"
          title="Transactions"
          icon={<ToggleRight className="w-5 h-5 text-indigo-600" />}
        />
        <Counter
          value={70000}
          label="Merchants"
          title="Merchants"
          icon={<Quote className="w-5 h-5 text-indigo-600" />}
        />
        <Counter
          value={149}
          label="Uptime"
          title="Uptime"
          icon={<Globe className="w-5 h-5 text-indigo-600" />}
        />
      </div>
    </section>
  );
}
