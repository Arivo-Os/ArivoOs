export const MEDIUM_PROFILE_URL = "https://medium.com/@akhileshgoswami_10630";
export const AUTHOR_NAME = "Akhilesh Goswami";

export interface BlogSection {
  id: string;
  heading: string;
  paragraphs: string[];
}

export interface BlogPost {
  slug: string;
  tag: string;
  title: string;
  excerpt: string;
  description: string;
  href: string;
  datePublished: string;
  dateModified: string;
  readingMinutes: number;
  sections: BlogSection[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "financial-decisions-beyond-spreadsheets",
    tag: "Decision Intelligence",
    title: "Why financial decisions need more than spreadsheets",
    excerpt: "Most people don't need another dashboard. They need a clear answer before they act.",
    description:
      "Learn why spreadsheets and budgeting apps fall short for major financial decisions — and how AI decision intelligence helps Indians choose smarter.",
    href: MEDIUM_PROFILE_URL,
    datePublished: "2026-03-15",
    dateModified: "2026-06-27",
    readingMinutes: 5,
    sections: [
      {
        id: "the-problem",
        heading: "The problem with spreadsheets",
        paragraphs: [
          "Spreadsheets are powerful, but they were never designed to answer life's biggest money questions. Should you buy a car now? Can you afford a home loan? Is this the right time to invest a lump sum?",
          "Most Indians use a patchwork of apps, calculators, and advice from friends. The result is data everywhere — but clarity nowhere.",
        ],
      },
      {
        id: "decision-intelligence",
        heading: "What decision intelligence means",
        paragraphs: [
          "Decision intelligence goes beyond tracking. It evaluates your full financial context — income, expenses, savings, debt, and goals — and returns a structured recommendation with confidence and risk levels.",
          "Arivo is built for this layer: the moment before you commit money to a decision that could affect your life for years.",
        ],
      },
      {
        id: "what-changes",
        heading: "What changes when you decide with clarity",
        paragraphs: [
          "When you understand the trade-offs before acting, you avoid expensive timing mistakes. You know whether to proceed, wait, or review — with reasons grounded in your actual numbers.",
          "That is the future of personal finance in India: not more charts, but better answers.",
        ],
      },
    ],
  },
  {
    slug: "designing-ai-for-money-questions",
    tag: "Building Arivo",
    title: "Designing AI for life's biggest money questions",
    excerpt: "From car loans to career moves — how we're thinking about decision intelligence.",
    description:
      "How Arivo designs AI for major financial decisions in India — car purchases, home loans, investments, and career moves.",
    href: MEDIUM_PROFILE_URL,
    datePublished: "2026-04-02",
    dateModified: "2026-06-27",
    readingMinutes: 6,
    sections: [
      {
        id: "why-ai-finance",
        heading: "Why AI for personal finance in India",
        paragraphs: [
          "India's financial landscape is unique: UPI, EMIs, diverse income patterns, and major life decisions often happening simultaneously. Generic AI chatbots give generic answers.",
          "Arivo is designed around structured financial context — your profile, goals, and constraints — so every insight is personal, not a template.",
        ],
      },
      {
        id: "structured-verdicts",
        heading: "Structured verdicts, not vague advice",
        paragraphs: [
          "Every Arivo analysis includes a clear outcome, confidence score, risk assessment, and recommended next steps. This structure makes AI output auditable and actionable.",
          "Users can see why a recommendation was made, which builds trust — essential for financial products.",
        ],
      },
      {
        id: "privacy-first",
        heading: "Privacy-first by design",
        paragraphs: [
          "Financial data is sensitive. Arivo never sells user data, never shows ads, and never earns commissions on financial products. Your data exists solely to power your insights.",
          "This model aligns our incentives with users: better decisions, not better ad targeting.",
        ],
      },
    ],
  },
  {
    slug: "cost-of-guessing-financial-choices",
    tag: "Personal Finance",
    title: "The cost of guessing on major financial choices",
    excerpt: "Expensive mistakes often come from timing, not math. Here's what changes that.",
    description:
      "The hidden cost of guessing on major financial decisions in India — and how AI-powered clarity prevents expensive timing mistakes.",
    href: MEDIUM_PROFILE_URL,
    datePublished: "2026-05-10",
    dateModified: "2026-06-27",
    readingMinutes: 5,
    sections: [
      {
        id: "timing-vs-math",
        heading: "Timing matters as much as math",
        paragraphs: [
          "Many financial mistakes are not about wrong calculations — they are about wrong timing. Buying a car before building an emergency fund. Taking a loan when cash flow is already tight.",
          "The math might work on paper, but the context makes the decision risky.",
        ],
      },
      {
        id: "emergency-fund",
        heading: "The emergency fund blind spot",
        paragraphs: [
          "Indians often skip emergency fund analysis when making big purchases. Arivo always weighs your buffer — how many months of expenses you can cover — before recommending action.",
          "This single metric prevents a category of regret that spreadsheets rarely surface proactively.",
        ],
      },
      {
        id: "ai-companion",
        heading: "An AI companion, not a replacement",
        paragraphs: [
          "Arivo does not replace certified financial advisors for regulated advice. It helps you arrive at conversations with clarity — knowing your numbers, trade-offs, and questions.",
          "That is how AI augments personal finance: faster clarity, better questions, smarter timing.",
        ],
      },
    ],
  },
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}

export function getAdjacentPosts(slug: string): { prev?: BlogPost; next?: BlogPost } {
  const index = BLOG_POSTS.findIndex((p) => p.slug === slug);
  if (index === -1) return {};
  return {
    prev: index > 0 ? BLOG_POSTS[index - 1] : undefined,
    next: index < BLOG_POSTS.length - 1 ? BLOG_POSTS[index + 1] : undefined,
  };
}
