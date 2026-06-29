import { apiClient, hasApiConfigured, unwrap } from "@/lib/api/client";
import type { OutcomeRecord } from "@/lib/api/types/api";

export async function getOutcomes(): Promise<OutcomeRecord[]> {
  if (!hasApiConfigured()) return [];
  const res = await apiClient.get("/outcomes");
  return unwrap(res);
}

/** Journey Recent Decisions — filter per API guide */
export function filterJourneyOutcomes(outcomes: OutcomeRecord[]): OutcomeRecord[] {
  const filtered = outcomes.filter(
    (o) =>
      o.outcomeStatus !== "unverifiable" &&
      o.recommendation?.status !== "dismissed"
  );

  const byTitle = new Map<string, OutcomeRecord>();
  for (const o of filtered) {
    const title = o.recommendation?.title ?? o.id;
    const existing = byTitle.get(title);
    if (
      !existing ||
      new Date(o.scheduledVerificationAt ?? 0) > new Date(existing.scheduledVerificationAt ?? 0)
    ) {
      byTitle.set(title, o);
    }
  }

  return Array.from(byTitle.values()).sort((a, b) => {
    const aAccepted = a.recommendation?.status === "accepted" ? 1 : 0;
    const bAccepted = b.recommendation?.status === "accepted" ? 1 : 0;
    if (bAccepted !== aAccepted) return bAccepted - aAccepted;
    return new Date(b.scheduledVerificationAt ?? 0).getTime() - new Date(a.scheduledVerificationAt ?? 0).getTime();
  });
}

export function outcomeStatusLabel(status: string): string {
  switch (status) {
    case "pending":
      return "Tracking";
    case "verified_positive":
    case "verified_partial":
    case "verified_neutral":
      return "Done";
    case "verified_negative":
      return "Missed";
    default:
      return "Tracking";
  }
}
