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

export { FAQ_ITEMS } from "@/lib/seo/faq";
