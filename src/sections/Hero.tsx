import { motion } from "framer-motion";
import { ArrowRight, ArrowDown, FileText, Copy, Check } from "lucide-react";

import { HeroFlow } from "@/components/hero-flow";
import { staggerContainer, staggerItem } from "@/lib/motion-variants";
import { useCopyEmail } from "@/lib/use-copy-email";

/** Compact, credible stack highlights — not a logo wall. */
const HIGHLIGHTS = [
    "Databricks",
    "PySpark",
    "Delta Lake",
    "Snowflake",
    "AWS Redshift",
    "SQL",
    "Python",
];

const LEDGER = [
    { value: "9+", label: "Years in production", tone: "text-foreground" },
    { value: "50M+", label: "Records per day", tone: "text-primary" },
    { value: "0", label: "Silent failures shipped", tone: "text-accent" },
];

export function Hero() {
    const { copied, copy, email } = useCopyEmail();

    return (
        <section
            id="hero"
            className="relative overflow-hidden pt-14 pb-16 md:pt-24 md:pb-24 lg:min-h-[88vh] lg:flex lg:items-center"
        >
            <HeroFlow />

            <div className="relative mx-auto w-full max-w-6xl px-5 sm:px-8">
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
                >
                    {/* ── Left: intent ────────────────────────────────── */}
                    <div className="lg:col-span-7 xl:col-span-7">
                        <motion.div
                            variants={staggerItem}
                            className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] font-mono uppercase tracking-eyebrow text-muted-foreground"
                        >
                            <span className="status-dot" aria-hidden="true" />
                            <span>Data &amp; Quality Engineer</span>
                            <span aria-hidden="true">/</span>
                            <span>Kathmandu · UTC+5:45</span>
                        </motion.div>

                        <motion.h1
                            variants={staggerItem}
                            className="text-editorial mt-5 text-[clamp(2.75rem,9vw,5.25rem)] leading-[1.0] text-foreground"
                        >
                            Sabrin Lal Singh
                        </motion.h1>

                        <motion.p
                            variants={staggerItem}
                            className="mt-5 max-w-2xl text-lg sm:text-xl leading-relaxed text-foreground/85"
                        >
                            I design data platforms that{" "}
                            <em className="text-editorial-italic text-foreground text-[1.15em]">
                                fail loudly
                            </em>{" "}
                            instead of quietly — automated validation pipelines,
                            reconciliation engines, and lakehouse architecture for
                            teams where a wrong record is not a rounding error.
                        </motion.p>

                        {/* Primary actions */}
                        <motion.div
                            variants={staggerItem}
                            className="mt-8 flex flex-wrap items-center gap-3"
                        >
                            <a href="#projects" className="btn-primary">
                                Explore My Work
                                <ArrowRight className="w-4 h-4" aria-hidden="true" />
                            </a>
                            <a href="#contact" className="btn-outline">
                                Get In Touch
                            </a>
                        </motion.div>

                        {/* Secondary actions */}
                        <motion.div
                            variants={staggerItem}
                            className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-mono text-muted-foreground"
                        >
                            <a
                                href="/Sabrin_Singh_Resume.pdf"
                                download
                                className="inline-flex items-center gap-1.5 link-underline hover:text-foreground transition-colors"
                            >
                                <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                                Résumé (PDF)
                            </a>
                            <button
                                type="button"
                                onClick={copy}
                                aria-label={`Copy email address ${email}`}
                                className="inline-flex items-center gap-1.5 link-underline hover:text-foreground transition-colors"
                            >
                                {copied ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-500" aria-hidden="true" />
                                ) : (
                                    <Copy className="w-3.5 h-3.5" aria-hidden="true" />
                                )}
                                <span>{copied ? "Copied" : email}</span>
                            </button>
                        </motion.div>

                        {/* Engineering ledger */}
                        <motion.dl
                            variants={staggerItem}
                            className="mt-10 grid max-w-xl grid-cols-3 border-y"
                            style={{ borderColor: "hsl(var(--hairline))" }}
                        >
                            {LEDGER.map((stat, i) => (
                                <div
                                    key={stat.label}
                                    className={`py-4 ${i > 0 ? "border-l pl-5 sm:pl-7" : "pr-5"}`}
                                    style={{ borderColor: i > 0 ? "hsl(var(--hairline))" : undefined }}
                                >
                                    <dt className="sr-only">{stat.label}</dt>
                                    <dd>
                                        <span className={`block text-2xl sm:text-3xl font-display font-semibold tracking-tight ${stat.tone}`}>
                                            {stat.value}
                                        </span>
                                        <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                                            {stat.label}
                                        </span>
                                    </dd>
                                </div>
                            ))}
                        </motion.dl>

                        {/* Technology highlights */}
                        <motion.div
                            variants={staggerItem}
                            className="mt-7 flex flex-wrap items-center gap-x-2 gap-y-2"
                        >
                            <span className="eyebrow mr-1">Stack</span>
                            {HIGHLIGHTS.map((tech) => (
                                <span key={tech} className="skill-pill">
                                    {tech}
                                </span>
                            ))}
                        </motion.div>
                    </div>

                    {/* ── Right: portrait ─────────────────────────────── */}
                    <motion.figure
                        variants={staggerItem}
                        className="lg:col-span-5 xl:col-span-5 mx-auto w-full max-w-[19rem] lg:mx-0 lg:ml-auto lg:max-w-[21rem]"
                    >
                        <div
                            className="relative overflow-hidden rounded-lg border bg-card shadow-[0_18px_50px_-24px_rgba(0,0,0,0.55)]"
                            style={{ borderColor: "hsl(var(--hairline))" }}
                        >
                            <picture>
                                <source
                                    srcSet="/images/profile-400.webp"
                                    media="(max-width: 640px)"
                                    type="image/webp"
                                />
                                <source srcSet="/images/profile.webp" type="image/webp" />
                                <img
                                    src="/images/profile.webp"
                                    alt="Portrait of Sabrin Lal Singh"
                                    width={400}
                                    height={500}
                                    decoding="async"
                                    className="aspect-[4/5] w-full object-cover object-[50%_18%]"
                                />
                            </picture>

                            {/* Corner tick — a small precision detail */}
                            <span
                                className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t"
                                style={{ borderColor: "hsl(var(--primary) / 0.7)" }}
                                aria-hidden="true"
                            />
                            <span
                                className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r"
                                style={{ borderColor: "hsl(var(--primary) / 0.7)" }}
                                aria-hidden="true"
                            />
                        </div>

                        <figcaption className="mt-3 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <span className="status-dot" aria-hidden="true" />
                                Kathmandu, Nepal
                            </span>
                            <span className="text-accent">Databricks · AWS</span>
                        </figcaption>
                    </motion.figure>
                </motion.div>

                {/* Scroll cue */}
                <motion.a
                    variants={staggerItem}
                    href="#about"
                    className="mt-12 hidden items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-muted-foreground transition-colors hover:text-foreground lg:inline-flex"
                >
                    <ArrowDown className="w-3.5 h-3.5" aria-hidden="true" />
                    Scroll
                </motion.a>
            </div>
        </section>
    );
}
