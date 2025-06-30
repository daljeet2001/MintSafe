import Hero from "../components/Hero";
import Features from "../components/Features";
import Statistics from "../components/Statistics";
import PricingSection from "../components/PricingSection";
import Testimonials from "../components/Testimonials";
import FAQAccordion from "../components/FAQAccordian";
import IntegrationsSection from "../components/IntegrationSections";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "./lib/auth";

export default async function  MerchantLandingPage() {
    const session = await getServerSession(authOptions);
    if (session?.user) redirect("/dashboard");
  return (
    <div className="bg-[#F6F8FF] text-black">
      <Hero />
      <Features />
      <IntegrationsSection />
      <Statistics />
      <PricingSection />
      <Testimonials />
      <FAQAccordion />
     
    </div>
  );
}


