import { JsonLd } from "@/components/seo/JsonLd";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/HeroSection";
import { TrustBar } from "@/components/sections/TrustBar";
import { ProductPreview } from "@/components/sections/ProductPreview";

const BenefitsSection = dynamic(() => import("@/components/sections/BenefitsSection").then(mod => mod.BenefitsSection));
const ComparisonSection = dynamic(() => import("@/components/sections/ComparisonSection").then(mod => mod.ComparisonSection));
const HowItWorks = dynamic(() => import("@/components/sections/HowItWorks").then(mod => mod.HowItWorks));
const TrustDetails = dynamic(() => import("@/components/sections/TrustDetails").then(mod => mod.TrustDetails));
const RoadmapSection = dynamic(() => import("@/components/sections/RoadmapSection").then(mod => mod.RoadmapSection));
const GetStarted = dynamic(() => import("@/components/sections/GetStarted").then(mod => mod.GetStarted));
const FAQ = dynamic(() => import("@/components/sections/FAQ").then(mod => mod.FAQ));
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
