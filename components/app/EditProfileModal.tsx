"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import type { VaultData } from "@/lib/api/vault.service";
import type { UpdateFinancialInputsPayload } from "@/lib/api/types/api";
import { AppButton } from "@/components/app/AppButton";
import { AppInput } from "@/components/app/AppInput";
import { useUpdateFinancialProfile } from "@/features/app/hooks/use-app-data";
import { getApiErrorMessage } from "@/lib/api/errors";

interface EditProfileModalProps {
  open: boolean;
  onClose: () => void;
  data: VaultData;
}

export function EditProfileModal({ open, onClose, data }: EditProfileModalProps) {
  const { profile, summary } = data;
  const inputs = profile.financialInputs;
  const update = useUpdateFinancialProfile();

  const [form, setForm] = useState({
    fullName: profile.fullName ?? "",
    monthlyIncome: String(summary.monthlyIncome ?? profile.monthlyIncome ?? ""),
    monthlyExpenses: String(summary.monthlyExpenses ?? inputs?.monthlyExpenses ?? ""),
    currentSavings: String(summary.cashBalance ?? inputs?.currentSavings ?? ""),
    totalDebt: String(summary.totalDebt ?? inputs?.totalDebt ?? ""),
    monthlyDebtPayment: String(inputs?.monthlyDebtPayment ?? ""),
    riskPreference: inputs?.riskPreference ?? "moderate",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) return;
    setForm({
      fullName: profile.fullName ?? "",
      monthlyIncome: String(summary.monthlyIncome ?? profile.monthlyIncome ?? ""),
      monthlyExpenses: String(summary.monthlyExpenses ?? inputs?.monthlyExpenses ?? ""),
      currentSavings: String(summary.cashBalance ?? inputs?.currentSavings ?? ""),
      totalDebt: String(summary.totalDebt ?? inputs?.totalDebt ?? ""),
      monthlyDebtPayment: String(inputs?.monthlyDebtPayment ?? ""),
      riskPreference: inputs?.riskPreference ?? "moderate",
    });
    setError("");
  }, [open, profile, summary, inputs]);

  if (!open) return null;

  const set = (key: keyof typeof form) => (value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const payload: UpdateFinancialInputsPayload = {
      fullName: form.fullName.trim(),
      monthlyIncome: Number(form.monthlyIncome) || undefined,
      monthlyExpenses: Number(form.monthlyExpenses) || undefined,
      currentSavings: Number(form.currentSavings) || undefined,
      totalDebt: Number(form.totalDebt) || undefined,
      monthlyDebtPayment: Number(form.monthlyDebtPayment) || undefined,
      riskPreference: form.riskPreference,
    };

    try {
      await update.mutateAsync(payload);
      onClose();
    } catch (err) {
      setError(getApiErrorMessage(err, "Could not update profile"));
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/60 p-4 backdrop-blur-sm sm:items-center">
      <div className="absolute inset-0" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="edit-profile-title"
        className="relative max-h-[90vh] w-full max-w-lg animate-fade-in overflow-y-auto rounded-3xl border border-app-border bg-app-card p-6 shadow-app-lg"
      >
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 id="edit-profile-title" className="font-display text-xl font-bold text-app-text">
              Edit Profile
            </h2>
            <p className="mt-1 text-sm text-app-muted">Update your financial inputs for Veris.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-app-border text-app-muted transition-colors hover:text-app-text"
            aria-label="Close"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-4">
          <AppInput label="Full name" value={form.fullName} onChange={(e) => set("fullName")(e.target.value)} />
          <div className="grid gap-4 sm:grid-cols-2">
            <AppInput
              label="Monthly income (₹)"
              type="number"
              value={form.monthlyIncome}
              onChange={(e) => set("monthlyIncome")(e.target.value)}
            />
            <AppInput
              label="Monthly expenses (₹)"
              type="number"
              value={form.monthlyExpenses}
              onChange={(e) => set("monthlyExpenses")(e.target.value)}
            />
            <AppInput
              label="Current savings (₹)"
              type="number"
              value={form.currentSavings}
              onChange={(e) => set("currentSavings")(e.target.value)}
            />
            <AppInput
              label="Total debt (₹)"
              type="number"
              value={form.totalDebt}
              onChange={(e) => set("totalDebt")(e.target.value)}
            />
            <AppInput
              label="Monthly debt payment (₹)"
              type="number"
              value={form.monthlyDebtPayment}
              onChange={(e) => set("monthlyDebtPayment")(e.target.value)}
            />
            <div>
              <label className="mb-2 block text-sm font-medium text-app-text">Risk preference</label>
              <select
                value={form.riskPreference}
                onChange={(e) => set("riskPreference")(e.target.value)}
                className="h-11 w-full rounded-xl border border-app-border bg-app-bg px-3 text-sm text-app-text focus:border-app-accent/50 focus:outline-none focus:ring-2 focus:ring-app-accent/20"
              >
                <option value="low">Low</option>
                <option value="moderate">Moderate</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>

          {error && (
            <p className="rounded-xl border border-app-danger/30 bg-app-danger/10 px-4 py-3 text-sm text-app-danger">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <AppButton type="button" variant="secondary" fullWidth onClick={onClose}>
              Cancel
            </AppButton>
            <AppButton type="submit" fullWidth disabled={update.isPending}>
              {update.isPending ? "Saving..." : "Save changes"}
            </AppButton>
          </div>
        </form>
      </div>
    </div>
  );
}
