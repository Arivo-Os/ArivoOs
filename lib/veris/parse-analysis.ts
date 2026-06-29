import type { VerisChatResponse, VerisDecision } from "@/lib/api/types/api";
import { formatINR } from "@/lib/utils/app";

export interface AnalysisMetric {
  label: string;
  value: string;
  tone?: "positive" | "negative" | "neutral";
}

export interface VerisAnalysisPayload {
  title: string;
  metrics: AnalysisMetric[];
  verdict: string;
  verdictType: "positive" | "caution" | "negative";
}

function metric(label: string, value: string, tone?: AnalysisMetric["tone"]): AnalysisMetric {
  return { label, value, tone };
}

function formatMetricValue(value: unknown): string {
  if (value == null) return "—";
  if (typeof value === "number") return formatINR(value);
  if (typeof value === "string") return value;
  if (typeof value === "boolean") return value ? "Yes" : "No";
  return String(value);
}

function toneFromText(text: string): AnalysisMetric["tone"] {
  const lower = text.toLowerCase();
  if (/healthy|good|positive|yes|on track|safe|strong/.test(lower)) return "positive";
  if (/risk|negative|short|deficit|high|delay|wait|impact|-/.test(lower)) return "negative";
  return "neutral";
}

function metricsFromDetails(details?: VerisChatResponse["details"]): AnalysisMetric[] {
  if (!details?.metrics || typeof details.metrics !== "object") return [];
  const labels: Record<string, string> = {
    monthlySurplus: "Monthly surplus",
    monthly_surplus: "Monthly surplus",
    purchaseCost: "Purchase cost",
    purchase_cost: "Purchase cost",
    emergencyFund: "Emergency fund",
    emergency_fund: "Emergency fund",
    savingsImpact: "Savings impact",
    savings_impact: "Savings impact",
    emiCapacity: "EMI capacity",
    emi_capacity: "EMI capacity",
  };

  return Object.entries(details.metrics)
    .filter(([, v]) => v != null)
    .slice(0, 4)
    .map(([key, value]) => {
      const formatted = formatMetricValue(value);
      return metric(labels[key] ?? key.replace(/_/g, " "), formatted, toneFromText(formatted));
    });
}

function metricsFromStructured(structured?: VerisChatResponse["structuredContent"]): AnalysisMetric[] {
  if (!structured?.items || !Array.isArray(structured.items)) return [];
  return structured.items
    .slice(0, 4)
    .map((item) => {
      const row = item as Record<string, unknown>;
      const label = String(row.label ?? row.name ?? row.title ?? "Metric");
      const value = formatMetricValue(row.value ?? row.amount ?? row.text);
      const tone = (row.tone as AnalysisMetric["tone"]) ?? toneFromText(value);
      return metric(label, value, tone);
    });
}

function mapFactTone(type?: string): AnalysisMetric["tone"] {
  if (type === "positive") return "positive";
  if (type === "negative" || type === "warning") return "negative";
  return "neutral";
}

function metricsFromDecision(decision: VerisDecision): AnalysisMetric[] {
  if (decision.reasoningFacts?.length) {
    return decision.reasoningFacts.slice(0, 4).map((fact) => {
      const value = fact.highlight ?? fact.text.split(":").pop()?.trim() ?? fact.text;
      const label = fact.highlight ? fact.text.replace(fact.highlight, "").replace(/[:—-]\s*$/, "").trim() : fact.text;
      return metric(label || "Insight", value, fact.type ? mapFactTone(fact.type) : toneFromText(value));
    });
  }
  return [
    metric("Confidence", `${decision.confidence}%`, "positive"),
    metric("Risk level", decision.riskLevel, toneFromText(decision.riskLevel)),
  ];
}

export function buildAnalysisFromResponse(res: VerisChatResponse): VerisAnalysisPayload | null {
  const decision = res.decision;
  const showVerdict =
    res.responseFormat === "verdict" ||
    res.responseType === "decision" ||
    (!res.responseFormat && !res.responseType && Boolean(decision));

  if (!showVerdict || !decision) return null;

  const metrics =
    metricsFromStructured(res.structuredContent).length > 0
      ? metricsFromStructured(res.structuredContent)
      : metricsFromDetails(res.details).length > 0
        ? metricsFromDetails(res.details)
        : metricsFromDecision(decision);

  return {
    title: res.structuredContent?.title ?? decision.verdictTitle ?? "Purchase analysis",
    metrics,
    verdict: decision.nextAction ?? decision.verdictSummary,
    verdictType: decision.verdictType,
  };
}

export function buildAnalysisFromDecision(decision: VerisDecision): VerisAnalysisPayload {
  return {
    title: decision.verdictTitle,
    metrics: metricsFromDecision(decision),
    verdict: decision.nextAction ?? decision.verdictSummary,
    verdictType: decision.verdictType,
  };
}

export interface AiCredits {
  used: number;
  limit: number;
  remaining: number;
}

export function parseAiCredits(res: VerisChatResponse): AiCredits | null {
  const raw = res as VerisChatResponse & {
    aiDailyUsed?: number;
    aiDailyLimit?: number;
    aiDailyRemaining?: number;
  };
  if (raw.aiDailyLimit == null && raw.aiDailyRemaining == null && raw.aiDailyUsed == null) return null;

  const limit = raw.aiDailyLimit ?? 20;
  const remaining = raw.aiDailyRemaining ?? Math.max(0, limit - (raw.aiDailyUsed ?? 0));
  const used = raw.aiDailyUsed ?? Math.max(0, limit - remaining);

  return { used, limit, remaining };
}
