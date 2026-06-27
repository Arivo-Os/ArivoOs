import Script from "next/script";
import { Hero } from "@/components/sections/Hero";
import { TrustedBanner } from "@/components/sections/TrustedBanner";
import { Features } from "@/components/sections/Features";
import { AppScreenshots } from "@/components/sections/AppScreenshots";
import { WhyArivo } from "@/components/sections/WhyArivo";
import { Roadmap } from "@/components/sections/Roadmap";
import { EarlyAccess } from "@/components/sections/EarlyAccess";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { homepageJsonLd } from "@/lib/seo/structured-data";

export default function HomePage() {
  return (
    <main>
      <Script
        id="jsonld-homepage"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
      />
      <Hero />
      <TrustedBanner />
      <Features />
      <AppScreenshots />
      <WhyArivo />
      <Roadmap />
      <EarlyAccess />
      <FooterCTA />
    </main>
  );
}
