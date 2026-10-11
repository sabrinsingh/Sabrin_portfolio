export function Currently() {
    return (
        <section className="py-16 border-t border-border/70">
            <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                <div className="luxury-card p-6 sm:p-8 rounded-xl grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-3">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            <span className="status-dot-pulse" />
                            <span>Currently Active</span>
                        </div>
                        <p className="font-display text-lg text-foreground mt-1">Focus Areas</p>
                    </div>
                    <ul className="md:col-span-9 grid sm:grid-cols-3 gap-4 text-xs font-mono text-foreground/85">
                        <li className="p-3 rounded border border-border/60 bg-card/40 space-y-1">
                            <p className="text-primary font-semibold">01 // High-Throughput Ingestion</p>
                            <p className="text-muted-foreground font-sans text-xs">Architecting petabyte-scale data pipelines &amp; Delta Lake Medallion flows.</p>
                        </li>
                        <li className="p-3 rounded border border-border/60 bg-card/40 space-y-1">
                            <p className="text-accent font-semibold">02 // Healthcare QA Automation</p>
                            <p className="text-muted-foreground font-sans text-xs">Building automated SQL stored procedures &amp; clinical claims reconciliation gates.</p>
                        </li>
                        <li className="p-3 rounded border border-border/60 bg-card/40 space-y-1">
                            <p className="text-emerald-400 font-semibold">03 // Modern Data Platforms</p>
                            <p className="text-muted-foreground font-sans text-xs">Deepening Databricks, Redshift optimization, and automated QA gate architectures.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
