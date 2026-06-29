import type { Decision, FinancialProfile, Goal, JourneyMilestone, User, VerisRecommendation } from "@/lib/types";

/** UI placeholder data — replace with API responses when backend is wired. */
export const mockUser: User = {
  id: "1",
  name: "Akhilesh",
  email: "akhilesh@arivoai.in",
  phone: "+91 98765 43210",
};

export const mockProfile: FinancialProfile = {
  income: 75000,
  savings: 216000,
  expenses: 25000,
  debt: 45000,
  netWorth: 296650,
  riskProfile: "medium",
  healthScore: 74,
};

export const mockGoals: Goal[] = [
  { id: "1", name: "Europe Trip", target: 250000, saved: 95000, progress: 38, eta: "Aug 2026" },
  { id: "2", name: "Emergency Fund", target: 300000, saved: 216000, progress: 72, eta: "Mar 2026" },
  { id: "3", name: "New Laptop", target: 120000, saved: 48000, progress: 40, eta: "Jun 2026" },
];

export const mockDecisions: Decision[] = [
  {
    id: "1",
    question: "Should I buy a car worth ₹8L right now?",
    recommendation: "Wait 3 months to strengthen your emergency fund first.",
    confidence: 74,
    risk: "medium",
    createdAt: "2026-06-20",
  },
  {
    id: "2",
    question: "Can I afford a Bali trip this year?",
    recommendation: "Yes, if you reduce dining spend by 15% for two months.",
    confidence: 81,
    risk: "low",
    createdAt: "2026-06-15",
  },
];

export const mockMilestones: JourneyMilestone[] = [
  {
    id: "1",
    title: "Emergency fund crossed 70%",
    date: "Jun 18, 2026",
    type: "goal",
    description: "You're on track to complete your emergency fund by March 2026.",
  },
  {
    id: "2",
    title: "Car purchase decision",
    date: "Jun 20, 2026",
    type: "decision",
    description: "Veris recommended waiting 3 months before taking the car loan.",
  },
  {
    id: "3",
    title: "Asked about Bali trip",
    date: "Jun 15, 2026",
    type: "conversation",
    description: "Explored travel affordability based on current savings rate.",
  },
];

export const mockVerisRecommendation: VerisRecommendation = {
  summary: "Based on your savings and EMI capacity, I'd recommend waiting 3 months to strengthen your emergency fund before committing to a car loan.",
  confidence: 74,
  risk: "medium",
  metrics: [
    { label: "Monthly surplus", value: "₹32,000" },
    { label: "EMI capacity", value: "₹18,500" },
    { label: "Emergency buffer", value: "2.1 months" },
  ],
  analysis:
    "Your current debt-to-income ratio is healthy, but your emergency fund covers only 2.1 months of expenses. Adding a car EMI now would reduce flexibility if income fluctuates. Waiting 3 months gets you to a 3-month buffer — the threshold Veris uses for large purchase decisions.",
  suggestedQuestions: ["Afford Bali trip?", "Invest ₹50K?", "Move cities?", "Take a personal loan?"],
};
