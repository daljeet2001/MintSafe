"use client";


export default function PricingSection() {
  const pricingTiers = [
    {
      name: "Basic",
      price: 99,
      features: [
        "50 Transactions/month",
        "Email Support",
        "Standard Dashboard",
      ],
    },
    {
      name: "Pro",
      price: 199,
      featured: true, // 🔥 most popular
      features: [
        "500 Transactions/month",
        "Priority Email Support",
        "Advanced Analytics",
      ],
    },
    {
      name: "Enterprise",
      price: 499,
      features: [
        "Unlimited Transactions",
        "Dedicated Account Manager",
        "API Access",
      ],
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Flexible Pricing
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, i) => (
            <div
              key={i}
              className={`relative bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all border-2 ${
                tier.featured
                  ? "border-indigo-600 scale-105"
                  : "border-transparent"
              }`}
            >
              {tier.featured && (
                <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-semibold px-3 py-1 rounded-br-2xl rounded-tl-md">
                  Most Popular
                </div>
              )}
              <h3 className="text-2xl font-semibold mb-2 text-gray-900">
                {tier.name}
              </h3>
              <p className="text-5xl font-bold text-indigo-600 mb-6">
                ₹{tier.price}
                <span className="text-base text-gray-600">/mo</span>
              </p>
    <ul className="space-y-3 mb-8 text-left">
  {tier.features.map((feature, j) => (
    <li key={j} className="flex items-center gap-3 text-gray-700">
      <div className="w-2.5 h-2.5 bg-indigo-500 rounded-full shrink-0 mt-1" />
      <span className="text-sm">{feature}</span>
    </li>
  ))}
</ul>


              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-semibold transition">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
