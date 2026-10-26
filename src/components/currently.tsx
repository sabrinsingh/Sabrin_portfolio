import { Reveal } from "@/components/motion";

const FOCUS_AREAS = [
    {
        index: "01",
        title: "High-throughput ingestion",
        body: "Lakehouse and Medallion flows where volume is not the hard part — correctness is.",
        tone: "text-primary",
    },
    {
        index: "02",
        title: "Healthcare QA automation",
        body: "Stored-procedure reconciliation and claims gates written once, enforced forever.",
        tone: "text-accent",
    },
    {
        index: "03",
        title: "Data quality for AI",
        body: "Evaluation harnesses and input validation for teams putting LLMs in production.",
        tone: "text-emerald-600 dark:text-emerald-400",
    },
];

export function Currently() {
    return (
        <section
            className="border-y py-12"
            style={{ borderColor: "hsl(var(--hairline))" }}
            aria-label="Current focus areas"
        >
            <div className="container mx-auto max-w-6xl px-5 sm:px-8">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
                    <div className="md:col-span-3">
                        <p className="eyebrow flex items-center gap-2">
                            <span className="status-dot-pulse" aria-hidden="true" />
                            Currently focused on
                        </p>
                    </div>

                    <ul className="grid gap-4 sm:grid-cols-3 md:col-span-9">
                        {FOCUS_AREAS.map((area, i) => (
                            <Reveal
                                key={area.index}
                                as="li"
                                delay={i * 0.07}
                                y={14}
                                className="rounded border p-4 transition-colors hover:border-primary/40"
                                style={{ borderColor: "hsl(var(--hairline))" }}
                            >
                                <p className={`font-mono text-[11px] font-semibold uppercase tracking-wider ${area.tone}`}>
                                    {area.index} // {area.title}
                                </p>
                                <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                                    {area.body}
                                </p>
                            </Reveal>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
}
