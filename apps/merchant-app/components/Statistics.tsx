"use client";

const stats = [
  { stat: "50K+", label: "Transactions Daily" },
  { stat: "10K+", label: "Active Merchants" },
  { stat: "99.99%", label: "Uptime Guarantee" },
];

export default function Statistics() {
  return (
    <section className="bg-indigo-50 px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-10">Trusted by Thousands of Merchants</h2>
        <div className="grid sm:grid-cols-3 gap-6">
          {stats.map(({ stat, label }, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-4xl font-bold text-indigo-600">{stat}</h3>
              <p className="text-sm text-gray-600">{label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
