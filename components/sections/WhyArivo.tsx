"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";

const stats = [
  { value: "One AI", label: "Your entire financial life, unified" },
  { value: "All your finances", label: "Balance, goals, and insights together" },
  { value: "Smarter decisions", label: "Guidance grounded in your data" },
];

export function WhyArivo() {
  return (
    <section id="why" aria-labelledby="why-heading" className="hero-gradient py-[120px]">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal className="mb-14 text-center">
          <h2
            id="why-heading"
            className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white"
          >
            Finance should feel simple.
          </h2>
        </MotionReveal>

        <div className="mb-12 grid gap-5 sm:grid-cols-3">
          {stats.map((stat, i) => (
            <MotionReveal key={stat.value} delay={i * 0.08}>
              <article className="glass-dark rounded-2xl p-8 text-center">
                <p className="mb-2 font-display text-2xl font-bold text-brand-green">{stat.value}</p>
                <p className="text-sm leading-relaxed text-white/55">{stat.label}</p>
              </article>
            </MotionReveal>
          ))}
        </div>

        <MotionReveal delay={0.2}>
          <p className="mx-auto max-w-2xl text-center text-lg leading-relaxed text-white/60">
            Managing money shouldn&apos;t require multiple apps and spreadsheets. Arivo combines AI with personal finance to help you understand your finances and make better decisions every day.
          </p>
        </MotionReveal>
      </div>
    </section>
  );
}
