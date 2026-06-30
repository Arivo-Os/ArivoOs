"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { waitlistSchema, type WaitlistFormData } from "@/lib/schemas/waitlist";
import { WEB3FORMS_ACCESS_KEY, cn } from "@/lib/utils";

interface WaitlistFormProps {
  className?: string;
}

export function WaitlistForm({ className }: WaitlistFormProps) {
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
        headers: { "Content-Type": "application/json", Accept: "application/json" },
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

  const inputClass =
    "h-12 w-full rounded-xl border border-white/15 bg-white/10 px-4 text-sm text-white placeholder:text-white/40 focus:border-accent-primary/50 focus:outline-none focus:ring-2 focus:ring-accent-primary/25";

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-3">
        <input type="checkbox" {...register("botcheck")} className="hidden" tabIndex={-1} autoComplete="off" aria-hidden="true" />

        <input id="wl-name" placeholder="Your name" autoComplete="name" aria-invalid={!!errors.name} className={inputClass} {...register("name")} />
        {errors.name && <p className="text-xs text-red-400">{errors.name.message}</p>}

        <input id="wl-email" type="email" placeholder="Email address" autoComplete="email" aria-invalid={!!errors.email} className={inputClass} {...register("email")} />
        {errors.email && <p className="text-xs text-red-400">{errors.email.message}</p>}

        <input id="wl-phone" type="tel" placeholder="Phone number" autoComplete="tel" aria-invalid={!!errors.phone} className={inputClass} {...register("phone")} />
        {errors.phone && <p className="text-xs text-red-400">{errors.phone.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="h-12 w-full rounded-full bg-accent-primary px-8 text-sm font-semibold text-[#08111A] shadow-glow transition-all hover:shadow-glow-lg disabled:opacity-60 sm:w-auto"
        >
          {isSubmitting ? "Joining..." : "Join the Waitlist"}
        </button>
      </form>

      {status === "success" && (
        <p role="status" className="mt-4 text-center text-sm text-accent-primary">
          You&apos;re on the list — we&apos;ll send your invite soon.
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="mt-4 text-center text-sm text-red-400">
          Something went wrong. Please try again.
        </p>
      )}
    </div>
  );
}
