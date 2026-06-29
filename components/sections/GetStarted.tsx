"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { GooglePlayButton } from "@/components/ui/GooglePlayButton";
import { FlowQuestionPicker } from "@/components/onboarding/FlowQuestionPicker";
import { setFlowQuestion } from "@/lib/onboarding/flow-questions";

export function GetStarted() {
  const router = useRouter();
  const [question, setQuestion] = useState<string | null>(null);

  const continueToSignIn = () => {
    setFlowQuestion(question ?? "");
    router.push("/login/");
  };

  return (
    <section id="get-started" aria-labelledby="get-started-heading" className="py-[120px]">
      <div className="mx-auto max-w-container px-6 lg:px-8">
        <MotionReveal>
          <div className="relative overflow-hidden rounded-3xl hero-gradient p-10 sm:p-14 lg:p-16">
            <div
              className="pointer-events-none absolute inset-0 rounded-3xl border border-brand-green/30 shadow-[inset_0_0_60px_rgba(34,197,94,0.08)]"
              aria-hidden="true"
            />
            <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-brand-green/15 blur-3xl" aria-hidden="true" />

            <div className="relative mx-auto max-w-2xl text-center">
              <span className="section-label text-brand-green">Get Started</span>
              <h2
                id="get-started-heading"
                className="mb-4 font-display text-[clamp(2rem,5vw,3rem)] font-bold tracking-tight text-white"
              >
                What do you want to decide?
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-white/60">
                Pick a question Veris can help with. We&apos;ll take you to sign in, then straight into
                your answer.
              </p>

              <div className="rounded-2xl border border-white/10 bg-[#08111A]/40 p-6 text-left backdrop-blur-sm">
                <FlowQuestionPicker
                  value={question}
                  onChange={setQuestion}
                  variant="marketing"
                />
              </div>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button
                  type="button"
                  onClick={continueToSignIn}
                  className="inline-flex h-14 items-center gap-2 rounded-full bg-brand-green px-8 text-base font-semibold text-[#08111A] shadow-glow transition-all hover:shadow-glow-lg"
                >
                  {question ? "Continue with this question" : "Continue to sign in"}
                  <ArrowRight className="h-4 w-4" />
                </button>
                <GooglePlayButton size="lg" label="Get on Google Play" />
              </div>

              <p className="mt-6 text-sm text-white/40">
                Already have an account?{" "}
                <Link href="/login/" className="text-brand-green hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
