/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
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
        // One neutral ramp, tinted cool like a terminal ledger. Every
        // surface, border and text role comes from these steps.
        ink: {
          50: "#f4f5f6",
          100: "#e6e8ea",
          200: "#d2d6da",
          300: "#b3b9c1",
          400: "#868d97",
          500: "#5c636d",
          600: "#3a4048",
          700: "#2a2f35",
          800: "#1d2126",
          850: "#161a1d",
          900: "#111316",
          950: "#0b0d0f",
        },

        // Legacy ramp name kept so unreviewed components inherit the new
        // neutrals instead of drifting back to blue-slate.
        slate: {
          50: "#f4f5f6",
          100: "#e6e8ea",
          200: "#d2d6da",
          300: "#b3b9c1",
          400: "#868d97",
          500: "#5c636d",
          600: "#3a4048",
          700: "#2a2f35",
          800: "#1d2126",
          850: "#161a1d",
          900: "#111316",
          950: "#0b0d0f",
        },

        // One accent. Used for the primary action, the selection and the one
        // figure that matters. "cyan" keeps the old class names working.
        signal: "#d8a247",
        cyan: {
          300: "#e8c489",
          400: "#d8a247",
          500: "#b8862f",
          900: "#3a2b12",
          950: "#241a0a",
        },

        // Semantic only: pass and fail states. Never decoration.
        pass: "#4f9d75",
        fail: "#c2565b",
        emerald: {
          300: "#7fbf9c",
          400: "#4f9d75",
          500: "#3d7d5c",
          900: "#16301f",
          950: "#0d1f14",
        },
        rose: {
          400: "#c2565b",
          950: "#2a1214",
        },
        amber: {
          300: "#e8c489",
          400: "#d8a247",
          950: "#241a0a",
        },

        canvas: { DEFAULT: "#0b0d0f", subtle: "#111316" },
        surface: { DEFAULT: "#111316", elevated: "#161a1d", highlight: "#1d2126" },
        line: {
          subtle: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.14)",
        },

        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: { DEFAULT: "hsl(var(--primary))", foreground: "hsl(var(--primary-foreground))" },
        secondary: { DEFAULT: "hsl(var(--secondary))", foreground: "hsl(var(--secondary-foreground))" },
        destructive: { DEFAULT: "hsl(var(--destructive))", foreground: "hsl(var(--destructive-foreground))" },
        muted: { DEFAULT: "hsl(var(--muted))", foreground: "hsl(var(--muted-foreground))" },
        accent: { DEFAULT: "hsl(var(--accent))", foreground: "hsl(var(--accent-foreground))" },
        card: { DEFAULT: "hsl(var(--card))", foreground: "hsl(var(--card-foreground))" },
      },
      fontFamily: {
        sans: ["Geist", "-apple-system", "BlinkMacSystemFont", '"Segoe UI"', "Roboto", "sans-serif"],
        heading: ["Geist", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        display: ["Geist", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ['"Geist Mono"', "ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      },
      boxShadow: {
        // No glow. Depth on a dark screen comes from surface steps and
        // hairlines; these names stay so old classes resolve to nothing loud.
        "glow-cyan": "0 1px 0 0 rgba(255,255,255,0.04)",
        "glow-cyan-lg": "0 1px 0 0 rgba(255,255,255,0.06)",
        "glow-emerald": "0 1px 0 0 rgba(255,255,255,0.04)",
        "glow-emerald-lg": "0 1px 0 0 rgba(255,255,255,0.06)",
        "surface-raised": "0 8px 24px -16px rgba(0,0,0,0.9)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      animation: {
        // Only motion that explains a state change is left.
        "fade-rise": "fade-rise 420ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
      keyframes: {
        "fade-rise": {
          from: { opacity: "0", transform: "translateY(6px)" },
          to: { opacity: "1", transform: "none" },
        },
      },
    },
  },
  plugins: [],
};
