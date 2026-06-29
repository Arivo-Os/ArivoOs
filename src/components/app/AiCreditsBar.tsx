import { Sparkles } from "lucide-react";
import type { AiCredits } from "@/lib/veris/parse-analysis";
import { cn } from "@/lib/utils";

interface AiCreditsBarProps {
  credits: AiCredits | null;
  className?: string;
}

export function AiCreditsBar({ credits, className }: AiCreditsBarProps) {
  if (!credits) return null;

  const pct = credits.limit > 0 ? Math.min(100, (credits.used / credits.limit) * 100) : 0;
  const low = credits.remaining <= 3;

  return (
    <div
      className={cn(
        "flex items-center gap-3 rounded-xl border border-app-border bg-app-bg px-3 py-2",
        className
      )}
    >
      <Sparkles className={cn("h-4 w-4 shrink-0", low ? "text-app-warning" : "text-app-accent")} />
      <div className="min-w-0 flex-1">
        <div className="mb-1 flex items-center justify-between gap-2 text-xs">
          <span className="font-medium text-app-text">AI credits</span>
          <span className={cn("tabular-nums", low ? "text-app-warning" : "text-app-muted")}>
            {credits.used} used · {credits.remaining} left
          </span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-app-border">
          <div
            className={cn("h-full rounded-full transition-all", low ? "bg-app-warning" : "bg-app-accent")}
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
