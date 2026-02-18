
import { motion } from "framer-motion";
import { Database, Server, Cpu, Globe, Lock, Activity, ShieldCheck } from "lucide-react";

const nodes = [
    { id: "source", label: "Multi-Source Ingestion", icon: Globe, x: 5, y: 50, color: "bg-primary/10 border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.1)]" },
    { id: "quality", label: "Data Quality & Validation", icon: ShieldCheck, x: 25, y: 50, color: "bg-accent/10 border-accent/40 shadow-[0_0_15px_hsl(var(--accent)/0.1)]" },
    { id: "compute", label: "Distributed Compute (Spark)", icon: Cpu, x: 50, y: 50, color: "bg-primary/10 border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.1)]" },
    { id: "storage", label: "Delta Lakehouse (ACID)", icon: Database, x: 75, y: 50, color: "bg-primary/10 border-primary/40 shadow-[0_0_15px_hsl(var(--primary)/0.1)]" },
    { id: "serving", label: "Strategic Serving Layer", icon: Server, x: 95, y: 50, color: "bg-accent/10 border-accent/40 shadow-[0_0_15px_hsl(var(--accent)/0.1)]" }
];

const TechnicalBlueprint = () => {
    return (
        <section id="architecture" className="py-24 bg-background relative overflow-hidden border-t border-border/50">
            {/* Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-16"
                >
                    <span className="text-primary font-mono text-xl">03.</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Technical Architecture</h2>
                    <div className="h-[1px] bg-border/50 flex-1 hidden md:block" />
                </motion.div>

                <div className="relative h-[400px] border border-border/50 rounded-2xl bg-card/30 backdrop-blur-sm p-8 overflow-hidden">
                    {/* Connection Lines (Animated) */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                        <motion.path
                            d="M 150 200 L 350 200"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            className="text-primary/30"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        />
                        <motion.path
                            d="M 450 200 L 650 200"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            className="text-primary/30"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 0.5 }}
                        />
                        <motion.path
                            d="M 750 200 L 850 200"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            fill="none"
                            className="text-primary/30"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 2, repeat: Infinity, ease: "linear", delay: 1 }}
                        />
                    </svg>

                    {/* Nodes */}
                    <div className="relative z-10 flex justify-between items-center h-full sm:px-12 gap-4">
                        {nodes.map((node, i) => (
                            <motion.div
                                key={node.id}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.2 }}
                                className={`flex flex-col items-center gap-4 p-4 md:p-6 rounded-xl border ${node.color} backdrop-blur-md w-32 md:w-48 group hover:border-primary transition-all`}
                            >
                                <div className="p-3 rounded-lg bg-card border border-border/50 group-hover:scale-110 transition-transform">
                                    <node.icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                                </div>
                                <span className="text-[10px] md:text-xs font-mono font-bold text-center leading-tight">
                                    {node.label}
                                </span>
                            </motion.div>
                        ))}
                    </div>

                    {/* Annotations & Telemetry Dashboard */}
                    <div className="absolute bottom-6 left-6 right-6 flex flex-wrap items-center justify-between gap-4">
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                                <Lock className="w-3 h-3 text-primary" />
                                HIPAA COMPLIANT
                            </div>
                            <div className="flex items-center gap-2 text-[10px] text-muted-foreground font-mono">
                                <Activity className="w-3 h-3 text-primary animate-pulse" />
                                SCALING: AUTO
                            </div>
                        </div>

                        {/* Mini Telemetry Dashboard */}
                        <div className="hidden lg:flex gap-4 p-2 rounded-lg bg-background/50 border border-border/50 backdrop-blur-md">
                            {[
                                { label: "Uptime", value: "99.99%" },
                                { label: "Throughput", value: "52k/s" },
                                { label: "Latency", value: "140ms" }
                            ].map((stat, i) => (
                                <div key={i} className="flex flex-col px-3 border-r last:border-0 border-border/50">
                                    <span className="text-[8px] uppercase tracking-tighter text-muted-foreground">{stat.label}</span>
                                    <span className="text-[10px] font-mono font-bold text-primary">{stat.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                    {[
                        { title: "Fault Tolerance", desc: "Designed with decoupling and automated recovery loops." },
                        { title: "Massive Parallelism", desc: "Leveraging MPP architectures for sub-second query latency." },
                        { title: "System Observability", desc: "Real-time telemetry across every ingestion and compute node." }
                    ].map((feature, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 + i * 0.1 }}
                            className="space-y-2 p-4 rounded-lg bg-secondary/20 border border-border/50"
                        >
                            <h4 className="font-mono font-bold text-sm text-primary uppercase">{feature.title}</h4>
                            <p className="text-xs text-muted-foreground leading-relaxed">{feature.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TechnicalBlueprint;
