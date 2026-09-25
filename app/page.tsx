import DarkFeatureSection from "@/components/feature";
import DriverGridSection from "@/components/driverGrid";
import HowItWorksSection from "@/components/HowItWorks";
import CallToActionSection from "@/components/CallToActionSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/home/HeroSection";

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
