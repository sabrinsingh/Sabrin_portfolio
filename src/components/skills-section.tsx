export const SkillsSection = () => {
    const specRows = [
        {
            category: "Databases & warehousing",
            items: ["PostgreSQL", "AWS Redshift", "Snowflake", "Databricks SQL", "Oracle DB", "Delta Lake"],
        },
        {
            category: "Quality engineering",
            items: ["Selenium WebDriver", "Postman", "JMeter", "Data Observability", "Automated Validation Frameworks", "HIPAA Compliance Testing"],
        },
        {
            category: "Languages",
            items: ["Python", "PySpark", "SQL", "Bash", "Pandas", "Scala"],
        },
        {
            category: "Cloud & platforms",
            items: ["AWS (S3, Redshift, Glue, Lambda)", "Azure Databricks", "Apache Spark", "Automated Pipelines"],
        },
        {
            category: "Workflow & governance",
            items: ["Git", "Jira", "CI/CD gates", "Stored Procedures", "Claims Reconciliation", "Healthcare data governance"],
        },
    ];

    return (
        <section id="skills" className="py-20 md:py-28 border-t border-border/60">
            <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                <p className="section-label mb-3">Toolkit</p>
                <h2 className="text-4xl md:text-5xl text-foreground mb-12">Skills & stack</h2>

                <div>
                    {specRows.map((row) => (
                        <div key={row.category} className="spec-row">
                            <p className="font-mono text-xs font-medium text-muted-foreground uppercase tracking-wider pt-0.5">
                                {row.category}
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {row.items.map((item) => (
                                    <span key={item} className="skill-pill">{item}</span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-10 border-t border-border/70">
                    <div>
                        <h3 className="font-display text-xl text-foreground mb-2">HIPAA & US healthcare</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Patient clinical feeds and claims datasets handled under healthcare compliance constraints.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-display text-xl text-foreground mb-2">Medallion architecture</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Bronze append-only landing, Silver curated cleansing, Gold dimensional marts for BI.
                        </p>
                    </div>
                    <div>
                        <h3 className="font-display text-xl text-foreground mb-2">Autonomous QA gates</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            Blocking schema assertions, null thresholds, and statistical anomaly halts in CI/CD.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
