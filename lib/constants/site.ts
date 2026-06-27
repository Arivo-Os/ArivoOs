export const SITE_URL = "https://arivoai.in";

/** Update with your Play Store package ID when available */
export const GOOGLE_PLAY_URL =
  process.env.NEXT_PUBLIC_GOOGLE_PLAY_URL ??
  "https://play.google.com/store/apps/details?id=in.arivoai.app";

export const SOCIAL_LINKS = {
  linkedin: "https://www.linkedin.com/company/125614133/",
  twitter: "https://x.com/arivoai",
  instagram: "https://instagram.com/arivoai",
  github: "https://github.com/arivoai",
} as const;
