const principles = [
    {
        id: "01",
        title: "Validation as Code",
        tagline: "Correctness before throughput",
        description: "Data quality is not a post-hoc monitoring task; it is a primary unit of engineering. Every ingestion boundary must include deterministic, autonomous assertion gates.",
    },
    {
        id: "02",
        title: "Automate the Repetitive",
        tagline: "Zero manual reconciliation",
        description: "Turn repeatable validation and operational work into deterministic test suites. If a human verifies a schema or row count twice, an automated gate should check it forever.",
    },
    {
        id: "03",
        title: "Trace the Lineage",
        tagline: "From raw telemetry to executive metric",
        description: "Understand exactly where data originates, how transformations mutate types, and how the final metric is derived. Auditable lineage is how stakeholder trust is earned.",
    },
    {
        id: "04",
        title: "Engineer for Failure",
        tagline: "Idempotent retries & ACID guarantees",
        description: "Distributed networks and upstream feeds will inevitably fail. Architect pipelines with idempotent restarts, isolated quarantine dead-letter queues, and atomic transactions.",
    },
    {
        id: "05",
        title: "Deterministic QA & Reconciliation",
        tagline: "Automated stored procedures & zero silent errors",
        description: "Healthcare and enterprise records demand deterministic validation: automated stored procedure reconciliation, ICD-10/CPT reference verification, and strict schema assertion suites before warehouse staging.",
    },
];

export function HowIThink() {
    return (
        <section className="py-16 md:py-24 border-t border-border">
            <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                    <div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-foreground">
                            Architectural principles
                        </h2>
                        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                            Five non-negotiable disciplines honed across 9+ years building high-throughput production data systems.
                        </p>
                    </div>
                </div>

                <div className="divide-y divide-border border-y border-border">
                    {principles.map((p) => (
                        <div
                            key={p.id}
                            className="py-6 sm:py-8 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 items-start group hover:bg-secondary/25 transition-colors px-2 sm:px-4 -mx-2 sm:-mx-4 rounded"
                        >
                            <div className="md:col-span-2 flex items-center gap-2">
                                <span className="font-mono text-sm font-semibold text-primary">
                                    {p.id}
                                </span>
                                <span className="font-mono text-xs text-muted-foreground">/ 05</span>
                            </div>
                            <div className="md:col-span-4 space-y-1">
                                <h3 className="text-lg md:text-xl font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                                    {p.title}
                                </h3>
                                <p className="font-mono text-xs text-accent">
                                    {p.tagline}
                                </p>
                            </div>
                            <div className="md:col-span-6">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {p.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
