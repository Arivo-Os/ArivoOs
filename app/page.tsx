import Script from "next/script";
import { Hero } from "@/components/sections/Hero";
import { SocialProofBar } from "@/components/sections/SocialProofBar";
import { Features } from "@/components/sections/Features";
import { ProductShowcase } from "@/components/sections/ProductShowcase";
import { WhyArivo } from "@/components/sections/WhyArivo";
import { Roadmap } from "@/components/sections/Roadmap";
import { EarlyAccess } from "@/components/sections/EarlyAccess";
import { homepageJsonLd } from "@/lib/seo/structured-data";

export default function HomePage() {
  return (
    <main className="bg-page">
      <Script
        id="jsonld-homepage"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <Hero />
      <SocialProofBar />
      <Features />
      <ProductShowcase />
      <WhyArivo />
      <Roadmap />
      <EarlyAccess />
    </main>
  );
}
