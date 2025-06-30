"use client";
export default function Hero() {
  return (
    <section className="py-24 px-6 text-center max-w-4xl mx-auto">
      <h1 className="text-5xl font-bold mb-4 leading-tight text-gray-900">
        Grow Your Business with <span className="text-indigo-600">MintSafe</span>
      </h1>
      <p className="text-lg text-gray-600 mb-8">
        Accept payments, track transactions, and manage customers—all from a single dashboard.
      </p>
      <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 transition-colors rounded-xl text-white font-medium text-sm shadow-xl">
        Get Started
      </button>
    </section>
  );
}
