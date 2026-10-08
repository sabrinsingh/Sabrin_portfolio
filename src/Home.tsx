import { useState, useEffect } from "react";
import { Linkedin, Github, ArrowDown, ArrowUp, Moon, Sun, Copy, Check, ExternalLink, Menu, X } from "lucide-react";
import { Helmet } from "react-helmet-async";
import { useTheme } from "@/components/theme-provider";
import { AnimatePresence, motion, useSpring, useTransform, useInView, useReducedMotion, useMotionValue } from "framer-motion";
import { useRef } from "react";

import { certifications, personalInfo, recommendations } from "@/data/portfolio";
import { ExperienceSection } from "@/components/experience-section";
import { SkillsSection } from "@/components/skills-section";
import { Footer } from "@/components/footer";
import { DataPipelineSandbox } from "@/components/data-pipeline-sandbox";
import { BackgroundEffects } from "@/components/background-effects";
import { HowIThink } from "@/components/how-i-think";
import { DataPipelineVisual } from "@/components/data-pipeline-visual";
import { Currently } from "@/components/currently";
import { RecruiterModal } from "@/components/recruiter-modal";

// ─── NAV ────────────────────────────────────────────────────────────
const navItems = [
    { label: "About",      href: "#about" },
    { label: "Experience", href: "#experience" },
    { label: "Work",       href: "#projects" },
    { label: "Toolkit",    href: "#skills" },
    { label: "Contact",    href: "#contact" },
];

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
            className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-100"
        >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </button>
    );
}

// ─── PROJECT DATA ────────────────────────────────────────────────────
type ProjectTab = "overview" | "arch" | "impact";

const projectEntries = [
    {
        id: 1,
        title: "Clinical Data Orchestration Pipeline",
        category: "databricks",
        overview: {
            purpose: "Built to replace a brittle, hand-curated ETL process for 50M+ daily clinical records ingested into a Medallion Lakehouse.",
            challenge: "Heterogeneous source schemas and unvalidated upstream feeds were causing silent data corruption at the Bronze → Silver boundary.",
            solution: "Designed schema-enforcement layers using Delta Lake constraints and PySpark great-expectations wrappers. Reduced anomalies by 95%.",
            role: "Lead Data Engineer — Architected Medallion data flow and implemented PySpark automation gates.",
        },
        arch: [
            "Source Systems  →  S3 Landing Zone (raw Parquet / JSON)",
            "Bronze Layer    →  Delta Lake append-only ingestion",
            "               →  Schema enforcement + type coercion",
            "Silver Layer    →  PySpark transforms + deduplication",
            "               →  Great Expectations assertion suite",
            "Gold Layer      →  Aggregated clinical tables for BI",
            "QA Gate         →  Automated row-count + null checks",
            "               →  Alert on failure → pipeline halt",
        ],
        impact: [
            "95% reduction in systemic data anomalies reaching Gold layer",
            "50M+ daily records processed with p99 latency under 4 minutes",
            "Automated QA coverage of 100% of Bronze→Silver transitions",
        ],
        stack: ["Databricks", "Delta Lake", "PySpark", "Great Expectations", "Python"],
    },
    {
        id: 2,
        title: "Redshift Analytics Framework",
        category: "aws",
        overview: {
            purpose: "Centralized analytics warehouse integrating 20+ heterogeneous sources to support executive reporting and downstream BI.",
            challenge: "Ad-hoc query patterns from 30+ BI users were saturating single-node Redshift concurrency slots, causing p95 latency spikes.",
            solution: "Implemented WLM queue isolation, distribution key optimization, and materialized view pre-aggregation. Slashed query latency by 35%.",
            role: "Data Engineer — Tuned Redshift cluster execution plans and orchestrated AWS Glue ingestion.",
        },
        arch: [
            "20+ Sources     →  S3 (Parquet/CSV/JSON staging)",
            "Ingestion       →  AWS Glue ETL + Airflow orchestration",
            "Warehouse       →  Redshift (DIST KEY + SORT KEY tuned)",
            "WLM             →  3 queue tiers: ETL / BI / Ad-hoc",
            "               →  Concurrency scaling auto-enabled",
            "Views Layer     →  Materialized views (pre-aggregated)",
            "QA Gate         →  Row count reconciliation vs. source",
            "               →  Referential integrity assertions",
        ],
        impact: [
            "35% reduction in executive report generation latency",
            "Sub-second p50 response time for pre-aggregated BI queries",
            "Zero data loss validated across 20+ heterogeneous source migrations",
        ],
        stack: ["AWS Redshift", "S3", "Apache Airflow", "AWS Glue", "SQL", "WLM"],
    },
    {
        id: 3,
        title: "LLM QA Governance Layer",
        category: "ai",
        overview: {
            purpose: "Systematic validation framework to make LLM outputs safe, consistent, and audit-ready in a HIPAA-regulated environment.",
            challenge: "LLM responses for clinical summarization were non-deterministic and could leak PII, failing compliance mandates.",
            solution: "Python evaluation harnesses scoring outputs on hallucination rate, PII leak risk, and prompt adherence — integrated as a blocking CI/CD gate.",
            role: "AI QA Engineer — Developed BERTScore hallucination evaluations and regex/NER PII scrubbers.",
        },
        arch: [
            "Input Layer     →  Prompt templates + patient context",
            "PII Scrubber    →  Regex + NER model-based redaction",
            "LLM Inference   →  Prompt → Model → Raw response",
            "QA Harness      →  Hallucination scorer (BERTScore)",
            "               →  PII leak detector (re-scan output)",
            "               →  Prompt adherence classifier",
            "CI/CD Gate      →  Fail pipeline if score < threshold",
            "Audit Log       →  Immutable run records (HIPAA req.)",
        ],
        impact: [
            "100% HIPAA integrity — zero PII leaks in production deployments",
            "Automated QA harness catches 94% of hallucinated clinical facts",
            "Blocking CI/CD gate reduced manual review time by 60%",
        ],
        stack: ["Python", "LLM Orchestration", "BERTScore", "PII Scrubbing", "CI/CD", "HIPAA"],
    },
];

// ─── ANIMATED METRIC ──────────────────────────────────────────────────
function AnimatedMetric({ value, suffix }: { value: number; suffix: string }) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-50px" });
    const shouldReduceMotion = useReducedMotion();
    const springValue = useSpring(0, { stiffness: 50, damping: 20 });
    const display = useTransform(springValue, (current) => Math.floor(current) + suffix);

    useEffect(() => {
        if (inView) {
            springValue.set(value);
        }
    }, [inView, value, springValue]);

    return (
        <span ref={ref}>
            {shouldReduceMotion ? value + suffix : <motion.span>{display}</motion.span>}
        </span>
    );
}

// ─── PROJECT CARD WITH TABS ──────────────────────────────────────────
function ProjectCard({ project, wide, onClick }: { project: typeof projectEntries[0]; wide?: boolean; onClick?: () => void }) {
    const [tab, setTab] = useState<ProjectTab>("overview");
    const cardRef = useRef<HTMLDivElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        cardRef.current.style.setProperty("--mouse-x", `${x}px`);
        cardRef.current.style.setProperty("--mouse-y", `${y}px`);
    };

    const TABS: { id: ProjectTab; label: string }[] = [
        { id: "overview", label: "Overview" },
        { id: "arch",     label: "Tech Architecture" },
        { id: "impact",   label: "Impact & QA Gates" },
    ];

    return (
        <motion.div 
            ref={cardRef}
            onMouseMove={handleMouseMove}
            layoutId={`project-card-${project.id}`}
            whileHover={{ y: -4, scale: 1.01 }}
            className={`project-card glass-panel hover-glow flex flex-col${wide ? " md:col-span-2" : ""}`}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
            {/* Card header */}
            <div className="flex items-start justify-between gap-3 mb-4">
                <h3 className="font-display font-semibold text-base text-foreground leading-snug">
                    {project.title}
                </h3>
                <span className="font-mono text-[10px] text-muted-foreground border border-border px-1.5 py-0.5 rounded shrink-0 uppercase tracking-wider">
                    {project.category}
                </span>
            </div>

            {/* Segmented tab control */}
            <div className="flex rounded-md border border-border p-1 bg-secondary/20 mb-4 shrink-0 relative">
                {TABS.map(t => {
                    const isActive = tab === t.id;
                    return (
                        <button
                            key={t.id}
                            onClick={() => setTab(t.id)}
                            className={`relative flex-1 py-1.5 text-[11px] font-medium transition-colors duration-100 z-10 rounded-sm ${
                                isActive
                                    ? "text-foreground"
                                    : "text-muted-foreground hover:text-foreground"
                            }`}
                        >
                            {isActive && (
                                <motion.div
                                    layoutId={`tab-pill-${project.id}`}
                                    className="absolute inset-0 bg-background border border-border rounded-sm shadow-sm -z-10"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                            {t.label}
                        </button>
                    );
                })}
            </div>

            {/* Tab content */}
            <div className="flex-1 min-h-[7rem]">
                {tab === "overview" && (
                    <div className="space-y-3">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                            {project.overview.purpose}
                        </p>
                        <div className="space-y-1.5">
                            <div className="flex gap-2">
                                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider shrink-0 w-20 pt-0.5">Role</span>
                                <p className="text-sm text-foreground/80 leading-relaxed">{project.overview.role}</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider shrink-0 w-20 pt-0.5">Challenge</span>
                                <p className="text-sm text-foreground/80 leading-relaxed">{project.overview.challenge}</p>
                            </div>
                            <div className="flex gap-2">
                                <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider shrink-0 w-20 pt-0.5">Solution</span>
                                <p className="text-sm text-foreground/80 leading-relaxed">{project.overview.solution}</p>
                            </div>
                        </div>
                    </div>
                )}

                {tab === "arch" && (
                    <div className="rounded border border-border bg-neutral-950/60 dark:bg-black/50 p-3 overflow-x-auto scrollbar-hide">
                        <pre className="font-mono text-[11px] leading-6 text-neutral-400 whitespace-pre">
                            {project.arch.map((line, i) => (
                                <span key={i} className="block">
                                    {line.startsWith("QA Gate") || line.includes("assertion") || line.includes("QA") ? (
                                        <span className="text-primary">{line}</span>
                                    ) : line.startsWith(" ") ? (
                                        <span className="text-neutral-500">{line}</span>
                                    ) : (
                                        line
                                    )}
                                </span>
                            ))}
                        </pre>
                    </div>
                )}

                {tab === "impact" && (
                    <ul className="space-y-3">
                        {project.impact.map((item, i) => (
                            <li key={i} className="flex gap-3 text-sm leading-relaxed">
                                <span className="text-primary mt-0.5 shrink-0 font-mono text-xs">→</span>
                                <span className="text-foreground/80">{item}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {/* Stack pills & Deep Dive */}
            <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-border items-center">
                {project.stack.map(s => (
                    <span key={s} className="skill-pill">{s}</span>
                ))}
                {onClick && (
                    <button
                        onClick={onClick}
                        className="ml-auto text-[11px] font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                    >
                        Deep Dive <ArrowUp className="w-3 h-3 rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                )}
            </div>
        </motion.div>
    );
}

// ─── HOME ────────────────────────────────────────────────────────────
export default function Home() {
    const [activeSection, setActiveSection] = useState("");
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [activeFilter, setActiveFilter] = useState("all");
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [expandedProject, setExpandedProject] = useState<typeof projectEntries[0] | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const contactEmail = "sabrinlalsingh@gmail.com";
    
    // Interaction Layer values
    const prefersReducedMotion = useReducedMotion();
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const smoothX = useSpring(mouseX, { damping: 30, stiffness: 100, mass: 1 });
    const metaX = useTransform(smoothX, [-1, 1], [-3, 3]);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (prefersReducedMotion) return;
        const { clientX, clientY } = e;
        const x = (clientX / window.innerWidth - 0.5) * 2;
        const y = (clientY / window.innerHeight - 0.5) * 2;
        mouseX.set(x);
        mouseY.set(y);
    };

    const filteredProjects =
        activeFilter === "all"
            ? projectEntries
            : projectEntries.filter(p => p.category === activeFilter);

    // Scroll spy
    useEffect(() => {
        const ids = ["about", "experience", "projects", "skills", "certifications", "contact"];
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
            for (const id of ids) {
                const el = document.getElementById(id);
                if (el) {
                    const { top, bottom } = el.getBoundingClientRect();
                    if (top <= 120 && bottom > 120) { setActiveSection(id); break; }
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
            setTimeout(() => setCopiedEmail(false), 2000);
        } catch {
            window.location.href = `mailto:${contactEmail}`;
        }
    };

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Helmet>
                <title>Sabrin Lal Singh — Data QA &amp; Analytics Engineer</title>
                <meta name="description" content={personalInfo.summary} />
                <link rel="canonical" href="https://sabrinsingh.com.np" />
            </Helmet>

            {/* Premium Animated Background */}
            <BackgroundEffects />

            {/* ── NAV ─────────────────────────────────────────── */}
            <nav className="sticky top-0 z-50 glass-panel border-b border-border/40">
                <div className="container mx-auto px-4 sm:px-6 h-14 flex items-center justify-between">
                    <a
                        href="#"
                        className="font-display font-bold text-base text-foreground tracking-tight hover:text-primary transition-colors duration-100"
                    >
                        Sabrin Lal Singh
                    </a>

                    <div className="hidden md:flex items-center gap-2 lg:gap-6 relative">
                        {navItems.map(item => {
                            const isActive = activeSection === item.href.slice(1);
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    className={`relative px-3 py-1.5 text-sm font-medium transition-colors duration-100 z-10 ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute inset-0 bg-secondary rounded-md -z-10"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {item.label}
                                </a>
                            );
                        })}
                    </div>

                    <div className="flex items-center gap-2">
                        {/* Status badge — desktop */}
                        <div className="status-badge hidden lg:inline-flex mr-2">
                            <span className="status-dot" />
                            Based in Kathmandu · Available
                        </div>

                        <RecruiterModal />

                        <a href="https://github.com/sabrinsingh" target="_blank" rel="noopener noreferrer"
                            className="hidden md:flex p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-100"
                            aria-label="GitHub">
                            <Github className="w-4 h-4" />
                        </a>
                        <a href="https://linkedin.com/in/sabrin-lal-singh-478218a0" target="_blank" rel="noopener noreferrer"
                            className="hidden md:flex p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-100"
                            aria-label="LinkedIn">
                            <Linkedin className="w-4 h-4" />
                        </a>

                        <ThemeToggle />

                        <button
                            className="md:hidden p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors duration-100"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                        </button>
                    </div>
                </div>

                {/* Mobile menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.15 }}
                            className="md:hidden border-t border-border overflow-hidden bg-background"
                        >
                            <div className="px-4 py-3 flex flex-col gap-1">
                                {navItems.map(item => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {item.label}
                                    </a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ── HERO ─────────────────────────────────────────── */}
            <section 
                onMouseMove={handleMouseMove}
                className="pt-20 pb-16 md:pt-28 md:pb-24 overflow-hidden relative"
            >
                <div className="container mx-auto px-4 sm:px-6 max-w-5xl relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">
                        {/* HERO CONTENT */}
                        <div className="lg:col-span-12 flex flex-col justify-center max-w-4xl">
                            <motion.h1 
                                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                                className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[4rem] font-extrabold text-foreground tracking-tight leading-[1.05] mb-4"
                            >
                                <span className="text-gradient animate-gradient-x">SABRIN</span> LAL SINGH
                            </motion.h1>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                                className="text-xl sm:text-2xl font-medium text-foreground/80 mb-6 flex flex-wrap gap-3 items-center"
                            >
                                <span className="glass-panel px-4 py-1.5 rounded-full text-sm sm:text-base text-primary shadow-sm hover-glow transition-all">Data Engineer</span>
                                <span className="text-muted-foreground hidden sm:inline">·</span>
                                <span className="glass-panel px-4 py-1.5 rounded-full text-sm sm:text-base text-accent shadow-sm hover-glow transition-all">Data Platforms</span>
                                <span className="text-muted-foreground hidden sm:inline">·</span>
                                <span className="glass-panel px-4 py-1.5 rounded-full text-sm sm:text-base text-emerald-500 shadow-sm hover-glow transition-all">AI Systems</span>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                                className="max-w-2xl space-y-4 mb-10"
                            >
                                <p className="text-base sm:text-lg text-foreground/80 leading-relaxed">
                                    I design and maintain automated validation frameworks that keep large-scale data systems honest.
                                </p>
                                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                                    Day-to-day: writing SQL test suites against PostgreSQL and Redshift, building observability layers
                                    in Snowflake and Databricks, and automating end-to-end pipeline checks.
                                </p>
                            </motion.div>

                            {/* Metadata Grid */}
                            <motion.div 
                                style={{ x: metaX }}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9, duration: 0.8, ease: "easeOut" }}
                                className="grid grid-cols-2 md:grid-cols-3 gap-6 py-6 border-y border-border mb-10"
                            >
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Base</p>
                                    <p className="text-sm font-medium text-foreground">Kathmandu, Nepal</p>
                                </div>
                                <div>
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Focus</p>
                                    <p className="text-sm font-medium text-foreground">Data Engineering / QA</p>
                                </div>
                                <div className="col-span-2 md:col-span-1">
                                    <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1.5">Stack</p>
                                    <p className="text-sm font-medium text-foreground">SQL · PySpark · Databricks</p>
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1.0, duration: 0.8, ease: "easeOut" }}
                                className="flex flex-wrap gap-4"
                            >
                                <motion.a 
                                    href="#projects" 
                                    className="btn-primary"
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }} 
                                >
                                    View Work
                                    <ArrowDown className="w-4 h-4" />
                                </motion.a>
                                <motion.a 
                                    href="/Sabrin_Singh_Resume.pdf" 
                                    download 
                                    className="btn-outline"
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }} 
                                >
                                    Resume
                                </motion.a>
                                <motion.a 
                                    href="#contact" 
                                    className="btn-outline border-transparent hover:border-border"
                                    whileHover={{ scale: 1.02 }} 
                                    whileTap={{ scale: 0.98 }} 
                                >
                                    Contact
                                </motion.a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── ABOUT / KPI ──────────────────────────────────── */}
            <section id="about" className="py-16 md:py-24 bg-background border-t border-border">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="mb-10">
                        <p className="section-label mb-2">About</p>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">What I do</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                        {[
                            { value: 35, suffix: "%", label: "Query Latency Cut", desc: "SQL execution plan tuning on Redshift WLM queues." },
                            { value: 40, suffix: "%", label: "Pipeline Throughput", desc: "Migrating legacy ETL to Databricks Lakehouse architecture." },
                            { value: 100, suffix: "%", label: "HIPAA Integrity", desc: "Zero compliance violations across 6 years of healthcare data work." },
                        ].map(kpi => (
                            <div key={kpi.label} className="kpi-block">
                                <p className="font-display font-bold text-3xl text-primary mb-1">
                                    <AnimatedMetric value={kpi.value} suffix={kpi.suffix} />
                                </p>
                                <p className="font-display font-semibold text-sm text-foreground mb-1.5">{kpi.label}</p>
                                <p className="font-mono text-xs text-muted-foreground leading-relaxed">{kpi.desc}</p>
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
                        <div className="space-y-4">
                            <p className="text-sm sm:text-base border-l-2 border-primary pl-4 text-foreground/80">
                                {personalInfo.summary}
                            </p>
                            <p className="text-sm sm:text-base">
                                I specialize in <span className="text-foreground font-medium">mission-critical healthcare data infrastructure</span> —
                                engineering systems that balance extreme throughput with strict HIPAA security boundaries.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <p className="text-sm sm:text-base">
                                Beyond traditional infrastructure, I lead efforts in{" "}
                                <span className="text-foreground font-medium">LLM QA and AI observability</span> —
                                building evaluation harnesses and validation layers that make model outputs production-safe.
                            </p>
                            <ul className="space-y-2 font-mono text-xs pt-4 border-t border-border">
                                {["Automated data quality frameworks", "Medallion lakehouse patterns", "SQL schema validation & observability"].map(item => (
                                    <li key={item} className="flex items-center gap-2 text-muted-foreground">
                                        <span className="text-primary">→</span>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* ── EXPERIENCE ───────────────────────────────────── */}
            <div className="border-t border-border">
                <ExperienceSection />
            </div>

            {/* ── HOW I THINK ──────────────────────────────────── */}
            <HowIThink />

            {/* ── PROJECTS ─────────────────────────────────────── */}
            <section id="projects" className="py-16 md:py-24 bg-background border-t border-border">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="mb-10">
                        <p className="section-label mb-2">Portfolio</p>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">Selected Work</h2>
                        <p className="text-sm text-muted-foreground mt-2">
                            Each card has three views — toggle between Overview, Tech Architecture, and Impact.
                        </p>
                    </div>

                    {/* Filter tabs */}
                    <div className="flex flex-wrap gap-2 mb-10 bg-secondary/30 p-1 rounded-lg border border-border inline-flex relative">
                        {[
                            { id: "all", label: "All" },
                            { id: "databricks", label: "Databricks" },
                            { id: "aws", label: "AWS" },
                            { id: "ai", label: "AI / LLM" },
                        ].map(tab => {
                            const isActive = activeFilter === tab.id;
                            return (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveFilter(tab.id)}
                                    className={`relative font-mono text-xs px-4 py-1.5 rounded-md transition-colors duration-100 z-10 ${
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {isActive && (
                                        <motion.div
                                            layoutId="filter-pill"
                                            className="absolute inset-0 bg-background border border-border rounded-md shadow-sm -z-10"
                                            transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                        />
                                    )}
                                    {tab.label}
                                </button>
                            );
                        })}
                    </div>

                    {/* Tabbed project cards */}
                    <AnimatePresence mode="popLayout">
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {filteredProjects.map((project, idx) => (
                                <motion.div
                                    key={project.id}
                                    layout
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.15 }}
                                >
                                    <ProjectCard
                                        project={project}
                                        wide={idx === 0 && filteredProjects.length > 2}
                                        onClick={() => setExpandedProject(project)}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    </AnimatePresence>

                    {/* Expandable Project Modal */}
                    <AnimatePresence>
                        {expandedProject && (
                            <>
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]"
                                    onClick={() => setExpandedProject(null)}
                                />
                                <div className="fixed inset-0 z-[101] flex items-center justify-center p-4 pointer-events-none">
                                    <motion.div
                                        layoutId={`project-card-${expandedProject.id}`}
                                        className="bg-card w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-xl border border-border shadow-2xl pointer-events-auto"
                                    >
                                        <div className="p-6 md:p-8">
                                            <div className="flex justify-between items-start mb-6">
                                                <div>
                                                    <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                                                        {expandedProject.title}
                                                    </h2>
                                                    <span className="font-mono text-xs text-muted-foreground border border-border px-2 py-1 rounded uppercase tracking-wider">
                                                        {expandedProject.category}
                                                    </span>
                                                </div>
                                                <button
                                                    onClick={() => setExpandedProject(null)}
                                                    className="p-2 bg-secondary rounded-md text-muted-foreground hover:text-foreground transition-colors duration-100"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                            <div className="space-y-8">
                                                <div>
                                                    <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">Overview</h3>
                                                    <p className="text-foreground/80 leading-relaxed mb-4">{expandedProject.overview.purpose}</p>
                                                    <div className="space-y-2">
                                                        <p className="text-sm"><strong className="text-foreground font-medium">Role:</strong> <span className="text-foreground/80">{expandedProject.overview.role}</span></p>
                                                        <p className="text-sm"><strong className="text-foreground font-medium">Challenge:</strong> <span className="text-foreground/80">{expandedProject.overview.challenge}</span></p>
                                                        <p className="text-sm"><strong className="text-foreground font-medium">Solution:</strong> <span className="text-foreground/80">{expandedProject.overview.solution}</span></p>
                                                    </div>
                                                </div>
                                                
                                                <div className="grid md:grid-cols-2 gap-8">
                                                    <div>
                                                        <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">Architecture</h3>
                                                        <ul className="space-y-2">
                                                            {expandedProject.arch.filter(line => !line.startsWith(" ")).map((item, i) => (
                                                                <li key={i} className="flex gap-2 text-sm text-foreground/80">
                                                                    <span className="text-primary mt-1 shrink-0"><Check className="w-3.5 h-3.5" /></span>
                                                                    <span>{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">Impact</h3>
                                                        <ul className="space-y-3">
                                                            {expandedProject.impact.map((item, i) => (
                                                                <li key={i} className="flex gap-3 text-sm leading-relaxed">
                                                                    <span className="text-primary mt-0.5 shrink-0 font-mono text-xs">→</span>
                                                                    <span className="text-foreground/80">{item}</span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>

                                                <div className="pt-6 border-t border-border">
                                                    <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-3">Tech Stack</h3>
                                                    <div className="flex flex-wrap gap-2">
                                                        {expandedProject.stack.map(s => (
                                                            <span key={s} className="skill-pill bg-secondary/50">{s}</span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </>
                        )}
                    </AnimatePresence>

                    {/* GitHub CTA */}
                    <div className="mt-8 pt-8 border-t border-border flex items-center justify-between flex-wrap gap-4">
                        <p className="text-sm text-muted-foreground">More projects available on GitHub</p>
                        <a
                            href="https://github.com/sabrinsingh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn-outline"
                        >
                            <Github className="w-4 h-4" />
                            View GitHub
                            <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                        </a>
                    </div>
                </div>
            </section>

            {/* ── DATA PIPELINE VISUAL ─────────────────────────── */}
            <DataPipelineVisual />

            {/* ── DATA PIPELINE SANDBOX ────────────────────────── */}
            <DataPipelineSandbox />

            {/* ── SKILLS ───────────────────────────────────────── */}
            <div className="border-t border-border">
                <SkillsSection />
            </div>

            {/* ── CERTIFICATIONS ───────────────────────────────── */}
            <section id="certifications" className="py-16 md:py-24 bg-background border-t border-border">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="mb-10">
                        <p className="section-label mb-2">Continuous Learning</p>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">Certifications</h2>
                    </div>
                    <div className="columns-1 sm:columns-2 gap-x-8">
                        {certifications.map((cert, idx) => (
                            <div key={idx} className="cert-row break-inside-avoid">
                                <div className="shrink-0 mt-0.5 text-primary">
                                    <cert.icon className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-foreground leading-snug">{cert.name}</p>
                                    <p className="font-mono text-xs text-muted-foreground mt-0.5 uppercase tracking-wider">
                                        {cert.issuer} · {cert.year}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── RECOMMENDATIONS ──────────────────────────────── */}
            <section className="py-16 md:py-24 bg-background border-t border-border">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="mb-10">
                        <p className="section-label mb-2">Peers</p>
                        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground tracking-tight">Recommendations</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {recommendations.map(rec => (
                            <div key={rec.id} className="kpi-block flex flex-col gap-4">
                                <p className="text-sm text-muted-foreground leading-relaxed italic">"{rec.text}"</p>
                                <div className="border-t border-border pt-4">
                                    <p className="font-display font-semibold text-sm text-foreground">{rec.author}</p>
                                    <p className="font-mono text-xs text-muted-foreground">{rec.role} · {rec.company}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── CONTACT ──────────────────────────────────────── */}
            <section id="contact" className="py-24 md:py-32 bg-background border-t border-border">
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl text-center">
                    <h2 className="text-4xl md:text-5xl lg:text-7xl font-display font-bold text-foreground tracking-tight leading-tight mb-8">
                        HAVE A DATA PROBLEM<br />WORTH SOLVING?
                    </h2>
                    
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-mono text-muted-foreground uppercase tracking-widest mb-12">
                        <span>Data Engineering</span>
                        <span className="text-primary">•</span>
                        <span>Data Quality</span>
                        <span className="text-primary">•</span>
                        <span>Automation</span>
                        <span className="text-primary">•</span>
                        <span>AI Systems</span>
                    </div>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a 
                            href={`mailto:${contactEmail}?subject=Portfolio Inquiry — Sabrin Singh`}
                            className="w-full sm:w-auto btn-primary py-4 px-8 text-base justify-center"
                        >
                            Email Sabrin
                        </a>
                        <button 
                            onClick={copyEmail}
                            className="w-full sm:w-auto btn-outline py-4 px-8 text-base justify-center relative copy-tooltip"
                            aria-label="Copy email address"
                        >
                            <span className="tooltip-text">{copiedEmail ? "Copied!" : "Copy Email"}</span>
                            {copiedEmail ? <Check className="w-5 h-5 text-emerald-500 shrink-0" /> : <Copy className="w-5 h-5 shrink-0" />}
                            {contactEmail}
                        </button>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-8 mt-16 pt-16 border-t border-border">
                        <a href="https://linkedin.com/in/sabrin-lal-singh-478218a0" target="_blank" rel="noopener noreferrer" className="text-sm font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground font-medium transition-colors">LinkedIn</a>
                        <a href="https://github.com/sabrinsingh" target="_blank" rel="noopener noreferrer" className="text-sm font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground font-medium transition-colors">GitHub</a>
                        <a href="/Sabrin_Singh_Resume.pdf" download className="text-sm font-mono tracking-wider uppercase text-muted-foreground hover:text-foreground font-medium transition-colors">Resume</a>
                    </div>
                </div>
            </section>

            {/* ── CURRENTLY ────────────────────────────────────── */}
            <Currently />

            <Footer />

            {/* Back to top */}
            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-6 right-6 p-2.5 rounded-md border border-border bg-background text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-colors duration-100 shadow-sm z-50"
                        aria-label="Back to top"
                    >
                        <ArrowUp className="w-4 h-4" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
