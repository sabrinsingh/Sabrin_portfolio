import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import { Github, Linkedin, Menu, Moon, Sun, X, ArrowUp } from "lucide-react";
import { Helmet } from "react-helmet-async";

import { useTheme } from "@/components/theme-provider";
import { BackgroundEffects } from "@/components/background-effects";
import { Footer } from "@/components/footer";
import { RecruiterModal } from "@/components/recruiter-modal";
import { Currently } from "@/components/currently";

import { Hero } from "@/sections/Hero";
import { About } from "@/sections/About";
import { Approach } from "@/sections/Approach";
import { Experience } from "@/sections/Experience";
import { Projects } from "@/sections/Projects";
import { Expertise } from "@/sections/Expertise";
import { Credentials } from "@/sections/Credentials";
import { Endorsements } from "@/sections/Endorsements";
import { Contact } from "@/sections/Contact";
import { DataPipelineVisual } from "@/components/data-pipeline-visual";

const navItems = [
    { label: "About", href: "#about" },
    { label: "Approach", href: "#approach" },
    { label: "Experience", href: "#experience" },
    { label: "Work", href: "#projects" },
    { label: "Architecture", href: "#pipeline-visual" },
    { label: "Expertise", href: "#skills" },
    { label: "Contact", href: "#contact" },
];

const trackedSections = [
    "about",
    "approach",
    "experience",
    "pipeline-visual",
    "projects",
    "skills",
    "certifications",
    "contact",
];

function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const isDark = theme !== "light";
    return (
        <button
            type="button"
            id="theme-toggle-btn"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            className="rounded p-2 text-muted-foreground transition-colors hover:text-foreground focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>
    );
}

/** Designed monogram — a hairline plate with the initials set tight. */
function Monogram() {
    return (
        <span
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[3px] border font-display text-[13px] font-semibold tracking-[0.02em] transition-colors"
            style={{ borderColor: "hsl(var(--hairline))" }}
            aria-hidden="true"
        >
            SLS
        </span>
    );
}

export default function Home() {
    const [activeSection, setActiveSection] = useState("");
    const [showBackToTop, setShowBackToTop] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { scrollYProgress } = useScroll();

    useEffect(() => {
        const handleScroll = () => {
            setShowBackToTop(window.scrollY > 500);
            for (const id of trackedSections) {
                const el = document.getElementById(id);
                if (el) {
                    const { top, bottom } = el.getBoundingClientRect();
                    if (top <= 140 && bottom > 140) {
                        setActiveSection(id);
                        return;
                    }
                }
            }
            setActiveSection("");
        };
        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Close the drawer if the viewport grows past the mobile breakpoint.
    useEffect(() => {
        const mq = window.matchMedia("(min-width: 1024px)");
        const onChange = (e: MediaQueryListEvent) => {
            if (e.matches) setMobileMenuOpen(false);
        };
        mq.addEventListener("change", onChange);
        return () => mq.removeEventListener("change", onChange);
    }, []);

    useEffect(() => {
        document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    return (
        <div className="relative min-h-screen bg-transparent text-foreground selection:bg-primary/20 selection:text-foreground">
            <Helmet>
                <title>Sabrin Lal Singh — Data &amp; Quality Engineer</title>
                <meta
                    name="description"
                    content="Sabrin Lal Singh — data and quality engineer building automated validation pipelines, lakehouse architecture and reconciliation systems for healthcare and enterprise platforms."
                />
                <link rel="canonical" href="https://sabrinsingh.com.np/" />
            </Helmet>

            <BackgroundEffects />

            {/* ── Header ─────────────────────────────────────────────── */}
            <header
                className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md"
                style={{ borderColor: "hsl(var(--hairline))" }}
                aria-label="Primary navigation"
            >
                <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
                    <a
                        href="#hero"
                        className="group flex items-center gap-3 rounded focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                    >
                        <Monogram />
                        <span className="hidden whitespace-nowrap leading-tight sm:block">
                            <span className="block text-[13px] font-medium text-foreground transition-colors group-hover:text-primary">
                                Sabrin Lal Singh
                            </span>
                            <span className="block font-mono text-[10px] uppercase leading-tight tracking-[0.12em] text-muted-foreground">
                                Data &amp; Quality Engineer
                            </span>
                        </span>
                    </a>

                    <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Sections">
                        {navItems.map((item) => {
                            const isActive = activeSection === item.href.slice(1);
                            return (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    aria-current={isActive ? "location" : undefined}
                                    className={`relative rounded px-3 py-1.5 font-mono text-[11px] tracking-wide transition-colors ${
                                        isActive
                                            ? "text-foreground"
                                            : "text-muted-foreground hover:text-foreground"
                                    }`}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.span
                                            layoutId="nav-indicator"
                                            className="absolute inset-x-2 -bottom-0.5 h-px bg-primary"
                                            transition={{ type: "spring", stiffness: 420, damping: 34 }}
                                        />
                                    )}
                                </a>
                            );
                        })}
                    </nav>

                    <div className="flex items-center gap-1.5">
                        <div
                            className="mr-1 hidden items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.1em] text-muted-foreground xl:flex"
                            style={{ borderColor: "hsl(var(--hairline))" }}
                        >
                            <span className="status-dot-pulse" aria-hidden="true" />
                            Open to work
                        </div>
                        <RecruiterModal />
                        <a
                            href="https://github.com/sabrinsingh"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden rounded p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
                            aria-label="GitHub profile"
                        >
                            <Github className="h-4 w-4" />
                        </a>
                        <a
                            href="https://linkedin.com/in/sabrin-lal-singh-478218a0"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden rounded p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground sm:flex"
                            aria-label="LinkedIn profile"
                        >
                            <Linkedin className="h-4 w-4" />
                        </a>
                        <ThemeToggle />
                        <button
                            type="button"
                            className="rounded p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground lg:hidden"
                            onClick={() => setMobileMenuOpen((open) => !open)}
                            aria-expanded={mobileMenuOpen}
                            aria-controls="mobile-menu"
                            aria-label="Toggle navigation menu"
                        >
                            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                        </button>
                    </div>
                </div>

                {/* Reading progress */}
                <motion.div
                    className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-primary"
                    style={{ scaleX: scrollYProgress }}
                    aria-hidden="true"
                />

                {/* Mobile drawer */}
                <AnimatePresence initial={false}>
                    {mobileMenuOpen && (
                        <motion.nav
                            id="mobile-menu"
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden border-t bg-card lg:hidden"
                            style={{ borderColor: "hsl(var(--hairline))" }}
                            aria-label="Mobile navigation"
                        >
                            <div className="px-6 py-4">
                                {navItems.map((item, i) => (
                                    <a
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileMenuOpen(false)}
                                        className="flex items-baseline gap-3 border-b py-3 text-sm text-foreground/85 transition-colors last:border-b-0 hover:text-primary"
                                        style={{ borderColor: "hsl(var(--hairline))" }}
                                    >
                                        <span className="font-mono text-[10px] text-muted-foreground">
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        {item.label}
                                    </a>
                                ))}

                                <div className="flex items-center justify-between pt-4 font-mono text-[11px] text-muted-foreground">
                                    <span className="flex items-center gap-1.5">
                                        <span className="status-dot" aria-hidden="true" />
                                        Kathmandu, Nepal
                                    </span>
                                    <a href="/Sabrin_Singh_Resume.pdf" download className="text-primary hover:underline">
                                        Download résumé
                                    </a>
                                </div>
                            </div>
                        </motion.nav>
                    )}
                </AnimatePresence>
            </header>

            <main id="main">
                <Hero />
                <Currently />
                <About />
                <Approach />
                <Experience />
                <Projects />
                <DataPipelineVisual />
                <Expertise />
                <Credentials />
                <Endorsements />
                <Contact />
            </main>

            <Footer />

            <AnimatePresence>
                {showBackToTop && (
                    <motion.button
                        type="button"
                        initial={{ opacity: 0, scale: 0.85 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.85 }}
                        transition={{ duration: 0.18 }}
                        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                        className="fixed bottom-6 right-6 z-50 rounded-full border bg-card p-2.5 text-muted-foreground shadow-lg transition-colors hover:border-primary hover:text-foreground"
                        style={{ borderColor: "hsl(var(--hairline))" }}
                        aria-label="Back to top"
                    >
                        <ArrowUp className="h-4 w-4" />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
