"use client";

import Link from "next/link";
import { Bot, Sparkles } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

export function MeetVeris() {
  return (
    <section id="meet-veris" aria-labelledby="meet-veris-heading" className="border-y border-ink/5 bg-page py-[120px]">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal className="mx-auto max-w-3xl text-center">
          <span className="section-label">Meet Veris</span>
          <h2
            id="meet-veris-heading"
            className="mb-6 font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-ink"
          >
            Stop Guessing. Start Knowing with AI-Powered Insights.
          </h2>
          <p className="mb-10 text-lg leading-relaxed text-ink-muted">
            Veris is the intelligence inside Arivo. It reads your real financial picture — income,
            spending, savings, and goals — and helps you decide with confidence before you commit.
          </p>

          <div className="mb-10 grid gap-4 sm:grid-cols-2">
            {[
              {
                icon: Bot,
                title: "Built for decisions",
                body: "Not just dashboards. Veris answers the questions that matter before you spend, borrow, or invest.",
              },
              {
                icon: Sparkles,
                title: "Grounded in your data",
                body: "Every insight is tied to your actual profile — not generic tips or one-size-fits-all advice.",
              },
            ].map((item) => (
              <div key={item.title} className="marketing-card p-6 text-left">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                  <item.icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <h3 className="mb-2 text-base font-bold text-ink">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">{item.body}</p>
              </div>
            ))}
          </div>

          <Link
            href="#financial-profile"
            className="inline-flex h-12 items-center rounded-full bg-accent-primary px-7 text-sm font-semibold text-[#08111A] shadow-glow transition-all hover:shadow-glow-lg"
          >
            See how it works
          </Link>
        </MotionReveal>
      </div>
    </section>
  );
}
