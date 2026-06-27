"use client";

import { MotionReveal } from "@/components/ui/MotionReveal";

const pillars = [
  { icon: "🔒", label: "Privacy First" },
  { icon: "✨", label: "AI Powered" },
  { icon: "🚀", label: "Early Access" },
  { icon: "💡", label: "Built for Modern Finance" },
];

export function SocialProofBar() {
  return (
    <section aria-label="Trust pillars" className="border-b border-ink/5 bg-white py-10">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
            {pillars.map((p) => (
              <li key={p.label} className="flex items-center gap-2 text-sm font-medium text-ink-muted">
                <span aria-hidden="true">{p.icon}</span>
                {p.label}
              </li>
            ))}
          </ul>
        </MotionReveal>
      </div>
    </section>
  );
}
