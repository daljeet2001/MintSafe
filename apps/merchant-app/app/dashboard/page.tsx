import React from 'react';
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import prisma from "@repo/db/client"


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

async function getBalance() {
  const session = await getServerSession(authOptions);
  // console.log("Session:", session);
  const balance = await prisma.merchantBalance.findFirst({
    where: { merchantId: Number(session?.merchant?.id) },
  });
  return {
    amount: balance?.amount || 0,
    locked: balance?.locked || 0,
  };
}

async function getRequestedTransactions() {
  const session = await getServerSession(authOptions);

  const txns = await prisma.requestedTransactions.findMany({
    where: {
      merchantId: Number(session?.merchant?.id),
    },
  });

  let totalRequested = 0;
  let pendingRequested = 0;
  let receivedRequested = 0;

  const transactions = txns.map((t) => {
    totalRequested += t.amount;

    if (t.status.toLowerCase() === "processing") {
      pendingRequested += t.amount;
    } else if (t.status.toLowerCase() === "success") {
      receivedRequested += t.amount;
    }

    return {
      time: t.startTime,
      amount: t.amount,
      status: t.status,
      provider: t.To,
    };
  });

  return {
    transactions,
    totalRequested,
    pendingRequested,
    receivedRequested,
  };
}


async function getDownRampTransactions() {
  const session = await getServerSession(authOptions);
  const txns = await prisma.downRampTransaction.findMany({
    where: {
      merchantId: Number(session?.merchant?.id),
    },
  });

  return txns.map((t) => ({
    time: t.startTime,
    amount: t.amount,
    status: t.status,
    provider: t.provider,
  }));
}




const page = async () => {

  const session = await getServerSession(authOptions);
  // console.log(session)
  if (!session?.merchant) redirect("/signin");
  const result=await getRequestedTransactions()
  const reqTransactions=result.transactions
  const recieved=result.receivedRequested
  const pending=result.pendingRequested
  const balance=await getBalance();

  const [onramp] = await Promise.all([
      getDownRampTransactions(),
    ]);

  const allTransactions = [...onramp, ...reqTransactions].sort(
      (a, b) => b.time.getTime() - a.time.getTime()
    );


  return (
  <div className="bg-[#F6F8FF] text-black min-h-screen pb-30">
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10 md:px-8">
    {/* Top Section - Welcome and Financial Overview */}
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Column - Welcome and Balance */}
      <div className="flex flex-col gap-6">
          {/* RequestCard on right */}
          <div className="w-full lg:max-w-sm lg:min-w-[280px]">
            <RequestCard pending={pending} received={recieved} />
          </div>
        <BalanceCard amount={balance.amount} locked={balance.locked} />
      </div>

      {/* Right Section - 2/3 width */}
      <div className="lg:col-span-2 flex flex-col">
        <div className="flex flex-col lg:flex-row">
          {/* Transactions take more space */}
          <div className="flex-1">
            <Transactions transactions={allTransactions} />
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
