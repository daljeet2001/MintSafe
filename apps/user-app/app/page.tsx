import { HeroSection } from "../components/HeroSection";
import { FeaturesGrid } from "../components/FeaturedGrid";
import { SupportBanner } from "../components/SupportBanner";
import { BusinessSection } from "../components/BusinessSection";
import { Testimonials } from "../components/Testimonials";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";
import FAQAccordion from "../components/FAQAccordion";




export default async function LandingPage() {
 const session = await getServerSession(authOptions);
  if (session?.user) redirect("/dashboard");
  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-10 space-y-8">

        {/* Testimonials Section */}
        <div className="mt-8">
          <Testimonials />
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-8" />

        {/* Marketing Sections */}
        <div className="space-y-12">
          {/* <HeroSection />
          <FeaturesGrid /> */}
          <SupportBanner />
          {/* <BusinessSection /> */}
          <FAQAccordion/>
        </div>
      </div>
    </div>
  );
}