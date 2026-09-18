import HeroSection from "@/components/hero";
import DarkFeatureSection from "@/components/feature";
import DriverGridSection from "@/components/driverGrid";
import HowItWorksSection from "@/components/HowItWorks";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />

      <DarkFeatureSection />

      <DriverGridSection />

      <HowItWorksSection />

      <CallToActionSection />

      <Footer />
    </main>
  );
}
