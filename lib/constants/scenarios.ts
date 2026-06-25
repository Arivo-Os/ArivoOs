export type ScenarioKey = "car" | "trip" | "invest";

export interface Scenario {
  key: ScenarioKey;
  tabLabel: string;
  tabHint: string;
  decisionType: string;
  scenario: string;
  question: string;
  verdict: string;
  verdictClass: "verdict-approved" | "verdict-review";
  confidence: string;
  confidenceNum: number;
  risk: string;
  reasoning: string[];
  actions: string[];
}

export const SCENARIOS: Record<ScenarioKey, Scenario> = {
  car: {
    key: "car",
    tabLabel: "Car",
    tabHint: "₹15L financing",
    decisionType: "Vehicle purchase",
    scenario: "₹15L car financing",
    question: "Should I finance this ₹15L vehicle?",
    verdict: "Approved",
    verdictClass: "verdict-approved",
    confidence: "91%",
    confidenceNum: 91,
    risk: "Low",
    reasoning: [
      "EMI fits within 15% of monthly income.",
      "Emergency fund remains above 6 months.",
      "Down payment preserves savings goals.",
    ],
    actions: ["EMI breakdown", "Purchase timeline", "Loan comparison"],
  },
  trip: {
    key: "trip",
    tabLabel: "Trip",
    tabHint: "₹2.5L budget",
    decisionType: "Travel expense",
    scenario: "Bali trip · ₹2.5L budget",
    question: "Should I take this ₹2.5L trip now?",
    verdict: "Worth Reviewing",
    verdictClass: "verdict-review",
    confidence: "88%",
    confidenceNum: 88,
    risk: "Medium",
    reasoning: [
      "Trip budget reduces emergency fund below target.",
      "Savings goal timeline extends by 3 months.",
      "Cash flow remains positive but tighter.",
    ],
    actions: ["Wait 2 months", "Reduce trip budget", "Build emergency fund"],
  },
  invest: {
    key: "invest",
    tabLabel: "Invest",
    tabHint: "₹50K deploy",
    decisionType: "Investment allocation",
    scenario: "₹50,000 lump-sum deploy",
    question: "Should I invest ₹50,000 now?",
    verdict: "Approved",
    verdictClass: "verdict-approved",
    confidence: "93%",
    confidenceNum: 93,
    risk: "Low",
    reasoning: [
      "Strong cash position after investment.",
      "Emergency fund healthy at 8 months.",
      "Allocation aligns with long-term goals.",
    ],
    actions: ["Portfolio allocation", "Goal impact view", "Tax-efficient options"],
  },
};

export const SCENARIO_KEYS: ScenarioKey[] = ["car", "trip", "invest"];

export const HERO_DECISIONS = [
  { label: "Home purchase", confidence: 87, verdict: "Proceed", risk: "low" as const },
  { label: "Car financing", confidence: 91, verdict: "Approved", risk: "low" as const },
  { label: "Investment timing", confidence: 93, verdict: "Approved", risk: "low" as const },
  { label: "Career & relocation", confidence: 76, verdict: "Review", risk: "medium" as const },
];

export const FAQ_ITEMS = [
  {
    question: "What is Arivo?",
    answer:
      "Arivo is an AI-powered financial decision engine built for India. It analyzes your income, expenses, existing debt, savings, and goals to give you a clear verdict — proceed, wait, or review — along with a confidence score and specific next steps. It is built for major money decisions like buying a car, a home, taking a loan, or deploying an investment.",
  },
  {
    question: "Is Arivo a financial advisor?",
    answer:
      "No. Arivo is a decision intelligence tool, not a SEBI-registered investment advisor or certified financial planner. It uses your financial data to generate structured analysis. For regulated financial advice, consult a certified advisor. Arivo helps you understand your numbers before that conversation.",
  },
  {
    question: "Is my financial data safe with Arivo?",
    answer:
      "Yes. Your financial data is private, never sold to third parties, and never used to serve ads. Arivo does not sell financial products or earn referral commissions. Your data is used solely to power your decision analysis.",
  },
  {
    question: "When does Arivo launch?",
    answer:
      "Arivo is in pre-launch. Join the waitlist at arivoai.in to be in the first access batch. Waitlist members get free access at launch and are onboarded before the public release.",
  },
  {
    question: "Is it free to use?",
    answer:
      "Early access is completely free. Users who join the waitlist receive free access at launch. Paid tiers will be introduced after the initial public launch — early users will be grandfathered into favorable pricing.",
  },
  {
    question: "What kinds of decisions can Arivo evaluate?",
    answer:
      "Arivo evaluates: vehicle purchases and car loan affordability, home purchases and home loan readiness, personal loan decisions, investment timing and lump-sum deployment, career changes and relocation decisions. If the right answer depends on your financial health, Arivo can evaluate it.",
  },
];
