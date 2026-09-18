import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";
import Hero from "@/components/hero";
import HiringCTA from "@/components/HiringCTA";
import HowItWorks from "@/components/HowItWorks";
import JobSearch from "@/components/JobSearch";

import NearbyDrivers from "@/components/NearbyDrivers";
import PopularCategories from "@/components/PopularCategories";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ================= HERO ================= */}

      <Hero />

      <JobSearch />
      <PopularCategories />
      <NearbyDrivers />
      <FinalCTA />
      <Footer />
      {/* 

     

 

     

      <HowItWorks />

     

      */}
    </main>
  );
}
