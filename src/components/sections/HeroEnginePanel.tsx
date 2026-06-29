"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { HERO_DECISIONS } from "@/lib/constants/scenarios";

export function HeroEnginePanel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setActiveIndex((i) => (i + 1) % HERO_DECISIONS.length);
        setFade(true);
      }, 280);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const active = HERO_DECISIONS[activeIndex];

  return (
    <div className="mb-8 rounded-[20px] border border-arivo-primary/12 bg-gradient-to-br from-white/95 to-arivo-surface/90 p-6 shadow-[0_12px_40px_rgba(26,122,82,0.08)] backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between border-b border-black/8 pb-3.5">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-arivo-muted">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              active.risk === "medium"
                ? "bg-arivo-warning"
                : "animate-live-pulse bg-arivo-accent"
            )}
          />
          Evaluating decision
        </span>
        <div className="flex gap-1.5" aria-hidden="true">
          {HERO_DECISIONS.map((_, i) => (
            <span
              key={i}
              className={cn(
                "h-1.5 w-1.5 rounded-full transition-all duration-350",
                i === activeIndex
                  ? "scale-125 bg-arivo-accent"
                  : "bg-black/10"
              )}
            />
          ))}
        </div>
      </div>

      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-arivo-muted">
        Decisions the engine evaluates
      </p>

      <div className="relative mb-4 h-[2.4em]">
        {HERO_DECISIONS.map((decision, i) => (
          <p
            key={decision.label}
            className={cn(
              "absolute left-0 font-display text-xl font-extrabold tracking-tight transition-all duration-550 ease-smooth sm:text-2xl lg:left-0 lg:translate-x-0",
              i === activeIndex && fade
                ? "translate-y-0 opacity-100 text-arivo-primary"
                : "translate-y-3 opacity-0 text-arivo-muted"
            )}
            aria-hidden={i !== activeIndex}
          >
            {decision.label}
          </p>
        ))}
      </div>

      <div
        className={cn(
          "mb-4 flex items-center gap-3 transition-opacity duration-300",
          fade ? "opacity-100" : "opacity-0"
        )}
      >
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wide",
            active.risk === "medium"
              ? "bg-arivo-warning/15 text-arivo-warning"
              : "bg-arivo-primary/10 text-arivo-primary"
          )}
        >
          {active.verdict}
        </span>
        <span className="text-sm font-semibold text-arivo-muted">
          {active.confidence}% confidence
        </span>
      </div>

      <div className="flex flex-wrap gap-2" aria-hidden="true">
        {["Verdict", "Confidence", "Impact"].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-black/8 bg-white/60 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-arivo-muted"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
