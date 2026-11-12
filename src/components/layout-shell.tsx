import { useState, useEffect } from "react";
import {
  Terminal,
  ArrowUpRight,
  CheckCircle2,
  Copy,
  Check,
  Menu,
  X,
  FileText,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Search,
  Award,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SpotlightCard } from "@/components/spotlight-card";
import { DataPipelineVisual } from "@/components/data-pipeline-visual";
import { Currently } from "@/components/currently";
import { PipelineSimulator } from "@/components/pipeline-simulator";
import { ArchitecturalPrinciples } from "@/components/principles";
import { certifications, recommendations, experience, education, awards } from "@/data/portfolio";

// ─── NAV ANCHORS ─────────────────────────────────────────────────────────────
const PRIMARY_NAV_LINKS = [
  { label: "Architecture", href: "#engineering-focus" },
  { label: "Flow", href: "#pipeline-visual" },
  { label: "Telemetry", href: "#telemetry" },
  { label: "Work", href: "#projects" },
  { label: "Experience", href: "#experience" },
];

const ALL_NAV_LINKS = [
  { label: "Overview", href: "#home" },
  { label: "Architecture & Focus", href: "#engineering-focus" },
  { label: "Pipeline Flow Topology", href: "#pipeline-visual" },
  { label: "Live Telemetry Simulator", href: "#telemetry" },
  { label: "Production Case Studies", href: "#projects" },
  { label: "Career Experience", href: "#experience" },
  { label: "Engineering Principles", href: "#principles" },
  { label: "Credentials & Certs", href: "#certifications" },
  { label: "Direct Inquiries", href: "#contact" },
];

// ─── PROJECT CASE STUDIES WITH TABBED PAPER TRAIL ───────────────────────────
type ProjectTab = "overview" | "arch" | "code" | "impact";

interface CaseStudy {
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
  codeSnippet: {
    title: string;
    language: string;
    code: string;
  };
  impact: string[];
  stack: string[];
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 1,
    title: "Clinical data warehouse and quality gates",
    subtitle: "Redshift, custom SQL, HIPAA-regulated clinical data",
    category: "Redshift & Healthcare",
    highlightMetric: "Checks before reporting, not after",
    overview: {
      purpose: "Bring clinical and claims data from several source systems into one warehouse where reporting can trust it.",
      challenge: "Feeds arrived with inconsistent schemas and no blocking checks, so bad rows surfaced in clinician reports rather than at load time.",
      solution: "Wrote the load path as reviewed SQL, user-defined functions and stored procedures in Redshift, then added quality benchmarks that hold a batch when counts, keys or null rates fall outside the expected range.",
      role: "Principal Data Engineer. Owned the load logic, the governance standards and the quality benchmarks.",
    },
    arch: [
      "Source Systems  → Clinical and claims extracts from multiple providers",
      "Staging         → Type and null enforcement on load",
      "Batch Check     → Row counts, claim key uniqueness, null patient references",
      "Warehouse       → Redshift tables with reviewed SQL, UDFs and stored procedures",
      "Reporting       → Analytics and operational reports read only checked data",
    ],
    codeSnippet: {
      title: "staging_claims_batch_check.sql",
      language: "sql",
      code: `with batch_stats as (
    select
        count(*)                                        as row_count,
        count(distinct claim_id)                        as distinct_claims,
        sum(case when patient_id is null then 1 else 0 end) as null_patients
    from staging.claims
    where batch_id = :batch_id
)
select
    row_count,
    row_count - distinct_claims as duplicate_claims,
    null_patients
from batch_stats
where row_count - distinct_claims > 0
   or null_patients > 0;`,
    },
    impact: [
      "One load path for clinical and claims data, with checks that run before anything reaches a report.",
      "Governance standards and quality benchmarks documented for HIPAA-regulated data.",
      "Query logic kept in reviewed SQL, user-defined functions and stored procedures rather than ad hoc scripts.",
      "Mentored junior engineers on the load and review process.",
    ],
    stack: ["AWS Redshift", "Advanced SQL", "Stored Procedures", "Python", "HIPAA Data Governance"],
  },
  {
    id: 2,
    title: "Reusable PySpark data quality framework",
    subtitle: "Structured and semi-structured feeds, checked on every run",
    category: "PySpark & Data Quality",
    highlightMetric: "One check set, every feed",
    overview: {
      purpose: "Stop rewriting the same quality checks for every new source.",
      challenge: "Structured and semi-structured payloads arrived in different shapes, so each pipeline carried its own copy of the same assertions and anomalies were found after publication.",
      solution: "Built a reusable PySpark framework that parses both payload shapes, runs one shared assertion set, and writes flagged records to a side table with the failing rule attached.",
      role: "Senior Software (Data) Engineer and team lead. Designed the framework and led the four-engineer team using it.",
    },
    arch: [
      "Sources          → Structured tables and semi-structured payloads",
      "Parse            → Shared PySpark readers for both shapes",
      "Assertions       → One rule set: keys, null rates, ranges, freshness",
      "Flagged Records  → Written to a side table with the failing rule",
      "Delivery         → Clean output handed to downstream consumers",
    ],
    codeSnippet: {
      title: "quality_framework.py",
      language: "python",
      code: `def run_checks(df, spec):
    failures = {}
    for column, rule in spec.items():
        if column not in df.columns:
            failures[column] = "missing_column"
            continue
        if rule.get("unique") and df.count() != df.select(column).distinct().count():
            failures[column] = "duplicate_values"
        if rule.get("not_null"):
            nulls = df.filter(F.col(column).isNull()).count()
            if nulls:
                failures[column] = f"{nulls} nulls"
    return failures`,
    },
    impact: [
      "The same check set runs across feeds instead of a new script per pipeline.",
      "Anomaly detection runs on its own schedule and records what failed.",
      "Team of four engineers delivered projects on time while holding SLA.",
    ],
    stack: ["PySpark", "Python", "Databricks", "Delta Lake", "Advanced SQL"],
  },
  {
    id: 3,
    title: "Claims reconciliation and reporting",
    subtitle: "ODI, Oracle SQL and Python on US healthcare claims",
    category: "Oracle & ETL",
    highlightMetric: "35% faster report generation",
    overview: {
      purpose: "Keep healthcare claims reporting accurate and fast enough for month-end use.",
      challenge: "Report runs were slow and reconciliation between source and target was done by hand, so a mismatch could sit unnoticed until someone compared the numbers.",
      solution: "Built and maintained the ETL in ODI with Oracle SQL and Python, then replaced the manual comparison with scheduled reconciliation queries that flag duplicates and missing claims.",
      role: "Software (Data) Engineer. Owned the claims ETL, query tuning and reconciliation routines.",
    },
    arch: [
      "Claims Sources   → Payer and provider claim files",
      "ETL              → ODI mappings with Oracle SQL and Python",
      "Staging          → Batch loaded and keyed by claim_id",
      "Reconciliation   → Scheduled checks for duplicates and missing claims",
      "Reporting        → Tuned queries feeding operational reports",
    ],
    codeSnippet: {
      title: "reconcile_claims_batch.sql",
      language: "sql",
      code: `select claim_id, 'duplicate' as issue
from claims_stage
where batch_id = :batch_id
group by claim_id
having count(*) > 1

union all

select s.claim_id, 'missing_in_target'
from claims_stage s
where s.batch_id = :batch_id
  and not exists (
      select 1 from claims_target t
      where t.claim_id = s.claim_id
  );`,
    },
    impact: [
      "Report generation time cut by 35% after rewriting the queries.",
      "Manual reconciliation replaced by scheduled checks that name the problem claim.",
      "Requirements gathered directly with business analysts before each pipeline change.",
      "ETL run in ODI over Oracle SQL and Python for US healthcare claims.",
    ],
    stack: ["Oracle SQL", "ODI", "Python", "ETL", "Reconciliation"],
  },
];

export function LayoutShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [activeProjectTabs, setActiveProjectTabs] = useState<Record<number, ProjectTab>>({
    1: "overview",
    2: "overview",
    3: "overview",
  });

  // Real-time Kathmandu Clock (UTC+5:45)
  const [kathmanduTime, setKathmanduTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatter = new Intl.DateTimeFormat("en-US", {
        timeZone: "Asia/Kathmandu",
        hour: "numeric",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });
      setKathmanduTime(formatter.format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("sabrinlalsingh@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const setProjectTab = (projectId: number, tab: ProjectTab) => {
    setActiveProjectTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  return (
    <div className="relative min-h-screen bg-canvas text-slate-100 selection:bg-cyan-500/30 selection:text-white overflow-x-hidden font-sans">
      {/* ─── SMOOTH SCROLL (LENIS) & CUSTOM INTERACTIVE CURSOR ─────────────── */}

      {/* ─── AMBIENT GRID & RADIAL AURA BACKGROUND ─────────────────────────── */}



      {/* ─── 1. STICKY MINIMALIST NAVIGATION BAR ──────────────────────────── */}
      <header className="sticky top-0 z-50 w-full glass-nav transition-colors duration-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Monogram & Live Status */}
            <div className="flex items-center gap-3">
              <a
                href="#home"
                className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
                aria-label="Sabrin Singh Home"
              >
                <div className="flex flex-col">
                  <span className="font-semibold text-sm tracking-tight text-slate-100 group-hover:text-slate-400 transition-colors">
                    Sabrin Lal Singh
                  </span>
                  <span className="font-mono text-xs text-slate-400 whitespace-nowrap">
                    Principal data engineer
                  </span>
                </div>
              </a>

              {/* Live Reactive Kathmandu Clock */}
              <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-800 text-xs font-mono text-slate-400">
                <span className="status-dot" />
                <span className="text-slate-300">
                  {kathmanduTime ? `${kathmanduTime} NPT` : "Kathmandu (UTC+5:45)"}
                </span>
                <span className="text-slate-400 whitespace-nowrap">Kathmandu</span>
              </div>
            </div>

            {/* Desktop Clean Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-mono" aria-label="Main Navigation">
              {PRIMARY_NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 rounded-[8px] text-slate-300 hover:text-slate-100 hover:bg-slate-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2">
              {/* Resume Download Pill */}
              <a
                href="/Sabrin_Singh_Resume.pdf"
                download="Sabrin_Lal_Singh_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-400 hover:border-slate-700 text-sm transition-colors"
                title="Download Sabrin's Resume (PDF)"
              >
                <FileText className="w-3.5 h-3.5 text-slate-400" />
                <span>Resume</span>
              </a>

              <a
                href="#contact"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3.5 py-1.5 rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 text-sm font-semibold shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Contact</span>
              </a>

              {/* Mobile / Tablet Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5 text-slate-400" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="lg:hidden border-b border-slate-800 bg-slate-950 px-5 py-5 space-y-4"
            >
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="status-dot" />
                  <span>{kathmanduTime ? `${kathmanduTime} NPT` : "Kathmandu, Nepal"}</span>
                </div>
                <span className="text-xs text-slate-400">Open to lead and manager roles</span>
              </div>

              <div className="space-y-1">
                <p className="text-xs text-slate-400 px-1 mb-2">Navigation</p>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-mono text-slate-200 hover:text-slate-400 bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-slate-700 transition-colors"
                    >
                      <span className="text-cyan-500 text-xs">#</span>
                      <span className="truncate">{link.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    handleCopyEmail();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300 hover:text-slate-100 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-slate-400" />
                  <span>Copy Direct Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-command-palette"));
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg border border-slate-800 text-xs font-mono text-slate-400 hover:bg-slate-900 transition-colors"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Search Palette (⌘K)</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── 2. CENTRAL CONTENT CONTAINER WITH STRICT PADDING BOUNDARIES ───── */}
      <main id="main" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14 py-8 md:py-12">

        {/* ─── HERO ─────────────────────────────────────────────────────────── */}
        <section id="home" className="relative pt-2 sm:pt-4" aria-label="Introduction">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3">
                <img
                  src="/images/profile-400.webp"
                  alt="Sabrin Lal Singh"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover border"
                />
                <p className="eyebrow">Principal data engineer, Kathmandu</p>
              </div>
              <h1 className="mt-6 text-[32px] sm:text-[42px] lg:text-[52px] font-medium tracking-[-0.02em] text-slate-50 leading-[1.08] text-balance">
                I lead data teams and build pipelines that check their own work
              </h1>

              <p className="mt-5 text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Nine years of healthcare data work in{" "}
                <strong className="text-slate-100 font-semibold">Redshift</strong>,{" "}
                <strong className="text-slate-100 font-semibold">Databricks</strong>,{" "}
                <strong className="text-slate-100 font-semibold">Snowflake</strong> and{" "}
                <strong className="text-slate-100 font-semibold">PySpark</strong>, plus the checks that stop bad
                records before they reach a report. Working with teams anywhere.
              </p>

              {/* One primary action, one secondary. Everything else moved out. */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a href="#contact" className="btn-primary text-sm">
                  <span>Talk about a lead or manager role</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="/Sabrin_Singh_Resume.pdf"
                  download="Sabrin_Lal_Singh_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-quiet text-sm"
                >
                  <FileText className="w-4 h-4" />
                  <span>Résumé (PDF)</span>
                </a>
              </div>

              <p className="mt-4 text-sm text-slate-400">Kathmandu or remote.</p>

            </div>

            {/* The one rich moment: a gate run, as a real table */}
            <figure className="lg:col-span-5 panel rounded-[14px] overflow-hidden">
              <figcaption className="flex items-center justify-between px-4 py-3 border-b">
                <span className="text-sm text-slate-300">silver_claims · sample gate run</span>
                <span className="text-sm text-slate-400 tabular-nums">14:02 NPT</span>
              </figcaption>
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="text-xs text-slate-400">
                    <th scope="col" className="px-4 py-2 font-normal">Batch</th>
                    <th scope="col" className="px-2 py-2 font-normal text-right">Rows</th>
                    <th scope="col" className="px-4 py-2 font-normal text-right">Check</th>
                  </tr>
                </thead>
                <tbody className="font-mono tabular-nums">
                  {[
                    ["8845", "1,203,551", "pass"],
                    ["8844", "1,210,033", "quarantine"],
                    ["8843", "1,198,402", "pass"],
                    ["8842", "1,204,880", "pass"],
                  ].map(([batch, rows, state]) => (
                    <tr key={batch} className="border-t">
                      <td className="px-4 py-2.5 text-slate-300">{batch}</td>
                      <td className="px-2 py-2.5 text-right text-slate-400">{rows}</td>
                      <td className="px-4 py-2.5 text-right">
                        <span className="inline-flex items-center gap-2 text-xs">
                          <span className={state === "pass" ? "status-dot" : "status-dot status-dot-fail"} />
                          <span className={state === "pass" ? "text-emerald-400" : "text-rose-400"}>
                            {state}
                          </span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <p className="px-4 py-3 border-t text-xs text-slate-400">
                Batch 8844 held for 3 null claim IDs. Nothing unvalidated reached Gold.
              </p>
            </figure>
          </div>

          {/* Four figures, divided by hairlines. No cards, no accents competing. */}
          <dl className="mt-14 grid grid-cols-2 sm:grid-cols-4 border-t border-slate-800 divide-slate-800 sm:divide-x">
            {[
              ["35%", "faster reporting after tuning"],
              ["4", "engineers led"],
              ["9+", "years in production"],
              ["5", "certifications"],
            ].map(([figure, label], i) => (
              <div
                key={label}
                className={`py-6 sm:px-6 ${i === 0 ? "sm:pl-0" : ""} ${i > 1 ? "border-t sm:border-t-0 border-slate-800" : ""}`}
              >
                <dt className="font-mono text-2xl sm:text-3xl text-slate-50 tabular-nums">{figure}</dt>
                <dd className="mt-1 text-sm text-slate-400">{label}</dd>
              </div>
            ))}
          </dl>
        </section>


        {/* ─── ACTIVE FOCUS AREAS ───────────────────────────────────────────── */}
        <Currently />

        {/* ─── SPLIT GRID: DATA ENGINEERING VS. QUALITY ASSURANCE SYSTEMS ──── */}
        <section id="engineering-focus" className="space-y-8" aria-label="Core Engineering Duality">
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-50">
              Engineering focus: pipeline ingestion and quality systems
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
              Two things have to work at the same time: moving the data, and proving it is correct.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Data engineering workflows */}
            <div className="panel rounded-[14px] p-6 sm:p-8 hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">Ingestion and scale</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-slate-50">
                    Data engineering workflows
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Redshift and Databricks pipelines that move clinical feeds and claims data with predictable latency.
                  </p>
                </div>

                {/* Workflow Architecture Pipeline */}
                <div className="space-y-2 text-sm">
                  <span className="text-slate-400 text-xs">
                    Pipeline stages
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="border-l pl-3">
                      <div className="text-slate-400 font-medium">1. Raw</div>
                      <div className="text-slate-400 text-xs mt-1">Raw feeds, append-only, schema discovery</div>
                    </div>
                    <div className="border-l pl-3">
                      <div className="text-slate-400 font-medium">2. Curated</div>
                      <div className="text-slate-400 text-xs mt-1">Coerced types, deduplication, cleansed</div>
                    </div>
                    <div className="border-l pl-3">
                      <div className="text-slate-400 font-medium">3. Reporting</div>
                      <div className="text-slate-400 text-xs mt-1">Aggregations, dimensional star schemas</div>
                    </div>
                  </div>
                </div>

                {/* Technical Stack Tags */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400">
                    Tools in use
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
                    {[
                      "Databricks",
                      "PySpark",
                      "Delta Lake",
                      "AWS Redshift",
                      "Snowflake",
                      "Python",
                      "Advanced SQL",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="text-slate-300 after:content-[','] last:after:content-none"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Loads: scheduled clinical batches</span>
                <span className="text-slate-400">AWS Redshift / Databricks</span>
              </div>
            </div>

            {/* Right: Quality assurance systems */}
            <div className="panel rounded-[14px] p-6 sm:p-8 hover:border-slate-700 transition-colors flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <p className="eyebrow">Automated gates</p>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-medium text-slate-50">
                    Quality assurance systems
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Assertions run on every load, not in a dashboard a day later. Schema drift, null
                    spikes and out-of-range values get caught before the data lands in a reporting
                    warehouse.
                  </p>
                </div>

                {/* QA Verification Protocol */}
                <div className="space-y-2 text-sm">
                  <span className="text-slate-400 text-xs">
                    Verification steps
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="border-l pl-3">
                      <div className="text-slate-200">1. Contract</div>
                      <div className="text-slate-400 text-xs mt-1">Schema boundary &amp; type expectation checks</div>
                    </div>
                    <div className="border-l pl-3">
                      <div className="text-slate-200">2. Gate Scan</div>
                      <div className="text-slate-400 text-xs mt-1">Row counts, unique keys and null bounds</div>
                    </div>
                    <div className="border-l pl-3">
                      <div className="text-slate-200">3. Quarantine</div>
                      <div className="text-slate-400 text-xs mt-1">Failed rows held out of reporting</div>
                    </div>
                  </div>
                </div>

                {/* Technical Stack Tags */}
                <div className="space-y-2">
                  <span className="text-xs text-slate-400">
                    Verification Frameworks
                  </span>
                  <div className="flex flex-wrap gap-x-2 gap-y-1 text-sm">
                    {[
                      "PySpark assertions",
                      "SQL checks",
                      "Row count gates",
                      "Null and duplicate checks",
                      "Reconciliation",
                      "HIPAA handling",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="text-slate-300 after:content-[','] last:after:content-none"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
                <span>Checks run before the load completes</span>
                <span>Scheduled clinical batches</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. INTERACTIVE TOPOLOGY & ARCHITECTURE (DATA PIPELINE VISUAL) ── */}
        <section id="pipeline-visual" className="space-y-8" aria-label="Interactive Pipeline Architecture">
          <DataPipelineVisual />
        </section>

        {/* ─── 5. INTERACTIVE MISSION CONTROL: PIPELINE TELEMETRY SIMULATOR ── */}
        <section id="telemetry" className="space-y-6" aria-label="Interactive Telemetry Simulator">
          <PipelineSimulator />
        </section>

        {/* ─── 6. PRODUCTION CASE STUDIES (PROJECTS WITH INTERACTIVE TABS) ───── */}
        <section id="projects" className="space-y-8" aria-label="Selected Production Projects">
          <div className="space-y-2">
            <p className="eyebrow">Production case studies</p>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-50">
              Documented systems and technical architecture
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Problem statements, architecture, and the checks that ran on each system. Figures
              come from the same work described in my CV.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((project) => {
              const currentTab = activeProjectTabs[project.id] || "overview";
              return (
                <SpotlightCard
                  key={project.id}
                  className="panel rounded-[14px] p-6 hover:border-slate-700 transition-colors flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-400">
                        {project.category}
                      </span>
                      <span className="text-xs text-slate-400">
                        {project.highlightMetric}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-medium text-slate-100">{project.title}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{project.subtitle}</p>
                    </div>

                    {/* Tabs Control */}
                    <div className="flex items-center gap-4 border-b text-xs">
                      {(["overview", "arch", "code", "impact"] as ProjectTab[]).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setProjectTab(project.id, tab)}
                          className={`-mb-px border-b px-3 py-2 transition-colors ${currentTab === tab
                              ? "border-signal text-slate-100"
                              : "border-transparent text-slate-400 hover:text-slate-300"
                            }`}
                        >
                          {{ overview: "Overview", arch: "Architecture", code: "Code", impact: "Impact" }[tab]}
                        </button>
                      ))}
                    </div>

                    {/* Tabbed Content View */}
                    <div className="text-xs text-slate-300 min-h-[180px] flex flex-col justify-between">
                      {currentTab === "overview" && (
                        <div className="space-y-2.5">
                          <div>
                            <span className="font-mono text-xs text-slate-400">Challenge</span>
                            <p className="text-slate-300 leading-relaxed mt-0.5">{project.overview.challenge}</p>
                          </div>
                          <div>
                            <span className="font-mono text-xs text-slate-400">Solution</span>
                            <p className="text-slate-300 leading-relaxed mt-0.5">{project.overview.solution}</p>
                          </div>
                        </div>
                      )}

                      {currentTab === "arch" && (
                        <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs border border-slate-900 space-y-2 overflow-x-auto">
                          {project.arch.map((line, i) => {
                            const parts = line.split("→");
                            if (parts.length === 2) {
                              return (
                                <div key={i} className="flex items-center gap-2">
                                  <span className="shrink-0 px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 font-semibold text-xs">
                                    {parts[0].trim()}
                                  </span>
                                  <span className="text-slate-500 text-xs">→</span>
                                  <span className="text-slate-300 text-xs leading-tight">
                                    {parts[1].trim()}
                                  </span>
                                </div>
                              );
                            }
                            return <div key={i} className="text-slate-300 text-xs whitespace-pre">{line}</div>;
                          })}
                        </div>
                      )}

                      {currentTab === "code" && (
                        <div className="p-3 rounded-lg bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto border border-slate-900 max-h-48">
                          <div className="text-slate-400 mb-1">// {project.codeSnippet.title}</div>
                          <pre className="text-slate-300 whitespace-pre leading-relaxed">{project.codeSnippet.code}</pre>
                        </div>
                      )}

                      {currentTab === "impact" && (
                        <ul className="space-y-1.5">
                          {project.impact.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-slate-500 flex-shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Stack Footer */}
                  <div className="pt-4 mt-4 border-t flex flex-wrap gap-x-2 gap-y-1 text-xs text-slate-400">
                    {project.stack.map((s) => (
                      <span key={s} className="after:content-[','] last:after:content-none">
                        {s}
                      </span>
                    ))}
                  </div>
                </SpotlightCard>
              );
            })}
          </div>
        </section>

        {/* ─── 7. CAREER JOURNEY & PRODUCTION HISTORY ───────────────────────── */}
        <section id="experience" className="space-y-8" aria-label="Career Experience">
          <div className="space-y-2">
            <p className="eyebrow">Career journey</p>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-50">
              Production history and technical ownership
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              9+ years on data reliability, quality checks, and enterprise healthcare
              quality architecture across Nepal and US clients.
            </p>
          </div>

          <div className="space-y-4">
            {experience.map((job) => (
              <div
                key={`${job.company}-${job.period}`}
                className="panel rounded-[14px] p-6 sm:p-8 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-3 space-y-1">
                    <span className="text-sm text-slate-400 tabular-nums inline-block">
                      {job.period}
                    </span>
                    <p className="text-sm text-slate-400 mt-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      <span>{job.location}</span>
                    </p>
                  </div>

                  <div className="lg:col-span-9 space-y-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-medium text-slate-100">{job.role}</h3>
                      <span className="font-mono text-sm text-slate-400">{job.company}</span>
                    </div>

                    {job.highlights.length === 0 && (
                      <p className="text-sm text-slate-300 leading-relaxed">{job.description}</p>
                    )}

                    <ul className="space-y-1.5 pt-2">
                      {job.highlights.map((h, i) => (
                        <li key={i} className="text-xs sm:text-sm text-slate-400 pl-3 border-l border-slate-800 leading-relaxed">
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 8. ARCHITECTURAL PHILOSOPHY & PRINCIPLES ───────────────────── */}
        <section id="principles" aria-label="Architectural Philosophy">
          <ArchitecturalPrinciples />
        </section>

        {/* ─── 9. VERIFIED CREDENTIALS & CERTIFICATIONS ─────────────────────── */}
        <section id="certifications" className="space-y-8" aria-label="Credentials and Certifications">
          <div className="space-y-2">
            <p className="eyebrow">Credentials and certifications</p>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-50">
              Certifications and training
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Certifications and course work across distributed data, cloud data
              warehousing and engineering practice.
            </p>
          </div>

          {/* Industry Certifications Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications
              .filter((cert) => cert.type === "certification")
              .map((cert) => {
              const IconComp = cert.icon;
              return (
                <div
                  key={cert.name}
                  className="panel rounded-xl p-5 border border-slate-800 hover:border-slate-700 transition-colors flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
                        {cert.issuer}
                      </span>
                      <span className="font-mono text-xs text-slate-400">{cert.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {IconComp && <IconComp className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                      <h4 className="text-sm font-medium text-slate-100 line-clamp-2">{cert.name}</h4>
                    </div>
                  </div>

                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-mono text-xs text-slate-300 hover:text-slate-100 pt-2 border-t border-slate-800 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>Verify credential</span>
                      <ArrowUpRight className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="font-mono text-xs text-slate-400 pt-2 border-t border-slate-800 flex items-center gap-1">
                      {cert.type === "certification" ? (
                        <Award className="w-3 h-3" />
                      ) : (
                        <FileText className="w-3 h-3" />
                      )}
                      <span>{cert.type === "certification" ? "Certification" : "Course"}</span>
                    </span>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-sm text-slate-400">
            Also completed {certifications.filter((c) => c.type === "course").length} data engineering courses
            from IBM, Databricks and Coursera. Credentials and course records are listed on{" "}
            <a
              href="https://linkedin.com/in/sabrin-lal-singh-478218a0"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-300 underline decoration-slate-700 underline-offset-4 transition-colors hover:text-slate-100 hover:decoration-slate-500"
            >
              LinkedIn
            </a>.
          </p>

          {/* Education & Leadership Honors Strip */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-4">
            {/* Leadership Award */}
            <div className="lg:col-span-5 panel rounded-[14px] p-6 flex flex-col justify-between gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="eyebrow flex items-center gap-1.5">
                    <Award className="w-3.5 h-3.5" />
                    Award
                  </span>
                  <span className="text-sm text-slate-400 tabular-nums">2023</span>
                </div>
                <h3 className="text-lg font-medium text-slate-50 pt-1">
                  {awards[0].title}
                </h3>
                <p className="text-sm text-slate-400">
                  {awards[0].organization}
                </p>
                <p className="text-xs text-slate-300 leading-relaxed pt-1">
                  {awards[0].description}
                </p>
              </div>

              <div className="pt-3 border-t text-xs text-slate-400 flex items-center justify-between">
                <span>Recognized by executive leadership</span>
                <span className="text-slate-300">High distinction</span>
              </div>
            </div>

            {/* Formal Engineering & Leadership Education */}
            <div className="lg:col-span-7 p-6 rounded-[14px] bg-slate-900/50 border border-slate-800 space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <span className="text-xs text-slate-400">Education</span>
                <div className="space-y-3 pt-1">
                  {education.map((edu, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-medium text-slate-100">{edu.degree}</h4>
                          {"gpa" in edu && (
                            <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 text-xs">
                              {edu.gpa}
                            </span>
                          )}
                        </div>
                        <span className="text-sm text-slate-400">{edu.period}</span>
                      </div>
                      <p className="text-xs text-slate-300">{edu.institution} · {edu.location}</p>
                      <p className="text-xs text-slate-400 font-mono">{edu.highlights}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>MBA, Lincoln University · B.E. Computer Engineering, Tribhuvan University</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 10. PEER RECOMMENDATIONS & EXECUTIVE REFERENCES ─────────────── */}
        <section className="space-y-8" aria-label="Peer Recommendations">
          <div className="space-y-2">
            <p className="eyebrow">Leadership endorsements</p>
            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-50">
              Recommendations from engineering leadership
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Written on LinkedIn by people I worked with, reproduced here in their words.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.slice(0, 2).map((rec, i) => (
              <div
                key={i}
                className="panel rounded-[14px] p-6 sm:p-8 border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  "{rec.text}"
                </p>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-sm">
                  <div>
                    <div className="font-medium text-slate-100">{rec.author}</div>
                    <div className="text-xs text-slate-400">{rec.role}</div>
                  </div>
                  <span className="text-xs text-slate-400">{rec.company}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 11. CONTACT & TERMINAL FOOTER ─────────────────────────────────── */}
        <section id="contact" className="space-y-6" aria-label="Contact Section">
          <div className="panel rounded-[14px] p-6 sm:p-10 space-y-6">
            <p className="eyebrow">Contact</p>

            <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-50 max-w-xl">
              Open to a lead or manager role in data
            </h2>

            <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
              Data engineering manager, data lead, or lead data engineer. Kathmandu or remote.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="mailto:sabrinlalsingh@gmail.com?subject=Leadership / Technical Inquiries, Sabrin Singh"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg btn-primary text-sm transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>sabrinlalsingh@gmail.com</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="btn-quiet text-sm"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? "Email copied" : "Copy email"}</span>
              </button>

              <a
                href="/Sabrin_Singh_Resume.pdf"
                download="Sabrin_Lal_Singh_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-quiet text-sm"
              >
                <FileText className="w-4 h-4" />
                <span>Résumé (PDF)</span>
              </a>
            </div>

            {/* Social & Coordinates */}
            <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-4">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/sabrinsingh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-slate-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/sabrin-lal-singh-478218a0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-slate-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                <span>Kathmandu, Nepal (27.7172° N, 85.3240° E)</span>
              </div>
            </div>

          </div>

          <footer className="py-6 text-center text-xs text-slate-400 space-y-1">
            <p>© {new Date().getFullYear()} Sabrin Lal Singh. All rights reserved.</p>
            <p className="text-slate-400">Built with React, TypeScript &amp; Vite · Kathmandu, Nepal</p>
          </footer>
        </section>
      </main>
    </div>
  );
}
export default LayoutShell;
