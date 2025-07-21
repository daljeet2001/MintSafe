"use client";
import { useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    question: "Can we add real money?",
    answer: "Since we don't have bank servers and we are mocking them from postman so no you cannot add reak money ",
  },
  {
    question: "How withdrawals and deposits work?",
    answer: "You first make the withdraw/deposit you will be redirected to baking page then go to db get your token,userId,amount from downramptransactions,onramptransactions then go to postman to hit our webhook server to change status of transaction to suuccess and you are all good",
  },
  {
    question: "Do I need a developer to integrate?",
    answer: "Not at all. Use our 1-click integrations or plugins easily.",
  },
];

export default function FAQAccordion() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section className="py-20 bg-[#f9fafb]">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-sm font-semibold text-[#F5B041] uppercase tracking-wide mb-2">
            Frequently Ask Question
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900">
            You ask?{" "}
            <span className="italic font-medium text-gray-800">We answer</span>
          </h2>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 space-y-4">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="border-b last:border-none pb-4 cursor-pointer"
              onClick={() => setOpen(open === i ? null : i)}
            >
              <div className="flex justify-between items-center">
                <h3 className="text-base sm:text-lg font-medium text-gray-900">
                  {faq.question}
                </h3>
                {open === i ? (
                  <Minus className="w-5 h-5 text-gray-500" />
                ) : (
                  <Plus className="w-5 h-5 text-gray-500" />
                )}
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
