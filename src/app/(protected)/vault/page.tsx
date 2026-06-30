"use client";

import { useState } from "react";
import { AppButton } from "@/components/app/AppButton";
import { AppCard } from "@/components/app/AppCard";
import { AppPageHeader } from "@/components/app/AppPageHeader";
import { EditProfileModal } from "@/components/app/EditProfileModal";
import { PageError, PageLoading } from "@/components/app/PageStates";
import { Badge } from "@/components/ui/badge";
import { useVault } from "@/features/app/hooks/use-app-data";
import { formatINR } from "@/lib/utils/app";
import { getHealthScoreTextColor, getHealthScoreBgColor } from "@/lib/utils";
import { getApiErrorMessage } from "@/services/errors";

export default function VaultPage() {
  const { data, isLoading, isError, error } = useVault();
  const [editOpen, setEditOpen] = useState(false);

  if (isLoading) return <PageLoading />;
  if (isError || !data) return <PageError message={getApiErrorMessage(error)} />;

  const { profile, summary } = data;
  const inputs = profile.financialInputs;

  const fields = [
    { label: "Income", value: summary.monthlyIncome ?? profile.monthlyIncome },
    { label: "Savings", value: summary.cashBalance ?? inputs?.currentSavings },
    { label: "Expenses", value: summary.monthlyExpenses ?? inputs?.monthlyExpenses },
    { label: "Debt", value: summary.totalDebt ?? inputs?.totalDebt },
    { label: "Net Worth", value: summary.netWorth },
  ].filter((f) => f.value != null);

  const healthScore = summary.financialHealthScore;
  const risk = inputs?.riskPreference ?? "moderate";

  return (
    <>
      <div className="space-y-8">
        <AppPageHeader
          title="Vault Profile"
          description="Your financial details in one place."
          action={
            <AppButton size="sm" onClick={() => setEditOpen(true)}>
              Edit Profile
            </AppButton>
          }
        />

        <div className="grid gap-6 lg:grid-cols-2">
          <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-sm">
            <h2 className="mb-6 font-bold text-app-text">Profile Overview</h2>
            <div className="mb-4 space-y-2 border-b border-app-border pb-4">
              <p className="font-semibold text-app-text">{profile.fullName}</p>
              <p className="text-sm text-app-muted">{profile.email}</p>
              {profile.phone && <p className="text-sm text-app-muted">{profile.phone}</p>}
            </div>
            <div className="space-y-4">
              {fields.map((f) => (
                <div
                  key={f.label}
                  className="flex items-center justify-between border-b border-app-border pb-4 last:border-0 last:pb-0"
                >
                  <span className="text-app-muted">{f.label}</span>
                  <span className="font-semibold text-app-text">{formatINR(f.value as number)}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-sm">
              <h2 className="mb-4 font-bold text-app-text">Risk Profile</h2>
              <Badge variant="warning" className="mb-3 capitalize">
                {risk}
              </Badge>
              <p className="text-sm leading-relaxed text-app-muted">
                Based on your answers. We use this to give you better advice.
              </p>
            </div>

            {healthScore != null && (
              <div className="bg-app-surface border border-app-border rounded-2xl p-6 shadow-sm">
                <h2 className="mb-4 font-bold text-app-text">Financial Health</h2>
                <div className="flex items-end gap-2">
                  <span className={`font-display text-5xl font-extrabold ${getHealthScoreTextColor(healthScore)}`}>
                    {typeof healthScore === "number" ? Number(healthScore.toFixed(2)) : healthScore}
                  </span>
                  <span className="mb-2 text-app-muted">/ 100</span>
                </div>
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-app-bg">
                  <div className={`h-full rounded-full ${getHealthScoreBgColor(healthScore)}`} style={{ width: `${healthScore}%` }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <EditProfileModal open={editOpen} onClose={() => setEditOpen(false)} data={data} />
    </>
  );
}
