import { apiClient, hasApiConfigured, unwrap } from "@/services/client";
import type { RecommendationCenter } from "@/services/types/api";

export async function getRecommendationCenter(): Promise<RecommendationCenter> {
  if (!hasApiConfigured()) {
    return { high: [], medium: [], low: [], snoozed: [], total: 0 };
  }
  const res = await apiClient.get("/recommendations/center");
  return unwrap(res);
}
