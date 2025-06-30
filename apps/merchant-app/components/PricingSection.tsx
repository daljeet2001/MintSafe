// components/merchant/PricingSection.tsx
export default function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-10">Flexible Pricing</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Basic", "Pro", "Enterprise"].map((tier, i) => (
            <div
              key={i}
              className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition-all"
            >
              <h3 className="text-xl font-semibold mb-2">{tier}</h3>
              <p className="text-4xl font-bold text-indigo-600 mb-4">
                ₹{(i + 1) * 99}/mo
              </p>
              <ul className="text-gray-700 space-y-2 mb-6">
                <li>✓ Feature One</li>
                <li>✓ Feature Two</li>
                <li>✓ Priority Support</li>
              </ul>
              <button className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-xl font-semibold">
                Choose Plan
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}