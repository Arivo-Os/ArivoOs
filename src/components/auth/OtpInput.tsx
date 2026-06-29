"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  autoFocus?: boolean;
}

export function OtpInput({
  value,
  onChange,
  length = 6,
  disabled = false,
  autoFocus = false,
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const digits = value.padEnd(length, " ").slice(0, length).split("");

  useEffect(() => {
    if (autoFocus) inputsRef.current[0]?.focus();
  }, [autoFocus]);

  const updateDigit = (index: number, digit: string) => {
    const clean = digit.replace(/\D/g, "").slice(-1);
    const next = digits.map((d, i) => (i === index ? clean : d.trim())).join("").slice(0, length);
    onChange(next);

    if (clean && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, key: string) => {
    if (key === "Backspace" && !digits[index]?.trim() && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handlePaste = (text: string) => {
    const pasted = text.replace(/\D/g, "").slice(0, length);
    if (!pasted) return;
    onChange(pasted);
    const focusIndex = Math.min(pasted.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex justify-center gap-2 sm:gap-3">
      {digits.map((digit, index) => (
        <input
          key={index}
          ref={(el) => {
            inputsRef.current[index] = el;
          }}
          type="text"
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          disabled={disabled}
          value={digit.trim()}
          aria-label={`Digit ${index + 1}`}
          onChange={(e) => updateDigit(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e.key)}
          onPaste={(e) => {
            e.preventDefault();
            handlePaste(e.clipboardData.getData("text"));
          }}
          className={cn(
            "h-12 w-10 rounded-xl border bg-app-bg text-center text-lg font-semibold text-app-text sm:h-14 sm:w-12",
            "transition-all duration-200 focus:border-app-accent focus:outline-none focus:ring-2 focus:ring-app-accent/30",
            "disabled:cursor-not-allowed disabled:opacity-50",
            digit.trim() ? "border-app-accent/40" : "border-app-border"
          )}
        />
      ))}
    </div>
  );
}
