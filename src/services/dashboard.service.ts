import { apiClient, hasApiConfigured, unwrap } from "@/services/client";
import type { DashboardData, FinancialHealthScore } from "@/services/types/api";
import { mockGoals, mockProfile } from "@/services/mock-data";

export async function getDashboard(): Promise<DashboardData> {
  if (!hasApiConfigured()) {
    return {
      financialHealthScore: mockProfile.healthScore,
      financialGrade: "Good",
      biggestImprovement: "Increase emergency fund by ₹50,000",
      recommendations: [
        {
          id: "1",
          title: "Build a 6-month emergency fund",
          priority: "high",
          reason: "Emergency fund covers about 2.1 months.",
          action: "Add about ₹50,000 to emergency savings.",
          type: "emergency_fund",
        },
      ],
      activeGoals: mockGoals.map((g) => ({
        id: g.id,
        goalName: g.name,
        goalType: "OTHER",
        targetAmount: g.target,
        currentAmount: g.saved,
        percentComplete: g.progress,
        targetDate: g.eta,
      })),
      profileCompletion: 85,
      missingProfileFields: [],
    };
  }
  const res = await apiClient.get("/analytics/dashboard");
  return unwrap(res);
}

export async function getFinancialHealth(): Promise<FinancialHealthScore> {
  if (!hasApiConfigured()) {
    return { overallScore: mockProfile.healthScore };
  }
  const res = await apiClient.get("/analytics/financial-health");
  return unwrap(res);
}
