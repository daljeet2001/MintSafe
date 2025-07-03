import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
// import prisma from "@repo/db/client"
import { BalanceCard } from "../../components/Balancev2";
import { Transactions } from "../../components/Transactionsv2";
import { HeroSection } from "../../components/HeroSection";
import { FeaturesGrid } from "../../components/FeaturedGrid";
import { SupportBanner } from "../../components/SupportBanner";
import { BusinessSection } from "../../components/BusinessSection";
// import { WelcomeCard } from "../../components/WelcomeCard";
import { Testimonials } from "../../components/Testimonials";
import { RequestedTransactionsCard } from "../../components/RequestedTransactionsCard";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  // console.log(session)
  if (!session?.user?.id) redirect("/signin");

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">
        {/* Top Section - Welcome and Financial Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Welcome and Balance */}
          <div className="flex flex-col gap-6">
            {/* RequestCard on right */}
            <BalanceCard />
            <div className="w-full lg:max-w-sm lg:min-w-[280px]">
              <RequestedTransactionsCard />
            </div>
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

        {/* Testimonials Section */}
        <div className="mt-8">
          <Testimonials />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Marketing Sections */}
        <div className="space-y-12">
          <HeroSection />
          <FeaturesGrid />
          <SupportBanner />
          <BusinessSection />
        </div>
      </div>
    </div>
  );
}
