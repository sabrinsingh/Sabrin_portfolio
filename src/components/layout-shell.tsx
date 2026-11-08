import { useState, useEffect } from "react";
import {
  Database,
  ShieldCheck,
  Activity,
  Terminal,
  Layers,
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Copy,
  Check,
  Menu,
  X,
  Filter,
  FileText,
  Mail,
  Github,
  Linkedin,
  MapPin,
  Search,
  Award,
  Quote,
  Clock,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ViewCounter } from "@/components/view-counter";
import { HeroDataMesh } from "@/components/hero-data-mesh";
import { SpotlightCard } from "@/components/spotlight-card";
import { TextScramble } from "@/components/text-scramble";
import { Magnetic } from "@/components/magnetic";
import { CustomCursor } from "@/components/custom-cursor";
import { SmoothScroll } from "@/components/smooth-scroll";
import { HeroCinematicPhoto } from "@/components/hero-cinematic-photo";
import { DataPipelineVisual } from "@/components/data-pipeline-visual";
import { HowIThink } from "@/components/how-i-think";
import { Currently } from "@/components/currently";
import { certifications, recommendations, experience } from "@/data/portfolio";

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

// ─── TELEMETRY MOCK RECORDS ──────────────────────────────────────────────────
interface TelemetryRecord {
  id: string;
  pipeline: string;
  domain: "Healthcare" | "Claims" | "Telemetry" | "Lakehouse";
  batchSize: number;
  gateStatus: "PASS" | "QUARANTINED" | "INSPECTING";
  anomalyIndex: string;
  latencyMs: number;
  timestamp: string;
}

const INITIAL_TELEMETRY: TelemetryRecord[] = [
  {
    id: "PL-8041",
    pipeline: "Clinical Feeds (HL7 / FHIR Ingestion)",
    domain: "Healthcare",
    batchSize: 1420500,
    gateStatus: "PASS",
    anomalyIndex: "0.001%",
    latencyMs: 14.2,
    timestamp: "Just now",
  },
  {
    id: "PL-8042",
    pipeline: "Delta Lake Medallion Silver Sanitizer",
    domain: "Lakehouse",
    batchSize: 980200,
    gateStatus: "PASS",
    anomalyIndex: "0.000%",
    latencyMs: 18.6,
    timestamp: "12s ago",
  },
  {
    id: "PL-8043",
    pipeline: "Enterprise Claims Reconciliation Gate",
    domain: "Claims",
    batchSize: 2450000,
    gateStatus: "PASS",
    anomalyIndex: "0.004%",
    latencyMs: 22.1,
    timestamp: "24s ago",
  },
  {
    id: "PL-8044",
    pipeline: "Redshift Partition Metric Aggregator",
    domain: "Telemetry",
    batchSize: 640000,
    gateStatus: "PASS",
    anomalyIndex: "0.002%",
    latencyMs: 9.8,
    timestamp: "38s ago",
  },
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
    title: "Clinical Data Orchestration Pipeline",
    subtitle: "Medallion Lakehouse & Automated Validation Gates",
    category: "Databricks & Lakehouse",
    highlightMetric: "50M+ Daily Records · 95% Anomaly Drop",
    overview: {
      purpose: "Built to replace brittle ETL scripts ingesting 50M+ daily healthcare records into a high-performance Medallion Lakehouse.",
      challenge: "Heterogeneous clinical feeds and unvalidated upstream schemas caused silent data corruption at the Bronze → Silver boundary, risking inaccurate clinician reports.",
      solution: "Architected Delta Lake schema enforcement, PySpark automated assertion wrappers, and automated Great Expectations verification gates. Slashed anomalies by 95%.",
      role: "Lead Data Engineer — Designed lakehouse architecture, partition strategies, and autonomous quality assertion gates.",
    },
    arch: [
      "Source Systems    → S3 Raw Staging (HL7 / FHIR / Parquet feeds)",
      "Bronze Layer      → Delta Lake append-only ingestion with schema tracking",
      "                  → Automated column type coercion & quarantine routing",
      "Silver Layer      → PySpark deduplication & entity normalization",
      "                  → Automated assertion gate via Great Expectations",
      "Gold Layer        → Star schema clinical marts in Databricks SQL",
      "                  → Sub-second query serving for clinical intelligence",
    ],
    codeSnippet: {
      title: "bronze_to_silver_assertion_gate.py",
      language: "python",
      code: `@dlt.table(
    name="silver_clinical_records",
    comment="Cleansed & assertion-verified clinical encounters"
)
@dlt.expect_or_drop("valid_encounter_id", "encounter_id IS NOT NULL")
@dlt.expect_or_quarantine("valid_patient_ref", "patient_sk > 0")
@dlt.expect_or_fail("timestamp_within_range", "event_time >= '2020-01-01'")
def silver_clinical_records():
    return (
        dlt.read("bronze_raw_feeds")
        .withColumn("ingestion_ts", F.current_timestamp())
        .withColumn("patient_sk", F.coalesce(F.col("patient_id"), F.lit(-1)))
        .dropDuplicates(["encounter_id", "source_feed_id"])
    )`,
    },
    impact: [
      "50M+ daily records processed within a 15-minute SLA window.",
      "95% reduction in downstream data anomalies via automated blocking gates.",
      "40% compute cost reduction through optimized Delta Lake file compacting (Z-ORDER on patient_id).",
      "Zero silent data corruptions reported across 18 consecutive months.",
    ],
    stack: ["Databricks", "Delta Lake", "PySpark", "Great Expectations", "Python", "AWS S3"],
  },
  {
    id: 2,
    title: "Healthcare Claims Analytics Warehouse",
    subtitle: "High-Throughput AWS Redshift & Stored Procedure Reconciliation",
    category: "AWS Redshift & Analytics",
    highlightMetric: "35% Redshift Query Latency Cut",
    overview: {
      purpose: "Scalable enterprise claims analytics warehouse serving financial reconciliations, payer analytics, and regulatory reporting.",
      challenge: "Massive table skew, unoptimized slice distribution, and manual reconciliation routines led to 4+ hour query timeouts during month-end claim reporting.",
      solution: "Redesigned table distribution keys (KEY on claim_id) and COMPOUND sort keys on service_date. Automated end-to-end reconciliation routines with custom PL/pgSQL stored procedures.",
      role: "Senior Data Engineer — Executed cluster optimization, data modeling, and automated reconciliation harness.",
    },
    arch: [
      "Inbound Claims   → S3 Manifest Load via Redshift COPY with COMPUPDATE",
      "Staging Tables   → Diststyle KEY (claim_id) with automated vacuuming",
      "Reconciliation   → PL/pgSQL automated stored procedures asserting source vs target hashes",
      "Reporting Views  → Materialized views refreshed concurrently for sub-second dashboards",
    ],
    codeSnippet: {
      title: "sp_reconcile_claims_batch.sql",
      language: "sql",
      code: `CREATE OR REPLACE PROCEDURE sp_reconcile_claims_batch(
    p_batch_id IN VARCHAR(64),
    p_status OUT VARCHAR(32)
) AS $$
DECLARE
    v_src_count BIGINT;
    v_tgt_count BIGINT;
    v_variance NUMERIC(8,4);
BEGIN
    SELECT count(*), sum(checksum) INTO v_src_count FROM staging_claims WHERE batch_id = p_batch_id;
    SELECT count(*), sum(checksum) INTO v_tgt_count FROM warehouse_claims WHERE batch_id = p_batch_id;
    
    v_variance := ABS(v_src_count - v_tgt_count) / NULLIF(v_src_count, 0) * 100.0;
    
    IF v_variance > 0.0001 THEN
        INSERT INTO reconciliation_quarantine VALUES (p_batch_id, 'VARIANCE_THRESHOLD_EXCEEDED', sysdate);
        p_status := 'QUARANTINED';
        RAISE EXCEPTION 'Claims batch % failed reconciliation gate', p_batch_id;
    END IF;
    
    p_status := 'PROMOTED';
END;
$$ LANGUAGE plpgsql;`,
    },
    impact: [
      "35% query latency cut across high-concurrency executive dashboard queries.",
      "Eliminated manual month-end reconciliation — automated gates run autonomously every hour.",
      "100% HIPAA compliance and zero audit deficiencies across 5 annual regulatory cycles.",
      "Reliably handles $4B+ in annual reconciled healthcare claims volume.",
    ],
    stack: ["AWS Redshift", "Advanced SQL", "PL/pgSQL", "Python", "AWS S3", "HIPAA Data Governance"],
  },
  {
    id: 3,
    title: "Automated SQL Data Testing Harness",
    subtitle: "Declarative Schema Drift Sentinel & Invariant Testing Engine",
    category: "Data Quality & CI/CD",
    highlightMetric: "100% Test Coverage Across Dev/Stage/Prod",
    overview: {
      purpose: "Built an automated continuous-integration data testing harness to prevent breaking upstream schema changes from corrupting production analytics.",
      challenge: "Frequent upstream application releases introduced breaking column type changes and missing nullable invariants, breaking downstream pipelines without warning.",
      solution: "Engineered a declarative Python & SQL test harness that runs pre-merge regression tests against ephemeral test containers, asserting contract invariants before code deployment.",
      role: "Lead QA Architect — Designed test assertion DSL, CI/CD GitHub Actions hooks, and automated schema drift reporting.",
    },
    arch: [
      "PR Trigger       → GitHub Actions initiates ephemeral PostgreSQL/DuckDB container",
      "Synthetic Feeds → Generates boundary-condition payloads with deliberate edge cases",
      "Assertion Suite  → Runs 120+ invariant rules (Nullability, Foreign Keys, Range Bounds)",
      "Drift Sentinel   → Diffs AST schema contracts against current production catalog",
      "Promotion Gate   → Merges only upon 100% assertion pass; alerts Slack on failure",
    ],
    codeSnippet: {
      title: "test_schema_drift_sentinel.py",
      language: "python",
      code: `def test_assert_zero_schema_drift():
    prod_catalog = fetch_catalog_schema(env="production")
    pr_catalog = extract_ddl_contract_schema(git_ref="HEAD")
    
    drift_report = compare_catalogs(
        baseline=prod_catalog,
        candidate=pr_catalog,
        rules={"allow_add_nullable_column": True, "allow_drop_column": False}
    )
    
    assert drift_report.has_breaking_changes is False, (
        f"Breaking schema drift detected: {drift_report.breaking_diffs}"
    )`,
    },
    impact: [
      "Prevented 42 breaking schema changes from reaching production over 12 months.",
      "Reduced pipeline deployment incident rate from 14% to 0%.",
      "Zero unannounced upstream breaking changes survived into staging.",
      "Adopted across 4 distributed engineering teams as standard release protocol.",
    ],
    stack: ["Python", "PyTest", "PostgreSQL", "GitHub Actions", "Docker", "Schema Registry"],
  },
];

export function LayoutShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [telemetryData, setTelemetryData] = useState<TelemetryRecord[]>(INITIAL_TELEMETRY);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [isSimulating, setIsSimulating] = useState(false);
  const [anomalyInjected, setAnomalyInjected] = useState(false);
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

  const handleRunGate = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const newRecord: TelemetryRecord = {
        id: `PL-${Math.floor(8050 + Math.random() * 50)}`,
        pipeline: "Great Expectations Automated Test Suite",
        domain: "Healthcare",
        batchSize: Math.floor(500000 + Math.random() * 800000),
        gateStatus: "PASS",
        anomalyIndex: "0.000%",
        latencyMs: Number((11 + Math.random() * 8).toFixed(1)),
        timestamp: "Just now",
      };
      setTelemetryData((prev) => [newRecord, ...prev.slice(0, 4)]);
      setIsSimulating(false);
    }, 600);
  };

  const handleInjectAnomaly = () => {
    setIsSimulating(true);
    setTimeout(() => {
      const anomalyRecord: TelemetryRecord = {
        id: `PL-${Math.floor(9000 + Math.random() * 100)}`,
        pipeline: "Dirty Upstream Feed (Schema Mismatch / Null Violation)",
        domain: "Claims",
        batchSize: 74200,
        gateStatus: "QUARANTINED",
        anomalyIndex: "14.82%",
        latencyMs: 6.4,
        timestamp: "Just now",
      };
      setTelemetryData((prev) => [anomalyRecord, ...prev.slice(0, 4)]);
      setAnomalyInjected(true);
      setIsSimulating(false);
    }, 500);
  };

  const handleResetFeed = () => {
    setTelemetryData(INITIAL_TELEMETRY);
    setAnomalyInjected(false);
  };

  const setProjectTab = (projectId: number, tab: ProjectTab) => {
    setActiveProjectTabs((prev) => ({ ...prev, [projectId]: tab }));
  };

  const filteredTelemetry =
    activeFilter === "ALL"
      ? telemetryData
      : telemetryData.filter((r) => r.domain.toUpperCase() === activeFilter);

  return (
    <div className="relative min-h-screen bg-canvas text-slate-100 selection:bg-cyan-500/30 selection:text-white overflow-x-hidden font-sans">
      {/* ─── SMOOTH SCROLL (LENIS) & CUSTOM INTERACTIVE CURSOR ─────────────── */}
      <SmoothScroll />
      <CustomCursor />

      {/* ─── AMBIENT GRID & RADIAL AURA BACKGROUND ─────────────────────────── */}
      <div
        className="fixed inset-0 pointer-events-none -z-10 bg-grid-white/[0.02] bg-[size:32px_32px]"
        aria-hidden="true"
      />
      <div
        className="fixed inset-0 pointer-events-none -z-10 mask-radial-faded opacity-60"
        style={{
          background:
            "radial-gradient(circle 800px at 15% 15%, rgba(34, 211, 238, 0.08), transparent 70%), radial-gradient(circle 700px at 85% 30%, rgba(52, 211, 153, 0.06), transparent 70%), radial-gradient(circle 900px at 50% 85%, rgba(15, 23, 42, 0.9), transparent 80%)",
        }}
        aria-hidden="true"
      />

      {/* ─── 1. STICKY MINIMALIST NAVIGATION BAR ──────────────────────────── */}
      <header className="sticky top-0 z-50 w-full glass-nav transition-all duration-200">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Brand Monogram & Live Status */}
            <div className="flex items-center gap-3">
              <a
                href="#home"
                className="group flex items-center gap-2.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-md"
                aria-label="Sabrin Singh Home"
              >
                <div className="w-8 h-8 rounded border border-slate-800 bg-slate-900/90 flex items-center justify-center font-mono font-bold text-xs text-cyan-400 group-hover:border-cyan-400/50 group-hover:shadow-glow-cyan transition-all">
                  SLS
                </div>
                <div className="flex flex-col">
                  <span className="font-semibold text-sm tracking-tight text-slate-100 group-hover:text-cyan-400 transition-colors">
                    Sabrin Lal Singh
                  </span>
                  <span className="font-mono text-[10px] text-slate-400">
                    Data &amp; Quality Engineer
                  </span>
                </div>
              </a>

              {/* Live Reactive Kathmandu Clock */}
              <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-800 text-xs font-mono text-slate-400">
                <span className="status-beacon-live" />
                <span className="text-slate-300">
                  {kathmanduTime ? `${kathmanduTime} NPT` : "Kathmandu (UTC+5:45)"}
                </span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-medium">Available for Roles</span>
              </div>
            </div>

            {/* Desktop Clean Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1 text-xs font-mono" aria-label="Main Navigation">
              {PRIMARY_NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 rounded-full text-slate-300 hover:text-cyan-400 hover:bg-slate-900/90 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2">
              {/* View Counter Telemetry Pill */}
              <ViewCounter variant="nav" />

              <a
                href="#contact"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-full bg-cyan-400 text-slate-950 hover:bg-cyan-300 font-mono text-xs font-semibold shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
                {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-400" /> : <Menu className="w-5 h-5" />}
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
              className="lg:hidden border-b border-slate-800 bg-slate-950/98 backdrop-blur-2xl px-5 py-5 space-y-4 shadow-2xl"
            >
              <div className="flex items-center justify-between p-3 rounded-lg bg-slate-900/80 border border-slate-800 text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="status-beacon-live" />
                  <span>{kathmanduTime ? `${kathmanduTime} NPT` : "Kathmandu, Nepal"}</span>
                </div>
                <span className="text-emerald-400 font-semibold px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/80 text-[11px]">
                  Available for Roles
                </span>
              </div>

              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-wider text-slate-500 px-1 mb-2">Navigation</p>
                <div className="grid grid-cols-2 gap-2">
                  {ALL_NAV_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-xs font-mono text-slate-200 hover:text-cyan-400 bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 hover:border-cyan-500/40 transition-all"
                    >
                      <span className="text-cyan-500 text-[10px]">#</span>
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
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Copy Direct Email</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-command-palette"));
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-cyan-400/10 border border-cyan-400/30 text-xs font-mono text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all"
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
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-12 md:py-20">

        {/* ─── HERO SECTION: MINIMALIST TYPOGRAPHIC DATA ARCHITECTURE ──────── */}
        <section id="home" className="relative pt-4 sm:pt-8 overflow-hidden rounded-2xl" aria-label="Hero Introduction">
          {/* Interactive Generative Data Mesh Canvas */}
          <HeroDataMesh />

          {/* Diagnostic Prompt Header */}
          <div className="relative z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-400">$ system.status</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400">DATA_ENGINEERING: HEALTHY</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400">QA_GATES: PASSING</span>
          </div>

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Typographic Core */}
            <div className="lg:col-span-7 space-y-6">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                  <TextScramble text="// SENIOR DATA & QUALITY ENGINEERING" />
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-50 leading-[1.1]">
                  Architecting High-Throughput Data Ingestion &amp;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-emerald-400">
                    Automated Quality Gates
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Senior Data Engineer &amp; QA Architect based in Kathmandu, Nepal. 9+ years hardening
                enterprise lakehouses, automated validation assertion gates, and distributed data systems
                across <strong className="text-slate-100 font-semibold">Databricks</strong>,{" "}
                <strong className="text-slate-100 font-semibold">Snowflake</strong>,{" "}
                <strong className="text-slate-100 font-semibold">AWS Redshift</strong>, and{" "}
                <strong className="text-slate-100 font-semibold">PostgreSQL</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Magnetic strength={0.3}>
                  <a
                    href="#engineering-focus"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 text-slate-950 font-semibold text-sm hover:bg-cyan-300 transition-all hover:shadow-glow-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <span>Inspect Architecture</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </Magnetic>

                <Magnetic strength={0.25}>
                  <a
                    href="#pipeline-visual"
                    className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-slate-700 font-mono text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Pipeline Topology</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.25}>
                  <a
                    href="#telemetry"
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 font-mono text-sm transition-all"
                  >
                    <Activity className="w-4 h-4 text-emerald-400" />
                    <span>Telemetry Simulator</span>
                  </a>
                </Magnetic>

                <Magnetic strength={0.2}>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-900/60 border border-slate-800 text-slate-400 hover:text-slate-200 text-sm font-mono transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <Check className="w-4 h-4 text-emerald-400" />
                        <span className="text-emerald-400">Copied Email</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>
                </Magnetic>
              </div>
            </div>

            {/* Right: Live Interactive Photo / Video Hologram */}
            <div className="lg:col-span-5 flex justify-center">
              <HeroCinematicPhoto />
            </div>
          </div>

          {/* High-Contrast Quantitative Metrics Strip */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl glass-card border border-slate-800">
            <div className="p-3">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-slate-50 tabular-nums">
                50M+
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Daily Records Ingested
              </div>
            </div>
            <div className="p-3">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                95%
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Anomaly Drop via Automated Gates
              </div>
            </div>
            <div className="p-3">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-cyan-400 tabular-nums">
                9+ Yrs
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Data &amp; QA Production Experience
              </div>
            </div>
            <div className="p-3">
              <div className="font-mono text-2xl sm:text-3xl font-bold text-slate-50 tabular-nums">
                99.98%
              </div>
              <div className="text-xs font-mono text-slate-400 mt-1">
                Data Reliability SLA Maintained
              </div>
            </div>
          </div>
        </section>

        {/* ─── ACTIVE FOCUS AREAS ───────────────────────────────────────────── */}
        <Currently />

        {/* ─── SPLIT GRID: DATA ENGINEERING VS. QUALITY ASSURANCE SYSTEMS ──── */}
        <section id="engineering-focus" className="space-y-8" aria-label="Core Engineering Duality">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400">
              <Layers className="w-3.5 h-3.5" />
              <span>// ARCHITECTURAL DUALITY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Engineering Focus: Pipeline Ingestion &amp; Quality Systems
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-3xl">
              High-scale analytics demands two synchronized competencies: the capability to ingest
              and process petabytes with minimal latency, and the automated rigor to guarantee
              uncompromising schema integrity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Data Engineering Workflows */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-cyan-500/40 hover:shadow-glow-cyan transition-all duration-200 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center text-cyan-400">
                    <Database className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    INGESTION &amp; SCALE
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-50">
                    Data Engineering Workflows
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Architecting resilient lakehouses and distributed compute pipelines that process
                    petabyte-scale clinical feeds, claims data, and analytical logs with predictable
                    latency and optimized cloud compute spend.
                  </p>
                </div>

                {/* Workflow Architecture Pipeline */}
                <div className="space-y-2 font-mono text-xs">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">
                    Pipeline Stages
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-cyan-400 font-bold">1. Bronze</div>
                      <div className="text-slate-400 text-[11px] mt-1">Raw feeds, append-only, schema discovery</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-cyan-400 font-bold">2. Silver</div>
                      <div className="text-slate-400 text-[11px] mt-1">Coerced types, deduplication, cleansed</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-cyan-400 font-bold">3. Gold</div>
                      <div className="text-slate-400 text-[11px] mt-1">Aggregations, dimensional star schemas</div>
                    </div>
                  </div>
                </div>

                {/* Technical Stack Tags */}
                <div className="space-y-2">
                  <span className="font-mono text-slate-400 uppercase tracking-wider text-[10px]">
                    Verified Toolchain
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {[
                      "Databricks Lakehouse",
                      "PySpark",
                      "Delta Lake",
                      "AWS Redshift",
                      "Snowflake",
                      "PostgreSQL",
                      "Python",
                      "Advanced SQL",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 text-xs font-mono text-cyan-400 flex items-center justify-between">
                <span>// Throughput: 50M+ rows/day</span>
                <span className="text-slate-400">AWS Redshift / Databricks</span>
              </div>
            </div>

            {/* Right: Quality Assurance Systems */}
            <div className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-emerald-500/40 hover:shadow-glow-emerald transition-all duration-200 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                    AUTOMATED GATES
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl font-bold text-slate-50">
                    Quality Assurance Systems
                  </h3>
                  <p className="text-sm text-slate-300 leading-relaxed">
                    Embedding autonomous validation assertion gates directly into the data flight
                    path. Intercepting schema drift, null explosions, and anomalies before data
                    contaminates downstream reporting warehouses.
                  </p>
                </div>

                {/* QA Verification Protocol */}
                <div className="space-y-2 font-mono text-xs">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">
                    Verification Protocols
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-emerald-400 font-bold">1. Contract</div>
                      <div className="text-slate-400 text-[11px] mt-1">Schema boundary &amp; type expectation checks</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-emerald-400 font-bold">2. Gate Scan</div>
                      <div className="text-slate-400 text-[11px] mt-1">Great Expectations statistical bounds</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900 border border-slate-800">
                      <div className="text-emerald-400 font-bold">3. Quarantine</div>
                      <div className="text-slate-400 text-[11px] mt-1">Autonomous isolation of dirty feeds</div>
                    </div>
                  </div>
                </div>

                {/* Technical Stack Tags */}
                <div className="space-y-2">
                  <span className="font-mono text-slate-400 uppercase tracking-wider text-[10px]">
                    Verification Frameworks
                  </span>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {[
                      "Great Expectations",
                      "Automated Assertions",
                      "Schema Drift Sentinel",
                      "CI/CD Data Gate",
                      "Reconciliation Harness",
                      "HIPAA Compliance",
                      "ETL Test Suites",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 text-slate-300"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
                <span>// Gate Latency: &lt; 20ms</span>
                <span className="text-slate-400">Zero Silent Corruptions</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 4. INTERACTIVE TOPOLOGY & ARCHITECTURE (DATA PIPELINE VISUAL) ── */}
        <section id="pipeline-visual" aria-label="Interactive Pipeline Architecture">
          <DataPipelineVisual />
        </section>

        {/* ─── 5. INTERACTIVE DATA LAYOUT BLOCK: PIPELINE TELEMETRY SIMULATOR ─ */}
        <section id="telemetry" className="space-y-6" aria-label="Interactive Telemetry Simulator">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400">
                <Activity className="w-3.5 h-3.5" />
                <TextScramble text="// INTERACTIVE TELEMETRY ENGINE" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-50">
                Live Data Pipeline &amp; Anomaly Quarantine Block
              </h2>
              <p className="text-slate-400 text-sm max-w-2xl">
                Experience real-time pipeline monitoring with autonomous Great Expectations validation.
                Trigger tests or simulate dirty data injection to see the quarantine router activate.
              </p>
            </div>

            {/* Interactive Control Buttons */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRunGate}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-emerald-400 text-slate-950 font-mono text-xs font-semibold hover:bg-emerald-300 transition-all hover:shadow-glow-emerald disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isSimulating ? "animate-spin" : ""}`} />
                <span>Run Validation Gate</span>
              </button>

              <button
                type="button"
                onClick={handleInjectAnomaly}
                disabled={isSimulating}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 font-mono text-xs hover:bg-rose-500/20 transition-all disabled:opacity-50"
              >
                <AlertTriangle className="w-3.5 h-3.5" />
                <span>Inject Anomaly</span>
              </button>

              {anomalyInjected && (
                <button
                  type="button"
                  onClick={handleResetFeed}
                  className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 font-mono text-xs hover:bg-slate-700"
                >
                  Reset Feed
                </button>
              )}
            </div>
          </div>

          {/* Telemetry Filter & Table Shell */}
          <div className="glass-panel rounded-2xl overflow-hidden border border-slate-800">
            {/* Filter Toolbar */}
            <div className="p-4 bg-slate-900/90 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-400 flex items-center gap-1">
                  <Filter className="w-3 h-3 text-cyan-400" /> Filter:
                </span>
                {["ALL", "HEALTHCARE", "CLAIMS", "LAKEHOUSE", "TELEMETRY"].map((domain) => (
                  <button
                    key={domain}
                    type="button"
                    onClick={() => setActiveFilter(domain)}
                    className={`px-2.5 py-1 rounded font-mono text-xs transition-colors ${
                      activeFilter === domain
                        ? "bg-cyan-400 text-slate-950 font-bold"
                        : "text-slate-400 hover:text-slate-100 hover:bg-slate-800"
                    }`}
                  >
                    {domain}
                  </button>
                ))}
              </div>

              <div className="font-mono text-xs text-slate-400">
                <span className="text-slate-500">Live Status:</span>{" "}
                {anomalyInjected ? (
                  <span className="text-rose-400 font-medium">Anomaly Isolated &amp; Routed to Quarantine</span>
                ) : (
                  <span className="text-emerald-400 font-medium">All Assertion Gates Passing (100% Integrity)</span>
                )}
              </div>
            </div>

            {/* Responsive Data Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left font-mono text-xs">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/60 text-slate-400">
                    <th className="py-3 px-4 font-medium">PIPELINE_ID</th>
                    <th className="py-3 px-4 font-medium">FEED_DESCRIPTOR</th>
                    <th className="py-3 px-4 font-medium">BATCH_ROWS</th>
                    <th className="py-3 px-4 font-medium">QA_GATE_STATUS</th>
                    <th className="py-3 px-4 font-medium">ANOMALY_INDEX</th>
                    <th className="py-3 px-4 font-medium text-right">SLA_LATENCY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60">
                  {filteredTelemetry.map((rec) => (
                    <tr
                      key={rec.id}
                      className={`hover:bg-slate-900/50 transition-colors ${
                        rec.gateStatus === "QUARANTINED" ? "bg-rose-950/20" : ""
                      }`}
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-200">{rec.id}</td>
                      <td className="py-3.5 px-4 text-slate-300">
                        <div className="flex items-center gap-2">
                          <span>{rec.pipeline}</span>
                          <span className="text-[10px] px-1.5 py-0.2 rounded bg-slate-800 text-slate-400">
                            {rec.domain}
                          </span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-slate-200 tabular-nums">
                        {rec.batchSize.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        {rec.gateStatus === "PASS" ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 text-[11px] font-medium">
                            <CheckCircle2 className="w-3 h-3" /> PASS
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-rose-950/80 text-rose-400 border border-rose-800 text-[11px] font-medium animate-pulse">
                            <AlertTriangle className="w-3 h-3" /> QUARANTINED
                          </span>
                        )}
                      </td>
                      <td className="py-3.5 px-4 tabular-nums">
                        <span
                          className={
                            rec.gateStatus === "QUARANTINED"
                              ? "text-rose-400 font-bold"
                              : "text-emerald-400"
                          }
                        >
                          {rec.anomalyIndex}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-right text-slate-300 tabular-nums">
                        {rec.latencyMs} ms
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Table Footer Summary */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-800 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-2">
              <div className="flex items-center gap-4">
                <span>Active Feeds: {telemetryData.length}</span>
                <span>•</span>
                <span>Total Processed: 5,567,700 records</span>
              </div>
              <div className="text-cyan-400">
                Engine: Great Expectations + PySpark Delta Enforcer
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. PRODUCTION CASE STUDIES (PROJECTS WITH INTERACTIVE TABS) ───── */}
        <section id="projects" className="space-y-8" aria-label="Selected Production Projects">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400">
              <Sparkles className="w-3.5 h-3.5" />
              <TextScramble text="// PRODUCTION CASE STUDIES" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Documented Systems &amp; Technical Architecture
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Real problem statements, architecture flows, production code snippets, and verified
              quantitative business impacts.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {CASE_STUDIES.map((project) => {
              const currentTab = activeProjectTabs[project.id] || "overview";
              return (
                <SpotlightCard
                  key={project.id}
                  className="glass-panel rounded-2xl p-6 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-cyan-400 uppercase">
                        {project.category}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                        {project.highlightMetric}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-lg font-bold text-slate-100">{project.title}</h3>
                      <p className="text-xs text-slate-400 font-mono mt-0.5">{project.subtitle}</p>
                    </div>

                    {/* Tabs Control */}
                    <div className="flex items-center gap-1 p-1 rounded-lg bg-slate-900 border border-slate-800 font-mono text-[11px]">
                      {(["overview", "arch", "code", "impact"] as ProjectTab[]).map((tab) => (
                        <button
                          key={tab}
                          type="button"
                          onClick={() => setProjectTab(project.id, tab)}
                          className={`flex-1 py-1 rounded transition-colors text-center capitalize ${
                            currentTab === tab
                              ? "bg-slate-800 text-cyan-400 font-bold"
                              : "text-slate-400 hover:text-slate-200"
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* Tabbed Content View */}
                    <div className="text-xs text-slate-300 min-h-[180px] flex flex-col justify-between">
                      {currentTab === "overview" && (
                        <div className="space-y-2.5">
                          <div>
                            <span className="font-mono text-[10px] text-slate-500 uppercase">Challenge:</span>
                            <p className="text-slate-300 leading-relaxed mt-0.5">{project.overview.challenge}</p>
                          </div>
                          <div>
                            <span className="font-mono text-[10px] text-slate-500 uppercase">Solution:</span>
                            <p className="text-slate-300 leading-relaxed mt-0.5">{project.overview.solution}</p>
                          </div>
                        </div>
                      )}

                      {currentTab === "arch" && (
                        <div className="p-3 rounded-lg bg-slate-950 font-mono text-[10px] text-slate-300 space-y-1 overflow-x-auto border border-slate-900">
                          {project.arch.map((line, i) => (
                            <div key={i} className="whitespace-pre">{line}</div>
                          ))}
                        </div>
                      )}

                      {currentTab === "code" && (
                        <div className="p-3 rounded-lg bg-slate-950 font-mono text-[10px] text-slate-300 overflow-x-auto border border-slate-900 max-h-48">
                          <div className="text-slate-500 mb-1">// {project.codeSnippet.title}</div>
                          <pre className="text-cyan-300 whitespace-pre leading-relaxed">{project.codeSnippet.code}</pre>
                        </div>
                      )}

                      {currentTab === "impact" && (
                        <ul className="space-y-1.5">
                          {project.impact.map((point, i) => (
                            <li key={i} className="flex items-start gap-2 text-slate-300 leading-relaxed">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                              <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>

                  {/* Stack Footer */}
                  <div className="pt-4 mt-4 border-t border-slate-800 flex flex-wrap gap-1 font-mono text-[10px] text-slate-400">
                    {project.stack.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
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
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400">
              <Clock className="w-3.5 h-3.5" />
              <span>// CAREER JOURNEY</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Production History &amp; Technical Ownership
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              9+ years leading data reliability, lakehouse modernization, and enterprise healthcare
              quality architecture across Nepal and US clients.
            </p>
          </div>

          <div className="space-y-4">
            {experience.map((job) => (
              <div
                key={`${job.company}-${job.period}`}
                className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 hover:border-slate-700 transition-all"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-3 space-y-1">
                    <span className="font-mono text-xs px-2.5 py-1 rounded bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 font-semibold inline-block">
                      {job.period}
                    </span>
                    <p className="font-mono text-xs text-slate-400 mt-2 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-500" />
                      <span>{job.location}</span>
                    </p>
                  </div>

                  <div className="lg:col-span-9 space-y-3">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="text-xl font-bold text-slate-100">{job.role}</h3>
                      <span className="font-mono text-sm text-emerald-400 font-semibold">{job.company}</span>
                    </div>

                    <p className="text-sm text-slate-300 leading-relaxed">{job.description}</p>

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

        {/* ─── 8. ARCHITECTURAL PRINCIPLES ("HOW I THINK") ──────────────────── */}
        <section id="principles" aria-label="Architectural Philosophy">
          <HowIThink />
        </section>

        {/* ─── 9. VERIFIED CREDENTIALS & CERTIFICATIONS ─────────────────────── */}
        <section id="certifications" className="space-y-8" aria-label="Credentials and Certifications">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400">
              <Award className="w-3.5 h-3.5" />
              <span>// VERIFIED CREDENTIALS</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Industry Certifications &amp; Training
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Rigorous credentials validating expertise across distributed lakehouses, cloud data
              warehousing, and engineering best practices.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {certifications.map((cert) => {
              const IconComp = cert.icon;
              return (
                <div
                  key={cert.name}
                  className="glass-panel rounded-xl p-5 border border-slate-800 hover:border-cyan-400/50 hover:shadow-glow-cyan transition-all flex flex-col justify-between space-y-3"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                        {cert.issuer}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">{cert.year}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {IconComp && <IconComp className="w-4 h-4 text-slate-400 flex-shrink-0" />}
                      <h4 className="text-sm font-bold text-slate-100 line-clamp-2">{cert.name}</h4>
                    </div>
                  </div>

                  <span className="font-mono text-[10px] text-emerald-400 pt-2 border-t border-slate-800 flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Verified Credential</span>
                  </span>
                </div>
              );
            })}
          </div>
        </section>

        {/* ─── 10. PEER RECOMMENDATIONS ─────────────────────────────────────── */}
        <section className="space-y-8" aria-label="Peer Recommendations">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400">
              <Quote className="w-3.5 h-3.5" />
              <span>// PEER RECOGNITION</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Endorsements from Engineering Leadership
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recommendations.slice(0, 2).map((rec, i) => (
              <div
                key={i}
                className="glass-panel rounded-2xl p-6 sm:p-8 border border-slate-800 space-y-4 flex flex-col justify-between"
              >
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic">
                  "{rec.text}"
                </p>
                <div className="pt-4 border-t border-slate-800 flex items-center justify-between font-mono text-xs">
                  <div>
                    <div className="font-bold text-slate-100">{rec.author}</div>
                    <div className="text-[11px] text-slate-400">{rec.role}</div>
                  </div>
                  <span className="text-[10px] text-slate-500">{rec.company}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ─── 11. CONTACT & TERMINAL FOOTER ─────────────────────────────────── */}
        <section id="contact" className="space-y-6" aria-label="Contact Section">
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-slate-800 text-center space-y-6">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400 px-3 py-1 rounded-full bg-slate-900 border border-slate-800">
              <Mail className="w-3.5 h-3.5" />
              <span>// DIRECT TECHNICAL CHANNEL</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50 max-w-xl mx-auto">
              Ready to Solidify Your Data Quality &amp; Pipeline Architecture?
            </h2>

            <p className="text-slate-400 text-sm max-w-lg mx-auto leading-relaxed">
              Available for senior data engineering roles, lakehouse modernization contracts, and
              automated testing architecture advisory.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="mailto:sabrinlalsingh@gmail.com?subject=Technical Collaboration — Sabrin Singh"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-slate-950 font-semibold text-sm hover:bg-cyan-300 transition-all hover:shadow-glow-cyan"
              >
                <Mail className="w-4 h-4" />
                <span>sabrinlalsingh@gmail.com</span>
              </a>

              <button
                type="button"
                onClick={handleCopyEmail}
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 font-mono text-sm transition-colors"
              >
                {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copiedEmail ? "Email Copied" : "Copy to Clipboard"}</span>
              </button>

              <a
                href="/Sabrin_Singh_Resume.pdf"
                download
                className="inline-flex items-center gap-2 px-4 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-slate-100 font-mono text-sm transition-colors"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <span>Resume (PDF)</span>
              </a>
            </div>

            {/* Social & Coordinates */}
            <div className="pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs font-mono text-slate-400 gap-4">
              <div className="flex items-center gap-4">
                <a
                  href="https://github.com/sabrin2052"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/sabrin-lal-singh-478218a0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors"
                >
                  <Linkedin className="w-4 h-4" />
                  <span>LinkedIn</span>
                </a>
              </div>

              <div className="flex items-center gap-2 text-slate-500">
                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                <span>Kathmandu, Nepal (27.7172° N, 85.3240° E)</span>
              </div>
            </div>

            {/* Real-time View Counter & Telemetry Strip */}
            <div className="pt-6">
              <ViewCounter variant="footer" />
            </div>
          </div>

          <footer className="py-6 text-center text-xs font-mono text-slate-400 space-y-1">
            <p>© {new Date().getFullYear()} Sabrin Lal Singh. Designed with UI/UX Pro Max Architecture.</p>
            <p className="text-slate-400">
              Host: Netlify • Edge SSL • Multi-Theme Engine (Cyber / OLED / Tokyo / Studio) • High-Contrast WCAG AAA
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
export default LayoutShell;
