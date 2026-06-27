"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";

const items = [
  "Bank Integrations",
  "Investment Tracking",
  "Budget Planning",
  "Subscription Manager",
  "Voice Financial Assistant",
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
          {items.map((item, i) => (
            <MotionReveal key={item} delay={i * 0.06}>
              <article className="flex items-center justify-between rounded-2xl bg-white px-6 py-5 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
                <h3 className="font-semibold text-ink">{item}</h3>
                <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-semibold text-ink-muted">
                  Coming Soon
                </span>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
