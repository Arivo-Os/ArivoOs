"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { PhoneMockup, type PhoneScreen } from "@/components/ui/PhoneMockup";

const rows: {
  screen: PhoneScreen;
  title: string;
  body: string;
  reverse?: boolean;
}[] = [
  {
    screen: "dashboard",
    title: "Your complete financial dashboard",
    body: "Balance, income, expenses, and goals — everything in one place. No switching between apps.",
  },
  {
    screen: "chat",
    title: "Ask Arivo anything",
    body: "From big purchases to investment timing, get clear answers backed by your real financial picture.",
    reverse: true,
  },
  {
    screen: "goals",
    title: "Every goal has a plan",
    body: "Set targets, track progress, and know exactly when you'll reach them — with AI keeping you on course.",
  },
];

function ShowcaseRow({
  row,
  reverse,
}: {
  row: (typeof rows)[0];
  reverse?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div
      ref={ref}
      className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${reverse ? "" : ""}`}
    >
      <motion.div
        initial={{ opacity: 0, x: reverse ? 40 : -40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={reverse ? "lg:order-2" : ""}
      >
        <div className="flex justify-center">
          <PhoneMockup screen={row.screen} />
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: reverse ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
        className={reverse ? "lg:order-1" : ""}
      >
        <h3 className="mb-4 font-display text-[clamp(1.75rem,4vw,2.25rem)] font-bold tracking-tight text-ink">
          {row.title}
        </h3>
        <p className="text-lg leading-relaxed text-ink-muted">{row.body}</p>
      </motion.div>
    </div>
  );
}

export function ProductShowcase() {
  return (
    <section id="showcase" aria-labelledby="showcase-heading" className="bg-white py-[120px]">
      <div className="mx-auto max-w-container space-y-24 px-6 lg:px-8">
        {rows.map((row) => (
          <ShowcaseRow key={row.title} row={row} reverse={row.reverse} />
        ))}
      </div>
    </section>
  );
}
