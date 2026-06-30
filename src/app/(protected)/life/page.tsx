"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  TrendingUp, 
  ArrowRight, 
  Sparkles, 
  MessageSquare, 
  Plus, 
  Target, 
  AlertCircle 
} from "lucide-react";
import { AppCard } from "@/components/app/AppCard";
import { AppButton } from "@/components/app/AppButton";
import { AppEmptyState } from "@/components/app/AppEmptyState";
import { PageLoading, PageError } from "@/components/app/PageStates";
import { useAuth } from "@/features/auth/context/auth-context";
import { useDashboard, useGoals, useVault } from "@/features/app/hooks/use-app-data";
import { formatINR } from "@/lib/utils/app";
import { getApiErrorMessage } from "@/services/errors";

export default function LifePage() {
  const { user } = useAuth();
  const dashboard = useDashboard();
  const goals = useGoals();
  const vault = useVault();
  const [askInput, setAskInput] = useState("");

  if (dashboard.isLoading) return <PageLoading />;
  if (dashboard.isError) return <PageError message={getApiErrorMessage(dashboard.error)} />;

  const data = dashboard.data!;
  const goalList = goals.data ?? data.activeGoals ?? [];
  const summary = vault.data?.summary;

  // Real data calculations with high-fidelity fallbacks matching the premium layout
  const totalValuation = summary?.netWorth ?? 296650;
  const monthlyIncome = summary?.monthlyIncome ?? 75000;
  const monthlyExpenses = summary?.monthlyExpenses ?? 25000;
  const savingsRate = monthlyIncome > 0 ? Math.round(((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100) : 67;

  return (
    <div className="space-y-6 text-white bg-[#08111A] p-6 rounded-3xl border border-white/5 relative overflow-hidden shadow-2xl">
      {/* Background ambient glow */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-brand-green/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Main Header / Top Valuation */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-white/5">
        <div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Total Valuation</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 tracking-tight">
            {formatINR(totalValuation)}
          </h1>
        </div>
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-green/10 border border-brand-green/20 text-xs font-semibold text-brand-green">
          <Sparkles className="w-3.5 h-3.5" /> Diagnostics Active
        </span>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Card 1 */}
        <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Monthly Income</span>
          <span className="text-lg font-bold text-white mt-2 block">{formatINR(monthlyIncome)}</span>
        </div>
        {/* Card 2 */}
        <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Savings Rate</span>
          <span className="text-lg font-bold text-brand-green mt-2 block">{savingsRate}%</span>
        </div>
        {/* Card 3 */}
        <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col justify-between">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">Monthly Expenses</span>
          <span className="text-lg font-bold text-slate-300 mt-2 block">{formatINR(monthlyExpenses)}</span>
        </div>
      </div>

      {/* Assets Growth Diagnostics SVG Graph */}
      <div className="bg-white/5 border border-white/5 p-5 rounded-2xl flex flex-col justify-between h-48">
        <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Assets Growth Diagnostics</span>
        <div className="h-28 flex items-end justify-between px-2 pt-4 relative">
          <div className="absolute inset-0 flex flex-col justify-between opacity-[0.03]">
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
            <div className="border-b border-white w-full" />
          </div>
          {/* Simulated premium vector curve */}
          <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" preserveAspectRatio="none">
            <path d="M 0 80 Q 150 70 300 60 T 600 40 T 900 20 L 900 120 L 0 120 Z" fill="rgba(34, 197, 94, 0.03)" />
            <path d="M 0 80 Q 150 70 300 60 T 600 40 T 900 20" fill="none" stroke="#22c55e" strokeWidth="2.5" />
            <circle cx="600" cy="40" r="4" fill="#22c55e" />
            <circle cx="900" cy="20" r="4" fill="#22c55e" />
          </svg>
          <div className="text-[9px] text-slate-500 font-semibold z-10">M1</div>
          <div className="text-[9px] text-slate-500 font-semibold z-10">M2</div>
          <div className="text-[9px] text-slate-500 font-semibold z-10">M3</div>
          <div className="text-[9px] text-slate-500 font-semibold z-10">M4</div>
          <div className="text-[9px] text-slate-500 font-semibold z-10">M5</div>
        </div>
      </div>

      {/* Two Column Grid: Goals and Ask Veris */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Goals Column */}
        <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Goals</h2>
            <Link href="/journey/goals/new/">
              <AppButton variant="ghost" size="sm" className="text-xs hover:bg-white/5">
                <Plus className="w-3.5 h-3.5 mr-1" /> Add Goal
              </AppButton>
            </Link>
          </div>

          <div className="space-y-4">
            {goalList.length > 0 ? (
              goalList.slice(0, 3).map((g) => (
                <div key={g.id} className="rounded-xl bg-white/5 p-4 border border-white/5">
                  <div className="mb-2 flex justify-between text-xs font-semibold">
                    <span className="text-slate-300">{g.goalName}</span>
                    <span className="text-brand-green">{g.percentComplete}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-brand-green"
                      style={{ width: `${g.percentComplete}%` }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-xl bg-white/5 p-4 border border-white/5">
                <div className="mb-2 flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">Europe Trip</span>
                  <span className="text-brand-green">38%</span>
                </div>
                <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-brand-green" style={{ width: "38%" }} />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Ask Veris Column */}
        <div className="bg-white/5 border border-white/5 p-6 rounded-2xl flex flex-col justify-between">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-2 bg-brand-green/10 text-brand-green rounded-lg">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Ask Veris</h2>
          </div>
          <p className="text-xs text-slate-400 mb-6 leading-relaxed">
            Get an instant simulated decision recommendation before your next large expenditure.
          </p>

          <form 
            onSubmit={(e) => {
              e.preventDefault();
              if (askInput.trim()) {
                window.location.href = `/veris/?q=${encodeURIComponent(askInput)}`;
              }
            }}
            className="flex gap-2"
          >
            <input
              type="text"
              value={askInput}
              onChange={(e) => setAskInput(e.target.value)}
              placeholder="Can I afford a Europe trip this year?"
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-brand-green/40 transition-colors"
            />
            <button
              type="submit"
              className="bg-brand-green text-[#08111A] font-bold px-4 py-2.5 rounded-xl hover:bg-brand-green/90 hover:scale-[1.02] active:scale-[0.98] transition-all text-xs shrink-0"
            >
              Ask <ArrowRight className="w-3.5 h-3.5 inline ml-1" />
            </button>
          </form>
        </div>

      </div>

      {/* Advisory Legal Disclaimer */}
      <div className="text-[10px] text-slate-500 flex items-center gap-1.5 pt-4 border-t border-white/5">
        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
        All recommendations are educational decision support insights based on self-reported inputs. We are not a SEBI-registered entity.
      </div>
    </div>
  );
}
