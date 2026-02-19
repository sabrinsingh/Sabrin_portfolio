import { motion } from "framer-motion";
import { Database, Filter, Zap, ArrowRight } from "lucide-react";

const layers = [
    {
        name: "Bronze",
        description: "Raw Ingestion & Landing",
        icon: Database,
        stat: "50M+ records/day",
        statColor: "text-primary",
        items: ["Multi-source API Ingestion", "Change Data Capture (CDC)", "Schema Landing Zone"],
        delay: 0,
    },
    {
        name: "Silver",
        description: "Operational Clearinghouse",
        icon: Filter,
        stat: "99.7% data quality",
        statColor: "text-accent",
        items: ["Schema Enforcement", "Deduplication & Sanitization", "HIPAA PII Scrubbing"],
        delay: 0.2,
    },
    {
        name: "Gold",
        description: "Strategic Consumption",
        icon: Zap,
        stat: "<140ms latency",
        statColor: "text-primary",
        items: ["Business-Ready Aggregates", "Feature Store Integration", "Low-Latency Serving"],
        delay: 0.4,
    }
];

// Scrolling marquee ticker
const ticker = ["ACID", "CDC", "PII-SCRUB", "DELTA-LAKE", "SPARK 3.5", "BRONZE", "SILVER", "GOLD", "DATA QUALITY", "HIPAA COMPLIANT"];

export const MedallionPipeline = () => {
    return (
        <section id="medallion" className="py-16 md:py-24 bg-background border-t border-border/50 relative overflow-hidden">
            {/* Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)', backgroundSize: '20px 20px' }} />

            <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold tracking-widest uppercase">
                        Architectural Standard
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight mb-4 text-foreground">
                        Modern <span className="text-primary italic">Lakehouse</span> Blueprint
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
                        Multi-stage transformation orchestration processing 50M+ daily records with 99.7% quality SLA.
                    </p>
                </motion.div>

                {/* Mobile: Horizontal scrollable pipeline */}
                <div className="flex md:hidden overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 gap-4 mb-4">
                    {layers.map((layer, idx) => (
                        <div key={idx} className="min-w-[85vw] snap-center">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="bg-card border border-border rounded-2xl p-5 hover:border-primary/50 transition-all flex flex-col h-full shadow-lg"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                                            <layer.icon className="w-6 h-6 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg flex items-center gap-2">
                                                {layer.name}
                                                <span className="text-[10px] font-mono opacity-40 font-normal">LAYER</span>
                                            </h3>
                                            <p className="text-xs text-muted-foreground">{layer.description}</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-3">
                                    {layer.items.map((item, i) => (
                                        <div key={i} className="flex items-center gap-2 text-xs text-foreground/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary/60 shrink-0" />
                                            {item}
                                        </div>
                                    ))}
                                </div>

                                <div className={`mt-4 pt-4 border-t border-border/50 flex items-center justify-between`}>
                                    <span className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">Performance</span>
                                    <span className={`text-xs font-mono font-bold ${layer.statColor} bg-primary/10 px-3 py-1 rounded-full border border-primary/20`}>
                                        {layer.stat}
                                    </span>
                                </div>
                            </motion.div>
                        </div>
                    ))}
                </div>

                {/* Mobile Scroll Indicator */}
                <div className="flex md:hidden justify-center gap-1.5 mb-8">
                    {layers.map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 rounded-full bg-primary/20" />
                    ))}
                </div>

                {/* Desktop: horizontal cards */}
                <div className="relative hidden md:flex items-stretch justify-between gap-4 max-w-5xl mx-auto mb-8">
                    {/* Background connection line */}
                    <div className="absolute top-12 left-0 w-full h-[1px] bg-gradient-to-r from-primary/30 via-accent/10 to-primary/30" />

                    {layers.map((layer, idx) => (
                        <div key={idx} className="relative z-10 flex items-center w-full">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: layer.delay, duration: 0.5 }}
                                className="relative z-10 flex-1 bg-card border border-border rounded-2xl p-5 lg:p-6 hover:shadow-xl hover:border-primary/50 transition-all duration-300 group h-full flex flex-col"
                            >
                                {/* Stat badge */}
                                <div className={`absolute top-4 right-4 text-[10px] font-mono font-bold ${layer.statColor} bg-primary/5 border border-primary/20 px-2 py-0.5 rounded-full`}>
                                    {layer.stat}
                                </div>

                                <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                    <layer.icon className="w-6 h-6 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-1 flex items-center gap-2">
                                    {layer.name} <span className="text-xs font-mono opacity-40 font-normal">LAYER</span>
                                </h3>
                                <p className="text-muted-foreground mb-4 font-medium text-sm">{layer.description}</p>
                                <ul className="space-y-2 flex-1">
                                    {layer.items.map((item, i) => (
                                        <li key={i} className="flex items-center gap-2 text-[13px] text-foreground/80">
                                            <div className="w-1.5 h-1.5 rounded-full bg-primary opacity-60 shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>

                            {idx < layers.length - 1 && (
                                <div className="hidden md:flex items-center px-1 shrink-0 z-20">
                                    <motion.div
                                        animate={{ x: [0, 6, 0], opacity: [0.3, 1, 0.3] }}
                                        transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.5 }}
                                    >
                                        <ArrowRight className="w-5 h-5 text-primary" />
                                    </motion.div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                {/* Technical Callout */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 }}
                    className="p-4 sm:p-6 rounded-xl bg-muted/30 border border-dashed border-border flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-4 font-mono text-sm max-w-3xl mx-auto"
                >
                    {[
                        { label: "ACID Compliance:", value: "Delta Lake" },
                        { label: "Engine:", value: "Apache Spark (PySpark)" },
                        { label: "Platform:", value: "Databricks / AWS" },
                    ].map((item, i) => (
                        <div key={i} className="flex items-center gap-3">
                            <div className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_hsl(var(--primary)/0.5)]" />
                            <span className="text-muted-foreground text-xs sm:text-sm">{item.label}</span>
                            <span className="text-foreground text-xs sm:text-sm font-semibold">{item.value}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Animated tech ticker */}
                <div className="mt-10 overflow-hidden rounded-xl border border-border/30 bg-card/30">
                    <div className="flex gap-0 py-2.5">
                        <motion.div
                            animate={{ x: ["0%", "-50%"] }}
                            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            className="flex gap-8 shrink-0 px-4"
                        >
                            {[...ticker, ...ticker].map((item, i) => (
                                <span key={i} className="text-[10px] font-mono font-bold tracking-widest text-muted-foreground/50 uppercase whitespace-nowrap flex items-center gap-3">
                                    <span className="w-1 h-1 rounded-full bg-primary/40 inline-block" />
                                    {item}
                                </span>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
