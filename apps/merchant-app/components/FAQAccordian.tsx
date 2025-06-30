// components/merchant/FAQAccordion.tsx
"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How fast are payouts?",
    answer: "Most payouts are processed within 15 minutes via IMPS.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No setup fees. Start for free with our Basic plan.",
  },
  {
    question: "Do I need a developer to integrate?",
    answer: "Not at all. Use our 1-click integrations or plugins easily.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-gray-100">
      <div className="max-w-3xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">FAQs</h2>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow p-4 cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">{faq.question}</h3>
                <ChevronDown
                  className={`transition-transform duration-300 ${
                    open === i ? "rotate-180" : "rotate-0"
                  }`}
                />
              </div>
              {open === i && (
                <p className="text-gray-600 mt-2 text-sm">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}