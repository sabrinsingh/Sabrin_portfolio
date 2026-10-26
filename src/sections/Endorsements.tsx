import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";
import { recommendations } from "@/data/portfolio";

export function Endorsements() {
    return (
        <section className="py-16 md:py-24">
            <div className="container mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading
                    index="08"
                    eyebrow="Endorsements"
                    title={
                        <>
                            What colleagues{" "}
                            <em className="text-editorial-italic text-primary">wrote</em>{" "}
                            about the work.
                        </>
                    }
                    description="Verbatim recommendations from people I have worked alongside."
                />

                <div className="grid gap-6 md:grid-cols-2 md:gap-8">
                    {recommendations.map((rec, i) => (
                        <Reveal
                            key={rec.id}
                            delay={i * 0.08}
                            as="figure"
                            className="flex h-full flex-col justify-between rounded-lg border p-6 transition-colors hover:border-primary/40 sm:p-8"
                        >
                            <span
                                className="text-editorial block text-5xl leading-none text-primary/40"
                                aria-hidden="true"
                            >
                                &ldquo;
                            </span>

                            <blockquote className="mt-3">
                                <p className="text-editorial text-lg leading-snug text-foreground/90 sm:text-xl">
                                    {rec.text}
                                </p>
                            </blockquote>

                            <figcaption className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t pt-4" style={{ borderColor: "hsl(var(--hairline))" }}>
                                <div>
                                    <p className="text-sm font-medium text-foreground">{rec.author}</p>
                                    <p className="mt-0.5 font-mono text-xs text-muted-foreground">
                                        {rec.role} · {rec.company}
                                    </p>
                                </div>
                                <span
                                    className="rounded border px-2.5 py-1 font-mono text-[11px]"
                                    style={{ borderColor: "hsl(var(--hairline))", background: "hsl(var(--surface-1))" }}
                                >
                                    {rec.relation}
                                </span>
                            </figcaption>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    );
}
