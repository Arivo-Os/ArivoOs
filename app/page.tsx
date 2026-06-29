import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { Features } from "@/components/sections/Features";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { WhyArivo } from "@/components/sections/WhyArivo";
import { SeoContent } from "@/components/sections/SeoContent";
import { FAQ } from "@/components/sections/FAQ";
import { EarlyAccess } from "@/components/sections/EarlyAccess";
import { homepageJsonLd } from "@/lib/seo/structured-data";

export default function HomePage() {
  return (
    <main className="bg-page">
      <JsonLd id="jsonld-homepage" data={homepageJsonLd} />
      <Hero />
      <SocialProofBar />
      <Features />
      <ProductShowcase />
      <WhyArivo />
      <SeoContent />
      <FAQ />
      <EarlyAccess />
    </main>
  );
}
