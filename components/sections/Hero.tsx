"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { PhoneMockup } from "@/components/ui/PhoneMockup";

const trustItems = [
  { icon: "⭐", label: "AI Powered" },
  { icon: "🔒", label: "Privacy First" },
  { icon: "⚡", label: "Built for Speed" },
  { icon: "📊", label: "Smart Insights" },
];

const floatCards = [
  { label: "Goal: Europe Trip", value: "38%", className: "left-0 top-[12%] animate-float", delay: 0 },
  { label: "Net Worth", value: "↑12.5%", className: "right-0 top-[8%] animate-float-delayed", delay: 0.2 },
  { label: "Ask Arivo", value: "Ready", className: "left-[-8%] bottom-[28%] animate-float-delayed", delay: 0.4 },
  { label: "Monthly Spend", value: "₹25,000", className: "right-[-6%] bottom-[22%] animate-float", delay: 0.6 },
];

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero-gradient overflow-hidden pt-28 pb-20 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid max-w-container items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/80 backdrop-blur-sm"
          >
            🔒 Closed Beta · Now on Google Play
          </motion.p>

          <motion.h1
            id="hero-heading"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-6 font-display text-[clamp(2.5rem,7vw,4.5rem)] font-extrabold leading-[1.05] tracking-[-0.03em] text-white"
          >
            Your Financial Life.
            <br />
            One AI Companion.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-8 max-w-lg text-lg leading-relaxed text-white/60"
          >
            Understand your money, track goals, and make smarter decisions — all with one AI.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mb-10 flex flex-wrap gap-3"
          >
            <Link
              href="#early-access"
              className="inline-flex h-12 items-center rounded-full bg-brand-green px-7 text-sm font-semibold text-[#08111A] shadow-glow transition-all hover:shadow-glow-lg hover:animate-glow-pulse"
            >
              Join the Waitlist
            </Link>
            <Link
              href="#showcase"
              className="inline-flex h-12 items-center rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See how it works ↓
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white/50"
          >
            {trustItems.map((item) => (
              <span key={item.label}>
                {item.icon} {item.label}
              </span>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          className="relative mx-auto w-full max-w-[360px] lg:max-w-none"
        >
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-green/20 blur-[80px]" aria-hidden="true" />

          {floatCards.map((card) => (
            <div
              key={card.label}
              className={`glass-dark pointer-events-none absolute z-10 hidden rounded-xl px-3 py-2 sm:block ${card.className}`}
            >
              <p className="text-[10px] text-white/50">{card.label}</p>
              <p className="text-xs font-bold text-white">{card.value}</p>
            </div>
          ))}

          <div className="relative z-[2] animate-bob">
            <PhoneMockup screen="dashboard" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
