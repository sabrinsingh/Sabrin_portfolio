import { Github, Linkedin, Mail, ExternalLink } from "lucide-react";

const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#performance", label: "Performance" },
    { href: "#certifications", label: "Certifications" },
    { href: "#contact", label: "Contact" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-muted/50 border-t border-border py-10 sm:py-12">
            <div className="container mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-2">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                            Sabrin<span className="text-primary">Singh</span>
                        </h3>
                        <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
                            Data Analytics Engineer — building resilient, high-throughput data systems for healthcare and enterprise.
                        </p>
                        {/* Availability badge */}
                        <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs font-mono">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                            Open to Remote &amp; Contract Work
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold mb-3 sm:mb-4 text-sm">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                            {links.map((link) => (
                                <li key={link.href}>
                                    <a href={link.href} className="hover:text-primary transition-colors">{link.label}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Connect */}
                    <div>
                        <h4 className="font-semibold mb-3 sm:mb-4 text-sm">Connect</h4>
                        <div className="flex flex-col gap-3">
                            <a
                                href="https://github.com/sabrinsingh"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Github className="h-4 w-4" /> GitHub
                            </a>
                            <a
                                href="https://linkedin.com/in/sabrin-lal-singh-478218a0"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Linkedin className="h-4 w-4" /> LinkedIn
                            </a>
                            <a
                                href="https://www.upwork.com/freelancers/~019c63b7c8441f7142"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <ExternalLink className="h-4 w-4" /> Upwork
                            </a>
                            <a
                                href="mailto:sabrinlalsingh@gmail.com"
                                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                            >
                                <Mail className="h-4 w-4" /> Email
                            </a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-border pt-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground font-mono">
                    <p>© {currentYear} Sabrin Lal Singh. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
