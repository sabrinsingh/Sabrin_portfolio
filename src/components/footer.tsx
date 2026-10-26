import { Check, Copy, ExternalLink, Github, Linkedin } from "lucide-react";

import { useCopyEmail } from "@/lib/use-copy-email";
import { personalInfo } from "@/data/portfolio";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#approach", label: "Approach" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Selected Work" },
    { href: "#pipeline-visual", label: "Architecture" },
    { href: "#skills", label: "Expertise" },
    { href: "#certifications", label: "Credentials" },
    { href: "#contact", label: "Contact" },
];

const socials = [
    { label: "GitHub", href: personalInfo.social.github, Icon: Github },
    { label: "LinkedIn", href: personalInfo.social.linkedin, Icon: Linkedin },
];

export function Footer() {
    const { copied, copy, email } = useCopyEmail();
    const currentYear = new Date().getFullYear();

    return (
        <footer className="border-t bg-card" style={{ borderColor: "hsl(var(--hairline))" }}>
            <div className="container mx-auto max-w-6xl px-5 py-14 sm:px-8">
                <div className="mb-12 grid grid-cols-1 gap-10 md:grid-cols-12">
                    <div className="space-y-3 md:col-span-5">
                        <p className="text-editorial text-2xl leading-tight text-foreground">
                            Sabrin Lal Singh
                        </p>
                        <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
                            Data &amp; quality engineer building validation pipelines,
                            Medallion lakehouses and automated reconciliation frameworks
                            for systems that cannot afford a silent error.
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                            {socials.map(({ label, href, Icon }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="rounded border p-2 text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                                    style={{ borderColor: "hsl(var(--hairline))" }}
                                    aria-label={label}
                                >
                                    <Icon className="h-4 w-4" />
                                </a>
                            ))}
                            <a
                                href={personalInfo.social.upwork}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-1 rounded border px-2.5 py-1.5 font-mono text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
                                style={{ borderColor: "hsl(var(--hairline))" }}
                            >
                                Upwork <ExternalLink className="h-3 w-3 opacity-60" />
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-4">
                        <p className="eyebrow">Navigate</p>
                        <nav aria-label="Footer navigation">
                            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="link-underline inline-block py-0.5 text-muted-foreground transition-colors hover:text-foreground"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="md:col-span-3">
                        <p className="eyebrow">Direct</p>
                        <div className="mt-3 space-y-2">
                            <button
                                type="button"
                                onClick={copy}
                                aria-label={`Copy email address ${email}`}
                                className="group flex w-full items-center justify-between gap-2 rounded border bg-secondary/30 p-2.5 text-left font-mono text-xs text-foreground transition-colors hover:border-primary"
                                style={{ borderColor: "hsl(var(--hairline))" }}
                            >
                                <span className="truncate">{email}</span>
                                {copied ? (
                                    <Check className="h-3.5 w-3.5 shrink-0 text-emerald-500" />
                                ) : (
                                    <Copy className="h-3.5 w-3.5 shrink-0 text-muted-foreground group-hover:text-foreground" />
                                )}
                            </button>
                            <p className="font-mono text-[11px] text-muted-foreground">
                                Kathmandu, Nepal · UTC+5:45
                            </p>
                        </div>
                    </div>
                </div>

                <div
                    className="flex flex-col items-center justify-between gap-3 border-t pt-6 font-mono text-xs text-muted-foreground sm:flex-row"
                    style={{ borderColor: "hsl(var(--hairline))" }}
                >
                    <p>© {currentYear} Sabrin Lal Singh. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        <span className="status-dot" aria-hidden="true" />
                        No silent pipeline failures
                    </p>
                </div>
            </div>
        </footer>
    );
}
