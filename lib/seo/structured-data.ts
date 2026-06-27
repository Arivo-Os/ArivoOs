import { GOOGLE_PLAY_URL, SITE_URL } from "@/lib/constants/site";
import { FAQ_ITEMS } from "@/lib/seo/faq";
import { canonicalUrl } from "@/lib/seo/metadata";

export const BASE_URL = SITE_URL;

export function breadcrumbGraphItem(
  items: { name: string; href?: string }[]
): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.href ? { item: item.href.startsWith("http") ? item.href : canonicalUrl(item.href) } : {}),
    })),
  };
}

export function breadcrumbJsonLd(
  items: { name: string; href?: string }[]
): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    ...breadcrumbGraphItem(items),
  };
}

export function webPageGraphItem({
  path,
  name,
  description,
}: {
  path: string;
  name: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@type": "WebPage",
    "@id": `${canonicalUrl(path)}#webpage`,
    url: canonicalUrl(path),
    name,
    description,
    isPartOf: { "@id": `${BASE_URL}/#website` },
    about: { "@id": `${BASE_URL}/#organization` },
    inLanguage: "en-IN",
  };
}

export function webPageJsonLd(props: {
  path: string;
  name: string;
  description: string;
}): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    ...webPageGraphItem(props),
  };
}

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Arivo",
      legalName: "Arivo",
      url: BASE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${BASE_URL}/assets/logo-mark.svg`,
        width: 512,
        height: 512,
      },
      image: `${BASE_URL}/assets/og-image.png`,
      email: "support@arivoai.in",
      foundingDate: "2025",
      description:
        "Arivo is an AI-powered personal finance companion that helps Indians understand their money, track goals, and make smarter financial decisions.",
      founder: { "@id": `${BASE_URL}/#founder` },
      sameAs: [
        "https://www.linkedin.com/company/125614133/",
        "https://medium.com/@akhileshgoswami_10630",
        GOOGLE_PLAY_URL,
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@arivoai.in",
        url: canonicalUrl("/contact"),
        availableLanguage: ["English", "Hindi"],
      },
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/#founder`,
      name: "Akhilesh Goswami",
      jobTitle: "Founder",
      url: canonicalUrl("/about"),
      sameAs: [
        "https://www.linkedin.com/in/akhilesh-goswami/",
        "https://medium.com/@akhileshgoswami_10630",
      ],
      worksFor: { "@id": `${BASE_URL}/#organization` },
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Arivo",
      description:
        "Your financial life. One AI companion. Understand your money, track goals, and make smarter decisions with AI.",
      publisher: { "@id": `${BASE_URL}/#organization` },
      inLanguage: "en-IN",
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#app`,
      name: "Arivo — AI Personal Finance Companion",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Android",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      downloadUrl: GOOGLE_PLAY_URL,
      installUrl: GOOGLE_PLAY_URL,
      description:
        "AI-powered personal finance app for India. Dashboard, goal tracking, smart insights, and an AI assistant for smarter money decisions.",
      featureList: [
        "AI Financial Assistant",
        "Complete Financial Dashboard",
        "Goal Tracking",
        "Smart Spending Insights",
        "Budget Planning",
        "Secure by Design",
      ],
      screenshot: `${BASE_URL}/assets/app-screenshot.png`,
      author: { "@id": `${BASE_URL}/#organization` },
    },
  ],
};

export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    webPageGraphItem({
      path: "/",
      name: "Arivo — Your Financial Life. One AI Companion.",
      description:
        "Understand your money, track goals, and make smarter financial decisions with AI. Join closed beta on Google Play.",
    }),
    {
      "@type": "FAQPage",
      "@id": `${canonicalUrl("/")}#faq`,
      mainEntity: FAQ_ITEMS.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
    },
    {
      "@type": "HowTo",
      name: "How to start using Arivo",
      description: "Join the Arivo closed beta and start managing your finances with AI in three steps.",
      step: [
        {
          "@type": "HowToStep",
          position: 1,
          name: "Join the waitlist",
          text: "Visit arivoai.in and submit your name, email, and phone to join the closed beta waitlist.",
        },
        {
          "@type": "HowToStep",
          position: 2,
          name: "Get your invite",
          text: "Receive a personal Google Play invite to download the Arivo Android app.",
        },
        {
          "@type": "HowToStep",
          position: 3,
          name: "Start with AI insights",
          text: "Set up your profile, view your dashboard, track goals, and ask Arivo anything about your finances.",
        },
      ],
    },
  ],
};

export const aboutJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "AboutPage",
      "@id": `${canonicalUrl("/about")}#webpage`,
      url: canonicalUrl("/about"),
      name: "About Arivo — AI Personal Finance for India",
      description:
        "Learn about Arivo, the AI-powered personal finance companion helping Indians make smarter money decisions.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
      about: { "@id": `${BASE_URL}/#organization` },
      mainEntity: { "@id": `${BASE_URL}/#founder` },
    },
  ],
};

export function blogIndexJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageGraphItem({
        path: "/blog",
        name: "Arivo Blog — Personal Finance & AI Insights",
        description:
          "Articles on AI personal finance, decision intelligence, and smarter money management for India.",
      }),
      {
        "@type": "Blog",
        "@id": `${canonicalUrl("/blog")}#blog`,
        url: canonicalUrl("/blog"),
        name: "Arivo Blog",
        description: "Insights on AI-powered personal finance and financial decision-making.",
        publisher: { "@id": `${BASE_URL}/#organization` },
        inLanguage: "en-IN",
      },
    ],
  };
}

export function articleJsonLd(post: {
  slug: string;
  title: string;
  description: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
}): Record<string, unknown> {
  const url = canonicalUrl(`/blog/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.description,
        url,
        datePublished: post.datePublished,
        dateModified: post.dateModified,
        author: { "@id": `${BASE_URL}/#founder` },
        publisher: { "@id": `${BASE_URL}/#organization` },
        image: `${BASE_URL}/assets/og-image.png`,
        mainEntityOfPage: { "@id": `${url}#webpage` },
        wordCount: post.readingMinutes * 200,
        timeRequired: `PT${post.readingMinutes}M`,
        inLanguage: "en-IN",
      },
      webPageGraphItem({ path: `/blog/${post.slug}`, name: post.title, description: post.description }),
    ],
  };
}

export function contactPageJsonLd(): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@graph": [
      webPageGraphItem({
        path: "/contact",
        name: "Contact Arivo",
        description: "Contact the Arivo team for support, partnerships, or product questions.",
      }),
    ],
  };
}
