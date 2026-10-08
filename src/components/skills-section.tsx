export const SkillsSection = () => {
    const specRows = [
        {
            category: "Databases & Warehousing",
            items: ["PostgreSQL", "AWS Redshift", "Snowflake", "Databricks SQL", "Oracle DB", "Delta Lake"],
        },
        {
            category: "Quality Engineering",
            items: ["Selenium WebDriver", "Postman", "JMeter", "Data Observability", "Automated Validation Frameworks", "HIPAA Compliance Testing"],
        },
        {
            category: "Programming & Scripting",
            items: ["Python", "PySpark", "SQL (window functions, schema validation)", "Bash", "Pandas", "Scala"],
        },
        {
            category: "Cloud & Platforms",
            items: ["AWS (S3, Redshift, Glue, Lambda)", "Azure Databricks", "Apache Spark", "Airflow / Workflows"],
        },
        {
            category: "Workflow & Tooling",
            items: ["Git", "Jira", "CI/CD Pipelines", "Model Context Protocol (MCP)", "LLMOps", "Data Governance Frameworks"],
        },
    ];

    const principles = [
        {
            label: "Validation as Code",
            text: "Data quality is a primary engineering concern, not an afterthought. Every pipeline ships with autonomous verification gates.",
        },
        {
            label: "Failure-First Design",
            text: "Architect for inevitable failure: idempotent retries, decoupled components, and ACID-safe state management.",
        },
        {
            label: "Cost-Optimized Compute",
            text: "Match compute gravity to workload. Serverless for sporadic, clusters for sustained — never pay for idle.",
        },
    ];

    return (
        <section id="skills" className="py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                {/* Section heading */}
                <div className="mb-10">
                    <p className="section-label mb-2">Technical Toolkit</p>
                    <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">
                        Skills & Stack
                    </h2>
                </div>

                {/* Spec sheet */}
                <div className="mb-16">
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

                {/* Engineering philosophy */}
                <div>
                    <p className="section-label mb-6">Engineering Philosophy</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {principles.map((p) => (
                            <div key={p.label} className="kpi-block">
                                <p className="font-display font-semibold text-sm text-foreground mb-2">{p.label}</p>
                                <p className="text-sm text-muted-foreground leading-relaxed">{p.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
