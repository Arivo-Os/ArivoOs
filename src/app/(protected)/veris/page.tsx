"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { AppCard } from "@/components/app/AppCard";
import { AiCreditsBar } from "@/components/app/AiCreditsBar";
import { VerisAnalysisCard } from "@/components/app/VerisAnalysisCard";
import { VerisConversationHistory } from "@/components/app/VerisConversationHistory";
import { VerisQuickPrompts } from "@/components/app/VerisQuickPrompts";
import { PageError, PageLoading } from "@/components/app/PageStates";
import { Badge } from "@/components/ui/badge";
import { sendVerisChat, getQuickInsights, type QuickInsight } from "@/services/chat.service";
import { deleteConversation } from "@/services/conversations.service";
import { getApiErrorMessage } from "@/services/errors";
import { useSidebar } from "@/components/app/SidebarContext";
import type { InputRequest, VerisDecision } from "@/services/types/api";
import { consumeFlowQuestion } from "@/lib/onboarding/flow-questions";
import {
  buildAnalysisFromDecision,
  buildAnalysisFromResponse,
  parseAiCredits,
  type AiCredits,
} from "@/lib/veris/parse-analysis";
import { useVerisConversation, useVerisConversations } from "@/features/app/hooks/use-app-data";
import { cn } from "@/lib/utils";
import { AlertTriangle } from "lucide-react";

import type { VerisAnalysisPayload } from "@/lib/veris/parse-analysis";

interface UiMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  analysis?: VerisAnalysisPayload | null;
}

function StructuredMessage({ content }: { content: string }) {
  const isVerdict = content.includes("Current Situation") && content.includes("Recommendation");
  const isCushion = content.includes("Safety Cushion Timeline");
  const isSavings = content.includes("Savings Plan");
  const isCalculationReport = content.includes("Summary") && content.includes("Breakdown") && content.includes("Calculation");

  if (!isVerdict && !isCushion && !isSavings && !isCalculationReport) {
    return (
      <div className="rounded-2xl rounded-bl-sm border border-app-border bg-app-bg px-4 py-3 text-sm leading-relaxed text-app-text whitespace-pre-line">
        {content}
      </div>
    );
  }

  // Parse helper
  const parseAmount = (label: string, text: string) => {
    const regex = new RegExp(`${label}:\\s*(₹?[\\d,]+)`, 'i');
    const match = text.match(regex);
    return match ? match[1] : null;
  };

  // --- RENDER 1: VERDICT REPORT ---
  if (isVerdict) {
    const idxCurrent = content.indexOf("Current Situation");
    const idxCalculation = content.indexOf("Calculation");
    const idxImpact = content.indexOf("Impact Analysis");
    const idxRisks = content.indexOf("Risks");
    const idxRec = content.indexOf("Recommendation");

    let currentSec = "";
    let calcSec = "";
    let impactSec = "";
    let risksSec = "";
    let recSec = "";

    if (idxCurrent !== -1) {
      const end = idxCalculation !== -1 ? idxCalculation : content.length;
      currentSec = content.slice(idxCurrent + "Current Situation".length, end).trim();
    }
    if (idxCalculation !== -1) {
      const end = idxImpact !== -1 ? idxImpact : content.length;
      calcSec = content.slice(idxCalculation + "Calculation".length, end).trim();
    }
    if (idxImpact !== -1) {
      const end = idxRisks !== -1 ? idxRisks : content.length;
      impactSec = content.slice(idxImpact + "Impact Analysis".length, end).trim();
    }
    if (idxRisks !== -1) {
      const end = idxRec !== -1 ? idxRec : content.length;
      risksSec = content.slice(idxRisks + "Risks".length, end).trim();
    }
    if (idxRec !== -1) {
      recSec = content.slice(idxRec + "Recommendation".length).trim();
    }

    const cashAvailable = parseAmount("Cash available", currentSec);
    const billsDue = parseAmount("Bills due", currentSec);
    const monthlyEmi = parseAmount("Monthly EMI", currentSec);
    const cashAfterBills = parseAmount("Cash after bills", currentSec);

    const purchaseAmount = parseAmount("Purchase amount", calcSec);
    let formula = "";
    let equation = "";
    if (calcSec) {
      const cleanCalc = calcSec.replace(/Purchase amount:\s*₹?[\d,]+/i, "").trim();
      const eqIndex = cleanCalc.search(/₹?[\d,]+/);
      if (eqIndex !== -1) {
        formula = cleanCalc.slice(0, eqIndex).trim();
        equation = cleanCalc.slice(eqIndex).trim();
      } else {
        formula = cleanCalc;
      }
    }

    const isDoNotProceed = recSec.toLowerCase().includes("do not proceed") || recSec.toLowerCase().includes("avoid") || recSec.toLowerCase().includes("wait") || recSec.toLowerCase().includes("reconsider");

    return (
      <div className="rounded-2xl border border-app-border bg-app-card overflow-hidden shadow-app-lg max-w-xl w-full">
        <div className={cn(
          "px-5 py-4 border-b border-app-border flex items-center gap-3 font-semibold border-l-4",
          isDoNotProceed 
            ? "bg-gradient-to-r from-red-500/10 to-transparent text-red-600 dark:text-red-400 border-l-red-500 border-b-app-border" 
            : "bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-600 dark:text-emerald-400 border-l-emerald-500 border-b-app-border"
        )}>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 shrink-0">
            {isDoNotProceed ? (
              <svg className="h-4.5 w-4.5 text-red-500 dark:text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5 text-emerald-550 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </span>
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-75 block font-bold">Recommendation</span>
            <span className="text-sm font-bold">{recSec || (isDoNotProceed ? "Do not proceed" : "Proceed")}</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Current Situation Grid */}
          <div>
            <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-2.5">Financial Snapshot</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-app-surface hover:bg-app-card-hover p-3 border border-app-border transition-colors">
                <span className="text-[10px] text-app-muted block font-medium">Cash Available</span>
                <strong className="text-sm text-app-text font-mono font-semibold block mt-1">{cashAvailable || "—"}</strong>
              </div>
              <div className="rounded-xl bg-app-surface hover:bg-app-card-hover p-3 border border-app-border transition-colors">
                <span className="text-[10px] text-app-muted block font-medium">Bills Due</span>
                <strong className="text-sm text-app-text font-mono font-semibold block mt-1">{billsDue || "—"}</strong>
              </div>
              <div className="rounded-xl bg-app-surface hover:bg-app-card-hover p-3 border border-app-border transition-colors">
                <span className="text-[10px] text-app-muted block font-medium">Monthly EMI</span>
                <strong className="text-sm text-app-text font-mono font-semibold block mt-1">{monthlyEmi || "—"}</strong>
              </div>
              <div className="rounded-xl bg-app-surface hover:bg-app-card-hover p-3 border border-app-border transition-colors">
                <span className="text-[10px] text-app-muted block font-medium">Cash After Bills</span>
                <strong className="text-sm text-app-text font-mono font-semibold block mt-1">{cashAfterBills || "—"}</strong>
              </div>
            </div>
          </div>

          {calcSec && (
            <div className="rounded-xl bg-app-surface p-4 border border-app-border space-y-3">
              <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider">Can You Afford This?</h4>
              {formula && <p className="text-xs text-app-muted italic leading-relaxed">{formula}</p>}
              {equation && (
                <div className="font-mono text-xs bg-black/40 px-3 py-2 rounded-lg border border-white/[0.04] text-center text-emerald-400 font-semibold tracking-tight">
                  {equation}
                </div>
              )}
              {purchaseAmount && (
                <div className="flex justify-between items-center pt-2 border-t border-app-border">
                  <span className="text-xs text-app-muted">Purchase Amount</span>
                  <span className="text-sm font-bold text-app-text font-mono">{purchaseAmount}</span>
                </div>
              )}
            </div>
          )}

          {/* Impact Analysis & Risks */}
          {(impactSec || risksSec) && (
            <div className="space-y-4 pt-4 border-t border-app-border">
              {impactSec && (
                <div className="border-l-2 border-app-border-strong pl-3">
                  <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-1">What This Means For You</h4>
                  <p className="text-app-text text-xs leading-relaxed">{impactSec}</p>
                </div>
              )}
              {risksSec && (
                <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-3">
                  <h4 className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider mb-1">Things to Watch Out For</h4>
                  <p className="text-red-700 dark:text-red-300/90 text-xs leading-relaxed">{risksSec}</p>
                </div>
              )}
            </div>
          )}

          <div className="rounded-xl border border-app-border bg-app-surface p-3 text-[10px] leading-relaxed text-app-muted mt-4 flex items-start gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span><strong>Disclaimer:</strong> Arivo is currently in Beta and may occasionally generate inaccurate or incomplete information. Always verify important financial decisions with a qualified financial advisor. Arivo is not a SEBI-registered investment advisor and does not provide investment advice.</span>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER 2: SAFETY CUSHION TIMELINE ---
  if (isCushion) {
    const idxMilestones = content.indexOf("Milestones:");
    const idxPrior = content.indexOf("Based on your prior");

    let timelineHeader = "";
    let milestonesSec = "";
    let priorSec = "";

    const idxSafetyCushion = content.indexOf("Safety Cushion Timeline");
    if (idxSafetyCushion !== -1) {
      const end = idxMilestones !== -1 ? idxMilestones : (idxPrior !== -1 ? idxPrior : content.length);
      timelineHeader = content.slice(idxSafetyCushion + "Safety Cushion Timeline".length, end).trim();
    }
    if (idxMilestones !== -1) {
      const end = idxPrior !== -1 ? idxPrior : content.length;
      milestonesSec = content.slice(idxMilestones + "Milestones:".length, end).trim();
    }
    if (idxPrior !== -1) {
      priorSec = content.slice(idxPrior).trim();
    }

    const targetFund = timelineHeader.match(/Target emergency fund:\s*(₹?[\d,]+\s*(?:\([^\)]+\))?)/i)?.[1] || "—";
    const currentFund = timelineHeader.match(/Current emergency fund:\s*(₹?[\d,]+\s*(?:\([^\)]+\))?)/i)?.[1] || "—";
    const monthlySavings = timelineHeader.match(/Monthly savings capacity:\s*(₹?[\d,]+)/i)?.[1] || "—";
    const timeToCushion = timelineHeader.match(/Estimated time to full cushion:\s*([^\n\r]*)/i)?.[1] || "—";

    const milestoneLines = milestonesSec.split("\n").map(l => l.trim()).filter(l => l.startsWith("-"));
    const milestones = milestoneLines.map(line => {
      const match = line.match(/^-\s*(\d+%)\s*\((₹?[\d,]+)\):\s*(.*)$/);
      if (match) {
        return { percent: match[1], amount: match[2], duration: match[3] };
      }
      return null;
    }).filter((m): m is { percent: string; amount: string; duration: string } => m !== null);

    return (
      <div className="rounded-2xl border border-app-border bg-app-card overflow-hidden shadow-app-lg max-w-xl w-full">
        {/* Banner */}
        <div className="px-5 py-4 border-b border-app-border flex items-center gap-3 font-semibold border-l-4 bg-gradient-to-r from-blue-500/10 to-transparent text-blue-600 dark:text-blue-400 border-l-blue-500">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 shrink-0">
            <svg className="h-4.5 w-4.5 text-blue-600 dark:text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </span>
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-75 block font-bold">Timeline Report</span>
            <span className="text-sm font-bold">Safety Cushion Timeline</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Snapshot Grid */}
          <div>
            <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-2.5">Snapshot</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-app-surface p-3 border border-app-border">
                <span className="text-[10px] text-app-muted block font-medium">Target Emergency Fund</span>
                <strong className="text-xs text-app-text font-mono font-semibold block mt-1">{targetFund}</strong>
              </div>
              <div className="rounded-xl bg-app-surface p-3 border border-app-border">
                <span className="text-[10px] text-app-muted block font-medium">Current Emergency Fund</span>
                <strong className="text-xs text-app-text font-mono font-semibold block mt-1">{currentFund}</strong>
              </div>
              <div className="rounded-xl bg-app-surface p-3 border border-app-border">
                <span className="text-[10px] text-app-muted block font-medium">Monthly Savings Cap.</span>
                <strong className="text-sm text-app-text font-mono font-semibold block mt-1">{monthlySavings}</strong>
              </div>
              <div className="rounded-xl bg-app-surface p-3 border border-app-border">
                <span className="text-[10px] text-app-muted block font-medium">Time to Full Cushion</span>
                <strong className="text-sm text-app-success font-mono font-bold block mt-1">{timeToCushion}</strong>
              </div>
            </div>
          </div>

          {/* Milestones timeline list */}
          {milestones.length > 0 && (
            <div className="rounded-xl bg-app-surface p-4 border border-app-border space-y-4">
              <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider">Milestones progress</h4>
              <div className="relative pl-6 border-l border-app-border space-y-4 ml-1">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-app-card border-2 border-blue-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    </span>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <span className="text-sm font-bold text-app-text font-mono">{m.percent}</span>
                        <span className="text-xs text-app-muted ml-2">({m.amount})</span>
                      </div>
                      <span className="text-xs text-app-success font-mono font-semibold">{m.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {priorSec && (
            <p className="text-[10px] text-app-muted italic border-t border-app-border pt-3 leading-relaxed">
              {priorSec}
            </p>
          )}
        </div>
      </div>
    );
  }

  // --- RENDER 3: SAVINGS PLAN ---
  if (isSavings) {
    const idxPriorSavings = content.indexOf("Based on your prior");
    let savingsBody = "";
    let priorSavingsSec = "";

    const idxSavingsPlan = content.indexOf("Savings Plan");
    if (idxSavingsPlan !== -1) {
      const end = idxPriorSavings !== -1 ? idxPriorSavings : content.length;
      savingsBody = content.slice(idxSavingsPlan + "Savings Plan".length, end).trim();
    }
    if (idxPriorSavings !== -1) {
      priorSavingsSec = content.slice(idxPriorSavings).trim();
    }

    const emergencyGap = savingsBody.match(/Emergency fund gap:\s*(₹?[\d,]+)/i)?.[1] || "—";
    const downPayment = savingsBody.match(/Additional down payment needed:\s*(₹?[\d,]+)/i)?.[1] || "—";
    const combinedGoal = savingsBody.match(/Combined savings goal:\s*(₹?[\d,]+)/i)?.[1] || "—";
    const suggestedSavings = savingsBody.match(/Suggested monthly savings:\s*([^\n\r]*)/i)?.[1] || "—";

    return (
      <div className="rounded-2xl border border-app-border bg-app-card overflow-hidden shadow-app-lg max-w-xl w-full">
        {/* Banner */}
        <div className="px-5 py-4 border-b border-app-border flex items-center gap-3 font-semibold border-l-4 bg-gradient-to-r from-purple-500/10 to-transparent text-purple-600 dark:text-purple-400 border-l-purple-500">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 shrink-0">
            <svg className="h-4.5 w-4.5 text-purple-600 dark:text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </span>
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-75 block font-bold">Goal Targets</span>
            <span className="text-sm font-bold">Savings Plan</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Grid */}
          <div>
            <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-2.5">Snapshot</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <div className="rounded-xl bg-app-surface p-2.5 border border-app-border text-center">
                <span className="text-[9px] text-app-muted block font-medium">Emergency Gap</span>
                <strong className="text-xs text-app-text font-mono font-semibold block mt-1">{emergencyGap}</strong>
              </div>
              <div className="rounded-xl bg-app-surface p-2.5 border border-app-border text-center">
                <span className="text-[9px] text-app-muted block font-medium">Add. Down Payment</span>
                <strong className="text-xs text-app-text font-mono font-semibold block mt-1">{downPayment}</strong>
              </div>
              <div className="rounded-xl bg-app-surface p-2.5 border border-app-border text-center">
                <span className="text-[9px] text-app-muted block font-medium">Combined Goal</span>
                <strong className="text-xs text-app-text font-mono font-semibold block mt-1">{combinedGoal}</strong>
              </div>
            </div>
          </div>

          <div className="rounded-xl bg-app-surface p-4 border border-app-border space-y-2 text-center">
            <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider">Suggested monthly savings</h4>
            <div className="text-lg font-bold text-app-success font-mono tracking-tight">
              {suggestedSavings}
            </div>
          </div>

          {priorSavingsSec && (
            <p className="text-[10px] text-app-muted italic border-t border-app-border pt-3 leading-relaxed">
              {priorSavingsSec}
            </p>
          )}
        </div>
      </div>
    );
  }

  // --- RENDER 4: CALCULATION / SAVINGS RATE REPORT ---
  if (isCalculationReport) {
    const idxSummary = content.indexOf("Summary");
    const idxBreakdown = content.indexOf("Breakdown");
    const idxCalculation = content.indexOf("Calculation");

    let summarySec = "";
    let breakdownSec = "";
    let calcSec = "";

    if (idxSummary !== -1) {
      const end = idxBreakdown !== -1 ? idxBreakdown : content.length;
      summarySec = content.slice(idxSummary + "Summary".length, end).trim();
    }
    if (idxBreakdown !== -1) {
      const end = idxCalculation !== -1 ? idxCalculation : content.length;
      breakdownSec = content.slice(idxBreakdown + "Breakdown".length, end).trim();
    }
    if (idxCalculation !== -1) {
      calcSec = content.slice(idxCalculation + "Calculation".length).trim();
    }

    const cashAvailable = parseAmount("Cash available", summarySec) || parseAmount("Bank cash", breakdownSec) || "—";
    const monthlyIncome = parseAmount("Monthly income", summarySec) || parseAmount("Income", breakdownSec) || "—";
    const monthlyExpenses = parseAmount("Monthly expenses", summarySec) || parseAmount("Expenses", breakdownSec) || "—";
    
    // Parse savings rate (can be e.g. "33.3%")
    const savingsRateRegex = /Savings rate:\s*([\d\.]+%?)/i;
    const savingsRateMatch = summarySec.match(savingsRateRegex);
    const savingsRate = savingsRateMatch ? savingsRateMatch[1] : "—";

    const formulaLines = calcSec.split("\n").map(l => l.trim()).filter(Boolean);
    const formula = formulaLines[0] || "";
    const equation = formulaLines[1] || "";

    return (
      <div className="rounded-2xl border border-app-border bg-app-card overflow-hidden shadow-app-lg max-w-xl w-full">
        {/* Banner */}
        <div className="px-5 py-4 border-b border-app-border flex items-center gap-3 font-semibold border-l-4 bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-600 dark:text-emerald-400 border-l-emerald-500">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 shrink-0">
            <svg className="h-4.5 w-4.5 text-emerald-600 dark:text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </span>
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-75 block font-bold">Calculation Report</span>
            <span className="text-sm font-bold">Savings & Affordability Analysis</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Snapshot Grid */}
          <div>
            <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-2.5">Financial Summary</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-app-surface p-3 border border-app-border">
                <span className="text-[10px] text-app-muted block font-medium">Monthly Income</span>
                <strong className="text-sm text-app-text font-mono font-semibold block mt-1">{monthlyIncome}</strong>
              </div>
              <div className="rounded-xl bg-app-surface p-3 border border-app-border">
                <span className="text-[10px] text-app-muted block font-medium">Monthly Expenses</span>
                <strong className="text-sm text-app-text font-mono font-semibold block mt-1">{monthlyExpenses}</strong>
              </div>
              <div className="rounded-xl bg-app-surface p-3 border border-app-border">
                <span className="text-[10px] text-app-muted block font-medium">Cash Available</span>
                <strong className="text-sm text-app-text font-mono font-semibold block mt-1">{cashAvailable}</strong>
              </div>
              <div className="rounded-xl bg-app-surface p-3 border border-app-border">
                <span className="text-[10px] text-app-muted block font-medium">Savings Rate</span>
                <strong className="text-sm text-app-success font-mono font-bold block mt-1">{savingsRate}</strong>
              </div>
            </div>
          </div>

          {calcSec && (
            <div className="rounded-xl bg-app-surface p-4 border border-app-border space-y-3">
              <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider">Formula & Calculation</h4>
              {formula && <p className="text-xs text-app-muted italic leading-relaxed">{formula}</p>}
              {equation && (
                <div className="font-mono text-xs bg-app-bg px-3 py-2 rounded-lg border border-app-border text-center text-app-success font-semibold tracking-tight">
                  {equation}
                </div>
              )}
            </div>
          )}

          <div className="rounded-xl border border-app-border bg-app-surface p-3 text-[10px] leading-relaxed text-app-muted mt-4 flex items-start gap-1.5">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
            <span><strong>Disclaimer:</strong> Arivo is currently in Beta and may occasionally generate inaccurate or incomplete information. Always verify important financial decisions with a qualified financial advisor. Arivo is not a SEBI-registered investment advisor and does not provide investment advice.</span>
          </div>
        </div>
      </div>
    );
  }
}

const WORKFLOW_LABELS = [
  "Loading your financial profile",
  "Checking affordability",
  "Evaluating financial health",
  "Reviewing goals and targets",
  "Preparing your recommendation",
];

export default function VerisPage() {
  const queryClient = useQueryClient();
  const {
    conversations,
    setConversations,
    activeSessionId,
    setActiveSessionId,
    setLoadingHistory,
    setOnNewChat,
    setOnDeleteConversation,
  } = useSidebar();

  const conversationsQuery = useVerisConversations();
  const conversationQuery = useVerisConversation(activeSessionId ?? null);

  const [messages, setMessages] = useState<UiMessage[]>([]);
  const [conversationId, setConversationId] = useState<string>();
  const [decision, setDecision] = useState<VerisDecision | null>(null);
  const [inputRequest, setInputRequest] = useState<InputRequest | null>(null);
  const [suggestionPills, setSuggestionPills] = useState<string[]>([]);
  const [pillKeys, setPillKeys] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [workflowStep, setWorkflowStep] = useState(-1);
  const [error, setError] = useState("");
  const [aiCredits, setAiCredits] = useState<AiCredits | null>(null);
  const [quickInsights, setQuickInsights] = useState<QuickInsight[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const initialQuestionSent = useRef(false);
  const hydratedSession = useRef<string | null>(null);

  const startNewChat = useCallback(() => {
    hydratedSession.current = null;
    setActiveSessionId(undefined);
    setConversationId(undefined);
    setMessages([]);
    setDecision(null);
    setInputRequest(null);
    setSuggestionPills([]);
    setPillKeys([]);
    setInput("");
    setError("");
  }, [setActiveSessionId]);

  const handleDeleteConversation = useCallback(async (sessionId: string) => {
    try {
      // Optimistic UI update: instantly remove from the sidebar
      setConversations(conversations.filter((c) => c.sessionId !== sessionId));

      if (sessionId === activeSessionId || sessionId === conversationId) {
        startNewChat();
      }

      await deleteConversation(sessionId);
      void queryClient.invalidateQueries({ queryKey: ["veris-conversations"] });
    } catch (e) {
      setError("Failed to delete conversation");
    }
  }, [activeSessionId, conversationId, queryClient, startNewChat, setConversations, conversations]);

  const queryConversations = conversationsQuery.data;

  useEffect(() => {
    setConversations(queryConversations ?? []);
  }, [queryConversations, setConversations]);

  useEffect(() => {
    setLoadingHistory(conversationsQuery.isLoading || conversationsQuery.isFetching);
  }, [conversationsQuery.isLoading, conversationsQuery.isFetching, setLoadingHistory]);

  useEffect(() => {
    setOnNewChat(() => startNewChat);
    setOnDeleteConversation(() => handleDeleteConversation);
    return () => {
      setOnNewChat(null);
      setOnDeleteConversation(null);
    };
  }, [startNewChat, handleDeleteConversation, setOnNewChat, setOnDeleteConversation]);

  useEffect(() => {
    getQuickInsights()
      .then(setQuickInsights)
      .catch(() => {});
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, workflowStep, decision]);

  useEffect(() => {
    if (!activeSessionId || !conversationQuery.data) return;
    if (hydratedSession.current === activeSessionId) return;

    const stored = conversationQuery.data;
    hydratedSession.current = activeSessionId;
    setConversationId(stored.sessionId);
    setMessages(
      stored.messages.map((m, i) => ({
        id: `${stored.sessionId}-${i}`,
        role: m.role,
        content: m.content,
        analysis: m.decision ? buildAnalysisFromDecision(m.decision) : null,
      }))
    );
    const lastDecision = [...stored.messages].reverse().find((m) => m.decision)?.decision ?? null;
    setDecision(lastDecision);
    setInputRequest(null);
    setSuggestionPills([]);
    setPillKeys([]);
    setError("");
  }, [activeSessionId, conversationQuery.data]);

  const runWorkflowAnimation = () => {
    setWorkflowStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step += 1;
      if (step >= WORKFLOW_LABELS.length) {
        clearInterval(interval);
        setWorkflowStep(-1);
        return;
      }
      setWorkflowStep(step);
    }, 700);
    return () => clearInterval(interval);
  };

  const sendMessage = async (text: string, suggestedQuestionKey?: string) => {
    if ((!text.trim() && !suggestedQuestionKey) || loading) return;

    const userText = text.trim();
    if (userText) {
      setMessages((m) => [...m, { id: String(Date.now()), role: "user", content: userText }]);
    }
    setInput("");
    setError("");
    setLoading(true);
    const cleanup = runWorkflowAnimation();

    const history = [
      ...messages.map((m) => ({ role: m.role, content: m.content })),
      ...(userText ? [{ role: "user" as const, content: userText }] : []),
    ];

    try {
      const res = await sendVerisChat({
        message: userText || undefined,
        suggestedQuestionKey,
        conversationId,
        messages: history,
      });

      const nextId = res.conversationId;
      setConversationId(nextId);
      setActiveSessionId(nextId);
      hydratedSession.current = nextId;

      if (res.replacesPriorDecision) setDecision(null);

      const analysis = buildAnalysisFromResponse(res);
      const credits = parseAiCredits(res);
      if (credits) setAiCredits(credits);

      const assistantContent = res.message?.content ?? "";
      if (assistantContent || analysis) {
        setMessages((m) => [
          ...m,
          {
            id: `${Date.now()}-a`,
            role: "assistant",
            content: assistantContent,
            analysis,
          },
        ]);
      }

      setDecision(res.decision ?? null);
      const nextInputRequest =
        res.inputRequest ??
        res.message?.inputRequest ??
        (res.needsInput
          ? {
              type: "financial_inputs",
              label: res.needsInput.question ?? "Your answer",
              currentField: res.needsInput.field,
              keyboardType: "default",
            }
          : null);
      setInputRequest(nextInputRequest);
      setSuggestionPills(res.suggestionPills ?? res.decision?.suggestionPills ?? []);
      setPillKeys(res.suggestionPillKeys ?? res.decision?.suggestionPillKeys ?? []);

      void queryClient.invalidateQueries({ queryKey: ["veris-conversations"] });
      void queryClient.invalidateQueries({ queryKey: ["veris-conversation", nextId] });
      void queryClient.invalidateQueries({ queryKey: ["decision-history"] });
      void queryClient.invalidateQueries({ queryKey: ["journey-timeline"] });
    } catch (e) {
      setError(getApiErrorMessage(e, "Veris could not respond. Try again."));
    } finally {
      cleanup();
      setLoading(false);
      setWorkflowStep(-1);
    }
  };

  useEffect(() => {
    if (initialQuestionSent.current) return;
    const pending = consumeFlowQuestion();
    if (!pending?.trim()) return;
    initialQuestionSent.current = true;
    void sendMessage(pending);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run once on mount when a flow question is queued
  }, []);

  if (conversationsQuery.isLoading) return <PageLoading />;
  if (conversationsQuery.isError) {
    return <PageError message={getApiErrorMessage(conversationsQuery.error, "Could not load chat history")} />;
  }

  const loadingThread = conversationQuery.isFetching && Boolean(activeSessionId);

  return (
    <div className="flex h-full gap-0 lg:gap-4 p-4">
      <style>{`
        @keyframes slideUpFade {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-message { animation: slideUpFade 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
        .typing-dot { animation: blink 1.4s ease-in-out infinite; }
        .typing-dot:nth-child(2) { animation-delay: 0.2s; }
        .typing-dot:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* Main Chat Column - Full Height */}
      <div className="flex flex-col min-w-0 flex-1 bg-app-card border border-app-border rounded-2xl overflow-hidden h-full shadow-sm">

        {/* ── Top bar ── */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-app-border bg-app-surface shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-app-accent text-white text-sm font-bold">
              V
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h1 className="text-sm font-bold text-app-text tracking-tight">Veris</h1>
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-app-success opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-app-success" />
                </span>
              </div>
              <p className="text-[11px] text-app-muted leading-tight">AI Financial Decision Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {/* AI credits — compact display */}
            {aiCredits && (
              <span className="hidden sm:block text-[10px] text-app-muted font-medium">
                {aiCredits.remaining} questions left
              </span>
            )}
            <button
              type="button"
              onClick={startNewChat}
              className="rounded-lg border border-app-border px-3 py-1.5 text-xs font-medium text-app-muted hover:text-app-text hover:bg-app-surface transition-colors"
            >
              New chat
            </button>
          </div>
        </div>

        {/* Prompt pills - desktop */}
        {messages.length === 0 && (
          <div className="px-5 pt-4 pb-0 hidden lg:block shrink-0">
            <VerisQuickPrompts
              className="flex-wrap"
              disabled={loading}
              onSelect={(message) => sendMessage(message)}
            />
          </div>
        )}

        {/* Mobile: recent convos */}
        {conversations.length > 0 && (
          <div className="flex gap-2 overflow-x-auto px-4 pt-3 pb-0 lg:hidden shrink-0">
            {conversations.slice(0, 6).map((c) => (
              <button
                key={c.sessionId}
                type="button"
                onClick={() => {
                  hydratedSession.current = null;
                  setActiveSessionId(c.sessionId);
                }}
                className={cn(
                  "shrink-0 rounded-full border px-3 py-1 text-xs transition-colors",
                  (activeSessionId ?? conversationId) === c.sessionId
                    ? "border-app-accent bg-app-accent-muted text-app-accent"
                    : "border-app-border text-app-muted"
                )}
              >
                {c.title.length > 24 ? `${c.title.slice(0, 24)}…` : c.title}
              </button>
            ))}
          </div>
        )}

        {/* ── Messages scroll area ── */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
            {loadingThread && (
              <p className="text-center text-xs text-app-muted py-4">Loading conversation…</p>
            )}

            {/* Empty state */}
            {messages.length === 0 && !loading && !loadingThread && (
              <div className="flex flex-col items-center justify-center py-16 text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-app-accent-muted flex items-center justify-center">
                  <span className="text-2xl font-black text-app-accent">V</span>
                </div>
                <div>
                  <h2 className="text-xl font-bold text-app-text mb-1">How can I help you today?</h2>
                  <p className="text-sm text-app-muted max-w-sm">
                    Ask me anything about your finances — purchases, loans, investments, goals.
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2 w-full max-w-md">
                  {["Can I afford a ₹8L car?", "Should I invest in index funds?", "How much emergency fund do I need?", "Is my rent too high?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => sendMessage(q)}
                      disabled={loading}
                      className="rounded-xl border border-app-border bg-app-surface px-4 py-3 text-left text-xs text-app-muted hover:border-app-accent/40 hover:text-app-text hover:bg-app-card transition-all disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Message thread */}
            {messages.map((m) =>
              m.role === "user" ? (
                /* User bubble — right aligned */
                <div key={m.id} className="flex justify-end animate-message">
                  <div className="max-w-[75%] sm:max-w-[65%] rounded-2xl rounded-br-sm bg-app-accent text-white px-4 py-3 text-sm leading-relaxed font-medium shadow-sm">
                    {m.content}
                  </div>
                </div>
              ) : (
                /* Assistant bubble — left aligned, no background */
                <div key={m.id} className="flex gap-3 animate-message">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-app-accent-muted text-app-accent text-xs font-bold mt-0.5">
                    V
                  </div>
                  <div className="flex-1 min-w-0 space-y-3">
                    {m.analysis && <VerisAnalysisCard analysis={m.analysis} />}
                    {m.content && (
                      <StructuredMessage content={m.content} />
                    )}
                  </div>
                </div>
              )
            )}

            {/* Workflow thinking indicator */}
            {workflowStep >= 0 && (
              <div className="flex gap-3 animate-fade-in">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-app-accent-muted text-app-accent text-xs font-bold shadow-glow relative overflow-hidden">
                  <div className="absolute inset-0 bg-app-accent/20 animate-pulse"></div>
                  <span className="relative z-10">V</span>
                </div>
                <div className="flex items-center gap-3 rounded-2xl rounded-bl-sm border border-app-accent/30 bg-app-accent-muted/30 px-4 py-3 relative overflow-hidden">
                  <div className="absolute inset-0 skeleton-shimmer opacity-20"></div>
                  <div className="flex items-center gap-2 relative z-10">
                    <svg className="w-4 h-4 text-app-accent animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span className="text-xs font-medium text-app-text animate-pulse">
                      {WORKFLOW_LABELS[workflowStep]}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Input request */}
            {inputRequest?.label && (
              <div className="flex gap-3 animate-message">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-app-accent-muted text-app-accent text-xs font-bold">
                  V
                </div>
                <div className="rounded-2xl rounded-bl-sm border border-app-accent/30 bg-app-accent-muted px-4 py-3 text-sm text-app-text">
                  Veris needs: <strong>{inputRequest.label}</strong>
                </div>
              </div>
            )}

            {/* Error */}
            {error && (
              <p className="rounded-xl border border-app-danger/30 bg-app-danger/10 px-4 py-3 text-sm text-app-danger animate-message">
                {error}
              </p>
            )}

            <div ref={bottomRef} />
          </div>
        </div>

        {/* ── Input bar ── */}
        <div className="border-t border-app-border bg-app-surface shrink-0">
          {/* Suggestion pills (shown above input after a response) */}
          {aiCredits !== null && aiCredits.remaining <= 0 ? (
            <div className="px-4 pt-3">
              <div className="rounded-xl border border-app-danger/20 bg-app-danger/5 p-3 text-center text-xs text-app-danger font-medium">
                You&apos;ve reached today&apos;s limit of 20 Arivo questions.
                <span className="block text-[10px] opacity-75 font-normal mt-0.5">
                  Please come back tomorrow — your limit resets automatically.
                </span>
              </div>
            </div>
          ) : (
            suggestionPills.length > 0 && (
              <div className="hidden lg:flex flex-wrap gap-1.5 px-4 pt-3">
                {suggestionPills.map((q, i) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q, pillKeys[i])}
                    disabled={loading}
                    className="rounded-full border border-app-border bg-app-card px-3 py-1 text-xs text-app-muted transition-colors hover:border-app-accent/40 hover:text-app-accent hover:bg-app-accent-muted disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )
          )}

          {/* Text input + send */}
          <div className="px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="relative flex items-end gap-2 rounded-2xl border border-app-border bg-app-card focus-within:border-app-accent/50 focus-within:ring-1 focus-within:ring-app-accent/20 transition-all"
            >
              <textarea
                rows={1}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  e.target.style.height = "auto";
                  e.target.style.height = Math.min(e.target.scrollHeight, 160) + "px";
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    sendMessage(input);
                  }
                }}
                placeholder={
                  aiCredits !== null && aiCredits.remaining <= 0
                    ? "Question limit reached"
                    : inputRequest?.label
                    ? `Enter ${inputRequest.label.toLowerCase()}...`
                    : "Message Veris..."
                }
                className="flex-1 resize-none bg-transparent px-4 py-3 text-sm text-app-text placeholder:text-app-muted focus:outline-none disabled:opacity-50 min-h-[48px] max-h-40"
                disabled={loading || (aiCredits !== null && aiCredits.remaining <= 0)}
              />
              <button
                type="submit"
                disabled={loading || !input.trim() || (aiCredits !== null && aiCredits.remaining <= 0)}
                className="mb-2 mr-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-app-accent text-white transition-all hover:brightness-110 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 2L11 13" />
                    <path d="M22 2L15 22l-4-9-9-4 19-7z" />
                  </svg>
                )}
              </button>
            </form>
            <p className={`mt-2 text-center text-[10px] text-app-muted transition-all duration-300 overflow-hidden ${input.trim() ? "opacity-0 max-h-0 mt-0" : "opacity-60 max-h-8"}`}>
              Veris may be inaccurate. Not a SEBI-registered advisor. Verify financial decisions with a qualified advisor.
            </p>
          </div>
        </div>
      </div>

      {/* ── Right sidebar (xl screens) ── */}
      <aside className="hidden xl:flex xl:flex-col gap-4 w-[280px] shrink-0 overflow-y-auto">
        <AppCard className="shrink-0">
          <h2 className="mb-1 text-sm font-bold text-app-text">How Veris works</h2>
          <p className="text-xs leading-relaxed text-app-muted">
            Veris analyses your income, expenses, goals, and risk profile using the Arivo engine — not generic rules.
          </p>
          <div className="mt-4 pt-3 border-t border-app-border space-y-3">
            <div>
              <div className="flex justify-between items-baseline mb-1.5">
                <span className="text-xs text-app-muted">Confidence</span>
                <span className="text-sm font-bold text-app-success font-mono">{decision?.confidence ?? 87}%</span>
              </div>
              <div className="w-full h-1.5 bg-app-bg rounded-full overflow-hidden">
                <div
                  className="h-full bg-app-accent rounded-full transition-all duration-500"
                  style={{ width: `${decision?.confidence ?? 87}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-app-muted">Risk level</span>
              <span className={cn(
                "px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                (decision?.riskLevel === "low" || !decision)
                  ? "bg-emerald-500/10 text-app-success border-emerald-500/20"
                  : decision.riskLevel === "medium"
                  ? "bg-yellow-500/10 text-app-warning border-yellow-500/20"
                  : "bg-red-500/10 text-app-danger border-red-500/20"
              )}>
                {decision?.riskLevel ?? "Low"}
              </span>
            </div>
          </div>
        </AppCard>

        <AppCard className="shrink-0">
          <h2 className="mb-3 text-sm font-bold text-app-text">Smart tips</h2>
          <div className="space-y-2">
            {quickInsights.map((insight) => (
              <div
                key={insight.id}
                className="rounded-xl border border-app-border bg-app-bg p-3 hover:bg-app-surface transition-colors"
              >
                <p className="text-xs font-semibold text-app-text leading-relaxed">
                  {insight.title} <span className="text-app-muted font-normal">— {insight.description}</span>
                </p>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard className="shrink-0">
          <h2 className="mb-3 text-sm font-bold text-app-text">Recent questions</h2>
          <div className="space-y-1.5">
            {(suggestionPills.length > 0
              ? suggestionPills.slice(0, 3)
              : ["Can I afford a ₹8L car?", "Should I invest in index funds?", "Is my rent too high for my income?"]
            ).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="block w-full text-left rounded-lg px-3 py-2 text-xs text-app-muted hover:text-app-text hover:bg-app-bg transition-colors"
              >
                {q}
              </button>
            ))}
          </div>
        </AppCard>
      </aside>
    </div>
  );
}
