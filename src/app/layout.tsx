import type { Metadata, Viewport } from "next";
// import { Inter } from "next/font/google"; // removed Inter font import
// import { Geist } from "next/font/google"; // removed
import { AppProviders } from "@/components/providers/app-providers";
import { ThemeScript } from "@/components/theme/ThemeProvider";
import { RootChrome } from "@/components/layout/RootChrome";
import { JsonLd } from "@/components/seo/JsonLd";
import { organizationJsonLd } from "@/lib/seo/structured-data";
import { buildPageMetadata, DEFAULT_KEYWORDS } from "@/lib/seo/metadata";
import "@fontsource/geist";
import "@fontsource/geist/500.css";
import "@fontsource/geist/600.css";
import "@fontsource/geist/700.css";
import "./globals.css";

// Font loaded via @fontsource/geist package

export const metadata: Metadata = {
  ...buildPageMetadata({
    title: "Arivo: AI Personal Finance Assistant & Decision Engine",
    description:
      "Master your money with Arivo. Track spending, get personalized advice from your AI financial advisor, and plan your financial future.",
    path: "/",
    keywords: DEFAULT_KEYWORDS,
  }),
  metadataBase: new URL("https://arivoai.in"),
  title: {
    default: "Arivo: AI Personal Finance Assistant & Decision Engine",
    template: "%s | Arivo",
  },
  applicationName: "Arivo",
};

export function generateViewport(): Viewport {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#0B0F17" },
      { media: "(prefers-color-scheme: dark)", color: "#0B0F17" },
    ],
    width: "device-width",
    initialScale: 1,
  };
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning>
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
