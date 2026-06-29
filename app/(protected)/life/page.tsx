"use client";

import Link from "next/link";
import { MessageSquare, Sparkles, TrendingUp } from "lucide-react";
import { AppButton } from "@/components/app/AppButton";
import { AppCard } from "@/components/app/AppCard";
import { AppEmptyState } from "@/components/app/AppEmptyState";
import { PageError, PageLoading } from "@/components/app/PageStates";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/features/auth/context/auth-context";
import { useDashboard, useGoals, useVault } from "@/features/app/hooks/use-app-data";
import { formatINR } from "@/lib/utils/app";
import { getApiErrorMessage } from "@/lib/api/errors";

export default function LifePage() {
  const { user } = useAuth();
  const dashboard = useDashboard();
  const goals = useGoals();
  const vault = useVault();

  if (dashboard.isLoading) return <PageLoading />;
  if (dashboard.isError) return <PageError message={getApiErrorMessage(dashboard.error)} />;

  const data = dashboard.data!;
  const goalList = goals.data ?? data.activeGoals ?? [];
  const summary = vault.data?.summary;

  return (
    <div className="space-y-8">
      <AppCard className="relative overflow-hidden border-app-accent/20 app-hero-gradient p-8">
        <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-app-accent/10 blur-3xl" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-app-accent/20 bg-app-accent-muted px-3 py-1 text-xs font-medium text-app-accent">
            <Sparkles className="h-3.5 w-3.5" />
            Your dashboard
          </div>
          <p className="text-sm text-app-muted">Good morning</p>
          <h1 className="mt-1 font-display text-display-sm text-app-text sm:text-display-md">
            Welcome back, {user?.name?.split(" ")[0] ?? "there"}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-app-muted">
            {data.biggestImprovement ?? "Here's your financial snapshot for today."}
          </p>
        </div>
      </AppCard>

      <div className="grid gap-6 lg:grid-cols-3">
        <AppCard className="lg:col-span-1" interactive>
          <p className="text-xs font-semibold uppercase tracking-wider text-app-muted">Financial Health</p>
          <div className="mt-3 flex items-end gap-2">
            <span className="app-stat-value">{data.financialHealthScore}</span>
            <span className="mb-2 text-sm text-app-muted">/ 100</span>
          </div>
          {data.financialGrade && (
            <Badge variant="accent" className="mt-3">
              {data.financialGrade}
            </Badge>
          )}
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-app-bg">
            <div
              className="h-full rounded-full bg-gradient-to-r from-app-accent to-emerald-400 transition-all duration-500"
              style={{ width: `${data.financialHealthScore}%` }}
            />
          </div>
        </AppCard>

        <AppCard className="lg:col-span-2">
          <div className="mb-5 flex items-center justify-between gap-3">
            <h2 className="text-base font-semibold text-app-text">Quick recommendations</h2>
            <Badge variant="info">AI powered</Badge>
          </div>
          <div className="space-y-3">
            {data.recommendations.slice(0, 3).map((rec) => (
              <div
                key={rec.id}
                className="rounded-xl border border-app-border bg-app-surface p-4 transition-colors duration-200 hover:border-app-border-strong"
              >
                <p className="font-medium text-app-text">{rec.title}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-app-muted">{rec.reason}</p>
                {rec.action && (
                  <p className="mt-2 text-sm font-semibold text-app-accent">{rec.action}</p>
                )}
              </div>
            ))}
            {data.recommendations.length === 0 && (
              <AppEmptyState
                title="No recommendations yet"
                description="Complete your profile in Vault to unlock personalized guidance."
                action={
                  <Link href="/vault/">
                    <AppButton variant="secondary" size="sm">
                      Go to Vault
                    </AppButton>
                  </Link>
                }
              />
            )}
          </div>
        </AppCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <AppCard className="lg:col-span-2">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-base font-semibold text-app-text">Goals</h2>
            <Link href="/journey/goals/new/">
              <AppButton variant="ghost" size="sm">
                Add goal
              </AppButton>
            </Link>
          </div>
          <div className="space-y-5">
            {goalList.map((g) => (
              <div key={g.id}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-app-text">{g.goalName}</span>
                  <span className="font-semibold text-app-accent">{g.percentComplete}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-app-bg">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-app-accent to-emerald-400"
                    style={{ width: `${g.percentComplete}%` }}
                  />
                </div>
              </div>
            ))}
            {goalList.length === 0 && (
              <AppEmptyState
                title="No goals yet"
                description="Set a savings target and track your progress over time."
                action={
                  <Link href="/journey/goals/new/">
                    <AppButton size="sm">Create your first goal</AppButton>
                  </Link>
                }
              />
            )}
          </div>
        </AppCard>

        <AppCard className="h-fit">
          <div className="mb-4 flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-app-accent-muted text-app-accent">
              <MessageSquare className="h-4 w-4" />
            </span>
            <h2 className="text-base font-semibold text-app-text">Ask Veris</h2>
          </div>
          <p className="mb-5 text-sm leading-relaxed text-app-muted">
            Get a recommendation before your next financial decision.
          </p>
          <Link href="/veris/" className="block">
            <AppButton fullWidth className="gap-2">
              Open Veris
              <TrendingUp className="h-4 w-4" />
            </AppButton>
          </Link>
          {summary && (
            <div className="mt-6 space-y-3 border-t border-app-border pt-6">
              {summary.netWorth != null && (
                <div className="flex justify-between text-sm">
                  <span className="text-app-muted">Net worth</span>
                  <span className="font-semibold text-app-text">{formatINR(summary.netWorth)}</span>
                </div>
              )}
              {summary.monthlyIncome != null && summary.monthlyExpenses != null && (
                <div className="flex justify-between text-sm">
                  <span className="text-app-muted">Monthly surplus</span>
                  <span className="font-semibold text-app-success">
                    {formatINR(summary.monthlyIncome - summary.monthlyExpenses)}
                  </span>
                </div>
              )}
            </div>
          )}
        </AppCard>
      </div>
    </div>
  );
}
