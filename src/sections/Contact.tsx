import { ArrowRight, Check, Copy, Download, ExternalLink } from "lucide-react";

import { Reveal } from "@/components/motion";
import { useCopyEmail } from "@/lib/use-copy-email";
import { personalInfo } from "@/data/portfolio";

const LINKS = [
    { label: "LinkedIn", href: personalInfo.social.linkedin },
    { label: "GitHub", href: personalInfo.social.github },
    { label: "Upwork", href: personalInfo.social.upwork },
];

export function Contact() {
    const { copied, copy, email } = useCopyEmail();

    return (
        <section
            id="contact"
            className="relative overflow-hidden border-t py-20 md:py-28"
            style={{ borderColor: "hsl(var(--hairline))" }}
        >
            <div className="grid-motif grid-motif-fade absolute inset-0" aria-hidden="true" />

            <div className="relative container mx-auto max-w-6xl px-5 sm:px-8">
                <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
                    <div className="lg:col-span-7">
                        <Reveal>
                            <span className="eyebrow">09 / Contact</span>
                            <h2 className="text-editorial mt-5 text-[clamp(2.25rem,6vw,3.75rem)] leading-[1.05] text-foreground">
                                If the data has to be right,{" "}
                                <em className="text-editorial-italic text-primary">
                                    let&rsquo;s talk
                                </em>
                                .
                            </h2>
                            <p className="mt-5 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
                                Open to senior data engineering, data quality and
                                lakehouse work — for teams where a silent pipeline
                                failure is more expensive than doing it properly.
                            </p>
                        </Reveal>

                        <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center gap-3">
                            <a
                                href={`mailto:${email}?subject=Data%20Engineering%20Inquiry%20%E2%80%94%20Sabrin%20Singh`}
                                className="btn-primary py-3.5 px-6 text-sm"
                            >
                                Email me directly
                                <ArrowRight className="h-4 w-4" aria-hidden="true" />
                            </a>
                            <button
                                type="button"
                                onClick={copy}
                                className="btn-outline py-3.5 px-6 font-mono text-xs"
                                aria-label={`Copy email address ${email}`}
                            >
                                {copied ? (
                                    <Check className="h-4 w-4 text-emerald-500" aria-hidden="true" />
                                ) : (
                                    <Copy className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                                )}
                                <span>{copied ? "Copied to clipboard" : email}</span>
                            </button>
                        </Reveal>

                        <Reveal delay={0.14} className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-3 font-mono text-xs text-muted-foreground">
                            <span className="flex items-center gap-1.5">
                                <span className="status-dot" aria-hidden="true" />
                                Typical reply within 24 hours
                            </span>
                            <span aria-hidden="true">·</span>
                            <span>Kathmandu (UTC+5:45)</span>
                            <span aria-hidden="true">·</span>
                            <span>Remote &amp; global</span>
                        </Reveal>
                    </div>

                    {/* Side rail */}
                    <div className="lg:col-span-5">
                        <Reveal delay={0.12}>
                            <div
                                className="rounded-lg border bg-card p-6"
                                style={{ borderColor: "hsl(var(--hairline))" }}
                            >
                                <span className="eyebrow">Direct lines</span>

                                <ul className="mt-4 space-y-1">
                                    {LINKS.map((link) => (
                                        <li key={link.label}>
                                            <a
                                                href={link.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="group flex items-center justify-between rounded px-2 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-secondary/60"
                                            >
                                                <span>{link.label}</span>
                                                <ExternalLink
                                                    className="h-3.5 w-3.5 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary"
                                                    aria-hidden="true"
                                                />
                                            </a>
                                        </li>
                                    ))}
                                    <li>
                                        <a
                                            href="/Sabrin_Singh_Resume.pdf"
                                            download
                                            className="group flex items-center justify-between rounded px-2 py-2.5 text-sm text-foreground/85 transition-colors hover:bg-secondary/60"
                                        >
                                            <span>Résumé (PDF)</span>
                                            <Download
                                                className="h-3.5 w-3.5 text-muted-foreground transition-colors group-hover:text-primary"
                                                aria-hidden="true"
                                            />
                                        </a>
                                    </li>
                                </ul>

                                <p
                                    className="mt-5 border-t pt-4 font-mono text-[11px] leading-relaxed text-muted-foreground"
                                    style={{ borderColor: "hsl(var(--hairline))" }}
                                >
                                    Prefer email? Copy it with one click — it is the
                                    fastest route to a real reply.
                                </p>
                            </div>
                        </Reveal>
                    </div>
                </div>
            </div>
        </section>
    );
}
