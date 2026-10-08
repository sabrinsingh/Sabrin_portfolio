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
    const inputRef = useRef<HTMLInputElement>(null);
    const { theme, setTheme } = useTheme();

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsOpen((open) => !open);
            }
        };
        document.addEventListener("keydown", down);
        return () => document.removeEventListener("keydown", down);
    }, []);

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setQuery("");
        }
    }, [isOpen]);

    const handleSelect = (action: () => void) => {
        setIsOpen(false);
        action();
    };

    const commands: CommandItem[] = [
        {
            id: "home",
            title: "Go to Home",
            category: "Navigation",
            action: () => window.scrollTo({ top: 0, behavior: "smooth" })
        },
        {
            id: "about",
            title: "Go to About",
            category: "Navigation",
            action: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "experience",
            title: "Go to Experience",
            category: "Navigation",
            action: () => document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "projects",
            title: "Go to Projects",
            category: "Navigation",
            action: () => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "skills",
            title: "Go to Toolkit",
            category: "Navigation",
            action: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "contact",
            title: "Go to Contact",
            category: "Navigation",
            action: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })
        },
        {
            id: "resume",
            title: "Download Resume",
            category: "Actions",
            action: () => {
                const link = document.createElement('a');
                link.href = '/Sabrin_Singh_Resume.pdf';
                link.download = 'Sabrin_Singh_Resume.pdf';
                link.click();
            }
        },
        {
            id: "theme",
            title: `Toggle Theme (${theme === 'dark' ? 'Light' : 'Dark'})`,
            category: "Actions",
            action: () => setTheme(theme === "dark" ? "light" : "dark")
        }
    ];

    const filteredCommands = commands.filter((cmd) =>
        cmd.title.toLowerCase().includes(query.toLowerCase()) || 
        cmd.category.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[150]"
                        onClick={() => setIsOpen(false)}
                    />
                    <div className="fixed inset-0 z-[151] flex items-start justify-center pt-[15vh] sm:pt-[20vh] px-4 pointer-events-none">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ type: "spring", stiffness: 400, damping: 30 }}
                            className="bg-card w-full max-w-lg rounded-xl border border-border shadow-2xl overflow-hidden pointer-events-auto flex flex-col"
                        >
                            <div className="flex items-center px-4 py-3 border-b border-border gap-3">
                                <TerminalSquare className="w-5 h-5 text-primary" />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    placeholder="Type a command or search..."
                                    className="flex-1 bg-transparent border-none outline-none text-sm placeholder:text-muted-foreground font-mono"
                                />
                                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground bg-secondary/50 p-1 rounded">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="max-h-[60vh] overflow-y-auto p-2 scrollbar-hide">
                                {filteredCommands.length === 0 ? (
                                    <div className="p-8 text-center text-sm text-muted-foreground font-mono">
                                        No commands found.
                                    </div>
                                ) : (
                                    <div className="space-y-1">
                                        {filteredCommands.map((cmd) => (
                                            <button
                                                key={cmd.id}
                                                onClick={() => handleSelect(cmd.action)}
                                                className="w-full flex items-center justify-between px-3 py-2.5 rounded-md text-sm text-left hover:bg-secondary/60 group transition-colors"
                                            >
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-foreground">{cmd.title}</span>
                                                    <span className="text-[10px] uppercase tracking-wider font-mono text-muted-foreground group-hover:text-primary transition-colors">
                                                        {cmd.category}
                                                    </span>
                                                </div>
                                                <ArrowRight className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                            
                            <div className="bg-secondary/30 p-3 border-t border-border flex items-center justify-between">
                                <div className="flex gap-4">
                                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
                                        <kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px]">↑</kbd>
                                        <kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px]">↓</kbd>
                                        to navigate
                                    </span>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1.5 font-mono">
                                        <kbd className="bg-background border border-border px-1.5 py-0.5 rounded text-[10px]">↵</kbd>
                                        to select
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
