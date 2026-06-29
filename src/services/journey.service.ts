import type { ApiGoal, DecisionHistoryRecord, JourneyTimelineEvent, OutcomeRecord } from "@/services/types/api";
import { mockMilestones } from "@/services/mock-data";
import { hasApiConfigured } from "@/services/client";
import { outcomeStatusLabel } from "@/services/outcomes.service";

export function buildJourneyTimeline(
  decisions: DecisionHistoryRecord[],
  outcomes: OutcomeRecord[],
  goals: ApiGoal[]
): JourneyTimelineEvent[] {
  const events: JourneyTimelineEvent[] = [];

  for (const d of decisions) {
    events.push({
      id: d.decisionId,
      title: d.query,
      description: d.decision,
      date: d.timestamp,
      type: "decision",
      badge: d.confidence != null ? `${d.confidence}% confidence` : undefined,
    });
  }

  for (const o of outcomes) {
    events.push({
      id: o.id,
      title: o.recommendation?.title ?? "Tracked recommendation",
      description:
        o.financialImpactExpected != null
          ? `Expected impact ${o.financialImpactExpected}`
          : undefined,
      date: o.scheduledVerificationAt ?? new Date().toISOString(),
      type: "outcome",
      badge: outcomeStatusLabel(o.outcomeStatus),
    });
  }

  for (const g of goals) {
    events.push({
      id: `goal-${g.id}`,
      title: g.goalName,
      description: `${g.percentComplete}% complete`,
      date: g.targetDate ?? new Date().toISOString(),
      type: "goal",
      badge: g.isOnTrack ? "On track" : "In progress",
    });
  }

  if (!hasApiConfigured()) {
    for (const m of mockMilestones) {
      events.push({
        id: m.id,
        title: m.title,
        description: m.description,
        date: m.date,
        type: m.type,
      });
    }
  }

  return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
