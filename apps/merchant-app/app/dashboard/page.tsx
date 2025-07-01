import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";


// Components
import AnimatedCounters from '../../components/AnimatedCounters';
import Hero from "../../components/Hero";
import Features from "../../components/Features";
import Statistics from "../../components/Statistics";
import PricingSection from "../../components/PricingSection";
import Testimonials from "../../components/Testimonials";
import FAQAccordion from "../../components/FAQAccordian";
import IntegrationsSection from "../../components/IntegrationSections";
import {BalanceCard} from "../../components/Balancev2"
import {Transactions} from "../../components/Transactionsv2"
import {WelcomeCard} from "../../components/WelcomeCard"
import {RequestCard} from "../../components/RequestCard"

const page = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user) redirect("/signin");
  const dummyTransactions = [
  {
    time: new Date("2025-06-25"),
    amount: 50000, // ₹500
    status: "Success",
    provider: "Bank Transfer",
  },
  {
    time: new Date("2025-06-26"),
    amount: 25000, // ₹250
    status: "Processing",
    provider: "UPI",
  },
  {
    time: new Date("2025-06-27"),
    amount: 10000, // ₹100
    status: "Failure",
    provider: "Wallet Top-up",
  },
  {
    time: new Date("2025-06-28"),
    amount: 75000, // ₹750
    status: "Success",
    provider: "P2P (Received)",
  },
  {
    time: new Date("2025-06-29"),
    amount: 45000, // ₹450
    status: "Success",
    provider: "P2P (Sent)",
  },
    {
    time: new Date("2025-06-27"),
    amount: 10000, // ₹100
    status: "Failure",
    provider: "Wallet Top-up",
  },
  {
    time: new Date("2025-06-28"),
    amount: 75000, // ₹750
    status: "Success",
    provider: "P2P (Received)",
  },
  {
    time: new Date("2025-06-29"),
    amount: 45000, // ₹450
    status: "Success",
    provider: "P2P (Sent)",
  },
];


  return (
  <div className="bg-[#F6F8FF] text-black min-h-screen pb-30">
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 md:px-8">
    {/* Top Section - Welcome and Financial Overview */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Welcome and Balance */}
      <div className="flex flex-col gap-6">
          {/* RequestCard on right */}
          <div className="w-full lg:max-w-sm lg:min-w-[280px]">
            <RequestCard pending={5000} received={670000} />
          </div>
        <BalanceCard amount={500} locked={0} />
      </div>

      {/* Right Section - 2/3 width */}
      <div className="lg:col-span-2 flex flex-col">
        <div className="flex flex-col lg:flex-row">
          {/* Transactions take more space */}
          <div className="flex-1">
            <Transactions transactions={dummyTransactions} />
          </div>

        
        </div>
      </div>
    </div>

    {/* Lower Sections */}
    <AnimatedCounters />
    <Features />
    <IntegrationsSection />
    <Statistics />
    <PricingSection />
    <Testimonials />
    <FAQAccordion />
  </div>
</div>

 
  );
};

export default page;
