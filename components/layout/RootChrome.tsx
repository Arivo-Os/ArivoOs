"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MarketingFooter, MarketingNav } from "@/components/marketing/MarketingNav";

const APP_PREFIXES = ["/life", "/veris", "/journey", "/vault", "/settings"];
const BARE_ROUTES = ["/login"];
const DARK_MARKETING = ["/web"];

export function RootChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isApp = APP_PREFIXES.some((p) => pathname.startsWith(p));
  const isBare = BARE_ROUTES.some((p) => pathname.startsWith(p));
  const isDarkMarketing = DARK_MARKETING.some((p) => pathname.startsWith(p));

  if (isApp || isBare) return <>{children}</>;

  if (isDarkMarketing) {
    return (
      <>
        <MarketingNav />
        {children}
        <MarketingFooter />
      </>
    );
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
