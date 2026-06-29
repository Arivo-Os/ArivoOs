import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { MeetVeris } from "@/components/sections/MeetVeris";
import { FinancialProfile } from "@/components/sections/FinancialProfile";
import { EverythingConnected } from "@/components/sections/EverythingConnected";
import { AskBeforeYouSpend } from "@/components/sections/AskBeforeYouSpend";
import { GetStarted } from "@/components/sections/GetStarted";
import { FAQ } from "@/components/sections/FAQ";
import { homepageJsonLd } from "@/lib/seo/structured-data";

export default function HomePage() {
  return (
    <main className="bg-page">
      <JsonLd id="jsonld-homepage" data={homepageJsonLd} />
      <Hero />
      <MeetVeris />
      <FinancialProfile />
      <EverythingConnected />
      <AskBeforeYouSpend />
      <GetStarted />
      <FAQ />
    </main>
  );
}
