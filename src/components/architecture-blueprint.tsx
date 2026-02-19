import { motion } from "framer-motion";
import { Database, Server, Cpu, Globe, Lock, Activity, ShieldCheck, Binary, Info } from "lucide-react";
import { TiltCard } from "./tilt-card";

const nodes = [
    {
        id: "source",
        label: "Ingestion Core",
        sublabel: "Kafka · Airbyte · CDC",
        icon: Globe,
        color: "border-primary/40",
        glow: "shadow-[0_0_20px_hsl(var(--primary)/0.15)]",
        iconColor: "text-primary",
        bg: "bg-primary/5",
        tech: ["Event Hub", "API Hooks", "S3 Landing"]
    },
    {
        id: "quality",
        label: "Validation Layer",
        sublabel: "GX · HIPAA · PII Scrub",
        icon: ShieldCheck,
        color: "border-accent/40",
        glow: "shadow-[0_0_20px_hsl(var(--accent)/0.15)]",
        iconColor: "text-accent",
        bg: "bg-accent/5",
        tech: ["Schema Check", "Anomalies", "Masking"]
    },
    {
        id: "compute",
        label: "Distributed Compute",
        sublabel: "Spark 3.5 · EMR · Airflow",
        icon: Cpu,
        color: "border-primary/40",
        glow: "shadow-[0_0_20px_hsl(var(--primary)/0.15)]",
        iconColor: "text-primary",
        bg: "bg-primary/5",
        tech: ["DAG Engine", "Shuffle Service", "UDFs"]
    },
    {
        id: "storage",
        label: "Delta Lakehouse",
        sublabel: "Bronze → Silver → Gold",
        icon: Database,
        color: "border-primary/40",
        glow: "shadow-[0_0_20px_hsl(var(--primary)/0.15)]",
        iconColor: "text-primary",
        bg: "bg-primary/5",
        tech: ["ACID", "Z-Order", "Time Travel"]
    },
    {
        id: "serving",
        label: "Serving Layer",
        sublabel: "Redshift · dbt · BI",
        icon: Server,
        color: "border-accent/40",
        glow: "shadow-[0_0_20px_hsl(var(--accent)/0.15)]",
        iconColor: "text-accent",
        bg: "bg-accent/5",
        tech: ["Materialized Views", "Caching", "Semantic"]
    },
];


const TechnicalBlueprint = () => {
    return (
        <section id="architecture" className="py-16 md:py-24 bg-background relative overflow-hidden border-t border-border/50">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12"
                >
                    <span className="text-primary font-mono text-xl">03.</span>
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Technical Architecture</h2>
                    <div className="h-[1px] bg-border/50 flex-1 hidden md:block" />
                </motion.div>

                {/* Mobile: Vertical pipeline */}
                <div className="flex flex-col items-center lg:hidden gap-0 mb-8 w-full">
                    {nodes.map((node, i) => (
                        <div key={node.id} className="flex flex-col items-center w-full max-w-sm">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className={`w-full flex items-center gap-4 p-5 rounded-2xl border ${node.color} ${node.bg} ${node.glow} backdrop-blur-md group hover:border-primary transition-all relative overflow-hidden`}
                            >
                                <div className="absolute top-0 left-0 w-1 h-full bg-primary/20" />
                                <div className="p-3 rounded-xl bg-card border border-border/50 shrink-0 shadow-inner">
                                    <node.icon className={`w-6 h-6 ${node.iconColor}`} />
                                </div>
                                <div className="min-w-0 flex-1">
                                    <span className="text-sm font-mono font-bold text-foreground block tracking-tight">{node.label}</span>
                                    <span className="text-[11px] text-muted-foreground font-mono leading-none">{node.sublabel}</span>

                                    {/* Mobile: Performance Ledger */}
                                    <div className="flex gap-3 mt-2">
                                        <div className="flex flex-col">
                                            <span className="text-[7px] uppercase text-muted-foreground/60 leading-none">Latency</span>
                                            <span className="text-[9px] font-mono text-primary font-bold">12ms</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-[7px] uppercase text-muted-foreground/60 leading-none">Uptime</span>
                                            <span className="text-[9px] font-mono text-primary font-bold">99.9%</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-end gap-1">
                                    <span className="text-[10px] font-mono text-primary/60 font-bold">0{i + 1}</span>
                                    <Activity className="w-3 h-3 text-emerald-500/50 animate-pulse" />
                                </div>
                            </motion.div>
                            {i < nodes.length - 1 && (
                                <div className="flex flex-col items-center py-3 relative">
                                    <div className="absolute top-0 bottom-0 w-[1px] bg-gradient-to-b from-primary/30 via-primary/10 to-primary/30" />
                                    {[0, 1, 2, 3].map((dot) => (
                                        <motion.div
                                            key={dot}
                                            animate={{
                                                opacity: [0.2, 1, 0.2],
                                                scale: [0.8, 1.2, 0.8],
                                                y: [0, 5, 0]
                                            }}
                                            transition={{
                                                duration: 1.5,
                                                repeat: Infinity,
                                                delay: dot * 0.2 + i * 0.3,
                                                ease: "easeInOut"
                                            }}
                                            className="w-1.5 h-1.5 rounded-full bg-primary my-1 shadow-[0_0_8px_rgba(var(--primary),0.4)] z-10"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Desktop: Horizontal pipeline with SVG Particle Flow */}
                <div className="hidden lg:block relative border border-border/50 rounded-[2.5rem] bg-card/20 backdrop-blur-md p-10 mb-8 overflow-hidden min-h-[480px]">
                    {/* SVG Connections Layer */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                        <defs>
                            <linearGradient id="flow-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                                <stop offset="50%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
                                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
                            </linearGradient>
                        </defs>

                        {/* Dynamic connection lines */}
                        <path d="M 80 200 C 200 200, 300 200, 1000 200" stroke="url(#flow-gradient)" strokeWidth="1" fill="none" className="opacity-30" />

                        {/* Particle flow */}
                        {[...Array(6)].map((_, i) => (
                            <motion.circle
                                key={i}
                                r="2"
                                fill="hsl(var(--primary))"
                                animate={{
                                    cx: [100, 950],
                                    opacity: [0, 1, 0],
                                    filter: ["blur(0px)", "blur(1px)", "blur(0px)"]
                                }}
                                transition={{
                                    duration: 3 + i,
                                    repeat: Infinity,
                                    delay: i * 0.8,
                                    ease: "linear"
                                }}
                                className="shadow-[0_0_8px_hsl(var(--primary))]"
                            />
                        ))}
                    </svg>

                    <div className="relative flex justify-between items-center h-full pt-12">
                        {nodes.map((node, i) => (
                            <div key={node.id} className="relative group">
                                <TiltCard className="w-52">
                                    <div className={`p-6 rounded-2xl border ${node.color} ${node.bg} ${node.glow} backdrop-blur-xl group-hover:border-primary/60 transition-all`}>
                                        <div className="p-3 w-12 h-12 rounded-xl bg-card border border-border/50 mb-4 flex items-center justify-center shadow-inner">
                                            <node.icon className={`w-6 h-6 ${node.iconColor}`} />
                                        </div>
                                        <div className="space-y-1">
                                            <h3 className="text-xs font-mono font-bold text-foreground tracking-tight">{node.label}</h3>
                                            <p className="text-[10px] text-muted-foreground font-mono">{node.sublabel}</p>
                                        </div>

                                        {/* Dynamic tech tags on hover */}
                                        <div className="mt-4 pt-4 border-t border-border/30 opacity-0 group-hover:opacity-100 transition-opacity space-y-2">
                                            {node.tech.map((t, idx) => (
                                                <div key={idx} className="flex items-center gap-1.5 text-[8px] font-mono text-primary/70">
                                                    <Binary className="w-2.5 h-2.5" />
                                                    {t}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TiltCard>

                                {/* Step Indicator */}
                                <div className="absolute -top-6 left-1/2 -translate-x-1/2 flex flex-col items-center">
                                    <span className="text-[9px] font-mono text-muted-foreground/40 font-bold uppercase tracking-widest">Phase 0{i + 1}</span>
                                    <div className="w-[1px] h-3 bg-border mt-1" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Operational HUD Strip */}
                    <div className="absolute bottom-8 left-10 right-10 flex items-end justify-between border-t border-border/30 pt-6">
                        <div className="flex gap-8">
                            <div className="space-y-1.5">
                                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <Lock className="w-3 h-3 text-primary" /> Security Standard
                                </div>
                                <div className="text-xs font-bold text-foreground bg-primary/10 px-3 py-1 rounded-md border border-primary/20">HIPAA COMPLIANT</div>
                            </div>
                            <div className="space-y-1.5">
                                <div className="text-[9px] font-mono text-muted-foreground uppercase tracking-widest flex items-center gap-2">
                                    <Activity className="w-3 h-3 text-emerald-500 animate-pulse" /> Compute Load
                                </div>
                                <div className="text-xs font-bold text-foreground bg-emerald-500/10 px-3 py-1 rounded-md border border-emerald-500/20 uppercase">Scaling: 12 Nodes</div>
                            </div>
                        </div>

                        <div className="flex gap-1">
                            {[
                                { label: "Uptime", value: "99.99%", trend: "+0.01%" },
                                { label: "Throughput", value: "52k/s", trend: "Steady" },
                                { label: "Latency", value: "140ms", trend: "-5ms" }
                            ].map((stat, i) => (
                                <div key={i} className="bg-secondary/30 p-3 rounded-xl border border-border/50 min-w-[120px] group/stat hover:border-primary/30 transition-all">
                                    <div className="text-[8px] uppercase tracking-tighter text-muted-foreground mb-1">{stat.label}</div>
                                    <div className="text-sm font-mono font-bold text-primary flex items-center justify-between">
                                        {stat.value}
                                        <span className="text-[8px] text-muted-foreground/50 font-normal">{stat.trend}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Data Morphosis: Real-time Evolution */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-16 mb-16 p-6 sm:p-8 rounded-[2rem] bg-gradient-to-br from-card/80 to-card/40 border border-primary/20 relative overflow-hidden group shadow-2xl"
                >
                    <div className="absolute top-0 right-0 p-8 sm:p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                        <Binary className="w-64 h-64 text-primary" />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 items-center">
                        <div className="w-full lg:w-1/2 space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary font-bold uppercase tracking-widest">
                                <Info className="w-3 h-3" /> The Data Morphosis
                            </div>
                            <h3 className="text-2xl sm:text-3xl font-bold text-foreground leading-tight">Witness the evolution of a single record from Raw to Strategic.</h3>
                            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                                Our architecture doesn't just store data; it translates it. Every ingestion event undergoes a three-stage mutation that scrubs PII, enforces schemas, and calculates business value in real-time.
                            </p>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-3 rounded-xl bg-background/40 border border-border/50">
                                    <div className="text-[8px] uppercase text-muted-foreground font-bold mb-1">Raw Mutation</div>
                                    <div className="text-xs font-mono text-primary">50k Events/s</div>
                                </div>
                                <div className="p-3 rounded-xl bg-background/40 border border-border/50">
                                    <div className="text-[8px] uppercase text-muted-foreground font-bold mb-1">Policy Guard</div>
                                    <div className="text-xs font-mono text-accent">100% HIPAA</div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full lg:w-1/2">
                            <div className="bg-black/80 rounded-2xl p-6 border border-primary/30 font-mono relative">
                                <div className="absolute -top-3 left-6 px-3 py-1 bg-primary text-primary-foreground text-[10px] font-bold rounded-lg uppercase tracking-tight">Transformer Node: 0x42f</div>
                                <div className="space-y-4 text-[10px] sm:text-[11px]">
                                    <div className="space-y-1">
                                        <span className="text-zinc-500 block opacity-50">// RAW INGEST (JSON)</span>
                                        <div className="text-emerald-400 opacity-60">{"{ 'patient': 'John Doe', 'ssn': '123-45-789', 'code': 'E11.9' }"}</div>
                                    </div>
                                    <div className="flex justify-center items-center py-1">
                                        <div className="h-4 w-[1px] bg-primary animate-pulse" />
                                    </div>
                                    <div className="space-y-1 pl-4 border-l border-primary/30">
                                        <span className="text-zinc-500 block opacity-50">// ENRICHED (SILVER)</span>
                                        <div className="text-primary font-bold">{"{ 'pt_id': hash('JD-123'), 'diag': 'Type 2 Diabetes', 'scrubbed': true }"}</div>
                                    </div>
                                    <div className="flex justify-center items-center py-1">
                                        <div className="h-4 w-[1px] bg-primary animate-pulse" />
                                    </div>
                                    <div className="space-y-1 pl-8 border-l-2 border-primary">
                                        <span className="text-zinc-500 block opacity-50">// ANALYTIC READY (GOLD)</span>
                                        <div className="text-white bg-primary/20 p-2 rounded border border-primary/40 animate-pulse">
                                            {"{ 'risk_score': 0.85, 'cohort': 'Metabolic', 'predictive_los': '4d' }"}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Feature cards — fixed potential truncation issues */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[
                        { title: "Fault Tolerance", desc: "Idempotency ensured via Delta Lake ACID compliance. Self-healing pipelines with decoupled retry logic.", stat: "Zero data loss" },
                        { title: "Parallel Physics", desc: "MPP architecture leveraging localized shuffle buffers to maintain sub-second latency at petabyte scale.", stat: "52k rows/sec" },
                        { title: "Full Observability", desc: "End-to-end lineage tracking with real-time telemetry across every ingestion node and compute stage.", stat: "99.99% uptime" }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 + i * 0.1 }}
                            className="flex flex-col h-full space-y-3 p-5 rounded-2xl bg-secondary/20 border border-border/50 group hover:border-primary/40 transition-all hover:bg-secondary/30 shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <h4 className="font-mono font-bold text-xs text-primary uppercase tracking-wider">{feature.title}</h4>
                                <span className="text-[10px] font-mono text-muted-foreground bg-primary/10 px-2.5 py-1 rounded-full border border-primary/20">{feature.stat}</span>
                            </div>
                            <p className="text-xs text-muted-foreground leading-relaxed flex-grow">{feature.desc}</p>
                            <div className="pt-2 flex gap-1">
                                <div className="h-1 w-full bg-primary/20 rounded-full overflow-hidden">
                                    <motion.div
                                        animate={{ x: ["-100%", "100%"] }}
                                        transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: i * 0.5 }}
                                        className="h-full w-1/3 bg-primary/50"
                                    />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnicalBlueprint;
