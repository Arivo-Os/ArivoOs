"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneMockup, type PhoneScreen } from "@/components/ui/PhoneMockup";
import { cn } from "@/lib/utils";

interface FlowShowcaseProps {
  id?: string;
  label?: string;
  title: string;
  body: string;
  screen: PhoneScreen;
  reverse?: boolean;
  className?: string;
  tone?: "light" | "dark";
}

export function FlowShowcase({
  id,
  label,
  title,
  body,
  screen,
  reverse = false,
  className,
  tone = "light",
}: FlowShowcaseProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const dark = tone === "dark";

  return (
    <section
      id={id}
      aria-labelledby={id ? `${id}-heading` : undefined}
      className={cn(
        "py-[120px]",
        dark ? "hero-gradient" : "bg-surface",
        className
      )}
    >
      <div ref={ref} className="mx-auto grid max-w-container items-center gap-12 px-6 lg:grid-cols-2 lg:gap-20 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: reverse ? 40 : -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={reverse ? "lg:order-2" : ""}
        >
          <div className="flex justify-center">
            <PhoneMockup screen={screen} assistantName="Veris" />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: reverse ? -40 : 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className={reverse ? "lg:order-1" : ""}
        >
          {label && <span className={cn("section-label", dark && "text-brand-green")}>{label}</span>}
          <h2
            id={id ? `${id}-heading` : undefined}
            className={cn(
              "mb-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-bold tracking-tight",
              dark ? "text-white" : "text-ink"
            )}
          >
            {title}
          </h2>
          <p className={cn("text-lg leading-relaxed", dark ? "text-white/60" : "text-ink-muted")}>{body}</p>
        </motion.div>
      </div>
    </section>
  );
}
