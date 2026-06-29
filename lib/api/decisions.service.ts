import { apiClient, hasApiConfigured, unwrap } from "@/lib/api/client";
import { normalizeList } from "@/lib/api/normalize";
import type { DecisionHistoryRecord } from "@/lib/api/types/api";
import { mockDecisions } from "@/lib/api/mock-data";

function mapDecisionRecord(raw: Record<string, unknown>): DecisionHistoryRecord {
  return {
    decisionId: String(raw.decisionId ?? raw.id ?? raw.snapshotId ?? ""),
    decisionType: raw.decisionType ? String(raw.decisionType) : undefined,
    query: String(raw.query ?? raw.message ?? raw.question ?? raw.userMessage ?? "Decision"),
    decision: String(
      raw.decision ?? raw.verdictTitle ?? raw.verdictSummary ?? raw.recommendation ?? raw.summary ?? ""
    ),
    confidence: typeof raw.confidence === "number" ? raw.confidence : undefined,
    reasoning: raw.reasoning ? String(raw.reasoning) : undefined,
    timestamp: String(raw.timestamp ?? raw.createdAt ?? raw.date ?? new Date().toISOString()),
  };
}

export async function getDecisionHistory(): Promise<DecisionHistoryRecord[]> {
  if (!hasApiConfigured()) {
    return mockDecisions.map((d) => ({
      decisionId: d.id,
      query: d.question,
      decision: d.recommendation,
      confidence: d.confidence,
      timestamp: d.createdAt,
    }));
  }
  const res = await apiClient.get("/analytics/decision-history", {
    params: { category: "all", limit: 50 },
  });
  const data = unwrap(res);
  return normalizeList<Record<string, unknown>>(data)
    .map(mapDecisionRecord)
    .filter((d) => d.decisionId);
}
