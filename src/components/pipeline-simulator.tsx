import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, ShieldCheck, Zap, RefreshCw } from "lucide-react";

interface StreamLog {
  id: string;
  time: string;
  level: "INFO" | "WARN" | "CRIT" | "SUCCESS";
  message: string;
}

export function PipelineSimulator() {
  const [throughput, setThroughput] = useState(52400);
  const [anomalyRate, setAnomalyRate] = useState(0.001);
  const [gateStatus, setGateStatus] = useState<"HEALTHY" | "SPIKE" | "QUARANTINE">("HEALTHY");
  const [quarantinedCount, setQuarantinedCount] = useState(14);
  const [logs, setLogs] = useState<StreamLog[]>([
    {
      id: "1",
      time: "19:22:04",
      level: "INFO",
      message: "Batch partition #8841 loaded and checked",
    },
    {
      id: "2",
      time: "19:22:07",
      level: "SUCCESS",
      message: "Schema reconciliation passed, no drift",
    },
    {
      id: "3",
      time: "19:22:11",
      level: "INFO",
      message: "HIPAA field masking verified",
    },
  ]);

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
    setLogs((prev) => [{ id: Math.random().toString(), time: timeStr, level, message }, ...prev.slice(0, 5)]);
  };

  const handleSimulateSpike = () => {
    setGateStatus("SPIKE");
    setThroughput(185400);
    addLog("WARN", "Ingestion passed 180,000 rec/s. Autoscaling to 4 Spark workers.");
    setTimeout(() => {
      setGateStatus("HEALTHY");
      setThroughput(56000);
      addLog("SUCCESS", "Buffer drained, back to normal throughput.");
    }, 4500);
  };

  const handleInjectAnomaly = () => {
    setGateStatus("QUARANTINE");
    setAnomalyRate(1.84);
    setQuarantinedCount((c) => c + 1);
    addLog("CRIT", "Malformed HL7 header in feed EHR-992. Delta Lake assertion tripped.");
    setTimeout(() => {
      addLog("SUCCESS", "Quarantine isolated 1,280 bad rows to the dead-letter partition.");
      setAnomalyRate(0.002);
      setGateStatus("HEALTHY");
    }, 4000);
  };

  const handleReset = () => {
    setGateStatus("HEALTHY");
    setThroughput(52400);
    setAnomalyRate(0.001);
    addLog("INFO", "Simulator reset to baseline.");
  };

  const statusText = gateStatus === "HEALTHY" ? "Healthy" : gateStatus === "SPIKE" ? "Volume spike" : "Quarantining";

  return (
    <div className="panel rounded-[14px] p-6 md:p-8">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b pb-5">
        <div>
          <p className="eyebrow">Simulation, not live telemetry</p>
          <h3 className="mt-2 text-xl font-medium text-slate-100">Quality gate walkthrough</h3>
          <p className="mt-1 text-sm text-slate-400">
            The figures below are simulated. Run a case to watch the gate respond.
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm">
          <span className={gateStatus === "HEALTHY" ? "status-dot" : "status-dot status-dot-fail"} aria-hidden="true" />
          <span className="text-slate-300">{statusText}</span>
        </div>
      </div>

      <dl className="grid grid-cols-2 lg:grid-cols-4 border-b divide-slate-800 sm:divide-x">
        <div className="min-w-0 py-5 pr-3">
          <dt className="text-xs text-slate-400">Ingestion velocity</dt>
          <dd className="mt-1 font-mono text-xl sm:text-2xl text-slate-50 tabular-nums">
            {throughput.toLocaleString()}
            <span className="ml-1 text-[11px] text-slate-400">rec/s</span>
          </dd>
          <div className="mt-3 h-px w-full bg-slate-800">
            <motion.div
              className={gateStatus === "SPIKE" ? "h-px bg-signal" : "h-px bg-slate-500"}
              animate={{ width: `${Math.min(100, (throughput / 200000) * 100)}%` }}
              transition={{ ease: "easeOut", duration: 0.4 }}
            />
          </div>
          <p className="mt-1 text-[11px] text-slate-500">of 200,000 capacity</p>
        </div>

        <div className="min-w-0 py-5 pl-3 sm:pl-5">
          <dt className="text-xs text-slate-400">Anomaly index</dt>
          <dd className={`mt-1 font-mono text-xl sm:text-2xl tabular-nums ${anomalyRate > 0.1 ? "text-rose-400" : "text-slate-50"}`}>
            {anomalyRate.toFixed(3)}%
          </dd>
        </div>

        <div className="min-w-0 py-5 pl-3 sm:pl-5 border-t sm:border-t-0">
          <dt className="text-xs text-slate-400">Quarantined batches</dt>
          <dd className="mt-1 font-mono text-xl sm:text-2xl text-slate-50 tabular-nums">
            {quarantinedCount}
          </dd>
        </div>

        <div className="min-w-0 py-5 pl-3 sm:pl-5 border-t sm:border-t-0">
          <dt className="text-xs text-slate-400">P99 query latency</dt>
          <dd className="mt-1 font-mono text-xl sm:text-2xl text-slate-50 tabular-nums">
            14.2
            <span className="ml-1 text-xs text-slate-400">ms</span>
          </dd>
        </div>
      </dl>

      <div className="flex flex-wrap items-center gap-2 py-5 border-b">
        <button
          type="button"
          onClick={handleSimulateSpike}
          disabled={gateStatus !== "HEALTHY"}
          className="btn-quiet h-9 text-xs disabled:opacity-40"
        >
          <Zap className="w-3.5 h-3.5" />
          Spike volume 3x
        </button>

        <button
          type="button"
          onClick={handleInjectAnomaly}
          disabled={gateStatus !== "HEALTHY"}
          className="btn-quiet h-9 text-xs disabled:opacity-40"
        >
          <AlertTriangle className="w-3.5 h-3.5" />
          Inject a bad record
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="btn-quiet h-9 text-xs ml-auto"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Reset
        </button>
      </div>

      <div className="mt-5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span className="flex items-center gap-2">
            <ShieldCheck className="w-3.5 h-3.5" />
            Assertion stream
          </span>
          <span>Autopilot on</span>
        </div>

        <div
          className="mt-2 rounded-[10px] border p-3 font-mono text-[11px] space-y-1.5 max-h-36 overflow-hidden"
          aria-live="polite"
        >
          <AnimatePresence initial={false}>
            {logs.map((log) => (
              <motion.div
                key={log.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-start gap-2.5 leading-relaxed"
              >
                <span className="text-slate-600 select-none shrink-0 tabular-nums">{log.time}</span>
                <span
                  className={`shrink-0 select-none ${
                    log.level === "INFO"
                      ? "text-slate-400"
                      : log.level === "SUCCESS"
                      ? "text-emerald-400"
                      : log.level === "WARN"
                      ? "text-signal"
                      : "text-rose-400"
                  }`}
                >
                  [{log.level}]
                </span>
                <span className="min-w-0 text-slate-300 break-words">{log.message}</span>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
