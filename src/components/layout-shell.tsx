import { useState } from "react";
import {
  Database,
  ShieldCheck,
  Activity,
  Terminal,
  Cpu,
  Server,
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
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { RecruiterModal } from "@/components/recruiter-modal";

// ─── NAV ANCHORS ─────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Engineering Focus", href: "#engineering-focus" },
  { label: "Telemetry Block", href: "#telemetry" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
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

export function LayoutShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const [telemetryData, setTelemetryData] = useState<TelemetryRecord[]>(INITIAL_TELEMETRY);
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [isSimulating, setIsSimulating] = useState(false);
  const [anomalyInjected, setAnomalyInjected] = useState(false);

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

  const filteredTelemetry =
    activeFilter === "ALL"
      ? telemetryData
      : telemetryData.filter((r) => r.domain.toUpperCase() === activeFilter);

  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-white overflow-x-hidden font-sans">
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
            {/* Brand Monogram & Status */}
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

              {/* Kathmandu Status Beacon */}
              <div className="hidden xl:flex items-center gap-2 pl-4 border-l border-slate-800 text-xs font-mono text-slate-400">
                <span className="status-beacon-live" />
                <span className="text-slate-300">Kathmandu (UTC+5:45)</span>
                <span className="text-slate-500">•</span>
                <span className="text-emerald-400 font-medium">Available for Senior Roles</span>
              </div>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-1 text-sm font-medium" aria-label="Main Navigation">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="px-3 py-1.5 rounded-md text-slate-300 hover:text-cyan-400 hover:bg-slate-900/80 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Right Action Bar */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => window.dispatchEvent(new CustomEvent("open-command-palette"))}
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-400 hover:text-slate-100 hover:border-slate-700 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label="Open Command Palette"
                title="Open Command Palette (⌘K)"
              >
                <Search className="w-3.5 h-3.5 text-cyan-400" />
                <span>⌘K</span>
              </button>

              <RecruiterModal />

              <a
                href="#contact"
                className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3 py-1.5 rounded-md bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 hover:bg-cyan-400 hover:text-slate-950 transition-all font-mono text-xs font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Contact Engineer</span>
              </a>

              {/* Mobile Menu Button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-slate-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
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
              transition={{ duration: 0.2 }}
              className="md:hidden border-b border-slate-800 bg-slate-950/95 backdrop-blur-xl px-4 py-4 space-y-2 overflow-hidden"
            >
              <div className="flex items-center gap-2 px-2 py-1.5 mb-2 rounded bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                <span className="status-beacon-live" />
                <span>Kathmandu, Nepal · Available for Contracts</span>
              </div>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-md text-base font-medium text-slate-200 hover:text-cyan-400 hover:bg-slate-900 transition-colors"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
                <button
                  onClick={() => {
                    handleCopyEmail();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300"
                >
                  <Mail className="w-3.5 h-3.5 text-cyan-400" />
                  <span>sabrinlalsingh@gmail.com</span>
                </button>

                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent("open-command-palette"));
                  }}
                  className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-cyan-400 hover:bg-slate-800"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Open Command Palette (⌘K)</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ─── 2. CENTRAL CONTENT CONTAINER WITH STRICT PADDING BOUNDARIES ───── */}
      <main className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24 py-12 md:py-20">

        {/* ─── HERO SECTION: MINIMALIST TYPOGRAPHIC DATA ARCHITECTURE ──────── */}
        <section id="home" className="relative pt-4 sm:pt-8" aria-label="Hero Introduction">
          {/* Diagnostic Prompt Header */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-800 bg-slate-900/90 text-xs font-mono text-slate-300 mb-6 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-slate-400">$ system.status</span>
            <span className="text-slate-600">/</span>
            <span className="text-cyan-400">DATA_ENGINEERING: HEALTHY</span>
            <span className="text-slate-600">/</span>
            <span className="text-emerald-400">QA_GATES: PASSING</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Typographic Core */}
            <div className="lg:col-span-8 space-y-6">
              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                  // Data &amp; Quality Engineering Scaffolding
                </p>
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-50 leading-[1.1]">
                  Architecting Resilient Data Pipelines &amp;{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-300 to-emerald-400">
                    Automated Quality Gates
                  </span>
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Senior Data Engineer &amp; QA Architect based in Kathmandu. 9+ years building
                high-throughput Medallion Lakehouses, automated validation assertion gates, and
                distributed query systems across <strong className="text-slate-100 font-semibold">Databricks</strong>,{" "}
                <strong className="text-slate-100 font-semibold">Snowflake</strong>,{" "}
                <strong className="text-slate-100 font-semibold">AWS Redshift</strong>, and{" "}
                <strong className="text-slate-100 font-semibold">PostgreSQL</strong>.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#engineering-focus"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-cyan-400 text-slate-950 font-semibold text-sm hover:bg-cyan-300 transition-all hover:shadow-glow-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <span>Inspect Architecture</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href="#telemetry"
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 hover:border-slate-700 font-mono text-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span>Telemetry Simulator</span>
                </a>

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
              </div>
            </div>

            {/* Terminal Live Diagnostics Preview */}
            <div className="lg:col-span-4">
              <div className="glass-panel rounded-xl overflow-hidden shadow-surface-raised border border-slate-800 hover:border-slate-700 transition-all">
                <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="font-mono text-xs text-slate-400">
                    lakehouse_sentinel.py
                  </span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    LIVE
                  </span>
                </div>
                <div className="p-4 font-mono text-xs text-slate-300 space-y-2 bg-slate-950/70 overflow-x-auto">
                  <p className="text-slate-500"># Initializing assertion pipeline</p>
                  <p>
                    <span className="text-cyan-400">from</span> great_expectations{" "}
                    <span className="text-cyan-400">import</span> LakehouseSuite
                  </p>
                  <p>
                    <span className="text-emerald-400">suite</span> = LakehouseSuite(
                    <span className="text-amber-300">"medallion_bronze_silver"</span>)
                  </p>
                  <p className="text-slate-400">
                    &gt; suite.assert_column_not_null(<span className="text-amber-300">"patient_id"</span>)
                  </p>
                  <p className="text-slate-400">
                    &gt; suite.assert_schema_drift(<span className="text-amber-300">"claims_feed"</span>, strict=True)
                  </p>
                  <div className="pt-2 mt-2 border-t border-slate-800 text-[11px] text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>50,000,000 records validated: 0 corruption</span>
                  </div>
                </div>
              </div>
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
                    latency and optimized cloud spend.
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

        {/* ─── 3. INTERACTIVE DATA LAYOUT BLOCK: PIPELINE TELEMETRY SIMULATOR ─ */}
        <section id="telemetry" className="space-y-6" aria-label="Interactive Telemetry Simulator">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-2 font-mono text-xs text-emerald-400">
                <Activity className="w-3.5 h-3.5" />
                <span>// INTERACTIVE TELEMETRY ENGINE</span>
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

        {/* ─── 4. SELECTED ARCHITECTURE HIGHLIGHTS (PROJECTS) ───────────────── */}
        <section id="projects" className="space-y-8" aria-label="Selected Architecture Projects">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400">
              <Server className="w-3.5 h-3.5" />
              <span>// PRODUCTION DELIVERIES</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50">
              Selected Architecture Projects
            </h2>
            <p className="text-slate-400 text-sm max-w-2xl">
              Production-grade data warehouses, lakehouse orchestrations, and automated test harnesses
              deployed for enterprise healthcare and analytics clients.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Project 1 */}
            <div className="glass-panel rounded-xl p-6 border border-slate-800 hover:border-cyan-400/50 hover:shadow-glow-cyan transition-all duration-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400">01 / LAKEHOUSE</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-emerald-400">
                    50M+ Records
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  Clinical Data Orchestration Pipeline
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Engineered Medallion Lakehouse replacing fragile scripts. Deployed PySpark schema
                  assertion gates, cutting silent anomaly contamination by 95% across daily health feeds.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-900">Databricks</span>
                <span className="px-2 py-0.5 rounded bg-slate-900">PySpark</span>
                <span className="px-2 py-0.5 rounded bg-slate-900">Great Expectations</span>
              </div>
            </div>

            {/* Project 2 */}
            <div className="glass-panel rounded-xl p-6 border border-slate-800 hover:border-emerald-400/50 hover:shadow-glow-emerald transition-all duration-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-emerald-400">02 / WAREHOUSE</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-400">
                    -35% Latency
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  Enterprise Claims Analytics Warehouse
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Scaled AWS Redshift claims warehouse. Tuned distribution styles, sort keys, and
                  automated reconciliation pipelines to guarantee 100% HIPAA compliance and financial audit readiness.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-900">AWS Redshift</span>
                <span className="px-2 py-0.5 rounded bg-slate-900">Advanced SQL</span>
                <span className="px-2 py-0.5 rounded bg-slate-900">Python</span>
              </div>
            </div>

            {/* Project 3 */}
            <div className="glass-panel rounded-xl p-6 border border-slate-800 hover:border-cyan-400/50 hover:shadow-glow-cyan transition-all duration-200 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-cyan-400">03 / SENTINEL</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                    CI/CD Gates
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-100">
                  Automated SQL Data Testing Harness
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Built declarative testing suite detecting schema drift across Dev, Staging, and
                  Production environments. Automated invariant assertion testing for high-concurrency feeds.
                </p>
              </div>
              <div className="pt-4 border-t border-slate-800 flex flex-wrap gap-1.5 font-mono text-[10px] text-slate-400">
                <span className="px-2 py-0.5 rounded bg-slate-900">PostgreSQL</span>
                <span className="px-2 py-0.5 rounded bg-slate-900">PyTest</span>
                <span className="px-2 py-0.5 rounded bg-slate-900">Docker</span>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 5. ABOUT & TECHNICAL PHILOSOPHY ──────────────────────────────── */}
        <section id="about" className="space-y-8" aria-label="About Sabrin Singh">
          <div className="glass-panel rounded-2xl p-6 sm:p-10 border border-slate-800">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>// ABOUT THE ARCHITECT</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-50">
                  Quality Is An Architectural Contract, Not An Afterthought
                </h2>
                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 font-mono text-xs text-slate-300 space-y-2">
                  <div className="text-cyan-400 font-bold">ETHOS:</div>
                  <p className="leading-relaxed">
                    "In enterprise data systems, bad data travels faster than good insights. If validation
                    is treated as an afterthought, every downstream dashboard is a liability."
                  </p>
                </div>
              </div>

              <div className="lg:col-span-7 space-y-4 text-sm text-slate-300 leading-relaxed">
                <p>
                  I am a senior Data &amp; Quality Engineer with over 9 years of hands-on experience
                  designing, testing, and scaling mission-critical data systems. Currently with{" "}
                  <strong className="text-slate-100">Cedar Gate Services</strong> and advising as a consultant
                  at <strong className="text-slate-100">CoWrkr</strong>, my work centers on high-scale data ingestion,
                  lakehouse modernization, and automated test assertion gates.
                </p>
                <p>
                  Having served in senior engineering roles at Techkraft Inc and Cotiviti Nepal, I have
                  directed multi-disciplinary engineering squads, led complex migrations to Databricks
                  Lakehouses, and optimized queries on Redshift and Snowflake handling tens of millions of
                  records daily.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-800 font-mono text-xs">
                  <div>
                    <span className="text-slate-500 uppercase text-[10px]">Location</span>
                    <div className="text-slate-200 mt-0.5">Kathmandu, Nepal</div>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px]">Education</span>
                    <div className="text-slate-200 mt-0.5">Computer Engineering (TU)</div>
                  </div>
                  <div>
                    <span className="text-slate-500 uppercase text-[10px]">Availability</span>
                    <div className="text-emerald-400 mt-0.5">Senior / Advisory Roles</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ─── 6. CONTACT & TERMINAL FOOTER ─────────────────────────────────── */}
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
          </div>

          <footer className="py-6 text-center text-xs font-mono text-slate-400 space-y-1">
            <p>© {new Date().getFullYear()} Sabrin Lal Singh. Designed with UI/UX Pro Max Architecture.</p>
            <p className="text-slate-400">
              Host: Netlify • Edge SSL • Slate-950 Dark Engine • High-Contrast WCAG AAA
            </p>
          </footer>
        </section>
      </main>
    </div>
  );
}
export default LayoutShell;
