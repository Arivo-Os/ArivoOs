import type { Metadata } from "next";
import { SITE_URL } from "@/lib/constants/site";

const OG_IMAGE = `${SITE_URL}/assets/og-image.png`;

/** Canonical URL with trailing slash (matches next.config trailingSlash: true) */
export function canonicalUrl(path = "/"): string {
  if (path === "/" || path === "") return `${SITE_URL}/`;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized.endsWith("/") ? `${SITE_URL}${normalized}` : `${SITE_URL}${normalized}/`;
}

type PageMetaInput = {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  ogType?: "website" | "article";
  publishedTime?: string;
  noIndex?: boolean;
};

export function buildPageMetadata({
  title,
  description,
  path = "/",
  keywords,
  ogType = "website",
  publishedTime,
  noIndex = false,
}: PageMetaInput): Metadata {
  const url = canonicalUrl(path);

  return {
    title,
    description,
    ...(keywords?.length ? { keywords } : {}),
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-snippet": -1,
            "max-image-preview": "large" as const,
            "max-video-preview": -1,
          },
        },
    openGraph: {
      type: ogType,
      locale: "en_IN",
      url,
      siteName: "Arivo",
      title,
      description,
      images: [
        {
          url: OG_IMAGE,
          width: 1200,
          height: 630,
          alt: "Arivo — AI Personal Finance Companion for India",
        },
      ],
      ...(publishedTime && ogType === "article" ? { publishedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [OG_IMAGE],
    },
  };
}

export const DEFAULT_KEYWORDS = [
  "AI Financial Advisor",
  "Personal Finance AI",
  "Money Management AI",
  "Financial Decision Engine",
  "Financial Health Score",
  "AI Investment Assistant",
  "Personal Finance Dashboard",
  "Automated Expense Tracker",
  "AI financial planning app India",
  "Arivo app",
  "arivoai.in",
];
