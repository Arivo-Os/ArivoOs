import { apiClient, hasApiConfigured, unwrap } from "@/lib/api/client";
import type { RecommendationCenter } from "@/lib/api/types/api";

export async function getRecommendationCenter(): Promise<RecommendationCenter> {
  if (!hasApiConfigured()) {
    return { high: [], medium: [], low: [], snoozed: [], total: 0 };
  }
  const res = await apiClient.get("/recommendations/center");
  return unwrap(res);
}
