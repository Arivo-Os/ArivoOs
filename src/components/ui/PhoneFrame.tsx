import Image from "next/image";
import { cn } from "@/lib/utils";

interface PhoneFrameProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}

export function PhoneFrame({ src, alt, className, priority = false }: PhoneFrameProps) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[2.5rem] border-[3px] border-white/10 bg-[#0a0a0a] shadow-[0_32px_80px_rgba(0,0,0,0.6),0_0_60px_rgba(34,197,94,0.08)]",
        className
      )}
    >
      <div className="absolute left-1/2 top-3 z-10 h-[22px] w-[90px] -translate-x-1/2 rounded-full bg-black/80" aria-hidden="true" />
      <div className="relative aspect-[9/19.5] w-full">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover object-top"
          sizes="(max-width: 768px) 280px, 320px"
          priority={priority}
        />
      </div>
    </div>
  );
}
