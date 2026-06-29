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
  },
  {
    slug: "ai-personal-finance-india",
    tag: "AI Finance",
    title: "How to use AI for personal finance in India",
    excerpt: "Navigate India's complex financial landscape with Artificial Intelligence.",
    description: "Discover how AI is transforming personal finance for Indians, from optimizing EMIs to contextual decision intelligence.",
    href: MEDIUM_PROFILE_URL,
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    readingMinutes: 6,
    sections: [
      {
        id: "indian-context",
        heading: "The unique Indian financial landscape",
        paragraphs: [
          "Managing money in India involves navigating a mix of traditional savings, modern EMIs, UPI micro-transactions, and complex tax rules. Generic advice often falls flat here.",
          "AI platforms like Arivo are changing this by understanding the specific context of an Indian earner, analyzing cash flow patterns that include festival bonuses, variable expenses, and family obligations."
        ]
      },
      {
        id: "beyond-tracking",
        heading: "Going beyond basic tracking",
        paragraphs: [
          "Most apps stop at telling you that you spent too much on food. True AI in personal finance answers 'What next?'",
          "By employing decision intelligence, AI can evaluate whether you should pay down a high-interest loan or invest in a tax-saving instrument, providing actionable verdicts rather than just passive dashboards."
        ]
      }
    ]
  },
  {
    slug: "financial-health-score-guide",
    tag: "Financial Health",
    title: "What is a Financial Health Score?",
    excerpt: "Why your credit score is only half the story.",
    description: "A deep dive into what a Financial Health Score is, how it differs from a credit score, and why it's crucial for long-term wealth.",
    href: MEDIUM_PROFILE_URL,
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    readingMinutes: 4,
    sections: [
      {
        id: "credit-vs-health",
        heading: "Credit Score vs. Health Score",
        paragraphs: [
          "Your credit score tells lenders how good you are at paying back debt. Your Financial Health Score tells you how secure your overall financial life is.",
          "A health score factors in your emergency fund, debt-to-income ratio, savings rate, and progress toward goals—giving you a complete picture."
        ]
      },
      {
        id: "improving-score",
        heading: "How to improve your score",
        paragraphs: [
          "Improving your health score starts with visibility. Using AI-driven platforms to track your net worth and cash flow helps you identify leaks.",
          "Focus on building a 6-month emergency buffer and eliminating high-interest debt to see the most significant jumps in your financial resilience."
        ]
      }
    ]
  },
  {
    slug: "ai-vs-human-financial-advisor",
    tag: "AI Finance",
    title: "Can AI replace a human financial advisor?",
    excerpt: "The truth about AI decision engines and traditional advising.",
    description: "Explore the differences between AI financial assistants and human advisors, and learn how to use both effectively.",
    href: MEDIUM_PROFILE_URL,
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    readingMinutes: 7,
    sections: [
      {
        id: "the-difference",
        heading: "The core difference",
        paragraphs: [
          "AI financial assistants excel at continuous data analysis, real-time insights, and objective decision intelligence without human bias or high fees.",
          "However, human advisors provide emotional coaching, complex estate planning, and nuanced legal strategies that AI is not legally or contextually equipped to handle yet."
        ]
      },
      {
        id: "hybrid-approach",
        heading: "The hybrid future",
        paragraphs: [
          "You don't have to choose. Use an AI decision engine like Arivo to manage daily financial health, optimize spending, and run scenarios.",
          "When it comes time for regulated investment advice or complex tax restructuring, bring your AI-organized data to a certified human professional for the best of both worlds."
        ]
      }
    ]
  },
  {
    slug: "decision-intelligence-vs-expense-tracking",
    tag: "Decision Intelligence",
    title: "Decision Intelligence vs. Expense Tracking",
    excerpt: "Why looking backwards won't help you move forwards.",
    description: "Understand the shift from passive expense tracking to proactive financial decision intelligence.",
    href: MEDIUM_PROFILE_URL,
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    readingMinutes: 5,
    sections: [
      {
        id: "rearview-mirror",
        heading: "The rearview mirror problem",
        paragraphs: [
          "Expense tracking is like driving while looking in the rearview mirror. It tells you what happened, but it doesn't prepare you for what's next.",
          "Knowing you overspent last month doesn't automatically help you decide if you can afford to buy a car today."
        ]
      },
      {
        id: "proactive-decisions",
        heading: "Proactive decision engines",
        paragraphs: [
          "Decision intelligence looks forward. It takes your historical data and applies it to future scenarios, answering direct questions like 'Should I take this loan?'",
          "This shift from passive observation to active guidance is the defining feature of the next generation of personal finance platforms."
        ]
      }
    ]
  },
  {
    slug: "future-of-ai-financial-planning",
    tag: "Future Trends",
    title: "The future of AI-powered financial planning",
    excerpt: "Where personal finance technology is heading in the next 5 years.",
    description: "A look into the future of how AI will revolutionize personal finance, strategic planning, and wealth management.",
    href: MEDIUM_PROFILE_URL,
    datePublished: "2026-06-30",
    dateModified: "2026-06-30",
    readingMinutes: 8,
    sections: [
      {
        id: "hyper-personalization",
        heading: "Hyper-personalized strategies",
        paragraphs: [
          "In the near future, financial plans won't be static documents. They will be dynamic, living models that adjust instantly to a change in your salary, a market dip, or a new life goal.",
          "AI will autonomously simulate thousands of scenarios to find the optimal path to your goals, constantly course-correcting behind the scenes."
        ]
      },
      {
        id: "autonomous-finance",
        heading: "Autonomous finance",
        paragraphs: [
          "We are moving toward a world where your AI assistant doesn't just recommend actions—it executes them. From moving idle cash into high-yield accounts to auto-rebalancing portfolios.",
          "While trust must be established first, the ultimate convenience of self-driving money is the inevitable end goal of financial technology."
        ]
      }
    ]
  }
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
