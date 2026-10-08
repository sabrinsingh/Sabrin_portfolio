import { useState } from "react";
import { Github, Linkedin, Mail, Copy, Check } from "lucide-react";
import { SiUpwork } from "react-icons/si";

const navLinks = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Work" },
    { href: "#skills", label: "Toolkit" },
    { href: "#certifications", label: "Certs" },
    { href: "#contact", label: "Contact" },
];

const socials = [
    { href: "https://github.com/sabrinsingh", icon: Github, label: "GitHub" },
    { href: "https://linkedin.com/in/sabrin-lal-singh-478218a0", icon: Linkedin, label: "LinkedIn" },
    { href: "https://www.upwork.com/freelancers/~019c63b7c8441f7142", icon: SiUpwork, label: "Upwork" },
];

export function Footer() {
    const [copied, setCopied] = useState(false);
    const currentYear = new Date().getFullYear();
    const email = "sabrinlalsingh@gmail.com";

    const copyEmail = async () => {
        try {
            await navigator.clipboard.writeText(email);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback: open mail client
            window.location.href = `mailto:${email}`;
        }
    };

    return (
        <footer className="border-t border-border bg-background">
            <div className="container mx-auto px-4 sm:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">
                    {/* Brand + status */}
                    <div className="md:col-span-1">
                        <p className="font-display font-bold text-lg text-foreground mb-1">
                            Sabrin Lal Singh
                        </p>
                        <p className="text-sm text-muted-foreground mb-4">
                            Data QA &amp; Analytics Engineer
                        </p>
                        <div className="status-badge">
                            <span className="status-dot" />
                            Based in Kathmandu · Available for select projects
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <p className="section-label mb-4">Navigation</p>
                        <ul className="space-y-2.5">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-100"
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <p className="section-label mb-4">Connect</p>

                        {/* Email with copy */}
                        <button
                            onClick={copyEmail}
                            className="copy-tooltip group flex items-center gap-2 text-sm text-foreground hover:text-primary transition-colors duration-100 mb-4"
                            aria-label="Copy email address"
                        >
                            <Mail className="w-4 h-4 shrink-0" />
                            <span className="font-mono text-xs">{email}</span>
                            {copied ? (
                                <Check className="w-3.5 h-3.5 text-green-500 ml-1" />
                            ) : (
                                <Copy className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity ml-1" />
                            )}
                            <span className="tooltip-text">
                                {copied ? "Copied!" : "Copy email"}
                            </span>
                        </button>

                        {/* Social links */}
                        <div className="flex flex-col gap-2.5">
                            {socials.map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-100"
                                >
                                    <s.icon className="w-4 h-4 shrink-0" />
                                    {s.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-border pt-6">
                    <p className="font-mono text-xs text-muted-foreground">
                        © {currentYear} Sabrin Lal Singh
                    </p>
                </div>
            </div>
        </footer>
    );
}
