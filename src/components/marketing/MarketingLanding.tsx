"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Brain,
  Shield,
  Target,
  Route,
  Vault,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "@/features/auth/context/auth-context";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { VerisPreview } from "@/components/marketing/VerisPreview";

const steps = [
  { step: "1", title: "Connect your financial profile", body: "Build a secure picture of income, savings, debt, and goals." },
  { step: "2", title: "Ask Veris a financial question", body: "Plain language — car, loan, trip, investment, or move." },
  { step: "3", title: "Receive an AI-powered recommendation", body: "Clear guidance with confidence, risk, and reasoning." },
];

const features = [
  { icon: Brain, title: "AI Financial Decisions", body: "Personalized answers before you spend, borrow, or invest." },
  { icon: Sparkles, title: "Financial Health Score", body: "Understand your position at a glance." },
  { icon: Target, title: "Smart Recommendations", body: "Grounded in your real numbers — not generic tips." },
  { icon: Target, title: "Goal Tracking", body: "Set targets and track progress with clear timelines." },
  { icon: Route, title: "Journey Timeline", body: "See decisions, milestones, and conversations over time." },
  { icon: Vault, title: "Financial Vault", body: "Your secure profile — income, savings, debt, net worth." },
];

export function MarketingLanding() {
  const { isAuthenticated, isLoading } = useAuth();
  return (
    <main className="bg-app-bg">
      <section className="hero-gradient relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="pointer-events-none absolute -right-32 top-20 h-96 w-96 rounded-full bg-app-accent/10 blur-3xl" />
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 font-display text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold leading-[1.05] tracking-tight text-app-text"
            >
              Your Financial Decisions. Backed by AI.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 max-w-lg text-lg leading-relaxed text-app-muted"
            >
              Ask Arivo before every purchase, investment, loan, or major financial decision.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap gap-3"
            >
              {!isLoading && isAuthenticated ? (
                <Link
                  href="/life/"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-app-accent px-7 text-sm font-semibold text-app-bg transition-all hover:brightness-110"
                >
                  Use Arivo
                  <ArrowRight className="h-4 w-4" />
                </Link>
              ) : (
                <>
                  <Link
                    href="/#get-started"
                    className="inline-flex h-12 items-center gap-2 rounded-full bg-app-accent px-7 text-sm font-semibold text-app-bg transition-all hover:brightness-110"
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex h-12 items-center rounded-full border border-app-border bg-app-card px-7 text-sm font-semibold text-app-text transition-colors hover:border-app-accent/40"
                  >
                    Sign In
                  </Link>
                </>
              )}
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 }}
            className="hidden lg:block"
          >
            <VerisPreview />
          </motion.div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-app-border py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <MotionReveal className="mb-14 text-center">
            <span className="section-label">How Arivo Works</span>
            <h2 className="font-display text-3xl font-bold text-app-text sm:text-4xl">Three simple steps</h2>
          </MotionReveal>
          <div className="grid gap-6 md:grid-cols-3">
            {steps.map((item, i) => (
              <MotionReveal key={item.step} delay={i * 0.08}>
                <div className="rounded-2xl border border-app-border bg-app-card p-8">
                  <span className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-app-accent/15 text-sm font-bold text-app-accent">
                    {item.step}
                  </span>
                  <h3 className="mb-2 text-lg font-bold text-app-text">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-app-muted">{item.body}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="features" className="py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <MotionReveal className="mb-14 text-center">
            <span className="section-label">Features</span>
            <h2 className="font-display text-3xl font-bold text-app-text sm:text-4xl">Everything in one application</h2>
          </MotionReveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <MotionReveal key={f.title} delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-app-border bg-app-card p-6 transition-colors hover:border-app-accent/30">
                  <f.icon className="mb-4 h-6 w-6 text-app-accent" />
                  <h3 className="mb-2 font-bold text-app-text">{f.title}</h3>
                  <p className="text-sm leading-relaxed text-app-muted">{f.body}</p>
                </div>
              </MotionReveal>
            ))}
          </div>
        </div>
      </section>

      <section id="security" className="border-t border-app-border bg-app-card/30 py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <MotionReveal>
            <Shield className="mx-auto mb-4 h-10 w-10 text-app-accent" />
            <h2 className="mb-4 font-display text-3xl font-bold text-app-text">Secure by design</h2>
            <p className="mb-8 text-app-muted">
              Your financial data is encrypted, never sold, and never used for advertising. Arivo exists to help you decide — not to sell products.
            </p>
            {!isLoading && isAuthenticated ? (
              <Link href="/life/" className="inline-flex h-12 items-center rounded-full bg-app-accent px-8 text-sm font-semibold text-app-bg">
                Use Arivo
              </Link>
            ) : (
              <Link href="/#get-started" className="inline-flex h-12 items-center rounded-full bg-app-accent px-8 text-sm font-semibold text-app-bg">
                Get Started
              </Link>
            )}
          </MotionReveal>
        </div>
      </section>
    </main>
  );
}
