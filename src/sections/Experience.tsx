import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { experience } from "@/data/portfolio";

export function Experience() {
    return (
        <section id="experience" className="py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading
                    index="03"
                    eyebrow="Experience"
                    title={
                        <>
                            Nine years, five{" "}
                            <em className="text-editorial-italic text-primary">rooms</em>
                            , one discipline.
                        </>
                    }
                    description="Backend, then ETL, then lakehouse, then advisory — the through-line has always been making production data trustworthy."
                    aside={
                        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                            2017 — present
                        </span>
                    }
                />

                {/* Timeline rail */}
                <div className="relative">
                    <span
                        className="absolute bottom-6 left-0 top-6 hidden w-px md:block"
                        style={{ background: "hsl(var(--hairline))" }}
                        aria-hidden="true"
                    />

                    {experience.map((job, index) => (
                        <Reveal
                            key={`${job.company}-${job.period}`}
                            as="article"
                            delay={index * 0.04}
                            className={`relative md:pl-10 ${index > 0 ? "mt-10 pt-10" : "pt-2"} border-t`}
                            y={22}
                        >
                            {/* Node on the rail */}
                            <span
                                className="absolute left-[-5px] top-[2.35rem] hidden h-[11px] w-[11px] rotate-45 border md:block"
                                style={{
                                    background: "hsl(var(--background))",
                                    borderColor: "hsl(var(--primary) / 0.75)",
                                }}
                                aria-hidden="true"
                            />

                            <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-8">
                                {/* Meta */}
                                <div className="md:col-span-3">
                                    <p className="inline-flex items-center rounded border px-2 py-0.5 font-mono text-[11px] tracking-wide"
                                        style={{
                                            borderColor: "hsl(var(--primary) / 0.35)",
                                            background: "hsl(var(--primary) / 0.08)",
                                            color: "hsl(var(--primary))",
                                        }}
                                    >
                                        {job.period}
                                    </p>
                                    <p className="mt-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                        {job.location}
                                    </p>
                                </div>

                                {/* Body */}
                                <div className="md:col-span-9">
                                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                                        <h3 className="text-editorial text-2xl leading-[1.12] text-foreground sm:text-3xl">
                                            {job.role}
                                        </h3>
                                        <span className="font-mono text-xs uppercase tracking-wider text-accent">
                                            {job.company}
                                        </span>
                                    </div>

                                    <p className="mt-2 max-w-3xl text-sm sm:text-base leading-relaxed text-foreground/85">
                                        {job.description}
                                    </p>

                                    <ul className="mt-4 space-y-2">
                                        {job.highlights.map((highlight, i) => (
                                            <li
                                                key={i}
                                                className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                                            >
                                                <span
                                                    className="mt-[0.6em] h-px w-4 shrink-0"
                                                    style={{ background: "hsl(var(--hairline))" }}
                                                    aria-hidden="true"
                                                />
                                                <span>{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
