import { useState } from "react";
import { Eye, Activity, ShieldCheck } from "lucide-react";
import { useViewCounter } from "@/hooks/use-view-counter";

interface ViewCounterProps {
  variant?: "nav" | "footer" | "badge";
  className?: string;
  showTooltip?: boolean;
}

export function ViewCounter({ variant = "badge", className = "" }: ViewCounterProps) {
  const { formattedCount, isLoading, isLive } = useViewCounter();
  const [tooltipOpen, setTooltipOpen] = useState(false);

  if (variant === "nav") {
    return (
      <div className={`relative inline-flex items-center ${className}`}>
        <div
          role="status"
          aria-label={`Website view counter: ${formattedCount} visits`}
          onMouseEnter={() => setTooltipOpen(true)}
          onMouseLeave={() => setTooltipOpen(false)}
          className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-cyan-400 hover:border-slate-700 transition-colors cursor-default"
        >
          <span className="relative flex h-2 w-2">
            {isLive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <Eye className="w-3.5 h-3.5 text-cyan-400" />
          <span className="tabular-nums font-semibold text-slate-200">
            {isLoading ? "..." : formattedCount}
          </span>
          <span className="text-[11px] text-slate-500">views</span>
        </div>

        {/* Hover Tooltip */}
        {tooltipOpen && (
          <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 z-50 whitespace-nowrap px-3 py-1.5 rounded bg-slate-950 border border-slate-800 shadow-xl text-[11px] font-mono text-slate-300 pointer-events-none">
            <div className="flex items-center gap-1.5">
              <Activity className="w-3 h-3 text-emerald-400" />
              <span>Real-time Pageviews: <strong>{formattedCount}</strong></span>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === "footer") {
    return (
      <div className={`p-4 rounded-xl glass-card border border-slate-800/80 bg-slate-950/60 font-mono ${className}`}>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold">
              <Activity className="w-3.5 h-3.5" />
              <span>// TRAFFIC &amp; AUDIENCE TELEMETRY</span>
              <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-400">
              Anonymized session tracking with deduplication &amp; zero silent assertion failures.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-xs text-slate-500 uppercase tracking-wider">Total Views</div>
              <div className="text-2xl font-bold text-slate-100 tabular-nums flex items-center justify-end gap-1.5">
                <Eye className="w-4 h-4 text-cyan-400" />
                <span>{isLoading ? "..." : formattedCount}</span>
              </div>
            </div>

            <div className="h-8 w-px bg-slate-800 hidden sm:block" />

            <div className="text-right hidden sm:block">
              <div className="text-xs text-slate-500 uppercase tracking-wider">Privacy</div>
              <div className="text-xs text-emerald-400 font-medium flex items-center justify-end gap-1 mt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Zero PII</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Default 'badge' variant
  return (
    <div
      role="status"
      aria-label={`Website view counter: ${formattedCount} visits`}
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-300 ${className}`}
    >
      <span className="relative flex h-2 w-2">
        {isLive && (
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
        )}
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
      </span>
      <Eye className="w-3.5 h-3.5 text-cyan-400" />
      <span className="tabular-nums font-semibold text-slate-100">
        {isLoading ? "..." : formattedCount}
      </span>
      <span className="text-slate-400">visits</span>
    </div>
  );
}
export default ViewCounter;

