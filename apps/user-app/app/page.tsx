import { getServerSession } from "next-auth";
import { redirect } from 'next/navigation'
import { authOptions } from "./lib/auth";
import { BusinessSection } from "../components/BusinessSection";
import { FeaturesGrid } from "../components/FeaturedGrid";
import { SupportBanner } from "../components/SupportBanner";
import { HeroSection } from "../components/HeroSection";


export default async function Page() {
  const session = await getServerSession(authOptions);
  if (session?.user) {
    redirect('/dashboard')
  } else {
    return (
      <div className="min-h-screen w-full bg-gray-100 py-6 px-4 md:px-10 flex flex-col gap-8">
        <HeroSection />

        <div className="max-w-5xl mx-auto w-full flex flex-col gap-8">
          <FeaturesGrid />


          <BusinessSection />

       
        </div>

        <SupportBanner />
      </div>
    )
  }
}


