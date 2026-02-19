import { motion, AnimatePresence } from "framer-motion";
import { Activity, ShieldCheck, Database, Clock, Zap } from "lucide-react";
import { useState, useEffect } from "react";

const metrics = [
    {
        label: "Data Freshness",
        icon: Clock,
        getValue: () => {
            const now = new Date();
            const mins = now.getMinutes() % 5;
            const secs = now.getSeconds();
            return `${mins}m ${secs.toString().padStart(2, '0')}s`;
        },
        color: "text-primary"
    },
    {
        label: "Rows Processed",
        icon: Zap,
        getValue: (rows: number) => `${(rows / 1000000).toFixed(2)}M`,
        color: "text-accent"
    },
    {
        label: "Data Quality Score",
        icon: ShieldCheck,
        getValue: () => "99.99%",
        color: "text-primary"
    },
    {
        label: "Active Nodes",
        icon: Database,
        getValue: () => "12/12",
        color: "text-accent"
    }
];

const logMessages = [
    "> Initializing Spark cluster... [OK]",
    "> Loading Delta tables from s3a://prod-lakehouse/bronze/ [OK]",
    "> Schema drift detected in 'medical_claims' source... Re-aligning [OK]",
    "> Running Great Expectations validation suite... [142/142 PASS]",
    "> Vacuuming old snapshots in 'silver.patient_records'... [OK]",
    "> Optimizing file layout (Z-Order) for 'gold.claims_summary'... [OK]",
    "> Broadcasting join on 'provider_dim'... [OK]",
    "> Checkpointing stream offset 45829... [OK]"
];

export const SystemPulse = () => {
    const [_tick, setTick] = useState(0);
    const [processedRows, setProcessedRows] = useState(4280521);
    const [currentLogIdx, setCurrentLogIdx] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setTick(t => t + 1);
            setProcessedRows(r => r + Math.floor(Math.random() * 500) + 100);
            if (Math.random() > 0.7) {
                setCurrentLogIdx(prev => (prev + 1) % logMessages.length);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-8">
            <div className="relative group">
                {/* Glow Effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/30 to-accent/30 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

                <div className="relative bg-card/40 backdrop-blur-2xl border border-border/40 rounded-3xl p-4 sm:p-6 shadow-xl overflow-hidden">
                    {/* Data Flow Overlay */}
                    <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
                    <div className="flex items-center justify-between mb-8 border-b border-border/50 pb-4">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <Activity className="w-6 h-6 text-primary animate-pulse" />
                                <div className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full animate-ping" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold tracking-tight">System Pulse</h3>
                                <p className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">Real-time Production Metrics</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="flex h-2 w-2 rounded-full bg-primary" />
                            <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-widest">Operational</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
                        {metrics.map((metric, idx) => {
                            const Icon = metric.icon;
                            // @ts-ignore
                            const value = metric.label === "Rows Processed" ? metric.getValue(processedRows) : metric.getValue();

                            return (
                                <div key={idx} className="space-y-2 group/metric">
                                    <div className="flex items-center gap-2 text-muted-foreground">
                                        <Icon className="w-3.5 h-3.5" />
                                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider">{metric.label}</span>
                                    </div>
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={value}
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                            className={`text-xl font-mono font-bold ${metric.color} tracking-tight`}
                                        >
                                            {value}
                                        </motion.div>
                                    </AnimatePresence>
                                    <div className="h-[2px] w-full bg-border/20 rounded-full overflow-hidden">
                                        <motion.div
                                            className={`h-full bg-primary/60 shadow-[0_0_8px_rgba(var(--primary),0.3)]`}
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Terminal-like status messages */}
                    <div className="mt-8 pt-6 border-t border-border/20">
                        <div className="bg-secondary/40 dark:bg-black/40 backdrop-blur-md rounded-xl p-4 font-mono text-[11px] space-y-2 text-muted-foreground overflow-hidden min-h-[120px] flex flex-col justify-end border border-border/20">
                            <AnimatePresence mode="popLayout">
                                {[...Array(3)].map((_, i) => {
                                    const msgIdx = (currentLogIdx - 2 + i + logMessages.length) % logMessages.length;
                                    const msg = logMessages[msgIdx];
                                    const isLast = i === 2;
                                    return (
                                        <motion.p
                                            key={msg}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: isLast ? 1 : 0.4, x: 0 }}
                                            exit={{ opacity: 0, y: -10 }}
                                            className="flex items-center gap-2"
                                        >
                                            <span className={`${msg.includes('WARN') ? 'text-accent' : 'text-primary'} opacity-50`}>
                                                [{msg.includes('WARN') ? 'WARN' : 'INFO'}]
                                            </span>
                                            <span className="flex-1 truncate">{msg}</span>
                                            {isLast && (
                                                <motion.span
                                                    animate={{ opacity: [1, 0] }}
                                                    transition={{ duration: 0.8, repeat: Infinity }}
                                                    className="inline-block w-1.5 h-3 bg-primary/50 ml-1"
                                                />
                                            )}
                                        </motion.p>
                                    );
                                })}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
