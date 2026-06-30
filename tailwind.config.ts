import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "var(--bg-primary)",
          surface: "var(--bg-surface)",
          card: "var(--bg-surface)",
          "card-hover": "var(--bg-surface-raised)",
          border: "var(--border-default)",
          "border-strong": "var(--border-strong)",
          text: "var(--text-primary)",
          muted: "var(--text-secondary)",
          accent: "var(--accent-primary)",
          "accent-muted": "var(--accent-primary-muted)",
          success: "var(--accent-positive)",
          warning: "var(--accent-caution)",
          danger: "var(--accent-negative)",
          info: "var(--accent-primary)",
        },
        page: "var(--bg-primary)",
        surface: "var(--bg-surface)",
        hero: {
          from: "#0B0F17",
          to: "#161C2C",
        },
        brand: {
          green: "#4ADE80",
          teal: "#14B8A6",
          blue: "#3B82F6",
          amber: "#E8A33D",
          coral: "#F0654A",
        },
        ink: {
          DEFAULT: "var(--text-primary)",
          muted: "var(--text-secondary)",
          subtle: "var(--text-muted)",
        },
        arivo: {
          primary: "#E8A33D",
          accent: "#4ADE80",
          bg: "#0B0F17",
          surface: "#0F1420",
          text: "#F5F5F0",
          muted: "#9CA3AF",
          border: "#1F2533",
          risk: "#F0654A",
          warning: "#E8A33D",
        },
        /* New explicit tokens */
        "bg-primary": "var(--bg-primary)",
        "bg-surface": "var(--bg-surface)",
        "bg-surface-raised": "var(--bg-surface-raised)",
        "accent-primary": "var(--accent-primary)",
        "accent-primary-hover": "var(--accent-primary-hover)",
        "accent-primary-muted": "var(--accent-primary-muted)",
        "accent-positive": "var(--accent-positive)",
        "accent-positive-muted": "var(--accent-positive-muted)",
        "accent-negative": "var(--accent-negative)",
        "accent-negative-muted": "var(--accent-negative-muted)",
        "accent-caution": "var(--accent-caution)",
        "accent-caution-muted": "var(--accent-caution-muted)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "text-muted": "var(--text-muted)",
        "text-on-accent": "var(--text-on-accent)",
        "text-on-positive": "var(--text-on-positive)",
        "border-default": "var(--border-default)",
        "border-strong": "var(--border-strong)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "var(--bg-primary)",
        foreground: "var(--text-primary)",
        primary: {
          DEFAULT: "var(--accent-primary)",
          foreground: "var(--text-on-accent)",
        },
        secondary: {
          DEFAULT: "var(--bg-surface-raised)",
          foreground: "var(--text-primary)",
        },
        destructive: {
          DEFAULT: "var(--accent-negative)",
          foreground: "var(--text-primary)",
        },
        muted: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--text-secondary)",
        },
        accent: {
          DEFAULT: "var(--accent-primary)",
          foreground: "var(--text-on-accent)",
        },
        popover: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--text-primary)",
        },
        card: {
          DEFAULT: "var(--bg-surface)",
          foreground: "var(--text-primary)",
        },
      },
      fontFamily: {
        sans: ["Geist", "system-ui", "sans-serif"],
        display: ["Geist", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-lg": ["3rem", { lineHeight: "1.05", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-md": ["2.25rem", { lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "700" }],
        "display-sm": ["1.5rem", { lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      spacing: {
        18: "4.5rem",
        22: "5.5rem",
      },
      boxShadow: {
        card: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px rgba(15, 23, 42, 0.06)",
        "card-hover": "0 4px 12px rgba(15, 23, 42, 0.08), 0 16px 40px rgba(15, 23, 42, 0.08)",
        glow: "0 0 40px rgba(34, 197, 94, 0.35)",
        "glow-lg": "0 0 60px rgba(34, 197, 94, 0.45)",
        "app-sm": "0 1px 2px rgba(0, 0, 0, 0.24), 0 0 0 1px rgba(255, 255, 255, 0.04)",
        "app-md": "0 8px 32px rgba(0, 0, 0, 0.32), 0 0 0 1px rgba(255, 255, 255, 0.04)",
        "app-lg": "0 24px 64px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.06)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
        "2xl": "1rem",
        "3xl": "1.25rem",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        bob: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "float-delayed": {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 24px rgba(45, 212, 168, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(45, 212, 168, 0.35)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        bob: "bob 5s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
        "float-delayed": "float-delayed 7s ease-in-out infinite 1s",
        "glow-pulse": "glow-pulse 2.5s ease-in-out infinite",
        shimmer: "shimmer 1.8s ease-in-out infinite",
        "fade-in": "fade-in 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      },
      maxWidth: {
        container: "1140px",
      },
      transitionDuration: {
        550: "550ms",
        900: "900ms",
      },
      transitionTimingFunction: {
        smooth: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
