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
import { sendVerisChat, getQuickInsights, type QuickInsight } from "@/lib/api/veris.service";
import { deleteConversation } from "@/lib/api/conversations.service";
import { getApiErrorMessage } from "@/lib/api/errors";
import { useSidebar } from "@/components/app/SidebarContext";
import type { InputRequest, VerisDecision } from "@/lib/api/types/api";
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

  if (!isVerdict && !isCushion && !isSavings) {
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
        {/* Banner */}
        <div className={cn(
          "px-5 py-4 border-b border-app-border flex items-center gap-3 font-semibold border-l-4",
          isDoNotProceed 
            ? "bg-gradient-to-r from-red-500/10 to-transparent text-red-400 border-l-red-500 border-b-app-border" 
            : "bg-gradient-to-r from-emerald-500/10 to-transparent text-emerald-400 border-l-emerald-500 border-b-app-border"
        )}>
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 shrink-0">
            {isDoNotProceed ? (
              <svg className="h-4.5 w-4.5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="h-4.5 w-4.5 text-emerald-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            )}
          </span>
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-75 block font-bold">Recommendation</span>
            <span className="text-sm font-bold text-white">{recSec || (isDoNotProceed ? "Do not proceed" : "Proceed")}</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Current Situation Grid */}
          <div>
            <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-2.5">Financial Snapshot</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.02] hover:bg-white/[0.04] p-3 border border-white/[0.06] transition-colors">
                <span className="text-[10px] text-app-muted block font-medium">Cash Available</span>
                <strong className="text-sm text-white font-mono font-semibold block mt-1">{cashAvailable || "—"}</strong>
              </div>
              <div className="rounded-xl bg-white/[0.02] hover:bg-white/[0.04] p-3 border border-white/[0.06] transition-colors">
                <span className="text-[10px] text-app-muted block font-medium">Bills Due</span>
                <strong className="text-sm text-white font-mono font-semibold block mt-1">{billsDue || "—"}</strong>
              </div>
              <div className="rounded-xl bg-white/[0.02] hover:bg-white/[0.04] p-3 border border-white/[0.06] transition-colors">
                <span className="text-[10px] text-app-muted block font-medium">Monthly EMI</span>
                <strong className="text-sm text-white font-mono font-semibold block mt-1">{monthlyEmi || "—"}</strong>
              </div>
              <div className="rounded-xl bg-white/[0.02] hover:bg-white/[0.04] p-3 border border-white/[0.06] transition-colors">
                <span className="text-[10px] text-app-muted block font-medium">Cash After Bills</span>
                <strong className="text-sm text-white font-mono font-semibold block mt-1">{cashAfterBills || "—"}</strong>
              </div>
            </div>
          </div>

          {/* Calculation Section */}
          {calcSec && (
            <div className="rounded-xl bg-white/[0.02] p-4 border border-white/[0.06] space-y-3">
              <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider">Affordability Calculation</h4>
              {formula && <p className="text-xs text-app-muted italic leading-relaxed">{formula}</p>}
              {equation && (
                <div className="font-mono text-xs bg-black/40 px-3 py-2 rounded-lg border border-white/[0.04] text-center text-emerald-400 font-semibold tracking-tight">
                  {equation}
                </div>
              )}
              {purchaseAmount && (
                <div className="flex justify-between items-center pt-2 border-t border-white/[0.06]">
                  <span className="text-xs text-app-muted">Purchase Amount</span>
                  <span className="text-sm font-bold text-white font-mono">{purchaseAmount}</span>
                </div>
              )}
            </div>
          )}

          {/* Impact Analysis & Risks */}
          {(impactSec || risksSec) && (
            <div className="space-y-4 pt-4 border-t border-white/[0.06]">
              {impactSec && (
                <div className="border-l-2 border-white/20 pl-3">
                  <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-1">Impact Analysis</h4>
                  <p className="text-app-text text-xs leading-relaxed">{impactSec}</p>
                </div>
              )}
              {risksSec && (
                <div className="rounded-xl bg-red-500/5 border border-red-500/10 p-3">
                  <h4 className="text-[10px] font-bold text-red-400 uppercase tracking-wider mb-1">Risk Factors</h4>
                  <p className="text-red-300/90 text-xs leading-relaxed">{risksSec}</p>
                </div>
              )}
            </div>
          )}

          <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-[10px] leading-relaxed text-[#475569] mt-4 flex items-start gap-1.5">
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
        <div className="px-5 py-4 border-b border-app-border flex items-center gap-3 font-semibold border-l-4 bg-gradient-to-r from-blue-500/10 to-transparent text-blue-400 border-l-blue-500">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 shrink-0">
            <svg className="h-4.5 w-4.5 text-blue-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </span>
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-75 block font-bold">Timeline Report</span>
            <span className="text-sm font-bold text-white">Safety Cushion Timeline</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Snapshot Grid */}
          <div>
            <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-2.5">Snapshot</h4>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-white/[0.02] p-3 border border-white/[0.06]">
                <span className="text-[10px] text-app-muted block font-medium">Target Emergency Fund</span>
                <strong className="text-xs text-white font-mono font-semibold block mt-1">{targetFund}</strong>
              </div>
              <div className="rounded-xl bg-white/[0.02] p-3 border border-white/[0.06]">
                <span className="text-[10px] text-app-muted block font-medium">Current Emergency Fund</span>
                <strong className="text-xs text-white font-mono font-semibold block mt-1">{currentFund}</strong>
              </div>
              <div className="rounded-xl bg-white/[0.02] p-3 border border-white/[0.06]">
                <span className="text-[10px] text-app-muted block font-medium">Monthly Savings Cap.</span>
                <strong className="text-sm text-white font-mono font-semibold block mt-1">{monthlySavings}</strong>
              </div>
              <div className="rounded-xl bg-white/[0.02] p-3 border border-white/[0.06]">
                <span className="text-[10px] text-app-muted block font-medium">Time to Full Cushion</span>
                <strong className="text-sm text-emerald-400 font-mono font-bold block mt-1">{timeToCushion}</strong>
              </div>
            </div>
          </div>

          {/* Milestones timeline list */}
          {milestones.length > 0 && (
            <div className="rounded-xl bg-white/[0.02] p-4 border border-white/[0.06] space-y-4">
              <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider">Milestones progress</h4>
              <div className="relative pl-6 border-l border-white/10 space-y-4 ml-1">
                {milestones.map((m, idx) => (
                  <div key={idx} className="relative">
                    <span className="absolute -left-[29px] top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#182736] border-2 border-blue-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-blue-400" />
                    </span>
                    <div className="flex justify-between items-baseline gap-2">
                      <div>
                        <span className="text-sm font-bold text-white font-mono">{m.percent}</span>
                        <span className="text-xs text-app-muted ml-2">({m.amount})</span>
                      </div>
                      <span className="text-xs text-emerald-400 font-mono font-semibold">{m.duration}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {priorSec && (
            <p className="text-[10px] text-app-muted italic border-t border-white/[0.06] pt-3 leading-relaxed">
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
        <div className="px-5 py-4 border-b border-app-border flex items-center gap-3 font-semibold border-l-4 bg-gradient-to-r from-purple-500/10 to-transparent text-purple-400 border-l-purple-500">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-current/10 shrink-0">
            <svg className="h-4.5 w-4.5 text-purple-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
            </svg>
          </span>
          <div>
            <span className="text-[10px] uppercase tracking-wider opacity-75 block font-bold">Goal Targets</span>
            <span className="text-sm font-bold text-white">Savings Plan</span>
          </div>
        </div>

        <div className="p-5 space-y-5">
          {/* Grid */}
          <div>
            <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider mb-2.5">Snapshot</h4>
            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-white/[0.02] p-2.5 border border-white/[0.06] text-center">
                <span className="text-[9px] text-app-muted block font-medium">Emergency Gap</span>
                <strong className="text-xs text-white font-mono font-semibold block mt-1">{emergencyGap}</strong>
              </div>
              <div className="rounded-xl bg-white/[0.02] p-2.5 border border-white/[0.06] text-center">
                <span className="text-[9px] text-app-muted block font-medium">Add. Down Payment</span>
                <strong className="text-xs text-white font-mono font-semibold block mt-1">{downPayment}</strong>
              </div>
              <div className="rounded-xl bg-white/[0.02] p-2.5 border border-white/[0.06] text-center">
                <span className="text-[9px] text-app-muted block font-medium">Combined Goal</span>
                <strong className="text-xs text-white font-mono font-semibold block mt-1">{combinedGoal}</strong>
              </div>
            </div>
          </div>

          {/* Highlight Target box */}
          <div className="rounded-xl bg-white/[0.02] p-4 border border-white/[0.06] space-y-2 text-center">
            <h4 className="text-[10px] font-bold text-app-muted uppercase tracking-wider">Suggested monthly savings</h4>
            <div className="text-lg font-bold text-emerald-400 font-mono tracking-tight">
              {suggestedSavings}
            </div>
          </div>

          {priorSavingsSec && (
            <p className="text-[10px] text-app-muted italic border-t border-white/[0.06] pt-3 leading-relaxed">
              {priorSavingsSec}
            </p>
          )}
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
      await deleteConversation(sessionId);
      if (sessionId === activeSessionId || sessionId === conversationId) {
        startNewChat();
      }
      void queryClient.invalidateQueries({ queryKey: ["veris-conversations"] });
    } catch (e) {
      setError("Failed to delete conversation");
    }
  }, [activeSessionId, conversationId, queryClient, startNewChat]);

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
    <div className="mx-auto grid max-w-7xl gap-6 grid-cols-1 xl:grid-cols-[1fr_300px]">
      <style>{`
        @keyframes slideUpFade {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-message {
          animation: slideUpFade 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>

      <div className="flex h-[calc(100vh-8rem)] flex-col overflow-hidden rounded-2xl border border-app-border bg-app-card shadow-app-sm">
        <div className="border-b border-app-border bg-app-surface/50 px-5 py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-app-accent-muted text-sm font-bold text-app-accent">
                V
              </span>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-bold text-app-text">Veris</h1>
                  <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                </div>
                <p className="text-xs text-app-muted">AI Financial Decision Engine</p>
              </div>
            </div>
            <button
              type="button"
              onClick={startNewChat}
              className="rounded-lg border border-app-border px-3 py-1.5 text-xs font-medium text-app-muted lg:hidden"
            >
              New chat
            </button>
          </div>

          <AiCreditsBar credits={aiCredits} className="mt-3" />
          <VerisQuickPrompts
            className="mt-3"
            disabled={loading}
            onSelect={(message) => sendMessage(message)}
          />

          {conversations.length > 0 && (
            <div className="mt-3 flex gap-2 overflow-x-auto pb-1 lg:hidden">
              {conversations.slice(0, 8).map((c) => (
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
                  {c.title.length > 28 ? `${c.title.slice(0, 28)}…` : c.title}
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="relative flex-1 space-y-4 overflow-y-auto p-5">
          {loadingThread && (
            <p className="text-center text-xs text-app-muted">Loading conversation…</p>
          )}
          {messages.length === 0 && !loading && !loadingThread && (
            <p className="text-center text-sm text-app-muted">
              Ask before you spend — e.g. &quot;Can I buy a car worth ₹8L?&quot;
            </p>
          )}
          {messages.map((m) =>
            m.role === "user" ? (
              <div key={m.id} className="flex justify-end animate-message">
                <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-emerald-500/[0.08] dark:bg-emerald-950/30 border border-emerald-500/20 px-4 py-3 text-sm leading-relaxed text-emerald-950 dark:text-white font-medium">
                  {m.content}
                </div>
              </div>
            ) : (
              <div key={m.id} className="flex gap-2 animate-message">
                <span className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-app-accent text-xs font-bold text-white">
                  A
                </span>
                <div className="max-w-[85%] space-y-2">
                  {m.analysis && <VerisAnalysisCard analysis={m.analysis} />}
                  {m.content && (
                    <StructuredMessage content={m.content} />
                  )}
                </div>
              </div>
            )
          )}
          {workflowStep >= 0 && (
            <div className="rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm text-app-muted animate-message">
              {WORKFLOW_LABELS[workflowStep]}
            </div>
          )}
          {inputRequest?.label && (
            <div className="rounded-xl border border-app-accent/30 bg-app-accent/10 px-4 py-3 text-sm text-app-text animate-message">
              Veris needs: <strong>{inputRequest.label}</strong>
            </div>
          )}
          {error && (
            <p className="rounded-xl border border-app-danger/30 bg-app-danger/10 px-4 py-3 text-sm text-app-danger animate-message">
              {error}
            </p>
          )}
          <div ref={bottomRef} />
        </div>

        <div className="border-t border-app-border p-4">
          {aiCredits !== null && aiCredits.remaining <= 0 ? (
            <div className="mb-3 rounded-xl border border-red-500/20 bg-red-500/[0.02] p-3.5 text-center text-xs text-red-400 font-medium">
              {"You've reached today's limit of 20 Arivo questions."}
              <br />
              <span className="text-[10px] opacity-80 font-normal mt-0.5 block">
                {"Please come back tomorrow—your question limit will reset automatically."}
              </span>
            </div>
          ) : (
            suggestionPills.length > 0 && (
              <div className="mb-3 flex flex-wrap gap-2">
                {suggestionPills.map((q, i) => (
                  <button
                    key={q}
                    type="button"
                    onClick={() => sendMessage(q, pillKeys[i])}
                    disabled={loading}
                    className="rounded-full border border-app-border bg-app-bg px-3 py-1.5 text-xs text-app-muted transition-colors hover:border-app-accent/40 hover:text-app-accent disabled:opacity-50"
                  >
                    {q}
                  </button>
                ))}
              </div>
            )
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={
                aiCredits !== null && aiCredits.remaining <= 0
                  ? "Question limit reached"
                  : inputRequest?.label
                  ? `Enter ${inputRequest.label.toLowerCase()}...`
                  : "Ask Veris anything..."
              }
              className="flex-1 rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm text-app-text placeholder:text-app-muted focus:border-app-accent/50 focus:outline-none disabled:opacity-50"
              disabled={loading || (aiCredits !== null && aiCredits.remaining <= 0)}
            />
            <button
              type="submit"
              disabled={loading || (aiCredits !== null && aiCredits.remaining <= 0)}
              className="rounded-xl bg-app-accent px-5 py-3 text-sm font-semibold text-app-bg shadow-app-sm transition-all duration-200 hover:brightness-110 active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? "..." : "Send"}
            </button>
          </form>
          <p className="mt-2.5 text-center text-[10px] leading-relaxed text-app-muted opacity-75 max-w-lg mx-auto flex items-start justify-center gap-1.5">
            <AlertTriangle className="h-3 w-3 text-amber-500 shrink-0 mt-0.5" />
            <span><strong>Disclaimer:</strong> Arivo is currently in Beta and may occasionally generate inaccurate or incomplete information. Always verify important financial decisions with a qualified financial advisor. Arivo is not a SEBI-registered investment advisor and does not provide investment advice.</span>
          </p>
        </div>
      </div>

      <aside className="hidden space-y-4 xl:block">
        <AppCard>
          <h2 className="mb-2 font-bold text-app-text">How Veris works</h2>
          <p className="text-sm leading-relaxed text-app-muted">
            Veris analyses your income, expenses, goals, and risk profile using the Arivo engine — not generic rules.
          </p>
          <div className="mt-4 pt-4 border-t border-app-border/40 space-y-4">
            <div>
              <div className="flex justify-between items-baseline mb-1">
                <span className="text-xs text-app-muted">Confidence</span>
                <span className="text-sm font-bold text-emerald-400 font-mono">{decision?.confidence ?? 87}%</span>
              </div>
              <div className="w-full h-1.5 bg-white/[0.04] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-app-accent rounded-full transition-all duration-500 ease-out" 
                  style={{ width: `${decision?.confidence ?? 87}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-xs text-app-muted">Risk level</span>
              <span className={cn(
                "px-2 py-0.5 rounded-lg text-[10px] font-bold uppercase tracking-wider border",
                (decision?.riskLevel === "low" || !decision)
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : decision.riskLevel === "medium"
                  ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                  : "bg-red-500/10 text-red-400 border-red-500/20"
              )}>
                {decision?.riskLevel ?? "Low"}
              </span>
            </div>
          </div>
        </AppCard>

        <AppCard>
          <h2 className="mb-3 font-bold text-app-text">Smart tips</h2>
          <div className="space-y-3">
            {quickInsights.map((insight) => (
              <div 
                key={insight.id} 
                className="rounded-xl border border-app-border bg-white/[0.01] p-3 hover:bg-white/[0.02] transition-colors"
              >
                <p className="text-xs font-semibold text-app-text leading-relaxed">
                  {insight.title} <span className="text-app-muted font-normal">— {insight.description}</span>
                </p>
              </div>
            ))}
          </div>
        </AppCard>

        <AppCard>
          <h2 className="mb-3 font-bold text-app-text">Recent questions</h2>
          <div className="space-y-2 text-xs">
            {(suggestionPills.length > 0
              ? suggestionPills.slice(0, 3)
              : [
                  "Can I afford a ₹8L car?",
                  "Should I invest in index funds?",
                  "Is my rent too high for my income?",
                ]
            ).map((q) => (
              <button
                key={q}
                onClick={() => sendMessage(q)}
                className="block text-left text-app-muted hover:text-app-accent hover:underline transition-colors w-full"
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
