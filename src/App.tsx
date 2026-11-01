import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { HelmetProvider } from "react-helmet-async";
import { CommandPalette } from "@/components/command-palette";
import { LayoutShell } from "@/components/layout-shell";
import Home from "./Home";
import { Layout, Sparkles } from "lucide-react";

function App() {
  // Toggle between the high-contrast Scaffolding Shell and Extended Portfolio View
  const [activeView, setActiveView] = useState<"shell" | "extended">("shell");

  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <CommandPalette />

        {/* Dynamic Architectural View Switcher */}
        <aside aria-label="Architecture view switcher" className="fixed bottom-4 right-4 z-40 hidden sm:flex items-center gap-1 p-1 rounded-full bg-slate-900/90 border border-slate-800 shadow-2xl backdrop-blur-md text-xs font-mono">
          <button
            type="button"
            onClick={() => setActiveView("shell")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              activeView === "shell"
                ? "bg-cyan-400 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
            aria-label="Switch to Scaffolding Shell"
          >
            <Layout className="w-3.5 h-3.5" />
            <span>High-Contrast Shell</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveView("extended")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-all ${
              activeView === "extended"
                ? "bg-cyan-400 text-slate-950 font-bold shadow-sm"
                : "text-slate-400 hover:text-slate-200"
            }`}
            aria-label="Switch to Extended Portfolio View"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Extended View</span>
          </button>
        </aside>

        {/* Primary View Mounting */}
        {activeView === "shell" ? <LayoutShell /> : <Home />}
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
