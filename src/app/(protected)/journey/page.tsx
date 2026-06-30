"use client";

import Link from "next/link";
import { Plus, MessageSquare, Target, History } from "lucide-react";
import { AppButton } from "@/components/app/AppButton";
import { AppCard } from "@/components/app/AppCard";
import { AppEmptyState } from "@/components/app/AppEmptyState";
import { AppPageHeader } from "@/components/app/AppPageHeader";
import { PageError, PageLoading } from "@/components/app/PageStates";
import { Badge } from "@/components/ui/badge";
import {
  useDecisionHistory,
  useGoals,
  useJourneyOutcomes,
  useJourneyTimeline,
} from "@/features/app/hooks/use-app-data";
import { outcomeStatusLabel } from "@/services/outcomes.service";
import { formatINR } from "@/lib/utils/app";
import { getApiErrorMessage } from "@/services/errors";

function formatDate(iso?: string) {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
}

const timelineIcon = {
  decision: MessageSquare,
  outcome: History,
  goal: Target,
  conversation: MessageSquare,
};

export default function JourneyPage() {
  const timeline = useJourneyTimeline();
  const outcomes = useJourneyOutcomes();
  const decisions = useDecisionHistory();
  const goals = useGoals();

  if (timeline.isLoading || outcomes.isLoading || decisions.isLoading || goals.isLoading) {
    return <PageLoading />;
  }
  if (timeline.isError) return <PageError message={getApiErrorMessage(timeline.error)} />;

  const timelineEvents = timeline.data ?? [];
  const outcomeList = outcomes.data ?? [];
  const decisionList = decisions.data ?? [];
  const goalList = goals.data ?? [];

  return (
    <div className="space-y-8">
      <AppPageHeader
        title="Goals & Activity"
        description="Your goals, recent suggestions, and financial activity."
        action={
          <Link href="/journey/goals/new/">
            <AppButton size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create goal
            </AppButton>
          </Link>
        }
      />

      <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-sm">
        <h2 className="mb-6 font-bold text-app-text">Recent history</h2>
        <div className="space-y-4">
          {timelineEvents.slice(0, 8).map((event, index) => {
            const Icon = timelineIcon[event.type] ?? History;
            return (
              <div key={event.id} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-app-accent/15 text-app-accent">
                    <Icon className="h-4 w-4" />
                  </span>
                  {index < Math.min(timelineEvents.length, 8) - 1 && (
                    <span className="mt-1 w-px flex-1 bg-app-border" />
                  )}
                </div>
                <div className="flex-1 rounded-xl border border-app-border bg-app-bg p-4">
                  <div className="mb-1 flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium text-app-text">{event.title}</p>
                    <span className="text-xs text-app-muted">{formatDate(event.date)}</span>
                  </div>
                  {event.description && (
                    <p className="text-sm leading-relaxed text-app-muted">{event.description}</p>
                  )}
                  {event.badge && (
                    <Badge variant="accent" className="mt-2">
                      {event.badge}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
          {timelineEvents.length === 0 && (
            <p className="text-sm text-app-muted">
              No history yet. Ask for advice or create your first goal.
            </p>
          )}
        </div>
      </div>

      <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between gap-3">
          <h2 className="font-bold text-app-text">Goal progress</h2>
          <Link href="/journey/goals/new/" className="text-sm font-semibold text-app-accent hover:underline">
            Add goal
          </Link>
        </div>
        <div className="space-y-5">
          {goalList.map((g) => (
            <div key={g.id}>
              <div className="mb-2 flex items-center justify-between">
                <div>
                  <p className="font-medium text-app-text">{g.goalName}</p>
                  {g.targetDate && <p className="text-xs text-app-muted">Target {formatDate(g.targetDate)}</p>}
                </div>
                <Badge variant="accent">{g.percentComplete}%</Badge>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-app-bg">
                <div
                  className="h-full rounded-full bg-app-accent"
                  style={{ width: `${g.percentComplete}%` }}
                />
              </div>
            </div>
          ))}
          {goalList.length === 0 && (
            <AppEmptyState
              title="No goals yet"
              description="Set a target and start tracking your progress."
              action={
                <Link href="/journey/goals/new/">
                  <AppButton size="sm" className="gap-2">
                    <Plus className="h-4 w-4" />
                    Create your first goal
                  </AppButton>
                </Link>
              }
            />
          )}
        </div>
      </div>

      <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-sm">
        <h2 className="mb-2 font-bold text-app-text">Recent Suggestions</h2>
        <p className="mb-4 text-xs text-app-muted">Your questions and our helpful answers.</p>
        <div className="space-y-3">
          {decisionList.map((d) => (
            <div key={d.decisionId} className="rounded-xl border border-app-border bg-app-bg p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-app-text">{d.query}</p>
                <span className="text-xs text-app-muted">{formatDate(d.timestamp)}</span>
              </div>
              <p className="text-sm text-app-muted">{d.decision}</p>
              {d.confidence != null && (
                <Badge variant="accent" className="mt-2">
                  {d.confidence}% confidence
                </Badge>
              )}
            </div>
          ))}
          {decisions.isError && (
            <p className="text-sm text-app-danger">
              {getApiErrorMessage(decisions.error, "Could not load decision history")}
            </p>
          )}
          {!decisions.isError && decisionList.length === 0 && (
            <p className="text-sm text-app-muted">
              No suggestions yet.{" "}
              <Link href="/veris/" className="text-app-accent hover:underline">
                Ask for advice
              </Link>
            </p>
          )}
        </div>
      </div>

      <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-sm">
        <h2 className="mb-2 font-bold text-app-text">What we&apos;re tracking for you</h2>
        <p className="mb-4 text-xs text-app-muted">Things we are keeping an eye on to help you reach your goals.</p>
        <div className="space-y-3">
          {outcomeList.map((o) => (
            <div key={o.id} className="rounded-xl border border-app-border bg-app-bg p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-app-text">{o.recommendation?.title ?? "Decision"}</p>
                <Badge
                  variant={
                    o.outcomeStatus === "verified_negative"
                      ? "warning"
                      : o.outcomeStatus.startsWith("verified")
                        ? "success"
                        : "accent"
                  }
                >
                  {outcomeStatusLabel(o.outcomeStatus)}
                </Badge>
              </div>
              {o.financialImpactExpected != null && (
                <p className="text-sm text-app-muted">
                  Expected impact: {formatINR(o.financialImpactExpected)}
                </p>
              )}
              {o.scheduledVerificationAt && (
                <p className="mt-1 text-xs text-app-muted">
                  Check by {formatDate(o.scheduledVerificationAt)}
                </p>
              )}
            </div>
          ))}
          {outcomeList.length === 0 && (
            <p className="text-sm text-app-muted">We aren&apos;t tracking anything yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
