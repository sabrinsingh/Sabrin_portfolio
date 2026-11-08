import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

const principles = [
    {
        id: "01",
        title: "Validation as code",
        tagline: "Correctness before throughput",
        description:
            "Data quality is not a post-hoc monitoring task; it is a primary unit of engineering. Every ingestion boundary gets deterministic, autonomous assertion gates written alongside the pipeline.",
    },
    {
        id: "02",
        title: "Automate the repetitive",
        tagline: "Zero manual reconciliation",
        description:
            "Turn repeatable validation work into deterministic test suites. If a human checks a schema or a row count twice, an automated gate should check it forever.",
    },
    {
        id: "03",
        title: "Trace the lineage",
        tagline: "Raw telemetry to executive metric",
        description:
            "Know exactly where data originates, how transformations mutate types, and how the final number is derived. Auditable lineage is how stakeholder trust is earned.",
    },
    {
        id: "04",
        title: "Engineer for failure",
        tagline: "Idempotent retries & ACID guarantees",
        description:
            "Upstream feeds will fail. Architect pipelines with idempotent restarts, isolated quarantine dead-letter queues and atomic transactions so a retry is boring.",
    },
    {
        id: "05",
        title: "Deterministic reconciliation",
        tagline: "Automated procedures, zero silent errors",
        description:
            "Healthcare and enterprise records demand deterministic validation: stored-procedure reconciliation, ICD-10/CPT reference checks and strict schema assertions before warehouse staging.",
    },
];

export function Approach() {
    return (
        <section
            id="approach"
            className="surface-deep border-y py-16 md:py-24"
            style={{ borderColor: "hsl(var(--hairline))" }}
        >
            <div className="container mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading
                    index="02"
                    eyebrow="Engineering Approach"
                    title={
                        <>
                            Five rules I do not{" "}
                            <em className="text-editorial-italic text-primary">
                                bend
                            </em>
                            .
                        </>
                    }
                    description="Non-negotiable disciplines, learned the expensive way across nine years of production data systems."
                />

                <div className="border-t" style={{ borderColor: "hsl(var(--hairline))" }}>
                    {principles.map((p, i) => (
                        <Reveal
                            key={p.id}
                            as="article"
                            delay={i * 0.05}
                            y={18}
                            className="group border-b px-1 py-7 transition-colors hover:bg-secondary/40 sm:px-3"
                            id={`approach-${p.id}`}
                        >
                            <div className="grid grid-cols-1 gap-3 md:grid-cols-12 md:gap-8">
                                <div className="md:col-span-3">
                                    <span className="text-editorial block text-3xl leading-none text-muted-foreground/45 transition-colors group-hover:text-primary/80 sm:text-4xl">
                                        {p.id}
                                    </span>
                                    <span className="eyebrow mt-2 block">{p.tagline}</span>
                                </div>

                                <div className="md:col-span-4">
                                    <h3 className="text-editorial text-2xl leading-[1.15] text-foreground sm:text-[1.75rem]">
                                        {p.title}
                                    </h3>
                                </div>

                                <div className="md:col-span-5">
                                    <p className="text-sm leading-relaxed text-muted-foreground sm:text-[0.95rem]">
                                        {p.description}
                                    </p>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
