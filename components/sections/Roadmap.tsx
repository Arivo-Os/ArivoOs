"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";

const roadmapItems = [
  "Bank Account Integration",
  "Investment Tracking",
  "AI Budget Planning",
  "Smart Recommendations",
  "Subscription Management",
  "Financial Reports",
];

export function Roadmap() {
  return (
    <section
      id="roadmap"
      aria-labelledby="roadmap-heading"
      className="border-y border-white/[0.06] bg-arivo-surface/50 py-24 lg:py-32"
    >
      <div className="mx-auto max-w-container px-7">
        <MotionReveal className="mb-14 text-center">
          <span className="section-label">Roadmap</span>
          <h2
            id="roadmap-heading"
            className="font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold leading-tight tracking-tight text-white"
          >
            What&apos;s Coming Next
          </h2>
        </MotionReveal>

        <div className="relative mx-auto max-w-2xl">
          <div
            className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#22C55E]/50 via-[#22C55E]/20 to-transparent sm:block"
            aria-hidden="true"
          />

          <div className="space-y-5">
            {roadmapItems.map((item, i) => (
              <MotionReveal key={item} delay={i * 0.07}>
                <article className="glass-card-hover relative flex items-start gap-5 p-5 sm:pl-14">
                  <div
                    className="absolute left-5 top-1/2 hidden h-3 w-3 -translate-y-1/2 rounded-full border-2 border-[#22C55E] bg-black sm:block"
                    aria-hidden="true"
                  />
                  <div>
                    <span className="mb-1 block text-xs font-bold uppercase tracking-widest text-[#22C55E]">
                      Coming Soon
                    </span>
                    <h3 className="font-display text-base font-bold text-white">
                      {item}
                    </h3>
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
