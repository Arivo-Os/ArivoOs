"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}

export function Reveal({ children, className, stagger = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const show = () => el.classList.add("visible");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          show();
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -20px 0px" }
    );

    observer.observe(el);

    // Show immediately if already in the viewport (e.g. on page load)
    requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 20 && rect.bottom > 0) {
        show();
        observer.disconnect();
      }
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(stagger ? "reveal-stagger reveal" : "reveal", className)}
    >
      {children}
    </div>
  );
}
