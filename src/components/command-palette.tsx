import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, TerminalSquare } from "lucide-react";
import { useTheme } from "@/components/theme-provider";

type CommandItem = {
    id: string;
    title: string;
    category: string;
    action: () => void;
};

export function CommandPalette() {
    const [isOpen, setIsOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => {
                    if (!open) {
                        setQuery("");
                        setSelectedIndex(0);
                    }
                    return !open;
                });
            }
            if (e.key === "Escape") setIsOpen(false);
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    const handleSelect = (action: () => void) => {
        setIsOpen(false);
        action();
    };

    const commands: CommandItem[] = [
        {
            id: "home",
            title: "Go to Top / Hero",
            category: "Navigation",
            action: () => window.scrollTo({ top: 0, behavior: "smooth" })
        },
        {
            id: "about",
            title: "About — Quality as Engineering Practice",
            category: "Navigation",
            action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "experience",
            title: "Professional Experience (9+ Years)",
            category: "Navigation",
            action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "architecture",
            title: "Architecture & Data Flow Topology",
            category: "Navigation",
            action: () => document.getElementById("pipeline-visual")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "projects",
            title: "Selected Case Studies (Lakehouse, Redshift, QA)",
            category: "Navigation",
            action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "skills",
            title: "Toolkit & Technical Stack Matrix",
            category: "Navigation",
            action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "certifications",
            title: "Credentials (12 Verified Certifications)",
            category: "Navigation",
            action: () => document.getElementById("certifications")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "contact",
            title: "Initiate Contact",
            category: "Navigation",
            action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "copy-email",
            title: "Copy Email: sabrinlalsingh@gmail.com",
            category: "Actions",
            action: () => {
                navigator.clipboard?.writeText("sabrinlalsingh@gmail.com");
            }
        },
        {
            id: "resume",
            title: "Download Resume (PDF)",
            category: "Actions",
            action: () => {
                const link = document.createElement("a");
                link.href = "/Sabrin_Singh_Resume.pdf";
                link.download = "Sabrin_Singh_Resume.pdf";
                link.click();
            }
        },
        {
            id: "github",
            title: "View GitHub (@sabrinsingh)",
            category: "External",
            action: () => window.open("https://github.com/sabrinsingh", "_blank", "noopener,noreferrer")
        },
        {
            id: "linkedin",
            title: "View LinkedIn Profile",
            category: "External",
            action: () => window.open("https://linkedin.com/in/sabrin-lal-singh-478218a0", "_blank", "noopener,noreferrer")
        },
        {
            id: "theme",
            title: `Switch Theme to ${theme === "dark" ? "Light" : "Dark"} Mode`,
            category: "Actions",
            action: () => setTheme(theme === "dark" ? "light" : "dark")
        }
    ];

    const filteredCommands = commands.filter((cmd) =>
        cmd.title.toLowerCase().includes(query.toLowerCase()) ||
        cmd.category.toLowerCase().includes(query.toLowerCase())
    );

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (filteredCommands.length === 0) return;
        if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev + 1) % filteredCommands.length);
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelectedIndex((prev) => (prev - 1 + filteredCommands.length) % filteredCommands.length);
        } else if (e.key === "Enter") {
            e.preventDefault();
            if (filteredCommands[selectedIndex]) {
                handleSelect(filteredCommands[selectedIndex].action);
            }
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-md z-[150]"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed inset-0 z-[151] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="bg-card w-full max-w-lg border border-border shadow-2xl rounded-xl overflow-hidden pointer-events-auto flex flex-col"
                        >
                            <div className="flex items-center px-4 py-3 border-b border-border gap-3">
                                <TerminalSquare className="w-5 h-5 text-primary shrink-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setSelectedIndex(0);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Type a command or navigate..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground font-mono"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-muted-foreground hover:text-foreground bg-secondary/50 p-1 rounded"
                                    aria-label="Close command palette"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="max-h-[55vh] overflow-y-auto p-2 scrollbar-hide">
                                {filteredCommands.length === 0 ? (
                                    <div className="p-8 text-center text-sm text-muted-foreground font-mono">
                                        No matching commands.
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {filteredCommands.map((cmd, idx) => {
                                            const isSelected = idx === selectedIndex;
                                            return (
                                                <button
                                                    key={cmd.id}
                                                    onClick={() => handleSelect(cmd.action)}
                                                    onMouseEnter={() => setSelectedIndex(idx)}
                                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors ${
                                                        isSelected
                                                            ? "bg-secondary/90 text-foreground ring-1 ring-border"
                                                            : "hover:bg-secondary/50 text-foreground/80"
                                                    }`}
                                                >
                                                    <div className="flex flex-col">
                                                        <span className="font-medium text-foreground">{cmd.title}</span>
                                                        <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground">
                                                            {cmd.category}
                                                        </span>
                                                    </div>
                                                    <ArrowRight
                                                        className={`w-4 h-4 text-primary transition-opacity ${
                                                            isSelected ? "opacity-100" : "opacity-0"
                                                        }`}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="bg-secondary/30 p-3 border-t border-border flex items-center justify-between">
                                <div className="flex gap-4">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
                                        <kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px]">↑</kbd>
                                        <kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px]">↓</kbd>
                                        navigate
                                    </span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
                                        <kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px]">↵</kbd>
                                        select
                                    </span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
                                        <kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px]">esc</kbd>
                                        close
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </>
            )}
        </AnimatePresence>
    );
}
