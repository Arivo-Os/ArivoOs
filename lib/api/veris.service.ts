import { apiClient, hasApiConfigured, unwrap } from "@/lib/api/client";
import type { VerisChatResponse } from "@/lib/api/types/api";
import { mockVerisRecommendation } from "@/lib/api/mock-data";

export interface SendChatParams {
  message?: string;
  conversationId?: string;
  suggestedQuestionKey?: string;
  decisionId?: string;
  messages?: { role: "user" | "assistant"; content: string }[];
  userProfile?: Record<string, unknown>;
}

export async function sendVerisChat(params: SendChatParams): Promise<VerisChatResponse> {
  if (!hasApiConfigured()) {
    await delay(900);
    return {
      conversationId: params.conversationId ?? "mock-session",
      responseFormat: "verdict",
      message: {
        role: "assistant",
        type: "decision",
        content:
          "Paying ₹15,000/month for 3 months keeps your savings goal intact and your emergency fund untouched. Want me to add this to your monthly plan?",
      },
      decision: {
        verdictTitle: "Laptop purchase analysis",
        verdictType: "positive",
        confidence: 82,
        riskLevel: "low",
        verdictSummary: "Yes, you can — but spread it over 3 months to stay on track.",
        nextAction: "Yes, you can — but spread it over 3 months to stay on track.",
        reasoningFacts: [],
        suggestionPills: mockVerisRecommendation.suggestedQuestions,
      },
      structuredContent: {
        type: "budget_breakdown",
        title: "Laptop purchase analysis",
        items: [
          { label: "Monthly surplus", value: "₹18,200", tone: "positive" },
          { label: "Purchase cost", value: "₹45,000", tone: "neutral" },
          { label: "Emergency fund", value: "Healthy", tone: "positive" },
          { label: "Savings impact", value: "-2.5 months", tone: "negative" },
        ],
      },
      suggestionPills: mockVerisRecommendation.suggestedQuestions,
      aiDailyUsed: 3,
      aiDailyLimit: 20,
      aiDailyRemaining: 17,
      workflowProgress: [
        "Loading your financial profile",
        "Checking affordability",
        "Evaluating financial health",
        "Reviewing goals and targets",
        "Preparing your recommendation",
      ],
    };
  }

  const res = await apiClient.post("/ai-copilot/chat", {
    message: params.message,
    conversationId: params.conversationId,
    suggestedQuestionKey: params.suggestedQuestionKey,
    decisionId: params.decisionId,
    messages: params.messages ?? [],
    userProfile: params.userProfile ?? {},
  });
  return unwrap(res);
}

export async function executeDecisionAction(payload: {
  action: string;
  decisionId: string;
  conversationId: string;
}): Promise<VerisChatResponse> {
  const res = await apiClient.post("/ai-copilot/decisions/actions", payload);
  return unwrap(res);
}

export interface QuickInsight {
  id: string;
  type: string;
  title: string;
  description: string;
}

export async function getQuickInsights(): Promise<QuickInsight[]> {
  if (!hasApiConfigured()) {
    return [
      {
        id: "sip",
        type: "sip",
        title: "SIP opportunity",
        description: "Your surplus can absorb ₹5,000/month in mutual funds.",
      },
      {
        id: "subscription",
        type: "subscription",
        title: "Subscription audit",
        description: "3 recurring charges detected that may be unused.",
      },
      {
        id: "goal",
        type: "goal",
        title: "Goal check",
        description: "Emergency fund target reached in ~4 months at current pace.",
      },
    ];
  }
  const res = await apiClient.get("/ai-copilot/quick-insights");
  return unwrap(res);
}

function delay(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}
