import { User, CreditCard, Send } from "lucide-react";

export function HowItWorks() {
  const steps = [
    {
      icon: <User className="h-6 w-6 text-[#14BA6C]" />,
      title: "Create an Account",
      description: "Sign up in minutes with just your email and phone number."
    },
    {
      icon: <CreditCard className="h-6 w-6 text-[#14BA6C]" />,
      title: "Link Your Payment Method",
      description: "Connect your bank account, card, or mobile wallet."
    },
    {
      icon: <Send className="h-6 w-6 text-[#14BA6C]" />,
      title: "Send & Receive Money",
      description: "Start transacting instantly with anyone, anywhere."
    }
  ];

  return (
    <section className="py-16 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-3 py-1 text-xs font-semibold text-[#14BA6C] bg-green-50 rounded-full mb-4">
            SIMPLE STEPS
          </span>
          <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
        </div>
        <div className="flex flex-col md:flex-row gap-8">
          {steps.map((step, index) => (
            <div key={index} className="flex-1 flex flex-col items-center text-center">
              <div className="flex items-center justify-center h-12 w-12 rounded-full bg-green-50 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900">{step.title}</h3>
              <p className="text-gray-600">{step.description}</p>
              {index < steps.length - 1 && (
                <div className="hidden md:block mt-4 text-gray-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}