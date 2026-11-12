import { Reveal } from "@/components/motion";

const FOCUS_AREAS = [
    {
        title: "High-throughput ingestion",
        body: "Redshift and Databricks loads at real volume, where throughput is expected and correctness is the work.",
    },
    {
        title: "Healthcare QA automation",
        body: "Stored procedure reconciliation and claims checks that run on every load.",
    },
    {
        title: "Mentoring and review",
        body: "Reviewing load logic and SQL with junior engineers, and writing down the standards.",
    },
];

export function Currently() {
    return (
        <section
            className="border-y py-10"
            style={{ borderColor: "var(--line-subtle)" }}
            aria-label="Current focus"
        >
            <div className="grid gap-6 md:grid-cols-12 md:gap-8">
                <div className="md:col-span-3">
                    <p className="eyebrow flex items-center gap-2">
                        <span className="status-dot" aria-hidden="true" />
                        Currently focused on
                    </p>
                </div>

                <ul className="grid gap-6 sm:grid-cols-3 md:col-span-9">
                    {FOCUS_AREAS.map((area, i) => (
                        <Reveal
                            as="li"
                            key={area.title}
                            delay={i * 0.05}
                            y={8}
                            className="border-t pt-4"
                            style={{ borderColor: "var(--line-subtle)" }}
                        >
                            <p className="text-sm font-medium text-slate-100">{area.title}</p>
                            <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{area.body}</p>
                        </Reveal>
                    ))}
                </ul>
            </div>
        </section>
    );
}
