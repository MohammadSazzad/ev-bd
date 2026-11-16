import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { PopularVehiclesSection } from "@/components/home/popular-vehicles-section";
import { WhyVoltBDSection } from "@/components/home/why-voltbd-section";
import { NewsGuidesSection } from "@/components/home/news-guides-section";
import { PartnerBanner } from "@/components/home/partner-banner";
import { Footer } from "@/components/layout/footer";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <PopularVehiclesSection />
        <WhyVoltBDSection />
        <NewsGuidesSection />
        <PartnerBanner />
      </main>

      <Footer />
    </div>
  );
}
