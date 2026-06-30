import { apiClient, hasApiConfigured, unwrap } from "@/services/client";
import type { ApiGoal, CreateGoalPayload } from "@/services/types/api";
import { mockGoals } from "@/services/mock-data";

const mockCreatedGoals: ApiGoal[] = [];

function baseMockGoals(): ApiGoal[] {
  return mockGoals.map((g) => ({
    id: g.id,
    goalName: g.name,
    goalType: "OTHER",
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
  if (!hasApiConfigured()) {
    const idx = mockCreatedGoals.findIndex(g => g.id === goalId);
    if (idx !== -1) mockCreatedGoals.splice(idx, 1);
    return;
  }
  await apiClient.delete(`/goals/${goalId}`);
}

export async function updateGoal(goalId: string, payload: Partial<CreateGoalPayload>): Promise<ApiGoal> {
  if (!hasApiConfigured()) {
    const idx = mockCreatedGoals.findIndex(g => g.id === goalId);
    if (idx !== -1) {
      const g = mockCreatedGoals[idx];
      const updated = {
        ...g,
        goalName: payload.goalName ?? g.goalName,
        goalType: payload.goalType ?? g.goalType,
        targetAmount: payload.targetAmount ?? g.targetAmount,
        currentAmount: payload.currentAmount ?? g.currentAmount,
        targetDate: payload.targetDate ?? g.targetDate,
        monthlyContribution: payload.monthlyContribution ?? g.monthlyContribution,
      };
      if (updated.targetAmount > 0) {
        updated.percentComplete = Math.round((updated.currentAmount / updated.targetAmount) * 100);
        updated.isOnTrack = updated.percentComplete >= 50;
      }
      mockCreatedGoals[idx] = updated;
      return updated;
    }
    const baseIdx = mockGoals.findIndex(g => g.id === goalId);
    if (baseIdx !== -1) {
       // Ideally we'd modify mockGoals or handle this better for mock, but we can just pretend it updated
       return baseMockGoals()[baseIdx];
    }
    throw new Error("Goal not found");
  }
  const res = await apiClient.patch(`/goals/${goalId}`, payload);
  return unwrap(res);
}
