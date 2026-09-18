import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import HiringCTA from "@/components/feature";
import HowItWorks from "@/components/HowItWorks";
import JobSearch from "@/components/JobSearch";

import NearbyDrivers from "@/components/NearbyDrivers";
import PopularCategories from "@/components/PopularCategories";
import DarkFeatureSection from "@/components/feature";
import DriverGridSection from "@/components/driverGrid";
import HowItWorksSection from "@/components/HowItWorks";
import CallToActionSection from "@/components/CallToActionSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ================= HERO ================= */}

      <Hero />
      <DarkFeatureSection />
      <DriverGridSection />
      <HowItWorksSection />
      <CallToActionSection />
      <Footer />
      {/* <JobSearch />
      <PopularCategories />
      <NearbyDrivers />
      <FinalCTA />
      */}
      {/* 

     

 

     

      <HowItWorks />

     

      */}
    </main>
  );
}
