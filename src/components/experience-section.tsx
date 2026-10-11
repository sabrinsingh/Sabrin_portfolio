import { experience } from "@/data/portfolio";

const skillsMap: Record<number, string[]> = {
    0: ["AWS Redshift", "PySpark", "Python", "HIPAA", "Data Governance"],
    1: ["SQL QA", "Python", "Data Quality", "CI/CD", "Staging Validation"],
    2: ["Databricks", "Delta Lake", "PySpark", "Anomaly Detection", "Spark SQL"],
    3: ["Oracle SQL", "ODI", "Python", "ETL", "Query Tuning"],
    4: ["PHP", "MySQL", "Backend", "Query Optimization"],
};

function yearOf(period: string) {
    const match = period.match(/\d{4}/);
    return match ? match[0] : "";
}

export const ExperienceSection = () => {
    return (
        <section id="experience" className="py-20 md:py-28 border-t border-border/60">
            <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                <p className="section-label mb-3">Career</p>
                <h2 className="text-4xl md:text-5xl text-foreground mb-12">Experience</h2>

                <div>
                    {experience.map((job, idx) => (
                        <article key={`${job.company}-${job.period}`} className="timeline-entry">
                            <div className="grid grid-cols-1 md:grid-cols-[7rem_1fr] gap-4 md:gap-10">
                                <p className="font-display text-3xl text-accent/80 leading-none pt-1">
                                    {yearOf(job.period)}
                                </p>
                                <div>
                                    <h3 className="text-2xl text-foreground leading-snug">
                                        {job.role}
                                    </h3>
                                    <p className="text-sm text-muted-foreground mt-1">
                                        {job.company} · {job.location} · {job.period}
                                    </p>
                                    <p className="text-sm text-foreground/80 leading-relaxed mt-4 mb-4">
                                        {job.description}
                                    </p>
                                    <ul className="space-y-2 mb-5">
                                        {job.highlights.slice(0, 3).map((h) => (
                                            <li key={h} className="text-sm text-muted-foreground leading-relaxed pl-3 border-l border-border">
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                    {skillsMap[idx] && (
                                        <div className="flex flex-wrap gap-1.5">
                                            {skillsMap[idx].map((s) => (
                                                <span key={s} className="skill-pill">{s}</span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};
