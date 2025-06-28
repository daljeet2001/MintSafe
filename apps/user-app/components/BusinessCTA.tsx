"use client";

import { ArrowRight } from "lucide-react";

export const BusinessCTA = () => {
  return (
    <section className="bg-[#f1f5f9] py-16 px-6">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#1E1E1F] mb-6 leading-tight">
          Supercharge your business<br className="hidden sm:block" />
          with <span className="text-[#14BA6C]">MintSafe</span>
        </h2>

        <button className="bg-[#14BA6C] hover:bg-[#119f5b] text-white text-sm sm:text-base font-medium px-6 py-3 rounded-md inline-flex items-center gap-2 transition">
          Get Started Now
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
};

