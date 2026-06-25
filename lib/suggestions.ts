const VERDICT_DEFAULTS: Record<string, string[]> = {
  approved: ["EMI breakdown", "Purchase timeline", "Loan comparison"],
  caution: ["Reduce vehicle budget", "Increase down payment", "Build emergency fund"],
  rejected: ["Affordable alternatives", "Improve financial readiness", "Recalculate purchase"],
  wait: ["Build financial runway", "Timeline to readiness", "What would change the verdict?"],
};

const REASON_RULES = [
  {
    match: /emergency fund covers only|emergency fund below|insufficient emergency|runway covers only|months of expense/i,
    pills: ["Build emergency fund", "Emergency fund target", "Savings plan"],
  },
  {
    match: /emi (is |would |exceeds?)|affordability threshold|too high.*income|income threshold|cash flow negative/i,
    pills: ["Reduce vehicle budget", "Increase down payment", "What can I afford?"],
  },
  {
    match: /debt burden|debt.?to.?income|liabilit.*high|exceeds.*debt/i,
    pills: ["Debt reduction plan", "Improve debt ratio", "Recalculate affordability"],
  },
  {
    match: /down payment reduces|down payment.*below|insufficient down/i,
    pills: ["Increase down payment", "Down payment timeline", "Lower purchase price"],
  },
  {
    match: /goal.*derail|savings goal.*at risk|timeline extension|wait \d+ month/i,
    pills: ["Adjust savings timeline", "Goal impact breakdown", "Reprioritize goals"],
  },
  {
    match: /income not confirmed|job offer|quit|runway|career/i,
    pills: ["Income scenario model", "Runway calculator", "When can I make this move?"],
  },
  {
    match: /insurance gap|health cover|benefits gap/i,
    pills: ["Close coverage gap", "Benefits comparison", "Cost of waiting"],
  },
];

function normalizeVerdict(verdict: string): string {
  const v = verdict.toLowerCase();
  if (/reject|do not|don't|denied/.test(v)) return "rejected";
  if (/caution|review|wait|reconsider|worth reviewing/.test(v)) return "caution";
  if (/approv|proceed|yes|go ahead/.test(v)) return "approved";
  return "caution";
}

function uniquePills(pills: string[], limit = 3): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const pill of pills) {
    const key = pill.toLowerCase();
    if (!seen.has(key)) {
      seen.add(key);
      out.push(pill);
    }
    if (out.length >= limit) break;
  }
  return out;
}

function pillsFromReasons(reasons: string[]): string[] {
  const text = reasons.join(" ");
  const scored = new Map<string, number>();

  for (const rule of REASON_RULES) {
    if (rule.match.test(text)) {
      rule.pills.forEach((pill, i) => {
        scored.set(pill, (scored.get(pill) || 0) + (REASON_RULES.length - i));
      });
    }
  }

  return Array.from(scored.entries())
    .sort((a, b) => b[1] - a[1])
    .map(([pill]) => pill);
}

export interface SuggestionInput {
  verdict: string;
  reasons?: string[];
  actions?: string[];
  nextAction?: string;
}

export function generateSuggestionPills(decision: SuggestionInput): string[] {
  const bucket = normalizeVerdict(decision.verdict);
  const fromReasons = pillsFromReasons(decision.reasons ?? []);
  const fromVerdict = VERDICT_DEFAULTS[bucket] ?? VERDICT_DEFAULTS.caution;
  const extras = [
    ...(decision.actions ?? []),
    ...(decision.nextAction ? [decision.nextAction] : []),
  ].filter(Boolean);

  if (bucket === "approved" && fromReasons.length === 0) {
    return uniquePills([...fromVerdict, ...extras], 3);
  }

  return uniquePills([...fromReasons, ...fromVerdict, ...extras], 3);
}
