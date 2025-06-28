"use client";

import { ArrowRight } from "lucide-react";
import { Button } from "@repo/ui/button";

interface CallToActionProps {
  onGetStarted?: () => void;
  onContactSales?: () => void;
}

export function CallToAction({ 
  onGetStarted = () => {}, 
  onContactSales = () => {} 
}: CallToActionProps) {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center bg-[#14BA6C]/10 p-12 rounded-2xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
          Ready to simplify your payments?
        </h2>
        <p className="text-xl mb-10 text-gray-600">
          Join thousands of happy customers enjoying fast, secure payments today.
        </p>
        <div className="flex gap-4 justify-center">
          <Button 
            onClick={onGetStarted}      
          >
            Get Started for Free <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
          <Button 
            onClick={onContactSales}
          >
            Contact Sales
          </Button>
        </div>
      </div>
    </section>
  );
}