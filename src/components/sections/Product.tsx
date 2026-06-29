"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/ui/Reveal";
import { EnginePanel } from "@/components/ui/EnginePanel";
import { cn } from "@/lib/utils";
import {
  SCENARIOS,
  SCENARIO_KEYS,
  type ScenarioKey,
} from "@/lib/constants/scenarios";

export function Product() {
  const [activeKey, setActiveKey] = useState<ScenarioKey>("car");
  const [confidenceWidth, setConfidenceWidth] = useState(0);
  const [animateVerdict, setAnimateVerdict] = useState(false);
  const [transitioning, setTransitioning] = useState(false);
  const pauseUntilRef = useRef(0);

  const applyScenario = useCallback((key: ScenarioKey, animate = true) => {
    setTransitioning(true);
    setConfidenceWidth(0);

    setTimeout(() => {
      setActiveKey(key);
      setAnimateVerdict(animate);
      requestAnimationFrame(() => {
        setConfidenceWidth(SCENARIOS[key].confidenceNum);
      });
      setTimeout(() => setTransitioning(false), 480);
    }, 320);
  }, []);

  useEffect(() => {
    setConfidenceWidth(SCENARIOS.car.confidenceNum);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Date.now() < pauseUntilRef.current) return;
      setActiveKey((current) => {
        const idx = SCENARIO_KEYS.indexOf(current);
        const next = SCENARIO_KEYS[(idx + 1) % SCENARIO_KEYS.length];
        applyScenario(next);
        return next;
      });
    }, 7000);
    return () => clearInterval(interval);
  }, [applyScenario]);

  const handleTabClick = (key: ScenarioKey) => {
    if (key === activeKey) return;
    pauseUntilRef.current = Date.now() + 12000;
    applyScenario(key);
  };

  return (
    <section id="product" aria-labelledby="product-heading" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-container px-7">
        <Reveal className="mb-12 max-w-2xl">
          <span className="section-label">Decision Engine</span>
          <h2 id="product-heading" className="mb-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-arivo-text">
            See how Arivo evaluates a decision.
          </h2>
          <p className="text-lg text-arivo-muted">
            Not a chatbot. A structured analysis — verdict, confidence, risk, and impact — built from your financial profile.
          </p>
        </Reveal>

        <Reveal>
          <div
            className={cn(
              "transition-opacity duration-320",
              transitioning && "opacity-0"
            )}
            role="tablist"
            aria-label="Decision scenarios"
          >
            <div className="mb-6 flex flex-wrap gap-2">
              {SCENARIO_KEYS.map((key) => {
                const s = SCENARIOS[key];
                const active = key === activeKey;
                return (
                  <button
                    key={key}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => handleTabClick(key)}
                    className={cn(
                      "rounded-2xl border px-5 py-3 text-left transition-all duration-300",
                      active
                        ? "border-arivo-primary/30 bg-arivo-primary/8 shadow-sm"
                        : "border-black/8 bg-arivo-surface hover:border-arivo-primary/20"
                    )}
                  >
                    <span className="block font-display text-sm font-bold text-arivo-text">
                      {s.tabLabel}
                    </span>
                    <span className="text-xs text-arivo-muted">{s.tabHint}</span>
                  </button>
                );
              })}
            </div>

            <EnginePanel
              scenario={SCENARIOS[activeKey]}
              animateVerdict={animateVerdict}
              confidenceWidth={confidenceWidth}
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
