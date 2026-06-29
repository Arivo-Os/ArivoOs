"use client";

import { useState } from "react";
import { FLOW_QUESTIONS } from "@/lib/onboarding/flow-questions";
import { cn } from "@/lib/utils";

interface FlowQuestionPickerProps {
  value: string | null;
  onChange: (question: string | null) => void;
  className?: string;
  variant?: "app" | "marketing";
}

export function FlowQuestionPicker({
  value,
  onChange,
  className,
  variant = "app",
}: FlowQuestionPickerProps) {
  const [custom, setCustom] = useState(() => {
    if (value && !FLOW_QUESTIONS.includes(value as (typeof FLOW_QUESTIONS)[number])) {
      return value;
    }
    return "";
  });

  const isMarketing = variant === "marketing";

  const selectPreset = (question: string) => {
    setCustom("");
    onChange(value === question ? null : question);
  };

  const onCustomChange = (text: string) => {
    setCustom(text);
    onChange(text.trim() || null);
  };

  const pillClass = (selected: boolean) =>
    cn(
      "rounded-full border px-4 py-2 text-sm transition-colors",
      isMarketing
        ? selected
          ? "border-brand-green bg-brand-green/15 text-brand-green"
          : "border-white/15 bg-white/5 text-white/80 hover:text-white"
        : selected
          ? "border-app-accent bg-app-accent/15 text-app-accent"
          : "border-app-border bg-app-card text-app-muted hover:text-app-text"
    );

  const inputClass = cn(
    "w-full rounded-xl border px-4 py-3 text-sm focus:outline-none focus:ring-2",
    isMarketing
      ? "border-white/15 bg-white/5 text-white placeholder:text-white/40 focus:border-brand-green/50 focus:ring-brand-green/20"
      : "border-app-border bg-app-bg text-app-text placeholder:text-app-muted focus:border-app-accent/50 focus:ring-app-accent/20"
  );

  return (
    <div className={className}>
      <div className="flex flex-wrap justify-center gap-2">
        {FLOW_QUESTIONS.map((question) => (
          <button
            key={question}
            type="button"
            onClick={() => selectPreset(question)}
            className={pillClass(value === question)}
          >
            {question}
          </button>
        ))}
      </div>

      <div className="mt-4">
        <label
          htmlFor="flow-question-custom"
          className={cn(
            "mb-1.5 block text-center text-xs",
            isMarketing ? "text-white/50" : "text-app-muted"
          )}
        >
          Or type your own question
        </label>
        <input
          id="flow-question-custom"
          type="text"
          value={custom}
          onChange={(e) => onCustomChange(e.target.value)}
          placeholder="e.g. Can I afford a ₹12L home loan?"
          className={inputClass}
        />
      </div>
    </div>
  );
}
