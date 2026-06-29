import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        app: {
          bg: "var(--app-bg)",
          surface: "var(--app-surface)",
          card: "var(--app-card)",
          "card-hover": "var(--app-card-hover)",
          border: "var(--app-border)",
          "border-strong": "var(--app-border-strong)",
          text: "var(--app-text)",
          muted: "var(--app-muted)",
          accent: "var(--app-accent)",
          "accent-muted": "var(--app-accent-muted)",
          success: "var(--app-success)",
          warning: "var(--app-warning)",
          danger: "var(--app-danger)",
          info: "var(--app-info)",
        },
        page: "var(--marketing-bg)",
        surface: "var(--marketing-surface)",
        hero: {
          from: "#08111A",
          to: "#102A43",
        },
        brand: {
          green: "#22C55E",
          teal: "#14B8A6",
          blue: "#3B82F6",
        },
        ink: {
          DEFAULT: "var(--marketing-text)",
          muted: "var(--marketing-muted)",
          subtle: "var(--marketing-subtle)",
        },
        arivo: {
          primary: "#22C55E",
          accent: "#14B8A6",
          bg: "#08111A",
          surface: "#F8FAFC",
          text: "#0F172A",
          muted: "#475569",
          border: "#E2E8F0",
          risk: "#E05252",
          warning: "#D4880A",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
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
