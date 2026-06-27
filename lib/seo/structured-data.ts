export const BASE_URL = "https://arivoai.in";

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${BASE_URL}/#organization`,
      name: "Arivo",
      url: BASE_URL,
      logo: `${BASE_URL}/assets/logo-mark.svg`,
      email: "akhileshgoswami@arivoai.in",
      foundingDate: "2025",
      founder: {
        "@type": "Person",
        name: "Akhilesh Goswami",
        url: "https://www.linkedin.com/in/akhilesh-goswami/",
      },
      sameAs: [
        "https://www.linkedin.com/company/125614133/",
        "https://medium.com/@akhileshgoswami_10630",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: BASE_URL,
      name: "Arivo",
      description:
        "AI-powered financial decision engine that gives you a verdict, confidence score, and clear next step for major money decisions.",
      publisher: { "@id": `${BASE_URL}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${BASE_URL}/?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "SoftwareApplication",
      "@id": `${BASE_URL}/#app`,
      name: "Arivo Financial Decision Engine",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Android",
      description:
        "Arivo combines AI with personal finance to help users understand their finances, track goals, and make smarter decisions every day.",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "INR",
        availability: "https://schema.org/InStock",
      },
      featureList: [
        "AI-powered decision verdict",
        "Confidence score",
        "Risk level analysis",
        "EMI affordability check",
        "Emergency fund assessment",
        "Personalized next steps",
      ],
      screenshot: `${BASE_URL}/assets/app-screenshot.png`,
      author: { "@id": `${BASE_URL}/#organization` },
    },
  ],
};

export const homepageJsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "What is Arivo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Arivo is an AI-powered financial decision engine built for India. It analyzes your income, expenses, debt, savings, and financial goals to give you a clear verdict — proceed, wait, or review — along with a confidence score and specific next steps for major financial decisions like buying a car, a home, or making an investment.",
          },
        },
        {
          "@type": "Question",
          name: "Is Arivo a financial advisor?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "No. Arivo is a financial decision intelligence tool, not a registered investment advisor or SEBI-regulated financial planner. It uses your financial data to generate structured analysis and recommendations. Always consult a certified financial advisor for regulated financial advice.",
          },
        },
        {
          "@type": "Question",
          name: "Is my financial data safe with Arivo?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Your financial data is private and never sold to third parties. Arivo does not sell financial products, earn commissions, or share your data with advertisers. All analysis is done solely to power your decision results.",
          },
        },
        {
          "@type": "Question",
          name: "When does Arivo launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Arivo is now available on Google Play in Early Access. Download the app to start using your AI financial companion and help shape the product with your feedback.",
          },
        },
        {
          "@type": "Question",
          name: "Is Arivo free to use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Early access to Arivo is completely free. Users who join the waitlist before launch will receive free access at launch. Paid tiers will be introduced after the initial public release.",
          },
        },
        {
          "@type": "Question",
          name: "What kinds of financial decisions can Arivo evaluate?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Arivo evaluates major financial decisions including: vehicle purchases and car loans, home purchases and home loans, personal loan affordability, investment timing and lump-sum deployment, career changes and salary negotiations, and city relocations. Any decision where your financial health determines the right answer.",
          },
        },
      ],
    },
    {
      "@type": "HowTo",
      name: "How to get a financial decision verdict with Arivo",
      description: "Use Arivo to evaluate a major financial decision in three steps.",
      step: [
        {
          "@type": "HowToStep",
          name: "Connect your financial profile",
          text: "Share your income, expenses, savings, and existing debts so Arivo can build your financial picture.",
          position: 1,
        },
        {
          "@type": "HowToStep",
          name: "Describe your decision",
          text: "Tell Arivo what you want to do — buy a car, take a loan, invest a lump sum, or any other major money move.",
          position: 2,
        },
        {
          "@type": "HowToStep",
          name: "Get your verdict",
          text: "Arivo returns a clear verdict (proceed, wait, or review), a confidence score, risk level, and specific next steps — in seconds.",
          position: 3,
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
      "@id": `${BASE_URL}/about#webpage`,
      url: `${BASE_URL}/about`,
      name: "About Arivo — Financial Decision Intelligence for India",
      description:
        "Learn about Arivo, the AI financial decision engine built to help Indians make confident decisions on cars, homes, investments, and major life expenses.",
      isPartOf: { "@id": `${BASE_URL}/#website` },
    },
    {
      "@type": "Person",
      "@id": `${BASE_URL}/about#founder`,
      name: "Akhilesh Goswami",
      jobTitle: "Founder, Arivo",
      url: `${BASE_URL}/about#founder`,
      sameAs: [
        "https://www.linkedin.com/in/akhilesh-goswami/",
        "https://medium.com/@akhileshgoswami_10630",
      ],
      worksFor: { "@id": `${BASE_URL}/#organization` },
      email: "akhileshgoswami@arivoai.in",
    },
  ],
};
