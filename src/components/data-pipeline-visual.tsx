import { motion } from "framer-motion";

const nodes = [
    { id: "SRC", label: "SOURCE", type: "external" },
    { id: "ING", label: "INGESTION", type: "process" },
    { id: "BRZ", label: "BRONZE", type: "storage" },
    { id: "SLV", label: "SILVER", type: "storage" },
    { id: "GLD", label: "GOLD", type: "storage" },
    { id: "QA", label: "QUALITY GATE", type: "process" },
    { id: "BI", label: "CONSUMPTION", type: "external" },
];

export function DataPipelineVisual() {
    return (
        <section className="py-20 md:py-32 border-t border-border bg-background overflow-hidden relative">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                <div className="mb-16">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Architecture Concept</p>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">Data Flow Topology.</h2>
                </div>

                <div className="relative py-12 overflow-x-auto scrollbar-hide">
                    <div className="min-w-[800px] flex items-center justify-between relative px-8">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-12 right-12 h-[2px] bg-border -translate-y-1/2 z-0">
                            <motion.div 
                                initial={{ width: "0%" }}
                                whileInView={{ width: "100%" }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ duration: 2, ease: "easeInOut" }}
                                className="h-full bg-primary/40 relative"
                            >
                                {/* Animated Packet */}
                                <motion.div 
                                    animate={{ 
                                        left: ["0%", "100%"],
                                        opacity: [0, 1, 1, 0]
                                    }}
                                    transition={{ 
                                        duration: 3, 
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                    className="absolute top-1/2 -translate-y-1/2 w-16 h-[2px] bg-primary blur-[2px]"
                                />
                            </motion.div>
                        </div>

                        {/* Nodes */}
                        {nodes.map((node, i) => (
                            <motion.div 
                                key={node.id}
                                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                transition={{ delay: i * 0.15, duration: 0.5 }}
                                className="relative z-10 flex flex-col items-center group cursor-crosshair"
                            >
                                <div className={`w-3 h-3 rounded-full border-2 border-background mb-4 transition-transform group-hover:scale-150 ${
                                    node.type === "external" ? "bg-neutral-500" :
                                    node.type === "storage" ? "bg-blue-400" :
                                    "bg-primary"
                                }`} />
                                <div className="absolute top-8 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                    <div className="bg-foreground text-background font-mono text-[10px] px-2 py-1 rounded">
                                        {node.label}
                                    </div>
                                </div>
                                <span className="font-mono text-[10px] text-muted-foreground mt-2">{node.id}</span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
