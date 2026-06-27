"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Wallet,
  TrendingUp,
  Sparkles,
  Coins,
  Target,
  BarChart3,
} from "lucide-react";
import { GooglePlayButton } from "@/components/ui/GooglePlayButton";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { Button } from "@/components/ui/button";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { PLAY_STORE_LABEL } from "@/lib/constants/site";

const floatingElements = [
  { Icon: Wallet, className: "left-[8%] top-[18%] animate-float", delay: 0 },
  { Icon: TrendingUp, className: "right-[12%] top-[22%] animate-float-slow", delay: 0.5 },
  { Icon: Sparkles, className: "left-[15%] bottom-[28%] animate-float-slow", delay: 1 },
  { Icon: Coins, className: "right-[8%] bottom-[32%] animate-float", delay: 0.3 },
  { Icon: Target, className: "left-[5%] top-[45%] animate-float", delay: 0.8 },
  { Icon: BarChart3, className: "right-[5%] top-[50%] animate-float-slow", delay: 1.2 },
];

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-heading"
      className="relative min-h-screen overflow-hidden pt-[100px] pb-20"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_60%,rgba(34,197,94,0.06),transparent)]"
        aria-hidden="true"
      />

      <div className="relative mx-auto flex w-full max-w-container flex-col items-center gap-12 px-7 lg:flex-row lg:items-center lg:gap-16">
        <MotionReveal className="flex-1 text-center lg:text-left">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#22C55E]/20 bg-[#22C55E]/10 px-4 py-2 text-[13px] font-semibold text-[#22C55E] backdrop-blur-sm">
            <span aria-hidden="true">🚀</span>
            Now on Google Play · {PLAY_STORE_LABEL}
          </p>

          <h1
            id="hero-heading"
            className="mb-5 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold leading-[1.08] tracking-tight text-white"
          >
            Your Financial Life.{" "}
            <span className="text-gradient-green">One AI Companion.</span>
          </h1>

          <p className="mx-auto mb-8 max-w-[520px] text-[clamp(1rem,2.5vw,1.125rem)] leading-relaxed text-arivo-muted lg:mx-0">
            Understand your money, track your financial goals, and make smarter
            financial decisions with AI.
          </p>

          <div className="mb-6 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <GooglePlayButton size="lg" />
            <Button variant="ghost" asChild size="lg">
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.15} className="relative flex w-full max-w-[340px] flex-shrink-0 justify-center lg:max-w-[360px]">
          <div className="relative w-full">
            {floatingElements.map(({ Icon, className, delay }, i) => (
              <motion.div
                key={i}
                className={`pointer-events-none absolute z-10 hidden sm:flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-[#22C55E] backdrop-blur-md ${className}`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + delay, duration: 0.5 }}
                aria-hidden="true"
              >
                <Icon className="h-4 w-4" />
              </motion.div>
            ))}

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative z-[2]"
            >
              <div className="pointer-events-none absolute -inset-8 rounded-full bg-[#22C55E]/10 blur-3xl" aria-hidden="true" />
              <PhoneFrame
                src="/assets/app-screenshot.png"
                alt="Arivo app — AI financial decision engine showing vehicle purchase analysis"
                priority
                className="w-full"
              />
            </motion.div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
