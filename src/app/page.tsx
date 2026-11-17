import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { CategoriesSection } from "@/components/home/categories-section";
import { PopularVehiclesSection } from "@/components/home/popular-vehicles-section";
import { WhyVoltBDSection } from "@/components/home/why-voltbd-section";
import { NewsGuidesSection } from "@/components/home/news-guides-section";
import { PartnerBanner } from "@/components/home/partner-banner";
import { Footer } from "@/components/layout/footer";
import { GoogleAdSlot } from "@/components/ads/google-ad-slot";
import { ADS_CONFIG } from "@/lib/config/ads";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 dark:bg-[#070b14] dark:text-slate-100 transition-colors duration-150 selection:bg-emerald-500/20 selection:text-emerald-600 dark:selection:text-emerald-300">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <CategoriesSection />
        <PopularVehiclesSection />
        <WhyVoltBDSection />

        {/* Non-intrusive Section Break Leaderboard Ad */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-8 sm:my-10">
          <GoogleAdSlot
            format="horizontal-banner"
            slotId={ADS_CONFIG.slots.homeLeaderboard}
          />
        </div>

        <NewsGuidesSection />
        <PartnerBanner />
      </main>

      <Footer />
    </div>
  );
}
