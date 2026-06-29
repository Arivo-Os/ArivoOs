"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const messages = [
  { role: "user" as const, text: "Can I afford this car?" },
  { role: "assistant" as const, text: "Let me analyze your financial profile." },
];

export function VerisPreview() {
  const [visible, setVisible] = useState(0);
  const [typing, setTyping] = useState(false);

  useEffect(() => {
    const t = setInterval(() => {
      setTyping(true);
      setTimeout(() => {
        setVisible((v) => (v + 1) % (messages.length + 1));
        setTyping(false);
      }, 1200);
    }, 3200);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="rounded-3xl border border-app-border bg-app-card p-6 shadow-[0_24px_80px_rgba(0,0,0,0.4)]">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-app-accent/20 text-xs font-bold text-app-accent">
            V
          </span>
          <span className="font-semibold text-app-text">Veris Decision Engine</span>
        </div>
        <Badge variant="accent">Live preview</Badge>
      </div>
      <div className="space-y-3 rounded-2xl bg-app-bg p-4">
        {messages.slice(0, visible).map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className={m.role === "user" ? "flex justify-end" : ""}
          >
            <div
              className={
                m.role === "user"
                  ? "max-w-[85%] rounded-2xl rounded-br-sm bg-app-accent px-4 py-2.5 text-sm font-medium text-app-bg"
                  : "max-w-[90%] rounded-2xl rounded-bl-sm border border-app-border bg-app-card px-4 py-2.5 text-sm text-app-muted"
              }
            >
              {m.text}
            </div>
          </motion.div>
        ))}
        {typing && (
          <div className="flex gap-1 px-2">
            <span className="h-2 w-2 animate-bounce rounded-full bg-app-accent [animation-delay:0ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-app-accent [animation-delay:150ms]" />
            <span className="h-2 w-2 animate-bounce rounded-full bg-app-accent [animation-delay:300ms]" />
          </div>
        )}
      </div>
      <div className="mt-4 grid grid-cols-3 gap-2 text-center">
        {[
          { label: "Confidence", value: "74%" },
          { label: "Risk", value: "Medium" },
          { label: "EMI fit", value: "Tight" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl bg-app-bg p-3">
            <p className="text-[10px] uppercase tracking-wider text-app-muted">{m.label}</p>
            <p className="text-sm font-bold text-app-text">{m.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
