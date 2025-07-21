import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function CallToAction() {
  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="rounded-3xl overflow-hidden flex flex-col md:flex-row bg-white text-black ">
        {/* Left Image */}
        <div className="md:w-1/2 w-full h-64 md:h-auto">
          <img
            src="https://images.unsplash.com/photo-1671824793536-6f01dfac8f37?q=80&w=1625&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Dog playing"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="md:w-1/2 w-full flex flex-col justify-center px-8 py-10">
         <h2 className="text-2xl md:text-3xl font-bold mb-4">Start Accepting Payments Today!</h2>
          <p className="text-base md:text-lg mb-6 leading-relaxed">
            Are you a business owner or merchant looking for a secure and seamless payment solution? 
            Join MintSafe to accept payments instantly, manage transactions effortlessly, and grow your business.
          </p>

          <a href="https://mint-safe-merchant-app.vercel.app" className="bg-[#F5B041] hover:opacity-90 text-white font-semibold rounded-full px-6 py-3 text-sm md:text-base flex items-center w-max transition">
            Join as a Merchant
            <ArrowRight className="ml-2 w-4 h-4" />
          </a>

        </div>
      </div>
    </div>
  );
}
