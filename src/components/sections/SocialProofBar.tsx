"use client";

import { ShieldCheck, Sparkles, Rocket, Lightbulb } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { TrustPill } from "@/components/ui/TrustPill";

const pillars = [
  { icon: ShieldCheck, label: "Privacy First" },
  { icon: Sparkles, label: "AI Powered" },
  { icon: Rocket, label: "Early Access" },
  { icon: Lightbulb, label: "Built for Modern Finance" },
];

export function SocialProofBar() {
  return (
    <section aria-label="Trust pillars" className="border-b border-ink/5 bg-page py-10">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-5">
            {pillars.map((p) => (
              <li key={p.label}>
                <TrustPill icon={p.icon} label={p.label} variant="light" />
              </li>
            ))}
          </ul>
        </MotionReveal>
      </div>
    </section>
  );
}
