import { experience } from "@/data/portfolio";
import { MapPin, Calendar } from "lucide-react";

const skillsMap: Record<number, string[]> = {
    0: ["AWS Redshift", "PySpark", "Python", "HIPAA", "Data Governance"],
    1: ["LLM QA", "Python", "Data Quality", "CI/CD", "Staging Validation"],
    2: ["Databricks", "Delta Lake", "PySpark", "Anomaly Detection", "Spark SQL"],
    3: ["Oracle SQL", "ODI", "Python", "ETL", "Query Tuning"],
    4: ["PHP", "MySQL", "Backend", "Query Optimization"],
};

export const ExperienceSection = () => {
    return (
        <section id="experience" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                {/* Section heading */}
                <div className="mb-10">
                    <p className="section-label mb-2">Career</p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
                        Work Experience
                    </h2>
                </div>

                {/* Timeline list */}
                <div>
                    {experience.map((job, idx) => (
                        <div key={idx} className="timeline-entry">
                            <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-1 mb-3">
                                <div>
                                    <h3 className="text-lg font-display font-semibold text-foreground leading-snug">
                                        {job.role}
                                        <span className="text-primary"> · {job.company}</span>
                                    </h3>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1.5">
                                        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                                            <Calendar className="w-3 h-3" />
                                            {job.period}
                                        </span>
                                        <span className="flex items-center gap-1.5 font-mono text-xs text-muted-foreground">
                                            <MapPin className="w-3 h-3" />
                                            {job.location}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Scope overview */}
                            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                                {job.description}
                            </p>

                            {/* Highlights */}
                            <ul className="space-y-2 mb-5">
                                {job.highlights.slice(0, 3).map((h, hidx) => (
                                    <li
                                        key={hidx}
                                        className="flex gap-3 text-sm text-foreground/80 leading-relaxed"
                                    >
                                        <span className="text-primary mt-1 shrink-0 text-xs">→</span>
                                        <span>{h}</span>
                                    </li>
                                ))}
                            </ul>

                            {/* Skill pills */}
                            {skillsMap[idx] && (
                                <div className="flex flex-wrap gap-1.5">
                                    {skillsMap[idx].map((s) => (
                                        <span key={s} className="skill-pill">{s}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
