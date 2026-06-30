"use client";

import Link from "next/link";
import { Linkedin, Twitter, Instagram, Github } from "lucide-react";
import { MotionReveal } from "@/components/ui/MotionReveal";
import { GooglePlayButton } from "@/components/ui/GooglePlayButton";
import { SOCIAL_LINKS, SITE_URL } from "@/lib/constants/site";

const socialIcons = [
  { href: SOCIAL_LINKS.linkedin, label: "LinkedIn", Icon: Linkedin },
  { href: SOCIAL_LINKS.twitter, label: "Twitter/X", Icon: Twitter },
  { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: Instagram },
  { href: SOCIAL_LINKS.github, label: "GitHub", Icon: Github },
];

export function FooterCTA() {
  return (
    <section
      id="download"
      aria-labelledby="footer-cta-heading"
      className="border-t border-white/[0.06] py-24 lg:py-32"
    >
      <div className="mx-auto max-w-container px-7">
        <MotionReveal className="text-center">
          <h2
            id="footer-cta-heading"
            className="mb-6 font-display text-[clamp(1.75rem,4vw,2.75rem)] font-extrabold leading-tight tracking-tight text-white"
          >
            Ready to Take Control of Your Finances?
          </h2>

          <div className="mb-10 flex justify-center">
            <GooglePlayButton size="lg" />
          </div>

          <p className="mb-6 text-sm text-arivo-muted">
            Website{" "}
            <Link
              href={SITE_URL}
              className="font-medium text-accent-primary transition-colors hover:text-accent-primary"
            >
              arivoai.in
            </Link>
          </p>

          <div className="flex items-center justify-center gap-3">
            {socialIcons.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-arivo-muted transition-all hover:border-[#22C55E]/30 hover:bg-[#22C55E]/10 hover:text-accent-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
