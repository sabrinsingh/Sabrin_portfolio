export function Currently() {
    return (
        <section className="py-12 border-t border-border">
            <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
                    <div className="md:col-span-3">
                        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-muted-foreground">
                            <span className="status-dot-pulse" />
                            <span>Active Focus Areas</span>
                        </div>
                    </div>
                    <ul className="md:col-span-9 grid sm:grid-cols-3 gap-4 text-xs font-mono">
                        <li className="p-3.5 rounded border border-border bg-card space-y-1">
                            <p className="text-primary font-semibold">01 // High-Throughput Ingestion</p>
                            <p className="text-muted-foreground font-sans text-xs">Architecting petabyte-scale pipelines &amp; Delta Lake Medallion flows.</p>
                        </li>
                        <li className="p-3.5 rounded border border-border bg-card space-y-1">
                            <p className="text-accent font-semibold">02 // Healthcare QA Automation</p>
                            <p className="text-muted-foreground font-sans text-xs">Automated SQL stored procedures &amp; clinical claims reconciliation gates.</p>
                        </li>
                        <li className="p-3.5 rounded border border-border bg-card space-y-1">
                            <p className="text-emerald-600 dark:text-emerald-400 font-semibold">03 // Modern Data Platforms</p>
                            <p className="text-muted-foreground font-sans text-xs">Databricks SQL, Redshift optimization, and automated QA gates.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
