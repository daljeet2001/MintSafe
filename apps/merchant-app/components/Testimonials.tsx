"use client";

const testimonials = [
  {
    name: "Anjali Traders",
    feedback: "MintSafe has completely streamlined our daily operations. Payments are fast and reliable.",
  },
  {
    name: "City Bookstore",
    feedback: "The dashboard insights help us track customer trends easily. Highly recommended!",
  },
];

export default function Testimonials() {
  return (
    <section className="py-16 px-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">What Our Merchants Say</h2>
      <div className="grid md:grid-cols-2 gap-8">
        {testimonials.map(({ name, feedback }, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-md">
            <p className="italic text-gray-600 mb-4">“{feedback}”</p>
            <p className="font-semibold text-indigo-600 text-sm">– {name}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
