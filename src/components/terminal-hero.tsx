import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Maximize2, Minimize2, X } from "lucide-react";

export const TerminalHero = () => {
    const [lines, setLines] = useState<string[]>([
        "Initializing core systems...",
        "Loading user profile: Sabrin Singh",
        "Role: Data Engineer | Cloud Architect",
        "Status: Ready for new challenges",
        "Type 'help' to see available commands.",
        " "
    ]);
    const [currentCommand, setCurrentCommand] = useState("");
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [lines]);

    const handleCommand = (cmd: string) => {
        const lowerCmd = cmd.trim().toLowerCase();
        const newLines = [...lines, `> ${cmd}`];

        switch (lowerCmd) {
            case "help":
                newLines.push("Available commands: about, skills, contact, clear");
                break;
            case "about":
                newLines.push("Senior Data Engineer specializing in scalable ETL pipelines, AWS, and Databricks. I turn complex data into actionable insights.");
                break;
            case "skills":
                newLines.push("Core: Python, SQL, PySpark, AWS (Glue, Lambda, Redshift), Databricks, Airflow, Docker, Terraform.");
                break;
            case "contact":
                newLines.push("Email: sabrinlalsingh@gmail.com | LinkedIn: /in/sabrin-lal-singh");
                break;
            case "clear":
                setLines(["Type 'help' to see available commands."]);
                setCurrentCommand("");
                return;
            case "":
                break;
            default:
                newLines.push(`Command not found: ${cmd}. Type 'help' for assistance.`);
        }

        setLines(newLines);
        setCurrentCommand("");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleCommand(currentCommand);
        }
    };

    const focusInput = () => {
        inputRef.current?.focus();
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl mx-auto"
        >
            <div
                className="bg-card/90 backdrop-blur-md rounded-lg border border-border overflow-hidden shadow-2xl font-mono text-sm md:text-base cursor-text"
                onClick={focusInput}
            >
                {/* Terminal Header */}
                <div className="bg-muted/50 px-4 py-2 border-b border-border flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Terminal className="w-4 h-4 text-primary" />
                        <span className="text-muted-foreground text-xs">sabrin@data-core:~/portfolio</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-50">
                        <Minimize2 className="w-3 h-3" />
                        <Maximize2 className="w-3 h-3" />
                        <X className="w-3 h-3" />
                    </div>
                </div>

                {/* Terminal Body */}
                <div ref={terminalRef} className="p-6 h-[400px] overflow-y-auto space-y-2 text-foreground/90 relative">
                    {lines.map((line, i) => (
                        <div key={i} className="break-words">
                            {line.startsWith(">") ? (
                                <>
                                    <span className="text-primary font-bold mr-2">$</span>
                                    <span>{line.replace("> ", "")}</span>
                                </>
                            ) : (
                                <span className={i < 4 ? "text-muted-foreground" : "text-foreground"}>
                                    {line}
                                </span>
                            )}
                        </div>
                    ))}

                    {/* Active Input Line */}
                    <div className="flex items-center group min-h-[1.5rem] relative">
                        <span className="text-primary font-bold mr-2">$</span>
                        {/* Hidden Input moved here to keep focus in view */}
                        <input
                            ref={inputRef}
                            type="text"
                            value={currentCommand}
                            onChange={(e) => setCurrentCommand(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="absolute opacity-0 w-px h-px -z-10 bottom-0 left-0"
                            autoFocus
                        />
                        <div className="flex-1 flex items-center flex-wrap">
                            <span>{currentCommand}</span>
                            <motion.span
                                animate={{ opacity: [1, 0] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="w-2 h-5 bg-primary ml-1 block"
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-center mt-6 text-muted-foreground text-sm">
                Try commands: <code className="text-primary bg-primary/10 px-1 rounded">about</code>, <code className="text-primary bg-primary/10 px-1 rounded">skills</code>, <code className="text-primary bg-primary/10 px-1 rounded">contact</code>
            </div>
        </motion.div>
    );
};
