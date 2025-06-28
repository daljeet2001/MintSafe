import { HeroSection } from "../../components/HeroSection";
import { FeaturesGrid } from "../../components/FeaturedGrid";
import { HowItWorks } from "../../components/HowItWorks";
import { Testimonials } from "../../components/Testimonials";
import { CallToAction } from "../../components/CallToAction";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <Testimonials />
      <CallToAction />
     
    </div>
  );
}
