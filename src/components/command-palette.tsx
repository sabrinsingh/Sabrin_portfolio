import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, TerminalSquare } from "lucide-react";

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

        const openFromEvent = () => {
            setQuery("");
            setSelectedIndex(0);
            setIsOpen(true);
        };

        document.addEventListener("keydown", down);
        window.addEventListener("open-command-palette", openFromEvent);
        return () => {
            document.removeEventListener("keydown", down);
            window.removeEventListener("open-command-palette", openFromEvent);
        };
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
            id: "approach",
            title: "How I run a data pipeline",
            category: "Navigation",
            action: () => document.getElementById("principles")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "experience",
            title: "Professional Experience (9+ Years)",
            category: "Navigation",
            action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "architecture",
            title: "Pipeline architecture and stages",
            category: "Navigation",
            action: () => document.getElementById("pipeline-visual")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "projects",
            title: "Selected Case Studies (Redshift, PySpark, QA)",
            category: "Navigation",
            action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "certifications",
            title: "Credentials (5 certifications)",
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
                link.download = "Sabrin_Lal_Singh_CV.pdf";
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
                        transition={{ duration: 0.16, ease: "easeOut" }}
                        className="fixed inset-0 z-[150] bg-[#050607]/85"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed inset-0 z-[151] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 pointer-events-none">
                        <motion.div
                            role="dialog"
                            aria-modal="true"
                            aria-label="Command palette"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -4 }}
                            transition={{ duration: 0.16, ease: "easeOut" }}
                            className="panel w-full max-w-lg overflow-hidden pointer-events-auto flex flex-col rounded-[14px]"
                        >
                            <div className="flex items-center px-4 py-3 border-b border-slate-800 gap-3">
                                <TerminalSquare className="w-4 h-4 text-slate-400 shrink-0" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => {
                                        setQuery(e.target.value);
                                        setSelectedIndex(0);
                                    }}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search sections and actions"
                                    aria-label="Search commands"
                                    className="flex-1 bg-transparent border-none outline-none text-sm text-slate-200 placeholder:text-slate-500 font-mono"
                                />
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-slate-400 hover:text-slate-100 p-1 rounded transition-colors"
                                    aria-label="Close command palette"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="max-h-[55vh] overflow-y-auto p-2 scrollbar-hide">
                                {filteredCommands.length === 0 ? (
                                    <div className="p-8 text-center text-sm text-slate-500 font-mono">
                                        No matching commands.
                                    </div>
                                ) : (
                                    <div className="space-y-0.5">
                                        {filteredCommands.map((cmd, idx) => {
                                            const isSelected = idx === selectedIndex;
                                            return (
                                                <button
                                                    key={cmd.id}
                                                    onClick={() => handleSelect(cmd.action)}
                                                    onMouseEnter={() => setSelectedIndex(idx)}
                                                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-sm text-left transition-colors ${
                                                        isSelected
                                                            ? "bg-slate-900 text-slate-100"
                                                            : "hover:bg-slate-900/60 text-slate-300"
                                                    }`}
                                                >
                                                    <div className="flex flex-col">
                                                        <span>{cmd.title}</span>
                                                        <span className="text-xs text-slate-500">
                                                            {cmd.category}
                                                        </span>
                                                    </div>
                                                    <ArrowRight
                                                        className={`w-4 h-4 text-slate-400 transition-opacity ${
                                                            isSelected ? "opacity-100" : "opacity-0"
                                                        }`}
                                                    />
                                                </button>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>

                            <div className="p-3 border-t border-slate-800 flex items-center justify-between">
                                <div className="flex gap-4">
                                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                        <kbd className="bg-slate-900 border border-slate-700 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">↑</kbd>
                                        <kbd className="bg-slate-900 border border-slate-700 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">↓</kbd>
                                        navigate
                                    </span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                        <kbd className="bg-slate-900 border border-slate-700 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">↵</kbd>
                                        select
                                    </span>
                                    <span className="text-xs text-slate-500 flex items-center gap-1.5">
                                        <kbd className="bg-slate-900 border border-slate-700 text-slate-400 px-1.5 py-0.5 rounded text-[10px]">esc</kbd>
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
