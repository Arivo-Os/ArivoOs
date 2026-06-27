"use client";

import {
  Landmark,
  TrendingUp,
  PieChart,
  CreditCard,
  Mic,
  type LucideIcon,
} from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

const items: { title: string; icon: LucideIcon }[] = [
  { title: "Bank Integrations", icon: Landmark },
  { title: "Investment Tracking", icon: TrendingUp },
  { title: "Budget Planning", icon: PieChart },
  { title: "Subscription Manager", icon: CreditCard },
  { title: "Voice Financial Assistant", icon: Mic },
];

export function Roadmap() {
  return (
    <section id="roadmap" aria-labelledby="roadmap-heading" className="py-[120px]">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal className="mb-14 text-center">
          <h2
            id="roadmap-heading"
            className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-ink"
          >
            What&apos;s coming next.
          </h2>
        </MotionReveal>

        <div className="mx-auto grid max-w-3xl gap-4">
          {items.map((item, i) => {
            const Icon = item.icon;
            return (
              <MotionReveal key={item.title} delay={i * 0.06}>
                <article className="flex items-center justify-between gap-4 rounded-2xl bg-white px-6 py-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
                  <div className="flex items-center gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-green/10 text-brand-green">
                      <Icon className="h-4 w-4" strokeWidth={2} aria-hidden="true" />
                    </span>
                    <h3 className="font-semibold text-ink">{item.title}</h3>
                  </div>
                  <span className="shrink-0 rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink-muted">
                    Coming Soon
                  </span>
                </article>
              </MotionReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
