/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      xs: "375px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1440px",
    },
    extend: {
      colors: {
        // Strict Slate Palette (Structural Dark Theme Architecture)
        slate: {
          50: "#f8fafc",
          100: "#f1f5f9",
          200: "#e2e8f0",
          300: "#cbd5e1",
          400: "#94a3b8",
          500: "#64748b",
          600: "#475569",
          700: "#334155",
          800: "#1e293b", // Structural borders & divider lines
          850: "#151f32", // Intermediate card & component elevation
          900: "#0f172a", // Elevated surfaces & panels
          950: "#020617", // Deep Canvas Background
        },
        // Data & QA Accent Highlights (High-Contrast & Precise)
        cyan: {
          400: "#22d3ee", // Primary Data Accent
          500: "#06b6d4",
          900: "#164e63",
          950: "#083344",
        },
        emerald: {
          400: "#34d399", // QA & Pass Gate Accent
          500: "#10b981",
          900: "#064e3b",
          950: "#022c22",
        },
        amber: {
          400: "#fbbf24", // Telemetry Warning Accent
          950: "#451a03",
        },
        rose: {
          400: "#fb7185", // QA Failure / Anomaly Accent
          950: "#4c0519",
        },
        // Semantic Token Aliases
        canvas: {
          DEFAULT: "#020617", // slate-950
          subtle: "#060d1d",
        },
        surface: {
          DEFAULT: "#0f172a", // slate-900
          elevated: "#151f32", // slate-850
          highlight: "#1e293b", // slate-800
        },
        line: {
          subtle: "#1e293b", // slate-800
          strong: "#334155", // slate-700
          cyan: "rgba(34, 211, 238, 0.3)",
          emerald: "rgba(52, 211, 153, 0.3)",
        },
        // Design System CSS Variable Integration
        border: "hsl(var(--border, 217 33% 17%))",
        input: "hsl(var(--input, 217 33% 17%))",
        ring: "hsl(var(--ring, 187 92% 54%))",
        background: "hsl(var(--background, 222 47% 3%))",
        foreground: "hsl(var(--foreground, 210 40% 98%))",
        primary: {
          DEFAULT: "hsl(var(--primary, 187 92% 54%))",
          foreground: "hsl(var(--primary-foreground, 222 47% 3%))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary, 217 33% 17%))",
          foreground: "hsl(var(--secondary-foreground, 210 40% 98%))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive, 350 89% 60%))",
          foreground: "hsl(var(--destructive-foreground, 0 0% 100%))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted, 217 33% 13%))",
          foreground: "hsl(var(--muted-foreground, 215 20% 65%))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent, 158 64% 52%))",
          foreground: "hsl(var(--accent-foreground, 222 47% 3%))",
        },
        card: {
          DEFAULT: "hsl(var(--card, 222 47% 6%))",
          foreground: "hsl(var(--card-foreground, 210 40% 98%))",
        },
      },
      fontFamily: {
        // Sharp sans-serif for headings, branding, and clean UI navigation
        sans: [
          "Geist",
          "Inter",
          "Outfit",
          "-apple-system",
          "BlinkMacSystemFont",
          '"Segoe UI"',
          "Roboto",
          "sans-serif",
        ],
        heading: [
          "Geist",
          "Inter",
          "Outfit",
          "-apple-system",
          "BlinkMacSystemFont",
          "sans-serif",
        ],
        // Elegant, high-legibility monospace for data elements, pipeline metrics, and technical blocks
        mono: [
          '"JetBrains Mono"',
          '"Fira Code"',
          '"Geist Mono"',
          '"IBM Plex Mono"',
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
        display: [
          "Geist",
          "Inter",
          "Outfit",
          "sans-serif",
        ],
      },
      boxShadow: {
        "glow-cyan": "0 0 24px -4px rgba(34, 211, 238, 0.25)",
        "glow-cyan-lg": "0 0 40px -8px rgba(34, 211, 238, 0.35)",
        "glow-emerald": "0 0 24px -4px rgba(52, 211, 153, 0.25)",
        "glow-emerald-lg": "0 0 40px -8px rgba(52, 211, 153, 0.35)",
        "surface-raised": "0 10px 30px -10px rgba(0, 0, 0, 0.7), 0 0 1px 1px rgba(255, 255, 255, 0.05)",
      },
      borderRadius: {
        lg: "var(--radius, 0.5rem)",
        md: "calc(var(--radius, 0.5rem) - 2px)",
        sm: "calc(var(--radius, 0.5rem) - 4px)",
      },
      animation: {
        "pulse-subtle": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "beacon": "ping 2.5s cubic-bezier(0, 0, 0.2, 1) infinite",
        "scanline": "scanline 8s linear infinite",
      },
      keyframes: {
        scanline: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(1000%)" },
        },
      },
    },
  },
  plugins: [],
};
