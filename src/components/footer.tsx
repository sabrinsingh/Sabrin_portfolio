import { useState } from "react";
import { Copy, Check, Github, Linkedin, ExternalLink } from "lucide-react";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#pipeline-visual", label: "Architecture" },
    { href: "#projects", label: "Selected Work" },
    { href: "#skills", label: "Toolkit" },
    { href: "#certifications", label: "Credentials" },
    { href: "#contact", label: "Contact" },
];

export function Footer() {
    const [copied, setCopied] = useState(false);
    const currentYear = new Date().getFullYear();
    const email = "sabrinlalsingh@gmail.com";

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch {
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <footer className="border-t border-border/70 bg-card/25 backdrop-blur-sm">
            <div className="container mx-auto px-5 sm:px-8 py-16 max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-14">
                    <div className="md:col-span-5 space-y-3">
                        <p className="font-display text-2xl text-foreground font-semibold">Sabrin Lal Singh</p>
                        <p className="text-sm text-muted-foreground font-sans max-w-sm leading-relaxed">
                            Senior Data QA &amp; Analytics Engineer architecting high-throughput validation pipelines, Medallion lakehouses, and automated SQL reconciliation frameworks.
                        </p>
                        <div className="pt-2 flex items-center gap-3">
                            <a
                                href="https://github.com/sabrinsingh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                                aria-label="GitHub"
                            >
                                <Github className="w-4 h-4" />
                            </a>
                            <a
                                href="https://linkedin.com/in/sabrin-lal-singh-478218a0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded border border-border text-muted-foreground hover:text-foreground hover:border-primary transition-colors"
                                aria-label="LinkedIn"
                            >
                                <Linkedin className="w-4 h-4" />
                            </a>
                            <a
                                href="https://www.upwork.com/freelancers/~019c63b7c8441f7142"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2.5 py-1.5 rounded border border-border text-xs font-mono text-muted-foreground hover:text-foreground hover:border-primary transition-colors flex items-center gap-1"
                            >
                                Upwork <ExternalLink className="w-3 h-3 opacity-60" />
                            </a>
                        </div>
                    </div>

                    <div className="md:col-span-4 space-y-3">
                        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Navigation</p>
                        <nav aria-label="Footer Navigation">
                            <ul className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-mono">
                                {navLinks.map((link) => (
                                    <li key={link.href}>
                                        <a
                                            href={link.href}
                                            className="text-muted-foreground hover:text-foreground link-underline transition-colors py-0.5 inline-block"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="md:col-span-3 space-y-3">
                        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">Direct Contact</p>
                        <div className="space-y-2">
                            <button
                                onClick={copyEmail}
                                className="w-full text-left p-2.5 rounded border border-border/80 bg-card/60 text-xs font-mono text-foreground hover:border-primary transition-colors flex items-center justify-between group"
                                aria-label="Copy email address"
                            >
                                <span className="truncate">{email}</span>
                                {copied ? (
                                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0 ml-1" />
                                ) : (
                                    <Copy className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground shrink-0 ml-1" />
                                )}
                            </button>
                            <p className="text-[11px] font-mono text-muted-foreground">
                                Location: Kathmandu, Nepal (UTC+5:45)
                            </p>
                        </div>
                    </div>
                </div>

                <div className="pt-8 border-t border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-muted-foreground">
                    <p>© {currentYear} Sabrin Lal Singh. All rights reserved.</p>
                    <p className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        Designed &amp; Engineered for High-Reliability Data Teams
                    </p>
                </div>
            </div>
        </footer>
    );
}
