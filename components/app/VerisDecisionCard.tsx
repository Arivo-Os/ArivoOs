import { VerisDecision } from "@/lib/api/types/api";
import { Badge } from "@/components/ui/badge";
import { AppCard } from "@/components/app/AppCard";
import { AlertTriangle } from "lucide-react";

interface VerisDecisionCardProps {
  decision: VerisDecision;
}

export function VerisDecisionCard({ decision }: VerisDecisionCardProps) {
  const variant =
    decision.verdictType === "positive"
      ? "success"
      : decision.verdictType === "negative"
        ? "danger"
        : "warning";

  return (
    <AppCard className="border-app-accent/25 bg-gradient-to-br from-app-card to-app-surface">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <h3 className="text-base font-semibold text-app-text">{decision.verdictTitle}</h3>
        <Badge variant={variant}>{decision.confidence}% confidence</Badge>
        <Badge variant="default" className="capitalize">
          {decision.riskLevel} risk
        </Badge>
      </div>
      <p className="text-sm leading-relaxed text-app-muted">{decision.verdictSummary}</p>
      {decision.reasoningFacts && decision.reasoningFacts.length > 0 && (
        <ul className="mt-5 space-y-2">
          {decision.reasoningFacts.map((fact, i) => (
            <li
              key={i}
              className="rounded-xl border border-app-border bg-app-bg px-4 py-3 text-sm leading-relaxed text-app-muted"
            >
              {fact.text}
            </li>
          ))}
        </ul>
      )}
      {decision.nextAction && (
        <p className="mt-5 rounded-xl border border-app-accent/20 bg-app-accent-muted px-4 py-3 text-sm font-semibold text-app-accent">
          {decision.nextAction}
        </p>
      )}

      <div className="mt-5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-3 text-[10px] leading-relaxed text-[#475569] flex items-start gap-1.5">
        <AlertTriangle className="h-3.5 w-3.5 text-amber-500 shrink-0 mt-0.5" />
        <span><strong>Disclaimer:</strong> Arivo is currently in Beta and may occasionally generate inaccurate or incomplete information. Always verify important financial decisions with a qualified financial advisor. Arivo is not a SEBI-registered investment advisor and does not provide investment advice.</span>
      </div>
    </AppCard>
  );
}
