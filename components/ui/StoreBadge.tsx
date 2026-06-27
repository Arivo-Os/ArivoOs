import Link from "next/link";
import { cn } from "@/lib/utils";
import { GOOGLE_PLAY_URL } from "@/lib/constants/site";

interface StoreBadgeProps {
  compact?: boolean;
  className?: string;
}

export function StoreBadge({ compact = false, className }: StoreBadgeProps) {
  return (
    <Link
      href={GOOGLE_PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm transition-all hover:border-[#22C55E]/30 hover:bg-[#22C55E]/10",
        className
      )}
      aria-label="Download Arivo on Google Play — Early Access"
    >
      <svg className="h-6 w-6 shrink-0 text-white" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12 6.05 21.34l8.49-8.49 2.27 2.27ZM20.16 10.81c.34.27.59.69.59 1.19s-.22.92-.57 1.19l-2.29 1.32-2.5-2.5 2.5-2.5 2.29 1.32ZM6.05 2.66 16.81 8.88 14.54 11.15 6.05 2.66Z"
        />
      </svg>
      <span className="flex flex-col leading-tight">
        {!compact && (
          <small className="text-[10px] font-medium uppercase tracking-wide text-arivo-muted">
            Get it on
          </small>
        )}
        <span className="font-display text-sm font-bold text-white">Google Play</span>
        {!compact && (
          <span className="text-[11px] font-semibold text-[#22C55E]">Early Access</span>
        )}
        {compact && (
          <span className="text-[10px] font-semibold text-[#22C55E]">Early Access</span>
        )}
      </span>
    </Link>
  );
}
