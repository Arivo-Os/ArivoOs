"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDashboard } from "@/lib/api/dashboard.service";
import { createGoal, getGoals } from "@/lib/api/goals.service";
import { getVaultData, updateFinancialInputs } from "@/lib/api/vault.service";
import { getRecommendationCenter } from "@/lib/api/recommendations.service";
import { filterJourneyOutcomes, getOutcomes } from "@/lib/api/outcomes.service";
import { getDecisionHistory } from "@/lib/api/decisions.service";
import { getConversation, getConversations } from "@/lib/api/conversations.service";
import { buildJourneyTimeline } from "@/lib/api/journey.service";
import type { CreateGoalPayload, UpdateFinancialInputsPayload } from "@/lib/api/types/api";
import { useAuth } from "@/features/auth/context/auth-context";

function useAuthEnabled() {
  const { isAuthenticated, isLoading } = useAuth();
  return { enabled: isAuthenticated && !isLoading };
}

export function useDashboard() {
  const { enabled } = useAuthEnabled();
  return useQuery({ queryKey: ["dashboard"], queryFn: getDashboard, enabled });
}

export function useGoals() {
  const { enabled } = useAuthEnabled();
  return useQuery({ queryKey: ["goals"], queryFn: getGoals, enabled });
}

export function useVault() {
  const { enabled } = useAuthEnabled();
  return useQuery({ queryKey: ["vault"], queryFn: getVaultData, enabled });
}

export function useRecommendations() {
  const { enabled } = useAuthEnabled();
  return useQuery({ queryKey: ["recommendations"], queryFn: getRecommendationCenter, enabled });
}

export function useJourneyOutcomes() {
  const { enabled } = useAuthEnabled();
  return useQuery({
    queryKey: ["outcomes"],
    queryFn: async () => filterJourneyOutcomes(await getOutcomes()),
    enabled,
  });
}

export function useDecisionHistory() {
  const { enabled } = useAuthEnabled();
  return useQuery({
    queryKey: ["decision-history"],
    queryFn: getDecisionHistory,
    enabled,
  });
}

export function useJourneyTimeline() {
  const { enabled } = useAuthEnabled();
  return useQuery({
    queryKey: ["journey-timeline"],
    queryFn: async () => {
      const [decisionsResult, outcomesResult, goalsResult] = await Promise.allSettled([
        getDecisionHistory(),
        getOutcomes().then(filterJourneyOutcomes),
        getGoals(),
      ]);

      const decisions = decisionsResult.status === "fulfilled" ? decisionsResult.value : [];
      const outcomes = outcomesResult.status === "fulfilled" ? outcomesResult.value : [];
      const goals = goalsResult.status === "fulfilled" ? goalsResult.value : [];

      return buildJourneyTimeline(decisions, outcomes, goals);
    },
    enabled,
  });
}

export function useVerisConversations() {
  const { enabled } = useAuthEnabled();
  return useQuery({
    queryKey: ["veris-conversations"],
    queryFn: getConversations,
    enabled,
  });
}

export function useVerisConversation(sessionId: string | null) {
  const { enabled } = useAuthEnabled();
  return useQuery({
    queryKey: ["veris-conversation", sessionId],
    queryFn: () => (sessionId ? getConversation(sessionId) : null),
    enabled: enabled && Boolean(sessionId),
  });
}

export function useCreateGoal() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: CreateGoalPayload) => createGoal(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      queryClient.invalidateQueries({ queryKey: ["journey-timeline"] });
    },
  });
}

export function useUpdateFinancialProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: UpdateFinancialInputsPayload) => updateFinancialInputs(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["vault"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
