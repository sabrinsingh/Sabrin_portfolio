import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

/**
 * Presented as one continuous ruled plate rather than six detached cards —
 * the categories read as a single capability sheet.
 */
const CATEGORIES = [
    {
        title: "Data Engineering",
        note: "Batch and streaming pipelines built to be re-run without fear.",
        items: [
            "ETL / ELT Design",
            "Medallion Architecture",
            "Delta Lake (ACID)",
            "Apache Spark",
            "Databricks Workflows",
            "AWS Glue",
            "Data Modelling",
            "Partitioning & Distribution",
        ],
    },
    {
        title: "Programming & Querying",
        note: "The languages the work actually gets written in.",
        items: [
            "Advanced SQL",
            "Python",
            "PySpark DataFrames",
            "Pandas",
            "PL/pgSQL",
            "Window Functions",
            "Bash / Shell",
            "Scala (reading)",
        ],
    },
    {
        title: "Cloud & Data Platforms",
        note: "Where the storage, compute and cost decisions get made.",
        items: [
            "Databricks",
            "AWS S3",
            "AWS Redshift",
            "Azure Databricks",
            "Snowflake",
            "PostgreSQL",
            "Oracle DB",
            "Docker",
        ],
    },
    {
        title: "Data Quality & Testing",
        note: "The core of the practice — gates, not dashboards after the fact.",
        items: [
            "Automated SQL Test Suites",
            "Stored Procedures",
            "Claims Reconciliation",
            "Great Expectations",
            "Anomaly Detection",
            "Schema Drift Checks",
            "Source-to-Target Reconciliation",
            "Quarantine Routing",
        ],
    },
    {
        title: "AI & LLM Engineering",
        note: "Evaluation and data readiness before anything reaches a model.",
        items: [
            "Data Quality for AI",
            "LLM Evaluation",
            "AI Governance Frameworks",
            "Generative AI Fundamentals",
            "Feature Data Readiness",
            "Model Input Validation",
        ],
    },
    {
        title: "Tools & Workflow",
        note: "How the team ships and keeps shipping.",
        items: [
            "Git / GitHub",
            "CI/CD Gates",
            "Jira",
            "dbt Patterns",
            "Code Review",
            "Technical Mentorship",
        ],
    },
];

export function Expertise() {
    return (
        <section id="skills" className="border-t py-16 md:py-24" style={{ borderColor: "hsl(var(--hairline))" }}>
            <div className="container mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading
                    index="06"
                    eyebrow="Technical Expertise"
                    title={
                        <>
                            Six categories, no{" "}
                            <em className="text-editorial-italic text-primary">
                                percentage bars
                            </em>
                            .
                        </>
                    }
                    description="Grouped the way the work is actually grouped — by the decision each tool is there to serve, not by logo."
                />

                <div
                    className="overflow-hidden rounded-lg border-b border-r"
                    style={{ borderColor: "hsl(var(--hairline))" }}
                >
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3">
                        {CATEGORIES.map((category, i) => (
                            <Reveal
                                key={category.title}
                                delay={(i % 3) * 0.06}
                                y={16}
                                className="border-l border-t p-6 transition-colors hover:bg-secondary/40 sm:p-7"
                            >
                                <div className="flex items-baseline gap-3">
                                    <span className="font-mono text-[11px] font-medium text-primary">
                                        {String(i + 1).padStart(2, "0")}
                                    </span>
                                    <h3 className="text-editorial text-xl text-foreground sm:text-[1.4rem]">
                                        {category.title}
                                    </h3>
                                </div>

                                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                    {category.note}
                                </p>

                                <ul className="mt-4 flex flex-wrap gap-1.5">
                                    {category.items.map((item) => (
                                        <li key={item} className="skill-pill">
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </Reveal>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
