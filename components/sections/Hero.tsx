"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Sparkles,
  ShieldCheck,
  Zap,
  BarChart3,
  Lock,
  Target,
  TrendingUp,
  MessageCircle,
  Wallet,
  ChevronDown,
} from "lucide-react";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { TrustPill } from "@/components/ui/TrustPill";
import { IconBadge } from "@/components/ui/TrustPill";

const trustItems = [
  { icon: Sparkles, label: "AI Powered" },
  { icon: ShieldCheck, label: "Privacy First" },
  { icon: Zap, label: "Built for Speed" },
  { icon: BarChart3, label: "Smart Insights" },
];

const floatCards = [
  { icon: Target, label: "Goal: Europe Trip", value: "38%", className: "left-0 top-[12%] animate-float" },
  { icon: TrendingUp, label: "Net Worth", value: "↑12.5%", className: "right-0 top-[8%] animate-float-delayed" },
  { icon: MessageCircle, label: "Ask Arivo", value: "Ready", className: "left-[-8%] bottom-[28%] animate-float-delayed" },
  { icon: Wallet, label: "Monthly Spend", value: "₹25,000", className: "right-[-6%] bottom-[22%] animate-float" },
];

export function Hero() {
  return (
    <section id="hero" aria-labelledby="hero-heading" className="hero-gradient overflow-hidden pt-28 pb-20 lg:pb-28 lg:pt-36">
      <div className="mx-auto grid max-w-container items-center gap-14 px-6 lg:grid-cols-2 lg:gap-16 lg:px-8">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6"
          >
            <IconBadge icon={Lock} variant="dark">
              Closed Beta · Now on Google Play
            </IconBadge>
          </motion.div>

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
              className="inline-flex h-12 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-7 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              See how it works
              <ChevronDown className="h-4 w-4 opacity-70" aria-hidden="true" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
            className="flex flex-wrap gap-x-6 gap-y-3"
          >
            {trustItems.map((item) => (
              <TrustPill key={item.label} icon={item.icon} label={item.label} variant="dark" />
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

          {floatCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.label}
                className={`glass-dark pointer-events-none absolute z-10 hidden rounded-xl px-3 py-2.5 sm:flex sm:items-center sm:gap-2.5 ${card.className}`}
              >
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-green/15 text-brand-green">
                  <Icon className="h-3.5 w-3.5" strokeWidth={2} aria-hidden="true" />
                </span>
                <div>
                  <p className="text-[10px] text-white/50">{card.label}</p>
                  <p className="text-xs font-bold text-white">{card.value}</p>
                </div>
              </div>
            );
          })}

          <div className="relative z-[2] animate-bob">
            <PhoneMockup screen="dashboard" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
