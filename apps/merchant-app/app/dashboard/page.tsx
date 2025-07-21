import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client"


// Components
import AnimatedCounters from '../../components/AnimatedCounters';
import Hero from "../../components/Hero";
import Statistics from "../../components/Statistics";
import PricingSection from "../../components/PricingSection";
import Testimonials from "../../components/Testimonials";
import FAQAccordion from "../../components/FAQAccordian";
import PlinkoBanner from "../../components/PlinkoBanner";
import {BalanceCard} from "../../components/Balancev2"
import {Transactions} from "../../components/Transactionsv2"
import {WelcomeCard} from "../../components/WelcomeCard"
import {RequestCard} from "../../components/RequestCard"



const page = async () => {

  const session = await getServerSession(authOptions);
  // console.log(session)
  if (!session?.merchant?.id) redirect("/signin");

  return (
  <div className="bg-[#F6F8FF] text-black min-h-screen pb-30">
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 md:px-8">
    {/* Top Section - Welcome and Financial Overview */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Welcome and Balance */}
      <div className="flex flex-col gap-6">
          {/* RequestCard on right */}
          <div className="w-full lg:max-w-sm lg:min-w-[280px]">
            <RequestCard />
          </div>
        <BalanceCard/>
      </div>

      {/* Right Section - 2/3 width */}
      <div className="lg:col-span-2 flex flex-col">
        <div className="flex flex-col lg:flex-row">
          {/* Transactions take more space */}
          <div className="flex-1">
            <Transactions />
          </div>

        
        </div>
      </div>
    </div>

    {/* Lower Sections */}
    {/* <PlinkoBanner /> */}
    <AnimatedCounters />
    {/* <Statistics /> */}
    {/* <PricingSection /> */}
    {/* <Testimonials /> */}
    <FAQAccordion />
  </div>
</div>

 
  );
};

export default page;
