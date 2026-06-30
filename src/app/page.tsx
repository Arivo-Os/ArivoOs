import { JsonLd } from "@/components/seo/JsonLd";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { BenefitsSection } from "@/components/sections/BenefitsSection";
import { ComparisonSection } from "@/components/sections/ComparisonSection";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { TrustDetails } from "@/components/sections/TrustDetails";
import { RoadmapSection } from "@/components/sections/RoadmapSection";
import { GetStarted } from "@/components/sections/GetStarted";
import { FAQ } from "@/components/sections/FAQ";
import { homepageJsonLd } from "@/lib/seo/structured-data";

export default function HomePage() {
  return (
    <main className="bg-slate-50 dark:bg-slate-950 overflow-x-hidden">
      <JsonLd id="jsonld-homepage" data={homepageJsonLd} />
      <HeroSection />
      <TrustBar />
      <ProductPreview />
      <BenefitsSection />
      <ComparisonSection />
      <HowItWorks />
      <TrustDetails />
      <RoadmapSection />
      <GetStarted />
      <FAQ />
    </main>
  );
}
