export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatarUrl?: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export interface FinancialProfile {
  income: number;
  savings: number;
  expenses: number;
  debt: number;
  netWorth: number;
  riskProfile: "low" | "medium" | "high";
  healthScore: number;
}

export interface Goal {
  id: string;
  name: string;
  target: number;
  saved: number;
  progress: number;
  eta: string;
}

export interface Decision {
  id: string;
  question: string;
  recommendation: string;
  confidence: number;
  risk: "low" | "medium" | "high";
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

export interface JourneyMilestone {
  id: string;
  title: string;
  date: string;
  type: "goal" | "decision" | "conversation";
  description: string;
}

export interface VerisRecommendation {
  summary: string;
  confidence: number;
  risk: "low" | "medium" | "high";
  metrics: { label: string; value: string }[];
  analysis: string;
  suggestedQuestions: string[];
}
