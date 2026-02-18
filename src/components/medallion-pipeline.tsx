import { motion } from "framer-motion";
import { Database, Filter, Layers, Zap } from "lucide-react";

const layers = [
    {
        name: "Bronze",
        description: "Raw Ingestion & Landing",
        icon: Database,
        color: "text-primary",
        bg: "bg-primary/10",
        delay: 0,
        items: ["Multi-source API Ingestion", "Change Data Capture (CDC)", "Schema Landing Zone"]
    },
    {
        name: "Silver",
        description: "Operational Clearinghouse",
        icon: Filter,
        color: "text-accent",
        bg: "bg-accent/10",
        delay: 0.5,
        items: ["Schema Enforcement", "Deduplication & Sanitization", "HIPAA PII Scrubbing"]
    },
    {
        name: "Gold",
        description: "Strategic Consumption",
        icon: Zap,
        color: "text-primary",
        bg: "bg-primary/10",
        delay: 1,
        items: ["Business-Ready Aggregates", "Feature Store Integration", "Low-Latency Serving"]
    }
];

export const MedallionPipeline = () => {

    return (
        <section id="medallion" className="py-24 bg-background border-t border-border/50 relative overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div className="container mx-auto px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold tracking-widest uppercase"
                    >
                        Architectural Standard
                    </motion.div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                        Modern <span className="text-primary italic">Lakehouse</span> Blueprint
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-lg leading-relaxed">
                        Visualizing the multi-stage transformation orchestration within a modern distributed architecture.
                    </p>
                </motion.div>

                <div className="relative flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 max-w-5xl mx-auto">
                    {/* Connection Lines (Desktop Only) */}
                    <div className="absolute top-1/2 left-0 w-full h-[1px] bg-gradient-to-r from-primary/30 via-accent/10 to-primary/30 -translate-y-1/2 hidden md:block" />

                    {layers.map((layer, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            whileInView={{ opacity: 1, scale: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2, duration: 0.5 }}
                            className="relative z-10 w-full md:w-1/3"
                        >
                            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-2xl hover:border-primary/50 transition-all duration-300 group h-full flex flex-col">
                                <div className={`w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                                    <layer.icon className={`w-7 h-7 text-primary`} />
                                </div>
                                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                                    {layer.name} <span className="text-sm font-mono opacity-50 font-normal">LAYER</span>
                                </h3>
                                <p className="text-muted-foreground mb-6 font-medium text-sm">
                                    {layer.description}
                                </p>
                                <ul className="space-y-3 mb-8 flex-1">
                                    {layer.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[13px] text-foreground/80">
                                            <div className={`w-1.5 h-1.5 rounded-full bg-primary opacity-60`} />
                                            {item}
                                        </li>
                                    ))}
                                </ul>


                                {/* Animated Flow Indicators */}
                                {idx < layers.length - 1 && (
                                    <div className="absolute top-1/2 -right-4 md:flex items-center hidden">
                                        <motion.div
                                            animate={{ x: [0, 10, 0], opacity: [0.3, 1, 0.3] }}
                                            transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.5 }}
                                            className="w-8 h-8 flex items-center justify-center"
                                        >
                                            <Layers className="w-5 h-5 text-primary rotate-90" />
                                        </motion.div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Technical Callout */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="mt-16 p-6 rounded-xl bg-muted/30 border border-dashed border-border flex flex-col md:flex-row items-center justify-between gap-6 font-mono text-sm max-w-3xl mx-auto"
                >
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                        <span className="text-muted-foreground whitespace-nowrap">ACID Compliance:</span>
                        <span className="text-foreground">Delta Lake</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                        <span className="text-muted-foreground whitespace-nowrap">Engine:</span>
                        <span className="text-foreground">Apache Spark (PySpark)</span>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse shadow-[0_0_8px_hsl(var(--accent)/0.5)]" />
                        <span className="text-muted-foreground whitespace-nowrap">Platform:</span>
                        <span className="text-foreground">Databricks / AWS</span>
                    </div>
                </motion.div>
            </div>

        </section>
    );
};
