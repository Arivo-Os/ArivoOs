"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { AppButton } from "@/components/app/AppButton";
import { AppCard } from "@/components/app/AppCard";
import { AppPageHeader } from "@/components/app/AppPageHeader";
import { useCreateGoal } from "@/features/app/hooks/use-app-data";
import { getApiErrorMessage } from "@/lib/api/errors";

const goalTypes = [
  { value: "CUSTOM", label: "Custom goal" },
  { value: "EMERGENCY_FUND", label: "Emergency fund" },
  { value: "TRAVEL", label: "Travel" },
  { value: "HOME", label: "Home" },
  { value: "VEHICLE", label: "Vehicle" },
  { value: "RETIREMENT", label: "Retirement" },
];

export default function CreateGoalPage() {
  const router = useRouter();
  const createGoal = useCreateGoal();
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    goalName: "",
    goalType: "CUSTOM",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    monthlyContribution: "",
  });

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!form.goalName.trim()) {
      setError("Goal name is required");
      return;
    }
    if (!form.targetAmount || Number(form.targetAmount) <= 0) {
      setError("Enter a valid target amount");
      return;
    }

    try {
      await createGoal.mutateAsync({
        goalName: form.goalName.trim(),
        goalType: form.goalType,
        targetAmount: Number(form.targetAmount),
        currentAmount: Number(form.currentAmount) || 0,
        targetDate: form.targetDate || undefined,
        monthlyContribution: Number(form.monthlyContribution) || undefined,
      });
      router.push("/journey/");
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not create goal"));
    }
  };

  return (
    <div className="mx-auto max-w-xl space-y-8">
      <div>
        <Link
          href="/journey/"
          className="mb-4 inline-flex items-center gap-2 text-sm text-app-muted transition-colors hover:text-app-text"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Journey
        </Link>
        <AppPageHeader title="Create a goal" description="Set a target and track progress over time." />
      </div>

      <AppCard>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-app-text">Goal name</label>
            <input
              value={form.goalName}
              onChange={(e) => set("goalName")(e.target.value)}
              placeholder="e.g. Europe trip"
              className="h-11 w-full rounded-xl border border-app-border bg-app-bg px-3 text-sm text-app-text placeholder:text-app-muted focus:border-app-accent/50 focus:outline-none"
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-medium text-app-text">Goal type</label>
            <select
              value={form.goalType}
              onChange={(e) => set("goalType")(e.target.value)}
              className="h-11 w-full rounded-xl border border-app-border bg-app-bg px-3 text-sm text-app-text focus:border-app-accent/50 focus:outline-none"
            >
              {goalTypes.map((t) => (
                <option key={t.value} value={t.value}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-app-text">Target amount (₹)</label>
              <input
                type="number"
                value={form.targetAmount}
                onChange={(e) => set("targetAmount")(e.target.value)}
                placeholder="250000"
                className="h-11 w-full rounded-xl border border-app-border bg-app-bg px-3 text-sm text-app-text focus:border-app-accent/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-app-text">Saved so far (₹)</label>
              <input
                type="number"
                value={form.currentAmount}
                onChange={(e) => set("currentAmount")(e.target.value)}
                placeholder="0"
                className="h-11 w-full rounded-xl border border-app-border bg-app-bg px-3 text-sm text-app-text focus:border-app-accent/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-app-text">Target date</label>
              <input
                type="date"
                value={form.targetDate}
                onChange={(e) => set("targetDate")(e.target.value)}
                className="h-11 w-full rounded-xl border border-app-border bg-app-bg px-3 text-sm text-app-text focus:border-app-accent/50 focus:outline-none"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-app-text">Monthly contribution (₹)</label>
              <input
                type="number"
                value={form.monthlyContribution}
                onChange={(e) => set("monthlyContribution")(e.target.value)}
                placeholder="10000"
                className="h-11 w-full rounded-xl border border-app-border bg-app-bg px-3 text-sm text-app-text focus:border-app-accent/50 focus:outline-none"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-app-danger/30 bg-app-danger/10 px-4 py-3 text-sm text-app-danger">
              {error}
            </p>
          )}

          <AppButton type="submit" fullWidth disabled={createGoal.isPending}>
            {createGoal.isPending ? "Creating..." : "Create goal"}
          </AppButton>
        </form>
      </AppCard>
    </div>
  );
}
