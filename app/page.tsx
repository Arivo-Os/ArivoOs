import Script from "next/script";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { Problem } from "@/components/sections/Problem";
import { Product } from "@/components/sections/Product";
import { WhyArivo } from "@/components/sections/WhyArivo";
import { Statement } from "@/components/sections/Statement";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { MobileSection } from "@/components/sections/MobileSection";
import { TrustPrivacy } from "@/components/sections/TrustPrivacy";
import { Waitlist } from "@/components/sections/Waitlist";
import { FAQ } from "@/components/sections/FAQ";
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
      <TrustStrip />
      <Problem />
      <Product />
      <WhyArivo />
      <Statement />
      <AboutTeaser />
      <MobileSection />
      <TrustPrivacy />
      <Waitlist />
      <FAQ />
    </main>
  );
}
