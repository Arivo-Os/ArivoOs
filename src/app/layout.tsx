import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { AppProviders } from "@/components/providers/app-providers";
import { ThemeScript } from "@/components/theme/ThemeProvider";
import { RootChrome } from "@/components/layout/RootChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/seo/structured-data";
import { buildPageMetadata, DEFAULT_KEYWORDS } from "@/lib/seo/metadata";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Arivo: AI Personal Finance Assistant & Budget Planner",
    description:
      "Master your money with Arivo. Track spending, build budgets, and get personalized advice from your AI financial advisor. Start improving your financial health.",
    path: "/",
    keywords: DEFAULT_KEYWORDS,
  }),
  metadataBase: new URL("https://arivoai.in"),
  title: {
    default: "Arivo: AI Personal Finance Assistant & Budget Planner",
    template: "%s | Arivo",
  },
  applicationName: "Arivo",
};

export function generateViewport(): Viewport {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
      { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
    ],
    width: "device-width",
    initialScale: 1,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={inter.variable} suppressHydrationWarning>
      <head>
        <ThemeScript />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <AppProviders>
          <JsonLd id="jsonld-org" data={organizationJsonLd} />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-app-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-app-bg"
          >
            Skip to main content
          </a>
          <RootChrome>
            <div id="main-content">{children}</div>
          </RootChrome>
        </AppProviders>
      </body>
    </html>
  );
}
