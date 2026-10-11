import { useState, useRef, useEffect } from "react";
import { Play, CheckCircle2, AlertTriangle, XCircle, RotateCcw } from "lucide-react";

// ─── SAMPLE DATA ────────────────────────────────────────────────────
const RAW_ROWS = [
    { id: "TXN-001", amount: 4250.00,  currency: "USD", timestamp: "2026-09-01T10:22:00Z", user_id: "U-884",  status: "completed" },
    { id: "TXN-002", amount: null,      currency: "USD", timestamp: "2026-09-01T10:23:14Z", user_id: "U-221",  status: "pending" },
    { id: "TXN-003", amount: 899.50,   currency: "EUR", timestamp: "2026-09-01T10:24:51Z", user_id: null,     status: "completed" },
    { id: "TXN-001", amount: 4250.00,  currency: "USD", timestamp: "2026-09-01T10:22:00Z", user_id: "U-884",  status: "completed" }, // Duplicate
    { id: "TXN-005", amount: -150.00,  currency: "USD", timestamp: "2026-08-31T08:00:00Z", user_id: "U-553",  status: "completed" }, // Neg amount + timestamp in past
];

const COLUMNS = ["id", "amount", "currency", "timestamp", "user_id", "status"] as const;

// ─── CHECKS ─────────────────────────────────────────────────────────
const CHECKS = [
    { id: "null",   label: "Null Value & Integrity Validation" },
    { id: "schema", label: "Schema Drift & Type Invariant Detection" },
    { id: "dup",    label: "Duplicate ID & Uniqueness Gate" },
];

// ─── LOG ENTRIES ─────────────────────────────────────────────────────
interface LogEntry {
    time: number;
    status: "pass" | "warn" | "fail" | "info";
    msg: string;
    latency?: string;
}

function runChecks(enabled: Record<string, boolean>): LogEntry[] {
    const logs: LogEntry[] = [];
    let t = 0;

    const push = (entry: Omit<LogEntry, "time">) => {
        logs.push({ ...entry, time: t++ });
    };

    push({ status: "info", msg: "Initializing data quality suite on transaction_events table..." });
    push({ status: "info", msg: `Loaded ${RAW_ROWS.length} incoming rows from upstream feed.` });

    if (enabled["null"]) {
        push({ status: "info", msg: "[NULL CHECK] Scanning for null / missing fields..." });
        const nullRows = RAW_ROWS.flatMap((r, i) =>
            COLUMNS.filter(c => r[c] == null).map(c => `row[${i + 1}].${c}`)
        );
        if (nullRows.length) {
            push({ status: "warn", msg: `[NULL CHECK] ⚠ Nulls detected: ${nullRows.join(", ")}`, latency: "12ms" });
        } else {
            push({ status: "pass", msg: "[NULL CHECK] ✓ All required fields populated.", latency: "11ms" });
        }
        const negAmounts = RAW_ROWS.filter(r => typeof r.amount === "number" && r.amount < 0);
        if (negAmounts.length) {
            push({ status: "fail", msg: `[NULL CHECK] ✗ Integrity violation: amount < 0 on TXN-005 → rejecting row.`, latency: "4ms" });
        } else {
            push({ status: "pass", msg: "[NULL CHECK] ✓ Numeric ranges within expected bounds.", latency: "4ms" });
        }
    }

    if (enabled["schema"]) {
        push({ status: "info", msg: "[SCHEMA] Validating column types against registered schema v1.4.2..." });
        const currencies = [...new Set(RAW_ROWS.map(r => r.currency).filter(Boolean))];
        const unexpected = currencies.filter(c => !["USD", "GBP", "EUR"].includes(c as string));
        if (unexpected.length) {
            push({ status: "fail", msg: `[SCHEMA] ✗ Unknown currency codes: ${unexpected.join(", ")}`, latency: "8ms" });
        } else {
            push({ status: "pass", msg: "[SCHEMA] ✓ All currency codes conform to ISO-4217 allowlist.", latency: "8ms" });
        }
        push({ status: "pass", msg: "[SCHEMA] ✓ Column count: 6/6. No drift detected from schema registry.", latency: "3ms" });
        const staleTs = RAW_ROWS.filter(r => new Date(r.timestamp) < new Date("2026-09-01T00:00:00Z"));
        if (staleTs.length) {
            push({ status: "warn", msg: `[SCHEMA] ⚠ ${staleTs.length} row(s) with out-of-window timestamp (< pipeline run date).`, latency: "6ms" });
        } else {
            push({ status: "pass", msg: "[SCHEMA] ✓ All timestamps within expected ingestion window.", latency: "6ms" });
        }
    }

    if (enabled["dup"]) {
        push({ status: "info", msg: "[DUP GATE] Running uniqueness assertion on primary key `id`..." });
        const seen = new Set<string>();
        const dupes: string[] = [];
        RAW_ROWS.forEach(r => {
            if (seen.has(r.id)) dupes.push(r.id);
            else seen.add(r.id);
        });
        if (dupes.length) {
            push({ status: "fail", msg: `[DUP GATE] ✗ Duplicate primary keys found: ${[...new Set(dupes)].join(", ")} → deduplication required.`, latency: "9ms" });
        } else {
            push({ status: "pass", msg: "[DUP GATE] ✓ All transaction IDs are unique.", latency: "9ms" });
        }
        push({ status: "pass", msg: "[DUP GATE] ✓ (user_id, timestamp) composite uniqueness: PASSED.", latency: "5ms" });
    }

    const passes = logs.filter(l => l.status === "pass").length;
    const warns = logs.filter(l => l.status === "warn").length;
    const fails = logs.filter(l => l.status === "fail").length;

    push({ status: "info", msg: `────────────────────────────────────────────────────` });
    push({ status: fails > 0 ? "fail" : warns > 0 ? "warn" : "pass",
        msg: `SUITE COMPLETE  ✓ ${passes} passed  ⚠ ${warns} warnings  ✗ ${fails} failed  │  5 rows scanned` });

    return logs;
}

// ─── COMPONENT ──────────────────────────────────────────────────────
export function DataPipelineSandbox() {
    const [enabled, setEnabled] = useState<Record<string, boolean>>({
        null: true, schema: true, dup: true,
    });
    const [running, setRunning] = useState(false);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [revealed, setRevealed] = useState(0);
    const logRef = useRef<HTMLDivElement>(null);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    const reset = () => {
        if (timerRef.current) clearTimeout(timerRef.current);
        setLogs([]);
        setRevealed(0);
        setRunning(false);
    };

    const runSuite = () => {
        reset();
        const entries = runChecks(enabled);
        setLogs(entries);
        setRunning(true);
        setRevealed(0);
    };

    // Reveal logs one-by-one
    useEffect(() => {
        if (!running || revealed >= logs.length) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            if (revealed >= logs.length && logs.length > 0) setRunning(false);
            return;
        }
        timerRef.current = setTimeout(() => {
            setRevealed(r => r + 1);
        }, 60 + Math.random() * 60);
        return () => { if (timerRef.current) clearTimeout(timerRef.current); };
    }, [running, revealed, logs.length]);

    // Auto-scroll log
    useEffect(() => {
        if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
    }, [revealed]);

    const statusIcon = (s: LogEntry["status"]) => {
        if (s === "pass") return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
        if (s === "warn") return <AlertTriangle className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
        if (s === "fail") return <XCircle className="w-3.5 h-3.5 text-red-400 shrink-0" />;
        return <span className="w-3.5 h-3.5 shrink-0 text-neutral-500 text-[10px] leading-none flex items-center">›</span>;
    };

    const statusColor = (s: LogEntry["status"]) => {
        if (s === "pass") return "text-emerald-400";
        if (s === "warn") return "text-amber-400";
        if (s === "fail") return "text-red-400";
        return "text-neutral-400";
    };

    const cellClass = (col: typeof COLUMNS[number], row: typeof RAW_ROWS[number]) => {
        if (row[col] == null) return "text-red-400/80";
        if (col === "id") {
            const dupeIds = RAW_ROWS.filter(r => r.id === row.id);
            if (dupeIds.length > 1) return "text-amber-400/90";
        }
        if (col === "amount" && typeof row[col] === "number" && (row[col] as number) < 0) return "text-red-400/80";
        if (col === "timestamp" && new Date(row.timestamp) < new Date("2026-09-01T00:00:00Z")) return "text-amber-400/80";
        return "text-neutral-300";
    };

    return (
        <section className="py-16 md:py-24 border-t border-border/60">
            <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                <div className="mb-8">
                    <p className="section-label mb-3">Live demo</p>
                    <h2 className="text-4xl md:text-5xl text-foreground">
                        Data quality sandbox
                    </h2>
                    <p className="text-sm text-muted-foreground mt-2">
                        A working simulation of the validation logic I implement in production pipelines.
                        Toggle checks, then run the suite.
                    </p>
                </div>

                {/* Sandbox container */}
                <div className="border border-border rounded-md overflow-hidden">
                    {/* Tab bar */}
                    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-secondary/40">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
                        <span className="ml-2 font-mono text-xs text-muted-foreground">
                            dq_suite.py — transaction_events (5 rows)
                        </span>
                    </div>

                    <div className="bg-[hsl(var(--background))] dark:bg-neutral-950/70 p-4 space-y-4">
                        {/* Data table */}
                        <div className="overflow-x-auto scrollbar-hide rounded border border-border">
                            <table className="w-full text-[11px] font-mono">
                                <thead>
                                    <tr className="border-b border-border bg-secondary/30">
                                        {COLUMNS.map(c => (
                                            <th key={c} className="px-3 py-1.5 text-left text-muted-foreground font-medium tracking-wider uppercase text-[10px]">
                                                {c}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {RAW_ROWS.map((row, i) => (
                                        <tr key={i} className="border-b border-border/50 last:border-0 hover:bg-secondary/20 transition-colors">
                                            {COLUMNS.map(col => (
                                                <td
                                                    key={col}
                                                    className={`px-3 py-1.5 whitespace-nowrap ${cellClass(col, row)}`}
                                                >
                                                    {row[col] == null ? (
                                                        <span className="text-red-400/70 italic">NULL</span>
                                                    ) : String(row[col])}
                                                </td>
                                            ))}
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 text-[10px] font-mono text-muted-foreground">
                            <span className="flex items-center gap-1.5"><span className="text-red-400">■</span> NULL / integrity violation</span>
                            <span className="flex items-center gap-1.5"><span className="text-amber-400">■</span> Duplicate / timestamp drift</span>
                        </div>

                        {/* Toggle checks */}
                        <div className="space-y-2">
                            {CHECKS.map(c => (
                                <label
                                    key={c.id}
                                    className="flex items-center gap-3 cursor-pointer group"
                                >
                                    <button
                                        role="checkbox"
                                        aria-checked={enabled[c.id]}
                                        onClick={() => setEnabled(e => ({ ...e, [c.id]: !e[c.id] }))}
                                        className={`relative w-8 h-4 rounded-full border transition-colors duration-100 shrink-0 ${
                                            enabled[c.id]
                                                ? "bg-primary border-primary"
                                                : "bg-transparent border-border"
                                        }`}
                                    >
                                        <span
                                            className={`absolute top-0.5 w-3 h-3 rounded-full bg-white transition-transform duration-100 ${
                                                enabled[c.id] ? "translate-x-4" : "translate-x-0.5"
                                            }`}
                                        />
                                    </button>
                                    <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                        {c.label}
                                    </span>
                                </label>
                            ))}
                        </div>

                        {/* Run button */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={runSuite}
                                disabled={running || !Object.values(enabled).some(Boolean)}
                                className="flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                <Play className="w-3.5 h-3.5" />
                                {running ? "Running..." : "▶ Run Data Quality Suite"}
                            </button>
                            {logs.length > 0 && !running && (
                                <button
                                    onClick={reset}
                                    className="flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors"
                                >
                                    <RotateCcw className="w-3 h-3" />
                                    Reset
                                </button>
                            )}
                        </div>

                        {/* Log output */}
                        {logs.length > 0 && (
                            <div
                                ref={logRef}
                                className="rounded border border-border bg-neutral-950/80 dark:bg-black/60 p-3 max-h-52 overflow-y-auto scrollbar-hide space-y-1"
                            >
                                {logs.slice(0, revealed).map((entry, i) => (
                                    <div key={i} className="flex items-start gap-2 leading-snug">
                                        {statusIcon(entry.status)}
                                        <span className={`font-mono text-[11px] ${statusColor(entry.status)}`}>
                                            {entry.msg}
                                        </span>
                                        {entry.latency && (
                                            <span className="ml-auto font-mono text-[10px] text-neutral-600 shrink-0">
                                                {entry.latency}
                                            </span>
                                        )}
                                    </div>
                                ))}
                                {running && (
                                    <div className="flex items-center gap-2">
                                        <span className="w-3.5 h-3.5 shrink-0" />
                                        <span className="font-mono text-[11px] text-neutral-500 animate-pulse">
                                            processing...
                                        </span>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
