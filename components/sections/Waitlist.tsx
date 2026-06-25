"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { StoreBadge } from "@/components/ui/StoreBadge";
import {
  waitlistSchema,
  type WaitlistFormData,
} from "@/lib/schemas/waitlist";
import { WEB3FORMS_ACCESS_KEY } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Waitlist() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WaitlistFormData>({
    resolver: zodResolver(waitlistSchema),
    defaultValues: { botcheck: false },
  });

  const onSubmit = async (data: WaitlistFormData) => {
    if (data.botcheck) return;

    setStatus("idle");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "New Arivo Waitlist Signup",
          from_name: "Arivo Website",
          name: data.name,
          email: data.email,
          phone: data.phone,
          botcheck: "",
        }),
      });

      const result = await response.json();
      if (!response.ok || !result.success) throw new Error("Submit failed");

      reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="waitlist" aria-labelledby="waitlist-heading" className="bg-white py-24 lg:py-28">
      <div className="mx-auto max-w-container px-7">
        <Reveal className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="section-label">Early access</span>
            <h2 id="waitlist-heading" className="mb-4 font-display text-[clamp(1.75rem,4vw,2.5rem)] font-extrabold tracking-tight text-arivo-text">
              Join the first users of Arivo.
            </h2>
            <p className="mb-6 text-lg text-arivo-muted">
              Request access to the Financial Decision Engine — before your next big money move.
            </p>
            <ul className="space-y-3">
              {[
                "Free early access at launch",
                "Full decision engine previews",
                "Priority onboarding batch",
              ].map((perk) => (
                <li key={perk} className="flex items-center gap-2 text-sm text-arivo-text">
                  <svg viewBox="0 0 24 24" className="h-4 w-4 shrink-0 text-arivo-accent" aria-hidden="true">
                    <path fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  {perk}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[20px] border border-black/8 bg-arivo-surface p-6 sm:p-8">
            <div className="mb-6 flex items-center justify-between">
              <span className="text-sm font-bold text-arivo-text">Request access</span>
              <span className="rounded-full bg-arivo-primary/10 px-3 py-1 text-xs font-bold text-arivo-primary">
                Limited spots
              </span>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
              <input
                type="checkbox"
                {...register("botcheck")}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
                aria-hidden="true"
              />

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <Input
                    placeholder="Name"
                    autoComplete="name"
                    aria-invalid={!!errors.name}
                    {...register("name")}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-arivo-risk" role="alert">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <Input
                    type="tel"
                    placeholder="Phone"
                    autoComplete="tel"
                    aria-invalid={!!errors.phone}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-arivo-risk" role="alert">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="flex-1">
                  <Input
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                    aria-invalid={!!errors.email}
                    {...register("email")}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-arivo-risk" role="alert">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <Button type="submit" disabled={isSubmitting} className="shrink-0">
                  {isSubmitting ? "Requesting..." : "Request Access"}
                </Button>
              </div>
            </form>

            <div
              role="status"
              className={cn(
                "mt-4 hidden rounded-xl border border-arivo-primary/20 bg-arivo-primary/8 p-4 text-sm",
                status === "success" && "block"
              )}
            >
              <strong className="block text-arivo-text">You&apos;re on the list.</strong>
              <span className="text-arivo-muted">We&apos;ll reach out when your batch opens.</span>
            </div>

            <div
              role="alert"
              className={cn(
                "mt-4 hidden rounded-xl border border-arivo-risk/20 bg-arivo-risk/8 p-4 text-sm",
                status === "error" && "block"
              )}
            >
              <strong className="block text-arivo-text">Something went wrong.</strong>
              <span className="text-arivo-muted">
                Try again or email{" "}
                <a href="mailto:akhileshgoswami@arivoai.in" className="text-arivo-primary underline">
                  akhileshgoswami@arivoai.in
                </a>
              </span>
            </div>

            <p className="mt-4 text-xs text-arivo-muted">
              Launching soon · Limited early access
            </p>

            <div className="mt-4">
              <StoreBadge compact />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
