import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Arivo — AI Personal Finance Companion",
    short_name: "Arivo",
    description:
      "Understand your money, track goals, and make smarter financial decisions with AI.",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0F17",
    theme_color: "#0B0F17",
    lang: "en-IN",
    orientation: "portrait-primary",
    categories: ["finance", "productivity"],
    icons: [
      {
        src: "/assets/arivo-icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/assets/arivo-icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/assets/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
