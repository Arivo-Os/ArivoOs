import type { Decision, FinancialProfile, Goal, JourneyMilestone, User, VerisRecommendation } from "@/lib/types";

/** UI placeholder data — replace with API responses when backend is wired. */
export const mockUser: User = {
  id: "1",
  name: "Akhilesh Goswami",
  email: "agiri5375@gmail.com",
  phone: "+91 98765 43210",
};

export const mockProfile: FinancialProfile = {
  income: 75000,
  savings: 2000,
  expenses: 25000,
  debt: 0,
  netWorth: 2000,
  riskProfile: "high",
  healthScore: 50.33,
};

export const mockGoals: Goal[] = [];

export const mockDecisions: Decision[] = [];

export const mockMilestones: JourneyMilestone[] = [];

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
