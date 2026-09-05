import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Github, ArrowUp, ExternalLink, Zap } from "lucide-react";
import { MobileNav } from "@/components/mobile-nav";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "@/components/mode-toggle";
import { ScrollProgress } from "@/components/scroll-progress";
import { TiltCard } from "@/components/tilt-card";
import { Helmet } from "react-helmet-async";
import { projects, certifications, personalInfo } from "@/data/portfolio";

import { RecommendationsSection } from "@/components/recommendations-section";
import { Footer } from "@/components/footer";
import { TerminalHero } from "@/components/terminal-hero";
import { SkillsSection } from "@/components/skills-section";
import { MedallionPipeline } from "@/components/medallion-pipeline";
import { ExperienceSection } from "@/components/experience-section";
import TechnicalBlueprint from "@/components/architecture-blueprint";
import { SiUpwork } from "react-icons/si";
import { SystemPulse } from "@/components/system-pulse";
import { PerformanceBattle } from "@/components/performance-battle";

export default function Home() {
    const [activeTab, setActiveTab] = useState("all");
    const [activeSection, setActiveSection] = useState("");
    const cursorRef = useRef<HTMLDivElement>(null);

    const filteredProjects =
        activeTab === "all"
            ? projects
            : projects.filter((p) => p.category === activeTab);

    const fadeInUp = {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5 }
    };

    const [showBackToTop, setShowBackToTop] = useState(false);

    // Cursor glow effect (desktop only)
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (cursorRef.current) {
                cursorRef.current.style.left = `${e.clientX}px`;
                cursorRef.current.style.top = `${e.clientY}px`;
            }
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Scroll spy for active section highlighting
    useEffect(() => {
        const sections = ["about", "experience", "projects", "performance", "certifications", "contact"];
        const handleScroll = () => {
            if (window.scrollY > 400) {
                setShowBackToTop(true);
            } else {
                setShowBackToTop(false);
            }

            // Find current section
            for (const section of sections) {
                const el = document.getElementById(section);
                if (el) {
                    const rect = el.getBoundingClientRect();
                    if (rect.top <= 150 && rect.bottom > 150) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const navItems = ["About", "Experience", "Projects", "Performance", "Certifications", "Contact"];

    return (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20 selection:text-primary animate-page-in">
            <Helmet>
                <title>{personalInfo.name} | {personalInfo.title}</title>
                <meta name="description" content={personalInfo.summary} />
                <meta name="keywords" content="Data Engineer, ETL, AWS, Databricks, Python, SQL, Big Data" />
            </Helmet>

            {/* Cursor Glow — Hidden on mobile */}
            <div ref={cursorRef} className="cursor-glow hidden lg:block" />

            {/* Scroll Progress Bar */}
            <ScrollProgress />

            {/* Navigation — Glassmorphic with Active Section */}
            <nav className="sticky top-0 z-50 glass border-b border-border/30 transition-all duration-300">
                <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-2xl font-bold tracking-tighter text-foreground"
                    >
                        Sabrin<span className="gradient-text">Singh</span>
                    </motion.div>
                    <div className="flex items-center gap-8">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="hidden md:flex items-center gap-1"
                        >
                            {navItems.map((item) => (
                                <a
                                    key={item}
                                    href={`#${item.toLowerCase()}`}
                                    className={`text-sm font-medium px-3 py-2 rounded-lg transition-all duration-300 relative group
                                        ${activeSection === item.toLowerCase()
                                            ? "text-primary bg-primary/10"
                                            : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                                        }`}
                                >
                                    {item}
                                    {activeSection === item.toLowerCase() && (
                                        <motion.div
                                            layoutId="activeNavIndicator"
                                            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                        />
                                    )}
                                </a>
                            ))}
                        </motion.div>
                        <MobileNav />
                        <ModeToggle />
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32 min-h-[90vh] flex items-center justify-center">
                <div className="absolute inset-0 bg-mesh-gradient pointer-events-none" />
                <div className="absolute inset-0 bg-dot-pattern pointer-events-none opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />
                <div className="container mx-auto px-6 relative z-10">
                    <TerminalHero />
                </div>
            </section>

            {/* System Pulse Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="relative z-20 -mt-8 sm:-mt-12 md:-mt-20 mb-8 sm:mb-12 px-2 sm:px-0"
            >
                <SystemPulse />
            </motion.div>

            {/* About Section */}
            <motion.section
                id="about"
                className="py-16 md:py-24 bg-background relative"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
            >
                <div className="absolute inset-0 section-divider top-0" />
                <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                    <div className="space-y-10">
                        <div className="space-y-4 text-center">
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                className="text-primary font-mono text-sm tracking-widest uppercase"
                            >
                                01. Professional Profile
                            </motion.p>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                                Data Strategy <span className="gradient-text">&amp; Engineering</span>
                            </h2>
                        </div>

                        {/* KPI cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                            {[
                                { value: "35%", label: "Query Speedup", desc: "Optimized via MPP and SQL tuning." },
                                { value: "40%", label: "Throughput Gain", desc: "Migrated ETL to Databricks Lakehouse." },
                                { value: "100%", label: "HIPAA Integrity", desc: "Zero compliance violations maintained." },
                            ].map((kpi, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="p-5 rounded-2xl glass-card card-hover-glow group"
                                >
                                    <div className="text-2xl sm:text-3xl font-bold gradient-text font-mono mb-1">{kpi.value}</div>
                                    <div className="text-sm font-semibold text-foreground mb-1.5">{kpi.label}</div>
                                    <div className="text-xs text-muted-foreground leading-relaxed">{kpi.desc}</div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 text-muted-foreground leading-relaxed">
                            <div className="space-y-5">
                                <p className="text-sm sm:text-base border-l-4 border-primary pl-4 text-foreground/80 italic">
                                    {personalInfo.summary}
                                </p>
                                <p className="text-sm sm:text-base">
                                    Specializing in <span className="text-primary font-bold">mission-critical healthcare infrastructure</span>, I engineer systems that balance extreme reliability with rigorous HIPAA security standards.
                                </p>
                            </div>
                            <div className="space-y-5">
                                <p className="text-sm sm:text-base">
                                    Beyond traditional infrastructure, I lead efforts in <span className="text-foreground font-semibold">Strategic Data Governance</span> and AI orchestration — building validation layers that make LLMs production-ready.
                                </p>
                                <ul className="space-y-2 font-mono text-xs pt-4 border-t border-border/50">
                                    <li className="flex items-center gap-2"><span className="text-primary">▸</span> Data Quality Frameworks</li>
                                    <li className="flex items-center gap-2"><span className="text-primary">▸</span> Modern Lakehouse Patterns</li>
                                    <li className="flex items-center gap-2"><span className="text-primary">▸</span> Scalable Ingestion Logic</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.section>

            {/* Skills Section */}
            <SkillsSection />

            {/* Technical Architecture Section */}
            <TechnicalBlueprint />

            {/* Medallion Architecture Pipeline */}
            <MedallionPipeline />

            {/* Performance Logic Battle */}
            <PerformanceBattle />

            {/* Experience Section */}
            <ExperienceSection />

            {/* Projects Section */}
            <section id="projects" className="py-16 md:py-24 lg:py-32 bg-background relative">
                <div className="absolute inset-0 bg-dot-pattern opacity-30 -z-10" />
                <div className="container mx-auto px-4 sm:px-6">
                    <div className="space-y-16">
                        <motion.div
                            className="space-y-4 text-center"
                            {...fadeInUp}
                        >
                            <p className="text-primary font-semibold text-sm tracking-wider uppercase font-mono">
                                Portfolio
                            </p>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Featured <span className="gradient-text">Projects</span></h2>
                        </motion.div>
                        <div className="space-y-10">
                            {/* Filter Tabs */}
                            <motion.div
                                className="flex flex-wrap gap-2 justify-center"
                                initial={{ opacity: 0, y: 10 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                {[
                                    { id: "all", label: "All Projects" },
                                    { id: "databricks", label: "Databricks" },
                                    { id: "aws", label: "AWS" },
                                    { id: "quality", label: "Data Quality" },
                                    { id: "analytics", label: "Analytics" },
                                    { id: "automation", label: "Automation" },
                                    { id: "ai", label: "AI/LLM" },
                                ].map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`px-5 py-2.5 rounded-xl text-xs font-mono font-bold transition-all duration-300 relative overflow-hidden ${activeTab === tab.id
                                            ? "btn-gradient text-white shadow-lg"
                                            : "bg-card border border-border text-muted-foreground hover:bg-secondary/80 hover:text-foreground hover:border-primary/30"
                                            }`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </motion.div>

                            {/* Projects Grid */}
                            <motion.div
                                layout
                                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredProjects.map((project) => (
                                        <TiltCard key={project.id}>
                                            <motion.div
                                                layout
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                transition={{ duration: 0.3 }}
                                                className="rounded-2xl glass-card holo-shimmer p-6 flex flex-col card-hover-glow group h-full"
                                            >
                                                <div className="flex-1 space-y-4">
                                                    <div className="space-y-3">
                                                        <div className="flex items-start justify-between">
                                                            <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors line-clamp-2">
                                                                {project.title}
                                                            </h3>
                                                            <div className="text-xs font-semibold px-2.5 py-1 bg-primary/10 text-primary rounded-lg whitespace-nowrap font-mono border border-primary/20">
                                                                {project.category.toUpperCase()}
                                                            </div>
                                                        </div>
                                                        <div className="flex flex-col gap-1">
                                                            <p className="text-sm font-medium text-primary flex items-center gap-1.5 leading-none">
                                                                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                                                {project.impact}
                                                            </p>
                                                            {project.metrics && (
                                                                <p className="text-xs font-mono text-muted-foreground flex items-center gap-1.5 opacity-70">
                                                                    <Zap className="w-3 h-3 text-accent" />
                                                                    {project.metrics}
                                                                </p>
                                                            )}
                                                        </div>
                                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                                            {project.description}
                                                        </p>

                                                        <div className="flex flex-wrap gap-2 pt-2">
                                                            {project.technologies.map((tech, tidx) => (
                                                                <span
                                                                    key={tidx}
                                                                    className="text-[10px] font-mono font-bold bg-secondary/60 text-secondary-foreground border border-border/50 px-2.5 py-1 rounded-md"
                                                                >
                                                                    {tech}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        </TiltCard>
                                    ))}
                                </AnimatePresence>
                            </motion.div>

                            {/* GitHub CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                className="flex justify-center pt-8"
                            >
                                <a
                                    href="https://github.com/sabrinsingh"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <Button variant="outline" size="lg" className="rounded-full px-8 h-12 text-base border-primary/20 hover:bg-primary/5 group">
                                        <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                                        View More on GitHub
                                        <ExternalLink className="w-4 h-4 ml-2 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </Button>
                                </a>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Certifications Section */}
            <section id="certifications" className="py-16 md:py-24 lg:py-32 bg-background">
                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        className="space-y-4 text-center mb-16"
                        {...fadeInUp}
                    >
                        <p className="text-primary font-semibold text-sm tracking-wider uppercase font-mono">
                            Continuous Learning
                        </p>
                        <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Professional <span className="gradient-text">Certifications</span></h2>
                    </motion.div>

                    <div className="columns-1 md:columns-2 gap-4 space-y-4 max-w-5xl mx-auto">
                        {certifications.map((cert, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.05 }}
                                className="break-inside-avoid p-5 rounded-2xl glass-card holo-shimmer flex items-start gap-4 card-hover-glow group"
                            >
                                <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 text-primary shrink-0 group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                    <cert.icon className="w-6 h-6" />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="font-bold text-foreground text-sm sm:text-base leading-tight">{cert.name}</h3>
                                    <p className="text-xs text-muted-foreground mt-1.5 font-mono uppercase tracking-wider">{cert.issuer} · {cert.year}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Recommendations Section */}
            <RecommendationsSection />

            {/* Contact Section */}
            <section id="contact" className="py-16 md:py-24 lg:py-32 relative overflow-hidden">
                <div className="absolute inset-0 -z-10 bg-mesh-gradient" />
                <div className="absolute inset-0 -z-10 bg-dot-pattern opacity-20" />

                {/* Floating decorative shapes */}
                <motion.div
                    animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 left-10 w-20 h-20 rounded-full border border-primary/10 hidden lg:block"
                />
                <motion.div
                    animate={{ y: [10, -15, 10], rotate: [0, -5, 0] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-20 right-16 w-32 h-32 rounded-2xl border border-accent/10 hidden lg:block"
                />
                <motion.div
                    animate={{ y: [-5, 15, -5] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-40 right-1/4 w-4 h-4 rounded-full bg-primary/10 hidden lg:block"
                />

                <div className="container mx-auto px-4 sm:px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="max-w-4xl mx-auto text-center space-y-12"
                    >
                        <div className="space-y-5">
                            {/* Availability badge */}
                            <div className="flex justify-center">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    Currently open to Remote &amp; Contract opportunities
                                </div>
                            </div>
                            <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight">
                                Ready to start your <span className="gradient-text">next project?</span>
                            </h2>
                            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
                                I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-3 sm:gap-4 justify-center pt-8">
                            <a href="mailto:sabrinlalsingh@gmail.com">
                                <button className="btn-gradient h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full inline-flex items-center font-bold">
                                    <Mail className="w-5 h-5 mr-2" />
                                    Say Hello
                                </button>
                            </a>
                            <a href="https://www.upwork.com/freelancers/~019c63b7c8441f7142" target="_blank" rel="noopener noreferrer">
                                <Button variant="outline" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full border-border hover:bg-secondary hover:text-primary transition-all duration-300">
                                    <SiUpwork className="w-5 h-5 mr-2 text-[#14a800]" />
                                    Upwork
                                </Button>
                            </a>
                            <a
                                href="https://linkedin.com/in/sabrin-lal-singh-478218a0"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full border-border hover:bg-secondary hover:text-primary transition-all duration-300">
                                    <Linkedin className="w-5 h-5 mr-2" />
                                    LinkedIn
                                </Button>
                            </a>
                            <a
                                href="https://github.com/sabrinsingh"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <Button variant="outline" size="lg" className="h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg rounded-full border-border hover:bg-secondary hover:text-primary transition-all duration-300">
                                    <Github className="w-5 h-5 mr-2" />
                                    GitHub
                                </Button>
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer />

            {/* Back to Top Button */}
            <motion.button
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: showBackToTop ? 1 : 0, scale: showBackToTop ? 1 : 0 }}
                onClick={scrollToTop}
                className="fixed bottom-6 right-4 sm:bottom-8 sm:right-8 p-3 rounded-full btn-gradient shadow-lg hover:-translate-y-1 transition-all z-50"
            >
                <ArrowUp className="w-6 h-6" />
            </motion.button>

        </div>
    );
}
