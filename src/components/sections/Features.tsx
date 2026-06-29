"use client";

import {
  LayoutDashboard,
  Bot,
  Target,
  LineChart,
  Shield,
  Sparkles,
} from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";

const features = [
  {
    icon: LayoutDashboard,
    title: "Complete Financial Picture",
    description: "See your balance, income, and expenses in one clean dashboard — updated in real time.",
  },
  {
    icon: Bot,
    title: "AI Financial Assistant",
    description: "Ask anything about your money and get answers grounded in your actual financial data.",
  },
  {
    icon: Target,
    title: "Goal Tracking",
    description: "Set savings goals and watch your progress with clear timelines and milestones.",
  },
  {
    icon: LineChart,
    title: "Smart Insights",
    description: "Understand spending patterns and get actionable insights without digging through spreadsheets.",
  },
  {
    icon: Shield,
    title: "Secure by Design",
    description: "Your data stays private. We never sell your information or push financial products.",
  },
  {
    icon: Sparkles,
    title: "Personalized Recommendations",
    description: "Get guidance tailored to your income, goals, and habits — not generic tips.",
  },
];

export function Features() {
  return (
    <section id="features" aria-labelledby="features-heading" className="py-[120px]">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal className="mb-16 text-center">
          <span className="section-label">WHAT ARIVO DOES</span>
          <h2
            id="features-heading"
            className="font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-ink"
          >
            Everything your financial life needs.
          </h2>
        </MotionReveal>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <MotionReveal key={feature.title} delay={i * 0.06}>
              <article className="group h-full rounded-2xl bg-white p-8 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_48px_rgba(0,0,0,0.1)]">
                <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-brand-green/10 text-brand-green transition-colors group-hover:bg-brand-green group-hover:text-[#08111A]">
                  <feature.icon className="h-5 w-5" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-ink">{feature.title}</h3>
                <p className="text-base leading-relaxed text-ink-muted">{feature.description}</p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
