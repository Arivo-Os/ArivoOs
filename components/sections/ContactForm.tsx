"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  contactSchema,
  type ContactFormData,
} from "@/lib/schemas/contact";
import { WEB3FORMS_ACCESS_KEY, cn } from "@/lib/utils";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: { botcheck: false },
  });

  const onSubmit = async (data: ContactFormData) => {
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
          subject: "New Arivo Contact Form Message",
          from_name: "Arivo Website",
          name: data.name,
          email: data.email,
          message: data.message,
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
    <div className="rounded-[20px] border border-black/8 bg-arivo-surface p-6 sm:p-8">
      <div className="mb-6 flex items-center justify-between">
        <span className="text-sm font-bold text-arivo-text">Send a message</span>
        <span className="rounded-full bg-arivo-primary/10 px-3 py-1 text-xs font-bold text-arivo-primary">
          We read every note
        </span>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        <input
          type="checkbox"
          {...register("botcheck")}
          className="hidden"
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
        />

        <div>
          <label htmlFor="contactName" className="mb-1.5 block text-sm font-medium text-arivo-text">
            Your name
          </label>
          <Input
            id="contactName"
            placeholder="John Doe"
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
          <label htmlFor="contactEmail" className="mb-1.5 block text-sm font-medium text-arivo-text">
            Email address
          </label>
          <Input
            id="contactEmail"
            type="email"
            placeholder="you@example.com"
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

        <div>
          <label htmlFor="contactMessage" className="mb-1.5 block text-sm font-medium text-arivo-text">
            Your message
          </label>
          <Textarea
            id="contactMessage"
            placeholder="Tell us how we can help…"
            rows={5}
            aria-invalid={!!errors.message}
            {...register("message")}
          />
          {errors.message && (
            <p className="mt-1 text-xs text-arivo-risk" role="alert">
              {errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </form>

      <div
        role="status"
        className={cn(
          "mt-4 hidden rounded-xl border border-arivo-primary/20 bg-arivo-primary/8 p-4 text-sm",
          status === "success" && "block"
        )}
      >
        <strong className="block text-arivo-text">Message sent.</strong>
        <span className="text-arivo-muted">Thanks for reaching out — we&apos;ll reply soon.</span>
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
          Please try again or email{" "}
          <a href="mailto:akhileshgoswami@arivoai.in" className="text-arivo-primary underline">
            akhileshgoswami@arivoai.in
          </a>{" "}
          directly.
        </span>
      </div>
    </div>
  );
}
