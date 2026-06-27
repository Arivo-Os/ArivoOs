import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
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
    title: "Arivo — Your Financial Life. One AI Companion.",
    description:
      "Arivo is an AI-powered personal finance app for India. Understand your money, track goals, get smart insights, and make smarter decisions. Join closed beta on Google Play.",
    path: "/",
    keywords: DEFAULT_KEYWORDS,
  }),
  metadataBase: new URL("https://arivoai.in"),
  title: {
    default: "Arivo — Your Financial Life. One AI Companion.",
    template: "%s | Arivo",
  },
  authors: [{ name: "Akhilesh Goswami", url: "https://www.linkedin.com/in/akhilesh-goswami/" }],
  creator: "Akhilesh Goswami",
  publisher: "Arivo",
  category: "finance",
  applicationName: "Arivo",
  icons: {
    icon: [
      { url: "/assets/icon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
  manifest: "/manifest.webmanifest",
};

export function generateViewport(): Viewport {
  return {
    themeColor: [
      { media: "(prefers-color-scheme: light)", color: "#F8FAFC" },
      { media: "(prefers-color-scheme: dark)", color: "#08111A" },
    ],
    colorScheme: "light dark",
    width: "device-width",
    initialScale: 1,
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-IN" className={inter.variable}>
      <body className="min-h-screen font-sans antialiased">
        <JsonLd id="jsonld-org" data={organizationJsonLd} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-brand-green focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#08111A]"
        >
          Skip to main content
        </a>
        <Header />
        <div id="main-content">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
