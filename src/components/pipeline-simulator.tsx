import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity, AlertTriangle, ShieldCheck, Zap, RefreshCw, Terminal } from "lucide-react";

interface StreamLog {
  id: string;
  time: string;
  level: "INFO" | "WARN" | "CRIT" | "SUCCESS";
  message: string;
}

export function PipelineSimulator() {
  const [throughput, setThroughput] = useState(52400); // rec/sec
  const [anomalyRate, setAnomalyRate] = useState(0.001); // %
  const [gateStatus, setGateStatus] = useState<"HEALTHY" | "SPIKE" | "QUARANTINE">("HEALTHY");
  const [quarantinedCount, setQuarantinedCount] = useState(14);
  const [logs, setLogs] = useState<StreamLog[]>([
    {
      id: "1",
      time: "19:22:04",
      level: "INFO",
      message: "Bronze -> Silver batch partition #8841 ingested successfully",
    },
    {
      id: "2",
      time: "19:22:07",
      level: "SUCCESS",
      message: "Automated schema reconciliation check passed (zero drift)",
    },
    {
      id: "3",
      time: "19:22:11",
      level: "INFO",
      message: "HIPAA de-identification cipher verification validated",
    },
  ]);

  // Subtle natural fluctuation
  useEffect(() => {
    const interval = setInterval(() => {
      if (gateStatus === "HEALTHY") {
        setThroughput((prev) => Math.max(45000, Math.min(62000, prev + Math.floor((Math.random() - 0.5) * 1200))));
      }
    }, 2000);
    return () => clearInterval(interval);
  }, [gateStatus]);

  const addLog = (level: StreamLog["level"], message: string) => {
    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}:${String(now.getSeconds()).padStart(2, "0")}`;
    setLogs((prev) => [
      { id: Math.random().toString(), time: timeStr, level, message },
      ...prev.slice(0, 5),
    ]);
  };

  const handleSimulateSpike = () => {
    setGateStatus("SPIKE");
    setThroughput(185400);
    addLog("WARN", "SURGE DETECTED: Ingestion velocity exceeded 180,000 rec/sec. Autoscaling 4 Spark worker nodes.");
    setTimeout(() => {
      setGateStatus("HEALTHY");
      setThroughput(56000);
      addLog("SUCCESS", "Buffer drained. Pipeline auto-scaled and stabilized to normal throughput.");
    }, 4500);
  };

  const handleInjectAnomaly = () => {
    setGateStatus("QUARANTINE");
    setAnomalyRate(1.84);
    setQuarantinedCount((c) => c + 1);
    addLog("CRIT", "CORRUPTION ALERT: Malformed HL7 message header in feed #EHR-992. Delta Lake assertion tripped!");
    setTimeout(() => {
      addLog("SUCCESS", "Automated quarantine gate isolated 1,280 bad rows to Dead-Letter Lakehouse partition.");
      setAnomalyRate(0.002);
      setGateStatus("HEALTHY");
    }, 4000);
  };

  const handleReset = () => {
    setGateStatus("HEALTHY");
    setThroughput(52400);
    setAnomalyRate(0.001);
    addLog("INFO", "Telemetry simulator reset to baseline state.");
  };

  return (
    <div className="relative rounded-2xl border border-slate-800 bg-slate-950/80 p-6 md:p-8 backdrop-blur-md overflow-hidden shadow-2xl">
      {/* Top Header & Mode Indicator */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800/80 pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
              Interactive Architectural Sandbox
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            Live Medallion Telemetry &amp; Assertion Gate
          </h3>
          <p className="text-xs text-slate-400 font-mono">
            Trigger real-time edge cases to inspect automated quarantine behavior
          </p>
        </div>

        {/* Live Status Badge */}
        <div className="flex items-center gap-3">
          <div
            className={`px-3 py-1.5 rounded-full border text-xs font-mono font-medium flex items-center gap-2 transition-colors ${
              gateStatus === "HEALTHY"
                ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-300"
                : gateStatus === "SPIKE"
                ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                : "border-rose-500/40 bg-rose-500/10 text-rose-300 animate-pulse"
            }`}
          >
            {gateStatus === "HEALTHY" && <ShieldCheck className="w-3.5 h-3.5" />}
            {gateStatus === "SPIKE" && <Zap className="w-3.5 h-3.5" />}
            {gateStatus === "QUARANTINE" && <AlertTriangle className="w-3.5 h-3.5" />}
            <span>GATE_STATUS: {gateStatus}</span>
          </div>
        </div>
      </div>

      {/* Grid of Key Diagnostic Gauges */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 py-6">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">Ingestion Velocity</div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl lg:text-3xl font-mono font-bold text-slate-50 tabular-nums">
              {throughput.toLocaleString()}
            </span>
            <span className="text-xs text-cyan-400 font-mono">rec/s</span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <motion.div
              className={`h-full ${gateStatus === "SPIKE" ? "bg-amber-400" : "bg-cyan-400"}`}
              animate={{ width: `${Math.min(100, (throughput / 200000) * 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.4 }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">Anomaly Tripping Index</div>
          <div className="mt-1 flex items-baseline gap-1">
            <span
              className={`text-2xl lg:text-3xl font-mono font-bold tabular-nums ${
                anomalyRate > 0.1 ? "text-rose-400" : "text-emerald-400"
              }`}
            >
              {anomalyRate.toFixed(3)}%
            </span>
          </div>
          <div className="w-full bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
            <motion.div
              className={`h-full ${anomalyRate > 0.1 ? "bg-rose-500" : "bg-emerald-400"}`}
              animate={{ width: `${Math.min(100, (anomalyRate / 2) * 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.3 }}
            />
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">Dead-Letter Quarantines</div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl lg:text-3xl font-mono font-bold text-slate-50 tabular-nums">
              {quarantinedCount}
            </span>
            <span className="text-xs text-slate-400 font-mono">batches</span>
          </div>
          <div className="text-[10px] font-mono text-emerald-400/80 mt-2">
            Zero corrupted data leaked to Gold
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="text-[11px] font-mono text-slate-400">P99 Query Latency</div>
          <div className="mt-1 flex items-baseline gap-1">
            <span className="text-2xl lg:text-3xl font-mono font-bold text-cyan-300 tabular-nums">
              14.2
            </span>
            <span className="text-xs text-slate-400 font-mono">ms</span>
          </div>
          <div className="text-[10px] font-mono text-slate-500 mt-2">
            Redshift + Delta Lake Materialized
          </div>
        </div>
      </div>

      {/* Interactive Trigger Controls */}
      <div className="flex flex-wrap items-center gap-3 pt-2 pb-6 border-b border-slate-800/80">
        <span className="text-xs font-mono text-slate-400 mr-2 flex items-center gap-1.5">
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          Test Pipeline Resilience:
        </span>

        <button
          type="button"
          onClick={handleSimulateSpike}
          disabled={gateStatus !== "HEALTHY"}
          className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-amber-500/50 hover:bg-amber-500/10 text-slate-200 hover:text-amber-300 font-mono text-xs flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          Simulate 3x Volume Spike
        </button>

        <button
          type="button"
          onClick={handleInjectAnomaly}
          disabled={gateStatus !== "HEALTHY"}
          className="px-3.5 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-rose-500/50 hover:bg-rose-500/10 text-slate-200 hover:text-rose-300 font-mono text-xs flex items-center gap-2 transition-all disabled:opacity-50"
        >
          <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
          Inject Bad Clinical Record
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="px-3 py-2 rounded-lg bg-slate-900/60 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 font-mono text-xs flex items-center gap-1.5 transition-colors ml-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset Baseline
        </button>
      </div>

      {/* Streaming Terminal Log Output */}
      <div className="mt-5 space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Delta Lake Live Assertion Stream</span>
          </div>
          <span className="text-[10px] text-emerald-400/80">AUTOPILOT: ON</span>
        </div>

        <div className="rounded-xl bg-slate-950 border border-slate-900 p-3 font-mono text-[11px] space-y-1.5 max-h-36 overflow-hidden">
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5 leading-relaxed"
              >
                <span className="text-slate-600 select-none shrink-0">{log.time}</span>
                <span
                  className={`font-semibold shrink-0 select-none ${
                    log.level === "INFO"
                      ? "text-cyan-400"
                      : log.level === "SUCCESS"
                      ? "text-emerald-400"
                      : log.level === "WARN"
                      ? "text-amber-400"
                      : "text-rose-400 font-bold"
                  }`}
                >
                  [{log.level}]
                </span>
                <span className="text-slate-300 break-words">{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

