import { Github, Linkedin, Mail, ExternalLink, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { SiReact, SiTailwindcss, SiTypescript, SiFramer } from "react-icons/si";

const links = [
    { href: "#about", label: "About" },
    { href: "#experience", label: "Experience" },
    { href: "#projects", label: "Projects" },
    { href: "#performance", label: "Performance" },
    { href: "#certifications", label: "Certifications" },
    { href: "#contact", label: "Contact" },
];

const techStack = [
    { icon: SiReact, label: "React", color: "#61DAFB" },
    { icon: SiTypescript, label: "TypeScript", color: "#3178C6" },
    { icon: SiTailwindcss, label: "Tailwind", color: "#06B6D4" },
    { icon: SiFramer, label: "Framer", color: "#BB4BFF" },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-background relative overflow-hidden">
            {/* Gradient top border */}
            <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

            <div className="container mx-auto px-4 sm:px-6 py-10 sm:py-12">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8">
                    {/* Brand */}
                    <div className="col-span-2">
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 sm:mb-4">
                            Sabrin<span className="gradient-text">Singh</span>
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
                            {[
                                { href: "https://github.com/sabrinsingh", icon: Github, label: "GitHub" },
                                { href: "https://linkedin.com/in/sabrin-lal-singh-478218a0", icon: Linkedin, label: "LinkedIn" },
                                { href: "https://www.upwork.com/freelancers/~019c63b7c8441f7142", icon: ExternalLink, label: "Upwork" },
                                { href: "mailto:sabrinlalsingh@gmail.com", icon: Mail, label: "Email" },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target={social.href.startsWith("http") ? "_blank" : undefined}
                                    rel={social.href.startsWith("http") ? "noopener noreferrer" : undefined}
                                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
                                >
                                    <social.icon className="h-4 w-4 group-hover:scale-110 transition-transform" />
                                    {social.label}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Built with tech stack */}
                <div className="border-t border-border/30 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-muted-foreground font-mono">
                        © {currentYear} Sabrin Lal Singh. All rights reserved.
                    </p>

                    <div className="flex items-center gap-3">
                        <span className="text-xs text-muted-foreground/50 font-mono">Built with</span>
                        <div className="flex items-center gap-2">
                            {techStack.map((tech) => (
                                <motion.div
                                    key={tech.label}
                                    whileHover={{ scale: 1.2, y: -2 }}
                                    className="group relative"
                                    title={tech.label}
                                >
                                    <tech.icon
                                        className="w-4 h-4 text-muted-foreground/40 group-hover:text-[color:var(--icon-color)] transition-colors duration-300"
                                        style={{ "--icon-color": tech.color } as any}
                                    />
                                </motion.div>
                            ))}
                        </div>
                        <span className="text-xs text-muted-foreground/50">+</span>
                        <Heart className="w-3.5 h-3.5 text-red-400/50" />
                    </div>
                </div>
            </div>
        </footer>
    );
}
