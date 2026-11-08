import { useState, useRef, useEffect } from "react";
import { useTheme, type Theme } from "@/components/theme-provider";
import { Palette, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ThemeOption {
  id: Theme;
  name: string;
  dotColor: string;
  badge: string;
  description: string;
}

const THEME_OPTIONS: ThemeOption[] = [
  {
    id: "dark",
    name: "Cyber Slate",
    dotColor: "bg-cyan-400",
    badge: "DEFAULT",
    description: "Deep Slate-950, precision Cyan & Emerald data accents",
  },
  {
    id: "oled",
    name: "OLED Pitch Black",
    dotColor: "bg-emerald-400",
    badge: "OLED",
    description: "True #000000 canvas with neon green & sky blue accents",
  },
  {
    id: "tokyo",
    name: "Tokyo Midnight",
    dotColor: "bg-purple-400",
    badge: "CYBER",
    description: "Midnight indigo with radiant violet & cyan glow",
  },
  {
    id: "light",
    name: "Studio Light",
    dotColor: "bg-sky-600",
    badge: "CLEAN",
    description: "Architectural alabaster with high-contrast slate text",
  },
];

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  const activeOption = THEME_OPTIONS.find((t) => t.id === theme) || THEME_OPTIONS[0];

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 p-2 rounded-md bg-slate-900/90 border border-slate-800 text-xs font-mono text-slate-300 hover:text-slate-100 hover:border-slate-700 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
        aria-label="Select color theme"
        aria-expanded={open}
        title={`Change Theme (${activeOption.name})`}
      >
        <Palette className="w-3.5 h-3.5 text-cyan-400" />
        <span className="w-2 h-2 rounded-full inline-block" style={{ backgroundColor: activeOption.id === "dark" ? "#22d3ee" : activeOption.id === "oled" ? "#10b981" : activeOption.id === "tokyo" ? "#a78bfa" : "#0284c7" }} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 mt-2 w-64 rounded-xl glass-panel p-2 shadow-2xl border border-slate-800 z-50 overflow-hidden font-mono text-xs"
          >
            <div className="px-2.5 py-1.5 text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-800/80 mb-1 flex items-center justify-between">
              <span>Developer Themes</span>
              <span className="text-cyan-400">4 Palettes</span>
            </div>

            <div className="space-y-1">
              {THEME_OPTIONS.map((opt) => {
                const isActive = theme === opt.id || (theme === "system" && opt.id === "dark");
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => {
                      setTheme(opt.id);
                      setOpen(false);
                    }}
                    className={`w-full flex items-start gap-2.5 p-2 rounded-lg text-left transition-colors ${
                      isActive
                        ? "bg-slate-800/90 text-slate-100 border border-slate-700"
                        : "text-slate-300 hover:bg-slate-800/50 hover:text-slate-100 border border-transparent"
                    }`}
                  >
                    <span
                      className={`w-3 h-3 rounded-full mt-0.5 flex-shrink-0 ${opt.dotColor}`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-xs tracking-tight">{opt.name}</span>
                        {isActive && <Check className="w-3.5 h-3.5 text-cyan-400 flex-shrink-0 ml-1" />}
                      </div>
                      <p className="text-[10px] text-slate-400 font-sans leading-tight mt-0.5 line-clamp-1">
                        {opt.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
export default ThemeSwitcher;
