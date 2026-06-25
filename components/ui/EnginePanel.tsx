import { cn } from "@/lib/utils";
import type { Scenario } from "@/lib/constants/scenarios";
import { generateSuggestionPills } from "@/lib/suggestions";

interface EnginePanelProps {
  scenario: Scenario;
  animateVerdict?: boolean;
  confidenceWidth?: number;
  className?: string;
}

export function EnginePanel({
  scenario,
  animateVerdict = false,
  confidenceWidth,
  className,
}: EnginePanelProps) {
  const pills = generateSuggestionPills({
    verdict: scenario.verdict,
    reasons: scenario.reasoning,
    actions: scenario.actions,
  });

  const barWidth = confidenceWidth ?? scenario.confidenceNum;

  return (
    <div
      className={cn(
        "rounded-[20px] border border-arivo-primary/12 bg-gradient-to-br from-white/95 to-arivo-surface/90 p-6 shadow-[0_12px_40px_rgba(26,122,82,0.08)] backdrop-blur-sm sm:p-8",
        className
      )}
    >
      <div className="mb-5 flex items-center justify-between border-b border-black/8 pb-3.5">
        <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-arivo-muted">
          <span className="h-1.5 w-1.5 animate-live-pulse rounded-full bg-arivo-accent" />
          Analysis complete
        </div>
        <span className="text-xs font-semibold text-arivo-muted">Decision Report</span>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-arivo-muted">
            Decision type
          </span>
          <span className="font-display text-sm font-bold text-arivo-text">
            {scenario.decisionType}
          </span>
        </div>
        <div>
          <span className="mb-1 block text-[11px] font-bold uppercase tracking-widest text-arivo-muted">
            Scenario
          </span>
          <span className="font-display text-sm font-bold text-arivo-text">
            {scenario.scenario}
          </span>
        </div>
      </div>

      <p className="mb-3 font-display text-lg font-bold text-arivo-text sm:text-xl">
        {scenario.question}
      </p>

      <div
        className={cn(
          "mb-3 font-display text-3xl font-extrabold uppercase tracking-tight sm:text-4xl",
          scenario.verdictClass,
          animateVerdict && "verdict-pop"
        )}
      >
        {scenario.verdict}
      </div>

      <div
        className="mb-6 h-1 overflow-hidden rounded-full bg-[#e8f0ec]"
        aria-hidden="true"
      >
        <div
          className="h-full rounded-full bg-gradient-to-r from-arivo-primary to-arivo-accent transition-[width] duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <div className="mb-6 grid grid-cols-2 gap-4">
        <div>
          <span className="mb-1 block text-xs font-medium text-arivo-muted">
            Confidence
          </span>
          <span className="font-display text-lg font-bold text-arivo-text">
            {scenario.confidence}
          </span>
        </div>
        <div>
          <span className="mb-1 block text-xs font-medium text-arivo-muted">
            Risk Level
          </span>
          <span className="font-display text-lg font-bold text-arivo-text">
            {scenario.risk}
          </span>
        </div>
      </div>

      <div className="mb-5">
        <span className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-arivo-muted">
          Reasoning Factors
        </span>
        <ul className="space-y-1">
          {scenario.reasoning.map((item) => (
            <li
              key={item}
              className="relative pl-[18px] text-sm leading-relaxed text-arivo-muted before:absolute before:left-0 before:top-[0.65em] before:h-1.5 before:w-1.5 before:rounded-full before:bg-arivo-accent"
            >
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div>
        <span className="mb-2.5 block text-xs font-bold uppercase tracking-widest text-arivo-muted">
          Recommended Actions
        </span>
        <div className="flex flex-wrap gap-2">
          {pills.map((pill) => (
            <span
              key={pill}
              className="rounded-full border border-black/8 bg-[#e8f0ec] px-3.5 py-2 text-[13px] font-medium text-arivo-text"
            >
              {pill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
