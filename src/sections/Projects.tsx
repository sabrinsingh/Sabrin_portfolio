import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, X } from "lucide-react";

import { Reveal } from "@/components/motion";
import { SectionHeading } from "@/components/section-heading";

type ProjectTab = "overview" | "arch" | "code" | "impact";

export interface ProjectEntry {
    id: number;
    title: string;
    subtitle: string;
    category: string;
    highlightMetric: string;
    overview: {
        purpose: string;
        challenge: string;
        solution: string;
        role: string;
    };
    arch: string[];
    codeSnippet?: { title: string; language: string; code: string };
    impact: string[];
    stack: string[];
}

const projectEntries: ProjectEntry[] = [
    {
        id: 1,
        title: "Clinical Data Orchestration Pipeline",
        subtitle: "Medallion Lakehouse & Automated Validation Gates",
        category: "Databricks & Lakehouse",
        highlightMetric: "50M+ Daily Records · 95% Anomaly Drop",
        overview: {
            purpose:
                "Built to replace brittle ETL scripts ingesting 50M+ daily healthcare records into a high-performance Medallion Lakehouse.",
            challenge:
                "Heterogeneous clinical feeds and unvalidated upstream schemas caused silent data corruption at the Bronze-to-Silver boundary, risking inaccurate clinician reports.",
            solution:
                "Architected Delta Lake schema enforcement, PySpark automated assertion wrappers, and automated Great Expectations verification gates. Slashed anomalies by 95%.",
            role: "Lead Data Engineer — Designed lakehouse architecture, partition strategies, and autonomous quality assertion gates.",
        },
        arch: [
            "Source Systems    → S3 Raw Staging (HL7 / FHIR / Parquet feeds)",
            "Bronze Layer      → Delta Lake append-only ingestion with schema tracking",
            "                  → Automated column type coercion & quarantine routing",
            "Silver Layer      → PySpark transforms, entity normalization, deduplication",
            "                  → Great Expectations assertion test suite execution",
            "Autonomous QA     → Hard assertion gates on primary keys, null bounds & SLAs",
            "Gold Layer        → Dimensional analytical marts in Redshift & Databricks SQL",
            "Monitoring        → Automated Slack / PagerDuty alerts on constraint violations",
        ],
        codeSnippet: {
            title: "PySpark Medallion QA Gate Assertion",
            language: "python",
            code: `# Autonomous QA Gate: Bronze -> Silver Boundary Validation
def validate_clinical_batch(df_silver):
    assertion_results = {
        "null_patient_ids": df_silver.filter(col("patient_id").isNull()).count(),
        "invalid_timestamps": df_silver.filter(col("event_ts") > current_timestamp()).count(),
        "duplicate_events": df_silver.groupBy("event_id").count().filter(col("count") > 1).count()
    }
    
    if any(val > 0 for val in assertion_results.values()):
        quarantine_batch(df_silver, assertion_results)
        raise DataQualityException(f"QA Assertion Failed: {assertion_results}")
        
    return df_silver.write.format("delta").mode("append").saveAsTable("silver_clinical_events")`,
        },
        impact: [
            "95% reduction in systemic data anomalies reaching the Gold consumption layer",
            "50M+ daily records processed with p99 latency consistently maintained under 4 minutes",
            "100% automated test coverage across Bronze-to-Silver transitions",
        ],
        stack: ["Databricks", "Delta Lake", "PySpark", "Great Expectations", "Python", "AWS S3"],
    },
    {
        id: 2,
        title: "Enterprise Redshift Analytics Architecture",
        subtitle: "Distribution Key Optimization & Automated Warehousing",
        category: "AWS & Data Warehousing",
        highlightMetric: "35% Query Latency Cut · 20+ Sources",
        overview: {
            purpose:
                "Centralized enterprise analytics warehouse consolidating 20+ healthcare data sources to deliver high-fidelity executive reporting and downstream operational analytics.",
            challenge:
                "Unoptimized table distribution styles, vacuum fragmentation, and complex joins were creating severe query execution bottlenecks across large clinical datasets.",
            solution:
                "Re-engineered warehouse topology with optimal DISTKEY / SORTKEY distributions, automated VACUUM procedures, and pre-computed materialized view layers. Slashed query execution latency by 35%.",
            role: "Data Engineer — Query plan optimization, distribution strategy, and AWS Glue ingestion orchestration.",
        },
        arch: [
            "20+ Data Sources  → S3 Ingestion Bucket (daily batch & micro-batch)",
            "Ingestion Engine  → AWS Glue ETL with PySpark transformations",
            "Warehouse Layer   → AWS Redshift multi-node cluster with KEY/EVEN distribution",
            "Query Optimizer   → EXPLAIN plan analysis, join elimination, sort-merge execution",
            "Automated Maint   → Scheduled automated VACUUM and ANALYZE procedures",
            "Views Layer       → Pre-aggregated materialized views for instant dashboard loads",
            "QA Gate           → Automated reconciliation suites: source vs target row counts & checksums",
        ],
        codeSnippet: {
            title: "Redshift Materialized View & Distribution Key Optimization",
            language: "sql",
            code: `-- Optimized Materialized View with Key Distribution for Sub-Second Analytics
CREATE MATERIALIZED VIEW mv_executive_claims_summary
BACKUP YES
DISTSTYLE KEY
DISTKEY(facility_id)
SORTKEY(report_period, claim_status)
AS
SELECT 
    facility_id,
    DATE_TRUNC('month', claim_date) AS report_period,
    claim_status,
    COUNT(DISTINCT claim_id) AS total_claims,
    SUM(reimbursed_amount) AS total_reimbursed,
    AVG(adjudication_latency_hours) AS avg_turnaround_hrs
FROM silver_adjudicated_claims
GROUP BY 1, 2, 3;`,
        },
        impact: [
            "35% reduction in executive report generation time across company-wide dashboards",
            "Sub-second p50 response time for pre-aggregated dimensional BI queries",
            "Zero data discrepancy validated across 20+ heterogeneous source migrations",
        ],
        stack: ["AWS Redshift", "S3", "AWS Glue", "Advanced SQL", "Execution Plan Tuning", "Python"],
    },
    {
        id: 3,
        title: "Healthcare Claims Reconciliation Suite",
        subtitle: "Automated Stored Procedures & Clinical Claims Verification",
        category: "Healthcare Data QA & SQL Automation",
        highlightMetric: "100% Claim Integrity · 500K+ Daily Audits",
        overview: {
            purpose:
                "End-to-end automated healthcare data validation engine executing thousands of medical claims, member eligibility, and clinical record reconciliation checks via deterministic stored procedures and custom SQL assertions before warehouse staging.",
            challenge:
                "Legacy claims reconciliation relied on manual spot-checks across heterogeneous hospital feeds; silent rounding errors, missing ICD-10/CPT codes, and orphan foreign keys went undetected, causing multi-million dollar reimbursement delays and compliance risks.",
            solution:
                "Designed a modular SQL & Stored Procedure testing harness that executes automated integrity gates: referential checks, medical code lookup validations, duplicate claim detection, and delta balance reconciliations with automated quarantine and audit logging.",
            role: "Lead Data QA Engineer — Designed automated SQL test suites, reconciliation stored procedures, and audit logging tables.",
        },
        arch: [
            "Healthcare Feeds  → Raw Staging Area (837/835 EDI Claims & EHR feeds)",
            "Schema Gate       → Column data type assertion & mandatory field verification",
            "Stored Proc QA    → Automated sp_validate_clinical_claims execution",
            "Code Reference    → Dynamic validation against ICD-10-CM & CPT reference tables",
            "Integrity Gate    → Referential integrity: Member ID, Provider NPI, Facility lookup",
            "Balance Audit     → Billed vs Reimbursed mathematical delta reconciliation",
            "Quarantine Route  → Automated routing of non-compliant claims to Dead-Letter Audit",
            "Gold Staging      → 100% verified, HIPAA-compliant claims promoted to production",
        ],
        codeSnippet: {
            title: "Automated Healthcare Claim Reconciliation Stored Procedure",
            language: "sql",
            code: `-- Healthcare Data QA: Automated Claims Reconciliation Stored Procedure
CREATE OR REPLACE PROCEDURE sp_validate_clinical_claims(
    IN batch_id VARCHAR(64),
    OUT passed_count INT,
    OUT quarantined_count INT
)
LANGUAGE plpgsql
AS $$
BEGIN
    -- 1. Quarantine claims with invalid or missing provider NPI
    INSERT INTO claims_quarantine (claim_id, batch_id, failure_reason, created_at)
    SELECT c.claim_id, batch_id, 'ORPHAN_PROVIDER_NPI', CURRENT_TIMESTAMP
    FROM staging_claims c
    LEFT JOIN ref_providers p ON c.billing_npi = p.npi
    WHERE c.batch_id = batch_id AND p.npi IS NULL;

    -- 2. Quarantine mathematical anomalies: paid amount > billed amount
    INSERT INTO claims_quarantine (claim_id, batch_id, failure_reason, created_at)
    SELECT c.claim_id, batch_id, 'FINANCIAL_ANOMALY_OVERPAYMENT', CURRENT_TIMESTAMP
    FROM staging_claims c
    WHERE c.batch_id = batch_id AND c.paid_amount > c.billed_amount;

    -- 3. Promote only fully verified claims to the Gold Production Table
    INSERT INTO gold_adjudicated_claims
    SELECT c.* FROM staging_claims c
    WHERE c.batch_id = batch_id 
      AND NOT EXISTS (
          SELECT 1 FROM claims_quarantine q 
          WHERE q.claim_id = c.claim_id AND q.batch_id = batch_id
      );

    GET DIAGNOSTICS passed_count = ROW_COUNT;
END;
$$;`,
        },
        impact: [
            "100% automated daily reconciliation of healthcare claims across 15+ hospital feeds",
            "99.8% reduction in claim reconciliation errors reaching downstream adjudication",
            "Sub-2 minute automated execution time for 500,000+ daily claim validations",
        ],
        stack: ["Advanced SQL", "Stored Procedures", "PostgreSQL", "AWS Redshift", "Python", "HIPAA Validation"],
    },
];

const TABS: { key: ProjectTab; label: string }[] = [
    { key: "overview", label: "Overview" },
    { key: "arch", label: "Architecture" },
    { key: "code", label: "SQL & Procedures" },
    { key: "impact", label: "Impact" },
];

function ProjectModal({ project, onClose }: { project: ProjectEntry; onClose: () => void }) {
    const [tab, setTab] = useState<ProjectTab>("overview");

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-6">
            <button
                type="button"
                className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                aria-label="Close project modal"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-dialog-title"
                className="relative z-10 max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-lg border bg-card shadow-2xl sm:rounded-lg"
                style={{ borderColor: "hsl(var(--hairline))" }}
            >
                {/* Modal header */}
                <div
                    className="sticky top-0 z-20 flex items-start justify-between gap-4 border-b bg-card p-6 md:p-8"
                    style={{ borderColor: "hsl(var(--hairline))" }}
                >
                    <div className="min-w-0">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <span className="eyebrow">{project.category}</span>
                            <span
                                className="rounded border px-2 py-0.5 font-mono text-[11px]"
                                style={{
                                    borderColor: "hsl(var(--primary) / 0.35)",
                                    background: "hsl(var(--primary) / 0.08)",
                                    color: "hsl(var(--primary))",
                                }}
                            >
                                {project.highlightMetric}
                            </span>
                        </div>
                        <h2
                            id="project-dialog-title"
                            className="text-editorial text-2xl leading-tight text-foreground md:text-3xl"
                        >
                            {project.title}
                        </h2>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="shrink-0 rounded border p-2 text-muted-foreground transition-colors hover:text-foreground"
                        style={{ borderColor: "hsl(var(--hairline))" }}
                        aria-label="Close"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Tabs */}
                <div
                    className="flex gap-4 overflow-x-auto border-b px-6 scrollbar-hide md:px-8"
                    style={{ borderColor: "hsl(var(--hairline))" }}
                    role="tablist"
                >
                    {TABS.map((t) => (
                        <button
                            key={t.key}
                            type="button"
                            role="tab"
                            aria-selected={tab === t.key}
                            onClick={() => setTab(t.key)}
                            className={`whitespace-nowrap border-b-2 py-3 font-mono text-xs uppercase tracking-wider transition-colors ${
                                tab === t.key
                                    ? "border-primary font-medium text-foreground"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {t.label}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div className="space-y-6 p-6 md:p-8">
                    {tab === "overview" && (
                        <div className="space-y-6">
                            <p className="text-base leading-relaxed text-foreground/90">
                                {project.overview.purpose}
                            </p>
                            <div className="grid gap-6 border-t pt-4 md:grid-cols-2" style={{ borderColor: "hsl(var(--hairline))" }}>
                                <div className="space-y-2">
                                    <p className="eyebrow">Engineering challenge</p>
                                    <p className="rounded border p-4 text-sm leading-relaxed text-foreground/85"
                                        style={{ borderColor: "hsl(var(--destructive) / 0.28)", background: "hsl(var(--destructive) / 0.06)" }}>
                                        {project.overview.challenge}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="eyebrow">Architectural solution</p>
                                    <p className="rounded border p-4 text-sm leading-relaxed text-foreground/85"
                                        style={{ borderColor: "hsl(var(--primary) / 0.28)", background: "hsl(var(--primary) / 0.06)" }}>
                                        {project.overview.solution}
                                    </p>
                                </div>
                            </div>
                            <div
                                className="rounded border p-4"
                                style={{ borderColor: "hsl(var(--hairline))", background: "hsl(var(--surface-1))" }}
                            >
                                <p className="eyebrow mb-1">Individual role &amp; ownership</p>
                                <p className="text-sm text-foreground/90">{project.overview.role}</p>
                            </div>
                        </div>
                    )}

                    {tab === "arch" && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Pipeline topology showing data progression,
                                transformation boundaries, and autonomous quality
                                assertion gates.
                            </p>
                            <div
                                className="space-y-2.5 overflow-x-auto rounded-lg border p-5 font-mono text-xs scrollbar-hide"
                                style={{ borderColor: "hsl(var(--hairline))", background: "hsl(var(--surface-1))" }}
                            >
                                {project.arch.map((line, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-start gap-3 ${
                                            line.includes("QA") ||
                                            line.includes("Assertion") ||
                                            line.includes("Stored Proc")
                                                ? "rounded bg-emerald-500/10 p-1.5 text-emerald-700 dark:text-emerald-300"
                                                : line.includes("→")
                                                  ? "text-foreground/90"
                                                  : "pl-6 text-muted-foreground"
                                        }`}
                                    >
                                        <span className="w-4 shrink-0 text-right text-[10px] text-muted-foreground">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span>{line}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {tab === "code" && project.codeSnippet && (
                        <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                                <p className="font-mono text-xs text-muted-foreground">
                                    {project.codeSnippet.title}
                                </p>
                                <span
                                    className="rounded border px-2 py-0.5 font-mono text-[10px] uppercase"
                                    style={{ borderColor: "hsl(var(--primary) / 0.35)", color: "hsl(var(--primary))" }}
                                >
                                    {project.codeSnippet.language}
                                </span>
                            </div>
                            <pre
                                className="overflow-x-auto rounded-lg border p-5 font-mono text-xs leading-relaxed text-foreground/90 scrollbar-hide"
                                style={{ borderColor: "hsl(var(--hairline))", background: "hsl(var(--surface-1))" }}
                            >
                                <code>{project.codeSnippet.code}</code>
                            </pre>
                        </div>
                    )}

                    {tab === "impact" && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Outcomes documented against production environments.
                            </p>
                            <div className="grid gap-3">
                                {project.impact.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 rounded-lg border p-4"
                                        style={{ borderColor: "hsl(var(--hairline))" }}
                                    >
                                        <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
                                        <p className="text-sm font-medium text-foreground/90">{item}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    <div
                        className="flex flex-wrap gap-1.5 border-t pt-6"
                        style={{ borderColor: "hsl(var(--hairline))" }}
                    >
                        {project.stack.map((tech) => (
                            <span key={tech} className="skill-pill">
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export function Projects() {
    const [selected, setSelected] = useState<ProjectEntry | null>(null);

    return (
        <section id="projects" className="border-t py-16 md:py-24" style={{ borderColor: "hsl(var(--hairline))" }}>
            <div className="container mx-auto max-w-6xl px-5 sm:px-8">
                <SectionHeading
                    index="04"
                    eyebrow="Selected Work"
                    title={
                        <>
                            Three systems, taken{" "}
                            <em className="text-editorial-italic text-primary">apart</em>.
                        </>
                    }
                    description="Problem, architecture, assertion code and documented outcomes for each. No invented clients, no vanity statistics."
                />

                <div
                    className="border-t"
                    style={{ borderColor: "hsl(var(--hairline))" }}
                >
                    {projectEntries.map((project, idx) => (
                        <Reveal key={project.id} delay={idx * 0.05} y={22}>
                            <button
                                type="button"
                                onClick={() => setSelected(project)}
                                className="group block w-full border-b px-2 py-8 text-left transition-colors hover:bg-secondary/40 sm:px-4 sm:py-10"
                                style={{ borderColor: "hsl(var(--hairline))" }}
                                aria-label={`Open case study: ${project.title}`}
                            >
                                <div className="grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8">
                                    {/* Index + category */}
                                    <div className="lg:col-span-2">
                                        <span className="text-editorial block text-4xl leading-none text-muted-foreground/40 transition-colors group-hover:text-primary/70">
                                            {String(idx + 1).padStart(2, "0")}
                                        </span>
                                        <span className="eyebrow mt-2 block leading-relaxed">
                                            {project.category}
                                        </span>
                                    </div>

                                    {/* Title + summary */}
                                    <div className="lg:col-span-6">
                                        <h3 className="text-editorial text-2xl leading-[1.12] text-foreground transition-colors group-hover:text-primary sm:text-3xl">
                                            {project.title}
                                        </h3>
                                        <p className="mt-1.5 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                                            {project.subtitle}
                                        </p>
                                        <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">
                                            {project.overview.purpose}
                                        </p>
                                    </div>

                                    {/* Metric + stack + CTA */}
                                    <div className="lg:col-span-4">
                                        <p className="text-editorial text-xl leading-tight text-accent sm:text-2xl">
                                            {project.highlightMetric}
                                        </p>
                                        <div className="mt-4 flex flex-wrap gap-1.5">
                                            {project.stack.slice(0, 4).map((tech) => (
                                                <span key={tech} className="skill-pill">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                        <span className="link-underline mt-5 inline-flex items-center gap-1.5 font-mono text-xs font-medium text-foreground transition-colors group-hover:text-primary">
                                            <span>Open case study</span>
                                            <ArrowRight
                                                className="h-3.5 w-3.5 shrink-0 transition-transform group-hover:translate-x-1"
                                                aria-hidden="true"
                                            />
                                        </span>
                                    </div>
                                </div>
                            </button>
                        </Reveal>
                    ))}
                </div>
            </div>

            {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
        </section>
    );
}
