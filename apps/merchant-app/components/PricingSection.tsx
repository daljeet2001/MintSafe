"use client";

export default function PricingSection() {
  const pricingTiers = [
    {
      name: "Basic",
      price: 1.25,
      features: [
        "1 Paid Registration Type",
        "Cancellation & Refunds",
        "Facebook / Disqus Conversations",
        "Use Your Own Payment Gateway",
        "Basic Attendee Self-Service",
      ],
      color: "from-indigo-400 to-indigo-600",
    },
    {
      name: "Pro",
      price: 1.5,
      featured: true,
      features: [
        "Unlimited Registration Types",
        "Cancellation & Refunds",
        "1000 Email Invites",
        "Advanced Cross-Event Analytics",
        "Advanced Attendee Self-Service",
        "Discount Codes",
      ],
    },
    {
      name: "Prepaid",
      price: 2.0,
      features: [
        "Unlimited Registration Types",
        'Display "Who Is Attending?"',
        "Abandoned Registration Follow-Ups",
        "API Access",
        "Image Gallery",
        "Priority Support",
      ],
    },
  ];

  return (
    <section className="py-20 bg-[#f9fbfd]">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Event Registration Software Packages & Pricing
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Perfect for events where attendees register & pay — conferences, training, social events, and more.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {pricingTiers.map((tier, i) => (
            <div
              key={i}
              className={`relative flex flex-col justify-between rounded-2xl p-8 shadow-lg transition-all border text-left ${
                tier.featured
                  ? "border-indigo-500 bg-white"
                  : tier.color
                  ? `bg-gradient-to-br ${tier.color} text-white`
                  : "bg-white border-transparent"
              }`}
            >
              {/* Featured Tag */}
              {tier.featured && (
                <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-2xl rounded-tr-md">
                  Most Popular
                </div>
              )}

              {/* Title */}
              <h3
                className={`text-2xl font-semibold mb-4 ${
                  tier.featured
                    ? "bg-gradient-to-r from-indigo-400 to-indigo-600 text-transparent bg-clip-text"
                    : tier.color
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                {tier.name}
              </h3>

              {/* Price */}
              <p
                className={`text-4xl font-bold mb-6 ${
                  tier.featured
                    ? "bg-gradient-to-r from-indigo-400 to-indigo-600 text-transparent bg-clip-text"
                    : tier.color
                    ? "text-white"
                    : "text-gray-900"
                }`}
              >
                ${tier.price.toFixed(2)}
              </p>

              {/* Features */}
              <ul
                className={`space-y-3 text-sm mb-8 ${
                  tier.color ? "text-white/90" : "text-gray-700"
                }`}
              >
                {tier.features.map((feature, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span>•</span>
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              {/* Button (uniform) */}
              <button className="w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-900 rounded-xl font-semibold transition">
                Get started
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


