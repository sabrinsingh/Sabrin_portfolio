import { motion } from "framer-motion";

const principles = [
    {
        id: "01",
        title: "DATA QUALITY FIRST",
        description: "Reliable pipelines require validation, reconciliation, and measurable quality checks. I architect for correctness before throughput."
    },
    {
        id: "02",
        title: "AUTOMATE THE REPETITIVE",
        description: "Turn repeatable validation and operational work into deterministic automation. If a human checks it twice, a script should check it infinitely."
    },
    {
        id: "03",
        title: "TRACE THE DATA",
        description: "Understand where data originates, how it transforms, and how the final result is produced. Lineage ensures confidence."
    },
    {
        id: "04",
        title: "ENGINEER FOR OPERATIONS",
        description: "Systems should be observable, testable, and maintainable. It's not enough to be functional once; it must be resilient always."
    },
    {
        id: "05",
        title: "USE AI WITH GUARDRAILS",
        description: "AI systems must be grounded in reliable data, explicit rules, and measurable evaluation frameworks to be safe for production."
    }
];

export function HowIThink() {
    return (
        <section className="py-20 md:py-32 border-t border-border bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <div className="mb-16">
                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-3">Engineering Philosophy</p>
                    <h2 className="text-3xl md:text-5xl font-display font-bold text-foreground tracking-tight">How I think about data.</h2>
                </div>

                <div className="space-y-0">
                    {principles.map((p, i) => (
                        <motion.div 
                            key={p.id}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ delay: i * 0.1, duration: 0.6, ease: "easeOut" }}
                            className="group grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start py-8 border-t border-border last:border-b transition-colors hover:bg-secondary/30"
                        >
                            <div className="md:col-span-2">
                                <span className="font-mono text-sm text-muted-foreground">{p.id}</span>
                            </div>
                            <div className="md:col-span-4">
                                <h3 className="font-display font-bold text-foreground tracking-tight text-lg group-hover:text-primary transition-colors">
                                    {p.title}
                                </h3>
                            </div>
                            <div className="md:col-span-6">
                                <p className="text-base text-muted-foreground leading-relaxed">
                                    {p.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
