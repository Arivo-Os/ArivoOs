"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  accountDeletionSchema,
  type AccountDeletionFormData,
} from "@/lib/schemas/account-deletion";
import { WEB3FORMS_ACCESS_KEY, cn } from "@/lib/utils";

export function AccountDeletionForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<AccountDeletionFormData>({
    resolver: zodResolver(accountDeletionSchema),
    defaultValues: { email: "", reason: "", botcheck: false },
  });

  const onSubmit = async (data: AccountDeletionFormData) => {
    if (data.botcheck) return;

    setStatus("idle");

    const message = [
      "Account Deletion Request",
      "",
      `Full Name: ${data.fullName}`,
      `Registered Mobile: ${data.mobile}`,
      `Email: ${data.email || "Not provided"}`,
      `Reason: ${data.reason?.trim() || "Not provided"}`,
    ].join("\n");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,
          subject: "Account Deletion Request",
          from_name: "Arivo Website",
          name: data.fullName,
          email: data.email || "noreply@arivoai.in",
          message,
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
    <div className="form-card">
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
          <label htmlFor="deletionFullName" className="mb-1.5 block text-sm font-medium text-white">
            Full Name
          </label>
          <Input
            id="deletionFullName"
            placeholder="Your full name"
            autoComplete="name"
            aria-invalid={!!errors.fullName}
            {...register("fullName")}
          />
          {errors.fullName && (
            <p className="mt-1 text-xs text-arivo-risk" role="alert">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="deletionMobile" className="mb-1.5 block text-sm font-medium text-white">
            Registered Mobile Number
          </label>
          <Input
            id="deletionMobile"
            type="tel"
            inputMode="numeric"
            placeholder="10-digit mobile number"
            autoComplete="tel"
            aria-invalid={!!errors.mobile}
            {...register("mobile")}
          />
          {errors.mobile && (
            <p className="mt-1 text-xs text-arivo-risk" role="alert">
              {errors.mobile.message}
            </p>
          )}
        </div>

        <div>
          <label htmlFor="deletionEmail" className="mb-1.5 block text-sm font-medium text-white">
            Email <span className="font-normal text-arivo-muted">(optional)</span>
          </label>
          <Input
            id="deletionEmail"
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
          <label htmlFor="deletionReason" className="mb-1.5 block text-sm font-medium text-white">
            Reason <span className="font-normal text-arivo-muted">(optional)</span>
          </label>
          <Textarea
            id="deletionReason"
            placeholder="Tell us why you're deleting your account (optional)"
            rows={4}
            aria-invalid={!!errors.reason}
            {...register("reason")}
          />
        </div>

        <Button type="submit" disabled={isSubmitting} className="w-full sm:w-auto">
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>

      <div
        role="status"
        className={cn(
          "mt-4 hidden rounded-xl border border-[#22C55E]/20 bg-[#22C55E]/10 p-4 text-sm",
          status === "success" && "block"
        )}
      >
        <strong className="block text-white">Request submitted.</strong>
        <span className="text-arivo-muted">
          We&apos;ll verify your identity and process eligible deletion requests within 7 business days.
        </span>
      </div>

      <div
        role="alert"
        className={cn(
          "mt-4 hidden rounded-xl border border-arivo-risk/20 bg-arivo-risk/10 p-4 text-sm",
          status === "error" && "block"
        )}
      >
        <strong className="block text-white">Something went wrong.</strong>
        <span className="text-arivo-muted">
          Please try again or email{" "}
          <a
            href="mailto:hello@arivoai.in?subject=Account%20Deletion%20Request"
            className="link-accent"
          >
            hello@arivoai.in
          </a>{" "}
          with the subject &quot;Account Deletion Request&quot;.
        </span>
      </div>
    </div>
  );
}
