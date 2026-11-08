import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

const LEDGER = [
    { value: "35%", label: "Redshift query latency removed", tone: "text-foreground" },
    { value: "50M+", label: "Records flowing daily", tone: "text-primary" },
    { value: "HIPAA", label: "Regulated data, zero PII incidents", tone: "text-accent" },
];

export function About() {
    return (
        <section
            id="about"
            className="surface-tint relative border-y py-16 md:py-24"
            style={{ borderColor: "hsl(var(--hairline))" }}
        >
            <div className="container mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading
                    index="01"
                    eyebrow="About"
                    title={
                        <>
                            Built to be trusted,{" "}
                            <em className="text-editorial-italic text-primary">not</em>{" "}
                            just fast.
                        </>
                    }
                    description="A short version of how I got here, and what I actually care about when I open a laptop."
                />

                <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                    {/* Narrative */}
                    <div className="lg:col-span-7 space-y-5">
                        <Reveal as="p" className="text-base sm:text-lg leading-relaxed text-foreground/90">
                            I have spent nine years in data — the kind where a
                            silently wrong row reaches a clinician, an analyst, or a
                            board deck before anyone notices. That is the problem I
                            work on: making bad data loud, early, and cheap to fix.
                        </Reveal>

                        <Reveal as="p" delay={0.05} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            I started on the backend of an investment-tracking
                            product, moved into US healthcare claims ETL with Oracle
                            and Python, then into Databricks and Delta Lake where I
                            led an eight-person squad through a lakehouse
                            migration. Today I build ingestion and validation
                            systems for healthcare analytics, and advise US teams on
                            data quality frameworks.
                        </Reveal>

                        <Reveal as="p" delay={0.1} className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                            The work I care about most sits where warehousing
                            discipline meets AI: evaluating models, testing pipelines,
                            and treating data quality as a first-class engineering
                            artefact. A model is only ever as dependable as the table
                            standing behind it.
                        </Reveal>

                        {/* Pull quote — an editorial pause in the rhythm */}
                        <Reveal delay={0.15}>
                            <blockquote
                                className="border-l-2 pl-5 sm:pl-6"
                                style={{ borderColor: "hsl(var(--primary) / 0.55)" }}
                            >
                                <p className="text-editorial text-xl sm:text-2xl leading-snug text-foreground">
                                    Data quality is not a review you do at the end.
                                    It is a gate you write with the pipeline.
                                </p>
                            </blockquote>
                        </Reveal>
                    </div>

                    {/* Ledger */}
                    <div className="lg:col-span-5">
                        <Reveal delay={0.1}>
                            <div
                                className="divide-y rounded-lg border bg-card"
                                style={{ borderColor: "hsl(var(--hairline))" }}
                            >
                                <div
                                    className="flex items-baseline justify-between px-6 py-4"
                                    style={{ borderColor: "hsl(var(--hairline))" }}
                                >
                                    <span className="eyebrow">Documented outcomes</span>
                                    <span className="font-mono text-[11px] text-muted-foreground">
                                        production systems
                                    </span>
                                </div>

                                {LEDGER.map((item) => (
                                    <div
                                        key={item.label}
                                        className="flex items-baseline justify-between gap-4 px-6 py-5"
                                        style={{ borderColor: "hsl(var(--hairline))" }}
                                    >
                                        <span
                                            className={`text-3xl sm:text-4xl font-display font-semibold tracking-tight ${item.tone}`}
                                        >
                                            {item.value}
                                        </span>
                                        <span className="max-w-[13rem] text-right font-mono text-[11px] uppercase leading-relaxed tracking-wider text-muted-foreground">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}

                                <p
                                    className="px-6 py-4 text-[11px] leading-relaxed text-muted-foreground"
                                    style={{ borderColor: "hsl(var(--hairline))" }}
                                >
                                    Figures carried over from existing case studies
                                    on this site — no estimated or rounded claims.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
