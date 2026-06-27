"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";

const features = [
  {
    emoji: "💰",
    title: "Financial Dashboard",
    description: "View your complete financial picture.",
  },
  {
    emoji: "🤖",
    title: "AI Assistant",
    description: "Ask questions and receive intelligent financial insights.",
  },
  {
    emoji: "🎯",
    title: "Goal Tracking",
    description: "Stay focused on savings and financial goals.",
  },
  {
    emoji: "📊",
    title: "Smart Analytics",
    description: "Understand where your money goes.",
  },
  {
    emoji: "🔒",
    title: "Secure by Design",
    description: "Your privacy comes first.",
  },
];

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="py-24 lg:py-32"
    >
      <div className="mx-auto max-w-container px-7">
        <MotionReveal className="mb-14 text-center">
          <span className="section-label">Features</span>
          <h2
            id="features-heading"
            className="font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white"
          >
            Everything You Need to Manage Your Money
          </h2>
        </MotionReveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, i) => (
            <MotionReveal key={feature.title} delay={i * 0.08}>
              <article className="glass-card-hover h-full p-7">
                <span className="mb-4 block text-3xl" aria-hidden="true">
                  {feature.emoji}
                </span>
                <h3 className="mb-2 font-display text-lg font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-sm leading-relaxed text-arivo-muted">
                  {feature.description}
                </p>
              </article>
            </MotionReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
