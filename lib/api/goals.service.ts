import { apiClient, hasApiConfigured, unwrap } from "@/lib/api/client";
import type { ApiGoal, CreateGoalPayload } from "@/lib/api/types/api";
import { mockGoals } from "@/lib/api/mock-data";

const mockCreatedGoals: ApiGoal[] = [];

function baseMockGoals(): ApiGoal[] {
  return mockGoals.map((g) => ({
    id: g.id,
    goalName: g.name,
    goalType: "CUSTOM",
    targetAmount: g.target,
    currentAmount: g.saved,
    percentComplete: g.progress,
    targetDate: g.eta,
    isOnTrack: g.progress >= 50,
  }));
}

export async function getGoals(): Promise<ApiGoal[]> {
  if (!hasApiConfigured()) {
    return [...baseMockGoals(), ...mockCreatedGoals];
  }
  const res = await apiClient.get("/goals");
  return unwrap(res);
}

export async function createGoal(payload: CreateGoalPayload): Promise<ApiGoal> {
  if (!hasApiConfigured()) {
    const progress = payload.targetAmount
      ? Math.round(((payload.currentAmount ?? 0) / payload.targetAmount) * 100)
      : 0;
    const goal: ApiGoal = {
      id: `mock-${Date.now()}`,
      goalName: payload.goalName,
      goalType: payload.goalType,
      targetAmount: payload.targetAmount,
      currentAmount: payload.currentAmount ?? 0,
      percentComplete: progress,
      targetDate: payload.targetDate,
      monthlyContribution: payload.monthlyContribution,
      isOnTrack: progress >= 50,
    };
    mockCreatedGoals.unshift(goal);
    return goal;
  }
  const res = await apiClient.post("/goals", payload);
  return unwrap(res);
}

export async function deleteGoal(goalId: string): Promise<void> {
  if (!hasApiConfigured()) return;
  await apiClient.delete(`/goals/${goalId}`);
}
