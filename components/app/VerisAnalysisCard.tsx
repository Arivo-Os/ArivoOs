import { CheckCircle2, AlertTriangle, XCircle, Laptop } from "lucide-react";
import type { VerisAnalysisPayload } from "@/lib/veris/parse-analysis";
import { cn } from "@/lib/utils";

interface VerisAnalysisCardProps {
  analysis: VerisAnalysisPayload;
  className?: string;
}

const verdictStyles = {
  positive: {
    bar: "bg-app-success/15 border-app-success/30 text-app-success",
    icon: CheckCircle2,
  },
  caution: {
    bar: "bg-app-warning/15 border-app-warning/30 text-app-warning",
    icon: AlertTriangle,
  },
  negative: {
    bar: "bg-app-danger/15 border-app-danger/30 text-app-danger",
    icon: XCircle,
  },
};

function metricToneClass(tone?: "positive" | "negative" | "neutral") {
  if (tone === "positive") return "text-app-success";
  if (tone === "negative") return "text-app-danger";
  return "text-app-text";
}

export function VerisAnalysisCard({ analysis, className }: VerisAnalysisCardProps) {
  const style = verdictStyles[analysis.verdictType];
  const VerdictIcon = style.icon;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-app-border bg-app-bg/80 shadow-app-sm",
        className
      )}
    >
      <div className="flex items-center gap-2 border-b border-app-border px-4 py-3">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-app-accent-muted text-app-accent">
          <Laptop className="h-4 w-4" />
        </span>
        <p className="text-sm font-medium text-app-muted">{analysis.title}</p>
      </div>

      {analysis.metrics.length > 0 && (
        <div className="grid grid-cols-2 gap-px bg-app-border">
          {analysis.metrics.map((m) => (
            <div key={m.label} className="bg-app-card px-4 py-3">
              <p className="text-[11px] font-medium uppercase tracking-wide text-app-muted">{m.label}</p>
              <p className={cn("mt-1 text-base font-semibold", metricToneClass(m.tone))}>{m.value}</p>
            </div>
          ))}
        </div>
      )}

      <div className={cn("flex items-start gap-2 border-t px-4 py-3 text-sm font-medium leading-snug", style.bar)}>
        <VerdictIcon className="mt-0.5 h-4 w-4 shrink-0" />
        <span>{analysis.verdict}</span>
      </div>
    </div>
  );
}
