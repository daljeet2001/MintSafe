import Hero from "../components/Hero";
import Statistics from "../components/Statistics";
import AnimatedCounters from "../components/AnimatedCounters";
import PricingSection from "../components/PricingSection";
import Testimonials from "../components/Testimonials";
import FAQAccordion from "../components/FAQAccordian";
import PlinkoBanner from "../components/PlinkoBanner";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function  MerchantLandingPage() {
    const session = await getServerSession(authOptions);
    if (session?.user) redirect("/dashboard");
  return (
    <div className="bg-[#F6F8FF] text-black">
      <PlinkoBanner />
      <Hero />
      {/* <Statistics /> */}
      <AnimatedCounters />
      {/* <Features /> */}
      {/* <IntegrationsSection /> */}
      <PricingSection />
      {/* <Testimonials /> */}
      <FAQAccordion />
     
    </div>
  );
}


