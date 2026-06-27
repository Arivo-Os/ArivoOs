import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { organizationJsonLd } from "@/lib/seo/structured-data";
import "./globals.css";

const BASE_URL = "https://arivoai.in";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Arivo — Your Financial Life. One AI Companion.",
    template: "%s | Arivo",
  },
  description:
    "Understand your money, track your financial goals, and make smarter financial decisions with AI. Now in Closed Beta on Google Play.",
  keywords: [
    "financial decision engine",
    "AI financial advisor India",
    "should I buy a car India",
    "home loan affordability calculator",
    "investment decision tool",
    "personal finance AI",
    "financial decision app India",
    "money decision tool",
  ],
  authors: [{ name: "Akhilesh Goswami", url: "https://www.linkedin.com/in/akhilesh-goswami/" }],
  creator: "Akhilesh Goswami",
  publisher: "Arivo",
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-snippet": -1, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: BASE_URL,
    siteName: "Arivo",
    title: "Arivo — Your Financial Life. One AI Companion.",
    description:
      "Understand your money, track your financial goals, and make smarter financial decisions with AI. Join the Closed Beta on Google Play.",
    images: [
      {
        url: `${BASE_URL}/assets/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Arivo — AI Financial Decision Engine",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arivo — Your Financial Life. One AI Companion.",
    description:
      "Understand your money, track your financial goals, and make smarter financial decisions with AI. Now on Google Play.",
    images: [`${BASE_URL}/assets/og-image.png`],
  },
  alternates: {
    canonical: BASE_URL,
  },
  category: "finance",
  icons: {
    icon: [
      { url: "/assets/icon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon.png",
  },
};

export function generateViewport(): Viewport {
  return {
    themeColor: "#F8FAFC",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <Script
          id="jsonld-org"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
      </head>
      <body className="min-h-screen font-sans antialiased">
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
