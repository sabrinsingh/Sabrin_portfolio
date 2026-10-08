export function Currently() {
    return (
        <section className="py-16 border-t border-border bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="md:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                            </span>
                            <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">AVAILABLE</p>
                        </div>
                    </div>
                    <div className="md:col-span-3">
                        <ul className="space-y-4 font-mono text-xs sm:text-sm text-foreground/80">
                            <li className="flex items-start gap-3">
                                <span className="text-primary shrink-0 mt-0.5">→</span>
                                <span>Building reliable data systems and petabyte-scale pipelines.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary shrink-0 mt-0.5">→</span>
                                <span>Exploring AI-assisted engineering, LLMOps, and evaluation harnesses.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <span className="text-primary shrink-0 mt-0.5">→</span>
                                <span>Deepening cloud, Databricks, and data platform expertise.</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
