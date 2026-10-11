import { useState, useEffect } from "react";
import {
    Linkedin,
    Github,
    ArrowUp,
    Moon,
    Sun,
    Copy,
    Check,
    ExternalLink,
    Menu,
    X,
    ShieldCheck,
    Database,
    Cpu,
    ArrowRight,
    Terminal,
    Layers,
    FileText,
    Activity,
    CheckCircle2
} from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useTheme } from "@/components/theme-provider";
import { AnimatePresence, motion } from "framer-motion";

import { certifications, personalInfo, recommendations, experience } from "@/data/portfolio";
import { Footer } from "@/components/footer";
import { DataPipelineVisual } from "@/components/data-pipeline-visual";
import { BackgroundEffects } from "@/components/background-effects";
import { HowIThink } from "@/components/how-i-think";
import { Currently } from "@/components/currently";
import { RecruiterModal } from "@/components/recruiter-modal";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Architecture", href: "#pipeline-visual" },
    { label: "Selected Work", href: "#projects" },
    { label: "Toolkit", href: "#skills" },
    { label: "Credentials", href: "#certifications" },
    { label: "Contact", href: "#contact" },
];

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme !== "light";
    return (
        <button
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
    );
}

type ProjectTab = "overview" | "arch" | "code" | "impact";

interface ProjectEntry {
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
    codeSnippet?: {
        title: string;
        language: string;
        code: string;
    };
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
            purpose: "Built to replace fragile, brittle ETL scripts ingesting 50M+ daily healthcare records into a high-performance Medallion Lakehouse.",
            challenge: "Heterogeneous clinical feeds and unvalidated upstream schemas caused silent data corruption at the Bronze → Silver boundary, risking inaccurate clinician reports.",
            solution: "Architected Delta Lake schema enforcement, PySpark automated assertion wrappers, and automated Great Expectations verification gates. Slashed anomalies by 95%.",
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
        title: "Enterprise Redshift Analytics & Ingestion Architecture",
        subtitle: "Distribution Key Optimization & Automated Warehousing",
        category: "AWS & Data Warehousing",
        highlightMetric: "35% Query Latency Cut · 20+ Sources",
        overview: {
            purpose: "Centralized enterprise analytics warehouse consolidating 20+ healthcare data sources to deliver high-fidelity executive reporting and downstream operational analytics.",
            challenge: "Unoptimized table distribution styles, vacuum fragmentation, and complex joins were creating severe query execution bottlenecks across large clinical datasets.",
            solution: "Re-engineered warehouse topology with optimal DISTKEY / SORTKEY distributions, automated VACUUM procedures, and pre-computed materialized view layers. Slashed query execution latency by 35%.",
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
        title: "Healthcare Data QA Automation & Reconciliation Suite",
        subtitle: "Automated Stored Procedures & Clinical Claims Verification",
        category: "Healthcare Data QA & SQL Automation",
        highlightMetric: "100% Claim Integrity · 500K+ Daily Audits",
        overview: {
            purpose: "End-to-end automated healthcare data validation engine executing thousands of medical claims, member eligibility, and clinical record reconciliation checks via deterministic stored procedures and custom SQL assertions before warehouse staging.",
            challenge: "Legacy claims reconciliation relied on manual spot-checks across heterogeneous hospital feeds; silent rounding errors, missing ICD-10/CPT codes, and orphan foreign keys went undetected, causing multi-million dollar reimbursement delays and compliance risks.",
            solution: "Designed a modular SQL & Stored Procedure testing harness that executes automated integrity gates: referential checks, medical code lookup validations, duplicate claim detection, and delta balance reconciliations with automated quarantine and audit logging.",
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

function ProjectModal({
    project,
    onClose,
}: {
    project: ProjectEntry;
    onClose: () => void;
}) {
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
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6">
            <button
                className="absolute inset-0 bg-background/85 backdrop-blur-md transition-opacity"
                aria-label="Close project details"
                onClick={onClose}
            />
            <div
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-dialog-title"
                className="relative bg-card/95 border border-border/80 w-full max-w-4xl max-h-[92vh] overflow-y-auto shadow-2xl rounded-t-xl sm:rounded-xl z-10"
            >
                {/* Modal Header */}
                <div className="p-6 md:p-8 border-b border-border/60 sticky top-0 bg-card/95 backdrop-blur-md z-20 flex items-start justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <span className="section-label">{project.category}</span>
                            <span className="font-mono text-xs px-2 py-0.5 rounded border border-border text-primary bg-primary/10">
                                {project.highlightMetric}
                            </span>
                        </div>
                        <h2 id="project-dialog-title" className="text-2xl md:text-3xl text-foreground font-display">
                            {project.title}
                        </h2>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md bg-secondary/50 hover:bg-secondary"
                        aria-label="Close"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-border/60 px-6 md:px-8 gap-4 bg-secondary/20">
                    {(["overview", "arch", "code", "impact"] as ProjectTab[]).map((t) => (
                        <button
                            key={t}
                            onClick={() => setTab(t)}
                            className={`py-3 font-mono text-xs uppercase tracking-wider border-b-2 transition-colors ${
                                tab === t
                                    ? "border-primary text-foreground font-medium"
                                    : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {t === "arch" ? "Architecture" : t === "code" ? "SQL & Procedures" : t}
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <div className="p-6 md:p-8 space-y-6">
                    {tab === "overview" && (
                        <div className="space-y-6">
                            <p className="text-base text-foreground/90 leading-relaxed">
                                {project.overview.purpose}
                            </p>
                            <div className="grid md:grid-cols-2 gap-6 pt-4 border-t border-border/60">
                                <div className="space-y-2">
                                    <p className="font-mono text-xs uppercase text-muted-foreground tracking-wider">
                                        Engineering Challenge
                                    </p>
                                    <p className="text-sm text-foreground/85 leading-relaxed bg-destructive/5 p-4 rounded border border-destructive/20">
                                        {project.overview.challenge}
                                    </p>
                                </div>
                                <div className="space-y-2">
                                    <p className="font-mono text-xs uppercase text-muted-foreground tracking-wider">
                                        Architectural Solution
                                    </p>
                                    <p className="text-sm text-foreground/85 leading-relaxed bg-primary/5 p-4 rounded border border-primary/20">
                                        {project.overview.solution}
                                    </p>
                                </div>
                            </div>
                            <div className="p-4 rounded border border-border/60 bg-secondary/30">
                                <p className="font-mono text-xs uppercase text-muted-foreground tracking-wider mb-1">
                                    Individual Role &amp; Ownership
                                </p>
                                <p className="text-sm text-foreground/90">{project.overview.role}</p>
                            </div>
                        </div>
                    )}

                    {tab === "arch" && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                High-throughput pipeline topology showing data progression, transformation boundaries, and autonomous quality assertion gates:
                            </p>
                            <div className="bg-background/80 p-5 rounded-lg border border-border font-mono text-xs space-y-2.5 overflow-x-auto scrollbar-hide">
                                {project.arch.map((line, idx) => (
                                    <div
                                        key={idx}
                                        className={`flex items-start gap-3 ${
                                            line.includes("QA") || line.includes("Assertion") || line.includes("Stored Proc")
                                                ? "text-emerald-400 bg-emerald-500/10 p-1.5 rounded -mx-1.5"
                                                : line.includes("→")
                                                ? "text-foreground/90"
                                                : "text-muted-foreground pl-6"
                                        }`}
                                    >
                                        <span className="text-muted-foreground text-[10px] w-4 text-right shrink-0">
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
                            <div className="flex items-center justify-between">
                                <p className="font-mono text-xs text-muted-foreground">
                                    {project.codeSnippet.title}
                                </p>
                                <span className="font-mono text-[10px] uppercase text-primary px-2 py-0.5 rounded border border-primary/30">
                                    {project.codeSnippet.language}
                                </span>
                            </div>
                            <pre className="bg-background/90 p-5 rounded-lg border border-border font-mono text-xs text-foreground/90 overflow-x-auto scrollbar-hide leading-relaxed">
                                <code>{project.codeSnippet.code}</code>
                            </pre>
                        </div>
                    )}

                    {tab === "impact" && (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Documented, measurable business and technical outcomes verified across production environments:
                            </p>
                            <div className="grid gap-4">
                                {project.impact.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="flex items-start gap-3 p-4 rounded-lg border border-border/70 bg-card/60"
                                    >
                                        <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                                        <p className="text-sm md:text-base text-foreground/90 font-medium">
                                            {item}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Tech Stack Pills */}
                    <div className="pt-6 border-t border-border/60 flex flex-wrap gap-1.5">
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

export default function Home() {
    const [activeSection, setActiveSection] = useState("");
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [selectedProject, setSelectedProject] = useState<ProjectEntry | null>(null);
    const contactEmail = "sabrinlalsingh@gmail.com";

    useEffect(() => {
        const ids = ["about", "experience", "pipeline-visual", "projects", "skills", "certifications", "contact"];
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 400);
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el) {
                    const { top, bottom } = el.getBoundingClientRect();
                    if (top <= 140 && bottom > 140) {
                        setActiveSection(id);
                        break;
                    }
                }
            }
        };
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(contactEmail);
            setCopiedEmail(true);
            setTimeout(() => setCopiedEmail(false), 2200);
        } catch {
            window.location.href = `mailto:${contactEmail}`;
        }
    };

    return (
        <div className="min-h-screen bg-transparent text-foreground relative selection:bg-primary/25 selection:text-foreground">
            <Helmet>
                <title>Sabrin Lal Singh — Senior Data QA &amp; Analytics Engineer</title>
                <meta name="description" content={personalInfo.summary} />
                <link rel="canonical" href="https://sabrinsingh.com.np/" />
            </Helmet>

            {/* Signature Atmospheric Background */}
            <BackgroundEffects />

            {/* Sticky Frosted Header */}
            <header className="site-nav" aria-label="Primary navigation">
                <div className="container mx-auto px-5 sm:px-8 h-16 flex items-center justify-between max-w-6xl">
                    <a
                        href="#main"
                        className="flex items-center gap-2 group focus:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded"
                    >
                        <span className="font-display text-xl tracking-tight text-foreground group-hover:text-primary transition-colors">
                            SLS
                        </span>
                        <span className="hidden sm:inline font-mono text-[11px] text-muted-foreground border-l border-border pl-2 uppercase tracking-wider">
                            Data QA &amp; Analytics
                        </span>
                    </a>

                    {/* Desktop Navigation Links */}
                    <nav className="hidden md:flex items-center gap-1" aria-label="Sections">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href.slice(1);
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={`px-3 py-1.5 text-xs font-mono tracking-wide rounded transition-colors ${
                                        isActive
                                            ? "text-foreground bg-secondary/80 font-medium"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                                    }`}
                                    aria-current={isActive ? "location" : undefined}
                                >
                                    {item.label}
                                </a>
                            );
                        })}
                    </nav>

                    {/* Right Utility Bar */}
                    <div className="flex items-center gap-2">
                        <div className="hidden lg:flex items-center gap-2 status-badge mr-2">
                            <span className="status-dot-pulse" />
                            <span>Kathmandu · Open to select work</span>
                        </div>
                        <RecruiterModal />
                        <a
                            href="https://github.com/sabrinsingh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/40"
                            aria-label="GitHub Profile"
                        >
                            <Github className="w-4 h-4" />
                        </a>
                        <a
                            href="https://linkedin.com/in/sabrin-lal-singh-478218a0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden sm:flex p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/40"
                            aria-label="LinkedIn Profile"
                        >
                            <Linkedin className="w-4 h-4" />
                        </a>
                        <ThemeToggle />
                        <button
                            className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary/40"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Drawer */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.nav
                            id="mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="md:hidden overflow-hidden border-t border-border bg-card/95 backdrop-blur-lg"
                        >
                            <div className="px-6 py-4 flex flex-col gap-2">
                                {navItems.map((item) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-2.5 text-sm font-mono text-muted-foreground hover:text-foreground transition-colors border-b border-border/40 last:border-0"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                                <div className="pt-3 flex items-center justify-between text-xs font-mono text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                        Kathmandu, Nepal
                                    </span>
                                    <a
                                        href="/Sabrin_Singh_Resume.pdf"
                                        download
                                        className="text-primary hover:underline"
                                    >
                                        Download Resume
                                    </a>
                                </div>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>

            <main id="main">
                {/* ─── HERO SECTION ─────────────────────────────────────────── */}
                <section className="relative pt-14 pb-20 md:pt-24 md:pb-32 overflow-hidden">
                    <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
                            {/* Left Editorial Headline & Value Prop */}
                            <div className="lg:col-span-7 space-y-6">
                                <div className="enter enter-1 flex flex-wrap items-center gap-3">
                                    <span className="section-label">
                                        Data Systems Architecture · Quality Gates
                                    </span>
                                    <span className="hidden sm:inline text-border">|</span>
                                    <span className="font-mono text-xs text-accent/90">
                                        Kathmandu, Nepal (UTC+5:45)
                                    </span>
                                </div>

                                <h1 className="enter enter-2 font-display text-[clamp(2.9rem,8.2vw,6.2rem)] leading-[0.92] tracking-[-0.035em] text-foreground">
                                    Sabrin<br />Lal Singh
                                </h1>

                                <p className="enter enter-3 text-xl md:text-2xl font-display italic text-foreground/85">
                                    Senior Data QA &amp; Analytics Engineer
                                </p>

                                <div className="enter enter-3 max-w-xl space-y-4">
                                    <p className="text-base md:text-lg text-foreground/90 leading-relaxed font-sans">
                                        I build automated validation pipelines, SQL reconciliation stored procedures, and petabyte-scale data infrastructure so healthcare and enterprise platforms can trust every record they run on.
                                    </p>
                                    <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                                        {personalInfo.summary}
                                    </p>
                                </div>

                                {/* Core Metrics Strip */}
                                <div className="enter enter-3 grid grid-cols-3 gap-4 py-4 px-5 rounded-lg border border-border/80 bg-card/45 backdrop-blur-sm max-w-xl">
                                    <div>
                                        <p className="font-display text-2xl md:text-3xl text-foreground font-semibold">9+ Years</p>
                                        <p className="font-mono text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Production Data Eng</p>
                                    </div>
                                    <div className="border-l border-border/70 pl-4">
                                        <p className="font-display text-2xl md:text-3xl text-primary font-semibold">50M+</p>
                                        <p className="font-mono text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Daily Ingestion Load</p>
                                    </div>
                                    <div className="border-l border-border/70 pl-4">
                                        <p className="font-display text-2xl md:text-3xl text-emerald-400 font-semibold">Zero</p>
                                        <p className="font-mono text-[10px] md:text-[11px] text-muted-foreground uppercase tracking-wider mt-0.5">Gold Layer Defects</p>
                                    </div>
                                </div>

                                {/* Primary Actions */}
                                <div className="enter enter-4 flex flex-wrap gap-3.5 items-center pt-2">
                                    <a href="#projects" className="btn-primary">
                                        Selected Work
                                        <ArrowRight className="w-4 h-4" />
                                    </a>
                                    <a href="/Sabrin_Singh_Resume.pdf" download className="btn-outline">
                                        <FileText className="w-4 h-4" />
                                        Resume (PDF)
                                    </a>
                                    <button
                                        onClick={copyEmail}
                                        className="btn-outline font-mono text-xs"
                                        aria-label="Copy email address"
                                    >
                                        {copiedEmail ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-muted-foreground" />}
                                        {copiedEmail ? "Email Copied!" : "sabrinlalsingh@gmail.com"}
                                    </button>
                                </div>
                            </div>

                            {/* Right Editorial Portrait Composition */}
                            <div className="lg:col-span-5 flex justify-center lg:justify-end">
                                <figure className="portrait-frame max-w-[21.5rem] w-full">
                                    <div className="portrait-light" />
                                    <picture>
                                        <source srcSet="/images/profile-400.webp" media="(max-width: 640px)" type="image/webp" />
                                        <source srcSet="/images/profile.webp" type="image/webp" />
                                        <img
                                            src="/images/profile.webp"
                                            alt="Sabrin Lal Singh — Data QA & Analytics Engineer"
                                            width={400}
                                            height={500}
                                            fetchPriority="high"
                                            decoding="async"
                                            className="portrait-img portrait-reveal"
                                        />
                                    </picture>

                                    {/* Architectural Frame Overlays */}
                                    <figcaption className="mt-3.5 p-3 rounded border border-border/70 bg-card/60 backdrop-blur-md space-y-1">
                                        <div className="flex items-center justify-between text-[11px] font-mono">
                                            <span className="text-muted-foreground flex items-center gap-1.5">
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                Kathmandu, Nepal
                                            </span>
                                            <span className="text-accent font-medium">
                                                Databricks · AWS
                                            </span>
                                        </div>
                                        <p className="text-[10px] font-mono text-muted-foreground/80 truncate">
                                            HIPAA-Compliant Lakehouse &amp; Redshift Systems
                                        </p>
                                    </figcaption>
                                </figure>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── ABOUT: QUALITY AS AN ENGINEERING PRACTICE ────────────── */}
                <section id="about" className="py-20 md:py-28 border-t border-border/70">
                    <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14">
                            <div className="lg:col-span-4">
                                <p className="section-label mb-3">About</p>
                                <h2 className="text-4xl md:text-5xl text-foreground font-display leading-[1.05]">
                                    Quality as an engineering practice.
                                </h2>
                            </div>
                            <div className="lg:col-span-8 space-y-6 text-muted-foreground leading-relaxed">
                                <p className="text-base md:text-lg text-foreground/90 font-sans">
                                    I specialize in enterprise data infrastructure and healthcare analytics — systems that must process tens of millions of records daily without silently corrupting what clinicians, analysts, and decision-makers depend on.
                                </p>
                                <p>
                                    My day-to-day discipline combines automated SQL validation suites, stored procedure reconciliation engines, Medallion lakehouse engineering in Databricks, and strict data quality gates that ensure complete HIPAA compliance.
                                </p>

                                <div className="grid sm:grid-cols-3 gap-5 pt-6 border-t border-border/70">
                                    <div className="p-4 rounded-lg border border-border/60 bg-card/40">
                                        <p className="font-display text-3xl md:text-4xl text-foreground font-semibold">35%</p>
                                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                                            Query Latency Cut on Redshift Clusters
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border border-border/60 bg-card/40">
                                        <p className="font-display text-3xl md:text-4xl text-primary font-semibold">50M+</p>
                                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                                            Daily Lakehouse Flow Records
                                        </p>
                                    </div>
                                    <div className="p-4 rounded-lg border border-border/60 bg-card/40">
                                        <p className="font-display text-3xl md:text-4xl text-accent font-semibold">HIPAA</p>
                                        <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground mt-1">
                                            Integrity &amp; Zero PII Breaches
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* ─── CAREER PROGRESSION / EXPERIENCE ──────────────────────── */}
                <section id="experience" className="py-20 md:py-28 border-t border-border/70">
                    <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                            <div>
                                <p className="section-label mb-3">Career History</p>
                                <h2 className="text-4xl md:text-5xl text-foreground font-display">
                                    Professional experience
                                </h2>
                            </div>
                            <p className="text-sm text-muted-foreground max-w-sm font-mono">
                                9+ years leading data quality, distributed engineering, and advisory roles.
                            </p>
                        </div>

                        <div className="space-y-2">
                            {experience.map((job) => (
                                <article
                                    key={`${job.company}-${job.period}`}
                                    className="timeline-entry p-6 rounded-lg hover:bg-card/30 transition-colors"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                        <div className="md:col-span-3 space-y-1">
                                            <span className="font-mono text-xs px-2 py-0.5 rounded border border-border text-primary bg-primary/10">
                                                {job.period}
                                            </span>
                                            <p className="font-mono text-xs text-muted-foreground mt-2">
                                                {job.location}
                                            </p>
                                        </div>

                                        <div className="md:col-span-9 space-y-3">
                                            <div className="flex flex-wrap items-baseline justify-between gap-2">
                                                <h3 className="text-xl md:text-2xl text-foreground font-display font-medium">
                                                    {job.role}
                                                </h3>
                                                <span className="font-mono text-xs text-accent font-semibold">
                                                    {job.company}
                                                </span>
                                            </div>

                                            <p className="text-sm text-foreground/85 leading-relaxed">
                                                {job.description}
                                            </p>

                                            <ul className="space-y-2 pt-2">
                                                {job.highlights.map((h, i) => (
                                                    <li
                                                        key={i}
                                                        className="text-xs md:text-sm text-muted-foreground pl-3 border-l border-border/80 leading-relaxed"
                                                    >
                                                        {h}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── PHILOSOPHY / HOW I THINK ─────────────────────────────── */}
                <HowIThink />

                {/* ─── INTERACTIVE TOPOLOGY & ARCHITECTURE ─────────────────── */}
                <div id="pipeline-visual">
                    <DataPipelineVisual />
                </div>

                {/* ─── SELECTED WORK: REAL PROJECTS WITH PAPER TRAIL ─────────── */}
                <section id="projects" className="py-20 md:py-28 border-t border-border/70">
                    <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
                            <div>
                                <p className="section-label mb-3">Case Studies</p>
                                <h2 className="text-4xl md:text-5xl text-foreground font-display">
                                    Selected projects with a paper trail.
                                </h2>
                            </div>
                            <p className="text-sm text-muted-foreground max-w-sm">
                                Problem, architecture, assertion code, and documented outcomes — no invented clients or vanity statistics.
                            </p>
                        </div>

                        {/* Project Cards Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            {projectEntries.map((project, idx) => (
                                <article
                                    key={project.id}
                                    className="luxury-card p-6 sm:p-7 flex flex-col justify-between group"
                                >
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between text-xs font-mono">
                                            <span className="text-muted-foreground">0{idx + 1} // {project.category}</span>
                                            <span className="text-primary text-[11px] font-medium">Verified</span>
                                        </div>

                                        <h3 className="text-2xl text-foreground font-display leading-snug group-hover:text-primary transition-colors">
                                            {project.title}
                                        </h3>

                                        <p className="font-mono text-xs text-accent">
                                            {project.highlightMetric}
                                        </p>

                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {project.overview.purpose}
                                        </p>

                                        <div className="pt-3 border-t border-border/60">
                                            <p className="font-mono text-[10px] uppercase text-muted-foreground tracking-wider mb-1.5">
                                                Key Architecture
                                            </p>
                                            <p className="text-xs text-foreground/80 line-clamp-2">
                                                {project.overview.solution}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-border/60 flex items-center justify-between">
                                        <div className="flex flex-wrap gap-1 max-w-[65%]">
                                            {project.stack.slice(0, 3).map((s) => (
                                                <span key={s} className="skill-pill text-[10px]">
                                                    {s}
                                                </span>
                                            ))}
                                        </div>
                                        <button
                                            onClick={() => setSelectedProject(project)}
                                            className="link-underline text-xs font-mono font-medium text-foreground hover:text-primary inline-flex items-center gap-1"
                                        >
                                            Deep Dive
                                            <ArrowRight className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </article>
                            ))}
                        </div>

                        {/* Additional GitHub Link */}
                        <div className="mt-12 p-6 rounded-lg border border-border/70 bg-card/30 flex flex-wrap items-center justify-between gap-4">
                            <div>
                                <p className="text-sm text-foreground font-medium">Looking for additional code repositories and open-source contributions?</p>
                                <p className="text-xs text-muted-foreground font-mono mt-0.5">Automated testing suites, PySpark utilities, and SQL optimization scripts.</p>
                            </div>
                            <a
                                href="https://github.com/sabrinsingh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-outline font-mono text-xs"
                            >
                                <Github className="w-4 h-4" />
                                Visit GitHub (@sabrinsingh)
                                <ExternalLink className="w-3 h-3 opacity-60" />
                            </a>
                        </div>
                    </div>
                </section>

                {/* Project Deep Dive Modal */}
                {selectedProject && (
                    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
                )}

                {/* ─── TECHNICAL EXPERTISE / TOOLKIT MATRIX ────────────────── */}
                <section id="skills" className="py-20 md:py-28 border-t border-border/70">
                    <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-14">
                            <div>
                                <p className="section-label mb-3">Toolkit &amp; Stack</p>
                                <h2 className="text-4xl md:text-5xl text-foreground font-display">
                                    Technical expertise
                                </h2>
                            </div>
                            <p className="text-sm text-muted-foreground max-w-sm font-mono">
                                Authentic proficiencies across data warehousing, quality automation, and cloud platforms. No arbitrary percentage bars.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Data Warehousing & Lakehouse",
                                    icon: Database,
                                    items: ["Databricks SQL", "Delta Lake (ACID)", "AWS Redshift", "Snowflake", "PostgreSQL", "Oracle DB"],
                                    desc: "Medallion schemas, partition pruning, distribution keys, and execution plan tuning.",
                                },
                                {
                                    title: "Healthcare Data QA & Testing",
                                    icon: ShieldCheck,
                                    items: ["Automated SQL Test Suites", "Stored Procedures (PL/pgSQL)", "Claims Reconciliation", "HIPAA Compliance QA", "Great Expectations", "Anomaly Detection"],
                                    desc: "Deterministic validation gates, financial delta reconciliation, and medical code set assertions.",
                                },
                                {
                                    title: "Pipeline Orchestration & ETL",
                                    icon: Layers,
                                    items: ["Apache Spark", "PySpark", "AWS Glue", "Automated Pipelines", "Oracle Data Integrator (ODI)", "dbt patterns"],
                                    desc: "High-throughput batch and micro-batch pipelines with idempotent state management.",
                                },
                                {
                                    title: "Languages & Analytics",
                                    icon: Terminal,
                                    items: ["Python", "Advanced SQL", "PySpark DataFrames", "Pandas", "Bash / Shell", "Scala basics"],
                                    desc: "Custom UDFs, stored procedures, window functions, and statistical transformations.",
                                },
                                {
                                    title: "Cloud & Infrastructure",
                                    icon: Cpu,
                                    items: ["AWS (S3, Redshift, Glue, Lambda)", "Azure Databricks", "Docker", "CI/CD Gates", "Git / GitHub"],
                                    desc: "Serverless compute balancing, cost-optimized cluster gravity, and security policies.",
                                },
                                {
                                    title: "Data Quality Observability",
                                    icon: Activity,
                                    items: ["Automated Validation Gates", "Source-to-Target Reconciliation", "Quarantine Dead-Letter Routing", "SLA Monitoring", "Data Governance"],
                                    desc: "Preventing silent upstream corruption before records reach downstream clinicians or models.",
                                },
                            ].map((group) => {
                                const Icon = group.icon;
                                return (
                                    <div
                                        key={group.title}
                                        className="luxury-card p-6 rounded-lg space-y-4"
                                    >
                                        <div className="flex items-center gap-3">
                                            <div className="w-9 h-9 rounded-md border border-border/80 bg-secondary/50 flex items-center justify-center text-primary">
                                                <Icon className="w-4 h-4" />
                                            </div>
                                            <h3 className="text-base font-semibold text-foreground font-display">
                                                {group.title}
                                            </h3>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            {group.desc}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {group.items.map((skill) => (
                                                <span key={skill} className="skill-pill text-[11px]">
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── CREDENTIALS & CERTIFICATIONS ─────────────────────────── */}
                <section id="certifications" className="py-20 md:py-28 border-t border-border/70">
                    <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
                            <div>
                                <p className="section-label mb-3">Credentials</p>
                                <h2 className="text-4xl md:text-5xl text-foreground font-display">
                                    Certifications &amp; Accreditations
                                </h2>
                            </div>
                            <p className="text-sm text-muted-foreground font-mono">
                                12 verified industry certifications in Databricks, Spark, Cloud, and Data Engineering.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {certifications.map((cert) => {
                                const Icon = cert.icon;
                                return (
                                    <div key={cert.name} className="cert-card">
                                        <div className="w-9 h-9 rounded-md border border-border bg-secondary/60 flex items-center justify-center text-primary shrink-0 mt-0.5">
                                            <Icon className="w-4 h-4" />
                                        </div>
                                        <div className="min-w-0 space-y-1">
                                            <p className="text-sm text-foreground font-medium leading-snug">
                                                {cert.name}
                                            </p>
                                            <p className="font-mono text-[11px] text-muted-foreground uppercase tracking-wider">
                                                {cert.issuer} · {cert.year}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>

                {/* ─── RECOMMENDATIONS / TESTIMONIALS ───────────────────────── */}
                <section className="py-20 md:py-28 border-t border-border/70">
                    <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                        <p className="section-label mb-3">Colleague Endorsements</p>
                        <h2 className="text-4xl md:text-5xl text-foreground font-display mb-12">
                            What colleagues say
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
                            {recommendations.map((rec) => (
                                <blockquote
                                    key={rec.id}
                                    className="luxury-card p-8 rounded-lg space-y-6 flex flex-col justify-between"
                                >
                                    <p className="font-display text-xl md:text-2xl italic text-foreground/90 leading-relaxed">
                                        “{rec.text}”
                                    </p>
                                    <footer className="pt-4 border-t border-border/60 flex items-center justify-between">
                                        <div>
                                            <p className="text-sm text-foreground font-medium font-sans">{rec.author}</p>
                                            <p className="font-mono text-xs text-muted-foreground mt-0.5">
                                                {rec.role} · {rec.company}
                                            </p>
                                        </div>
                                        <span className="font-mono text-[11px] text-primary px-2.5 py-1 rounded border border-primary/20 bg-primary/10">
                                            {rec.relation}
                                        </span>
                                    </footer>
                                </blockquote>
                            ))}
                        </div>
                    </div>
                </section>

                {/* ─── CONTACT SECTION ──────────────────────────────────────── */}
                <section id="contact" className="py-24 md:py-32 border-t border-border/70 relative">
                    <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                        <div className="max-w-3xl space-y-6">
                            <p className="section-label">Initiate Contact</p>
                            <h2 className="text-4xl md:text-6xl text-foreground font-display leading-[1.04]">
                                If the data has to be right, write.
                            </h2>
                            <p className="text-base md:text-lg text-muted-foreground leading-relaxed font-sans max-w-2xl">
                                Available for senior data engineering, SQL automated quality suites, and lakehouse validation engagements for teams that cannot afford silent pipeline failures.
                            </p>

                            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                                <a
                                    href={`mailto:${contactEmail}?subject=Data%20Engineering%20Inquiry%20%E2%80%94%20Sabrin%20Singh`}
                                    className="btn-primary py-4 px-8 text-sm"
                                >
                                    Email Sabrin Directly
                                    <ArrowRight className="w-4 h-4" />
                                </a>
                                <button
                                    onClick={copyEmail}
                                    className="btn-outline py-4 px-8 font-mono text-xs"
                                    aria-label="Copy email address"
                                >
                                    {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-muted-foreground" />}
                                    <span>{copiedEmail ? "Copied to clipboard!" : contactEmail}</span>
                                </button>
                            </div>

                            <div className="pt-8 flex flex-wrap items-center gap-6 text-xs font-mono text-muted-foreground">
                                <span className="flex items-center gap-2">
                                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                    Average response time: &lt; 24 hours
                                </span>
                                <span>·</span>
                                <span>Based in Kathmandu (UTC+5:45)</span>
                                <span>·</span>
                                <span>Remote &amp; Global Availability</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Currently Status */}
                <Currently />
            </main>

            {/* Footer */}
            <Footer />

            {/* Back to Top Smooth Scroll */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-6 right-6 p-3 rounded-full border border-border bg-card/90 text-muted-foreground hover:text-foreground hover:border-primary shadow-xl z-50 backdrop-blur-md transition-all"
                        aria-label="Back to top"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
