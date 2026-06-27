import Link from "next/link";
import { cn } from "@/lib/utils";
import { GOOGLE_PLAY_URL } from "@/lib/constants/site";

interface GooglePlayButtonProps {
  className?: string;
  size?: "default" | "lg";
  label?: string;
}

export function GooglePlayButton({
  className,
  size = "default",
  label = "Download on Google Play",
}: GooglePlayButtonProps) {
  return (
    <Link
      href={GOOGLE_PLAY_URL}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden rounded-full font-semibold text-black transition-all duration-300",
        "bg-[#22C55E] shadow-[0_0_24px_rgba(34,197,94,0.35)] hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(34,197,94,0.5)]",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent before:opacity-0 before:transition-opacity group-hover:before:opacity-100",
        size === "lg" ? "h-14 px-8 text-base" : "h-12 px-7 text-[15px]",
        className
      )}
    >
      <svg className="relative h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="M3 20.5V3.5C3 2.91 3.34 2.39 3.84 2.15L13.69 12 3.84 21.85C3.34 21.6 3 21.09 3 20.5ZM16.81 15.12 6.05 21.34l8.49-8.49 2.27 2.27ZM20.16 10.81c.34.27.59.69.59 1.19s-.22.92-.57 1.19l-2.29 1.32-2.5-2.5 2.5-2.5 2.29 1.32ZM6.05 2.66 16.81 8.88 14.54 11.15 6.05 2.66Z"
        />
      </svg>
      <span className="relative">{label}</span>
    </Link>
  );
}
