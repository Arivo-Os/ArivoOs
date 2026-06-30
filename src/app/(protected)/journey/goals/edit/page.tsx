"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Trash2 } from "lucide-react";
import { AppButton } from "@/components/app/AppButton";
import { AppCard } from "@/components/app/AppCard";
import { AppPageHeader } from "@/components/app/AppPageHeader";
import { useGoals, useUpdateGoal, useDeleteGoal } from "@/features/app/hooks/use-app-data";
import { getApiErrorMessage } from "@/services/errors";
import { PageLoading } from "@/components/app/PageStates";

const goalTypes = [
  { value: "OTHER", label: "Custom goal" },
  { value: "EMERGENCY_FUND", label: "Emergency fund" },
  { value: "DEBT_PAYOFF", label: "Debt payoff" },
  { value: "INVESTING", label: "Investing" },
  { value: "HOUSE", label: "House" },
  { value: "CAR", label: "Car" },
  { value: "VACATION", label: "Vacation" },
  { value: "WEDDING", label: "Wedding" },
  { value: "EDUCATION", label: "Education" },
  { value: "LAPTOP", label: "Laptop" },
  { value: "PHONE", label: "Phone" },
  { value: "RETIREMENT", label: "Retirement" },
];

export default function EditGoalPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const goalId = searchParams.get("id");
  
  const { data: goals, isLoading: goalsLoading } = useGoals();
  const updateGoal = useUpdateGoal();
  const deleteGoal = useDeleteGoal();
  
  const [error, setError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const [form, setForm] = useState({
    goalName: "",
    goalType: "OTHER",
    targetAmount: "",
    currentAmount: "",
    targetDate: "",
    monthlyContribution: "",
  });

  useEffect(() => {
    if (goals) {
      const goal = goals.find(g => g.id === goalId);
      if (goal) {
        setForm({
          goalName: goal.goalName || "",
          goalType: goal.goalType || "OTHER",
          targetAmount: goal.targetAmount ? String(goal.targetAmount) : "",
          currentAmount: goal.currentAmount != null ? String(goal.currentAmount) : "",
          targetDate: goal.targetDate ? goal.targetDate.split('T')[0] : "",
          monthlyContribution: goal.monthlyContribution ? String(goal.monthlyContribution) : "",
        });
      } else {
        router.push("/journey/");
      }
    }
  }, [goals, goalId, router]);

  if (goalsLoading) return <PageLoading />;

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
      if (!goalId) throw new Error("No goal ID provided");
      await updateGoal.mutateAsync({
        id: goalId,
        payload: {
          goalName: form.goalName.trim(),
          goalType: form.goalType,
          targetAmount: Number(form.targetAmount),
          currentAmount: Number(form.currentAmount) || 0,
          targetDate: form.targetDate || undefined,
          monthlyContribution: Number(form.monthlyContribution) || undefined,
        }
      });
      router.push("/journey/");
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not update goal"));
    }
  };

  const handleDelete = async () => {
    if (!goalId || !window.confirm("Are you sure you want to delete this goal?")) return;
    setIsDeleting(true);
    try {
      await deleteGoal.mutateAsync(goalId);
      router.push("/journey/");
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not delete goal"));
      setIsDeleting(false);
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
        <AppPageHeader title="Edit goal" description="Update your target and tracking details." />
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

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <AppButton type="submit" className="flex-1" disabled={updateGoal.isPending || isDeleting}>
              {updateGoal.isPending ? "Saving..." : "Save changes"}
            </AppButton>
            <AppButton 
              type="button" 
              variant="danger" 
              className="sm:w-auto"
              onClick={handleDelete}
              disabled={updateGoal.isPending || isDeleting}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {isDeleting ? "Deleting..." : "Delete goal"}
            </AppButton>
          </div>
        </form>
      </AppCard>
    </div>
  );
}
