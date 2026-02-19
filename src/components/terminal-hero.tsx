import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Terminal, Cpu, ShieldCheck, Code2, Database } from "lucide-react";
import { SiUpwork } from "react-icons/si";
import profilePic from "../assets/profile.jpg";

import { calculateYearsOfExperience } from "@/data/portfolio";

const Typewriter = ({ text, speed, deleteSpeed, waitTime }: { text: string[], speed: number, deleteSpeed: number, waitTime: number }) => {
    const [currentText, setCurrentText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    const [loopNum, setLoopNum] = useState(0);
    const [typingSpeed, setTypingSpeed] = useState(speed);

    useEffect(() => {
        const handleType = () => {
            const i = loopNum % text.length;
            const fullText = text[i];

            setCurrentText(isDeleting ? fullText.substring(0, currentText.length - 1) : fullText.substring(0, currentText.length + 1));
            setTypingSpeed(isDeleting ? deleteSpeed : speed);

            if (!isDeleting && currentText === fullText) {
                setTimeout(() => setIsDeleting(true), waitTime);
            } else if (isDeleting && currentText === "") {
                setIsDeleting(false);
                setLoopNum(loopNum + 1);
            }
        };

        const timer = setTimeout(handleType, typingSpeed);
        return () => clearTimeout(timer);
    }, [currentText, isDeleting, loopNum, text, speed, deleteSpeed, waitTime, typingSpeed]);

    return <span>{currentText}<span className="animate-pulse ml-0.5">|</span></span>;
};

export const TerminalHero = () => {
    const yearsOfExp = calculateYearsOfExperience();

    const [lines, setLines] = useState<string[]>([
        "Initializing data core...",
    ]);
    const [currentCommand, setCurrentCommand] = useState("");
    const [isAutoTyping, setIsAutoTyping] = useState(true);
    const terminalRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    const etlSequence = [
        { text: "ssh sabrin@data-hub", type: "command" },
        { text: "Connection established.", type: "output" },
        { text: "spark-submit --master k8s etl_pipeline.py", type: "command" },
        { text: "Running Spark Session (v3.5)...", type: "output" },
        { text: "[INFO] Ingesting Bronze Layer...", type: "output" },
        { text: "[INFO] Data Quality: 100% Valid.", type: "output" },
        { text: "[INFO] Silver Layer: Deduplication.", type: "output" },
        { text: "[INFO] Gold Layer: Materializing View...", type: "output" },
        { text: "Success. 50M records processed.", type: "output" },
        { text: "System ready. Type 'help'.", type: "output" },
    ];

    useEffect(() => {
        if (isAutoTyping) {
            let currentLine = 0;
            const interval = setInterval(() => {
                if (currentLine < etlSequence.length) {
                    const line = etlSequence[currentLine];
                    setLines(prev => [...prev, line.type === "command" ? `> ${line.text}` : line.text]);
                    currentLine++;
                } else {
                    setIsAutoTyping(false);
                    clearInterval(interval);
                }
            }, 600);
            return () => clearInterval(interval);
        }
    }, [isAutoTyping]);

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
                newLines.push("Available: about, skills, contact, upwork, clear");
                break;
            case "about":
                newLines.push(`Data Analytics Engineer. ${yearsOfExp}+ years of experience bridging Data Engineering and Business Intelligence.`);
                break;
            case "skills":
                newLines.push("PySpark, Delta Lake, Redshift, Snowflake, Python, SQL, HIPAA compliance.");
                break;
            case "contact":
                newLines.push("Email: sabrinlalsingh@gmail.com");
                break;
            case "upwork":
                newLines.push("Opening Upwork...");
                window.open("https://www.upwork.com/freelancers/~019c63b7c8441f7142", "_blank");
                break;
            case "clear":
                setLines(["Type 'help' to see commands."]);
                setCurrentCommand("");
                return;
            default:
                newLines.push(`Unknown command: ${cmd}`);
        }

        setLines(newLines);
        setCurrentCommand("");
    };

    return (
        <div className="flex flex-col xl:flex-row items-center justify-center gap-8 xl:gap-12 w-full max-w-7xl mx-auto px-4 py-6 sm:py-8">
            {/* Left Column: Visual & Intro */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full xl:w-1/2 flex flex-col items-center xl:items-start text-center xl:text-left space-y-6 sm:space-y-8"
            >
                {/* Unified Profile Card */}
                <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
                    <div className="relative bg-card border border-border p-2 rounded-2xl shadow-2xl flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
                        <div className="relative w-28 h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 rounded-xl overflow-hidden border-2 border-primary/20 group-hover:border-primary/50 transition-colors duration-500">
                            <img src={profilePic} alt="Sabrin Singh" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                            {/* Innovative Cyber Lens Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 to-transparent pointer-events-none" />
                            <motion.div
                                animate={{ top: ["0%", "100%", "0%"] }}
                                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                className="absolute left-0 right-0 h-[1px] bg-primary/40 shadow-[0_0_8px_rgba(var(--primary),0.5)] z-10"
                            />
                            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_40%,_rgba(0,0,0,0.3)_100%)]" />
                        </div>
                        <div className="space-y-1">
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">Sabrin Lal Singh</h1>
                            <div className="text-primary font-mono text-sm font-bold uppercase tracking-wider flex items-center gap-1">
                                <span className="opacity-50">#</span>
                                <Typewriter
                                    text={["Data Engineer", "Data Quality Engineer", "Data Analytics Analyst", "Analytics Strategist", "Data Analytics Engineer"]}
                                    speed={80}
                                    deleteSpeed={40}
                                    waitTime={1500}
                                />
                            </div>
                            <div className="flex items-center gap-4 pt-2">
                                <motion.div className="flex items-center gap-2 px-2 py-1 rounded bg-primary/10 border border-primary/20 text-[10px] font-mono text-primary">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                                    OPERATIONAL
                                </motion.div>
                                <div className="text-[10px] font-mono text-muted-foreground">KATHMANDU, NP</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-3 max-w-2xl">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight break-words hyphens-auto">
                        Engineering <span className="text-primary">Data Integrity</span> at Scale.
                    </h2>
                    <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed">
                        I build high-throughput, resilient data systems for healthcare and enterprise environments, specializing in <span className="text-foreground font-semibold">Databricks</span> and <span className="text-foreground font-semibold">AWS Redshift</span>.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center xl:justify-start gap-3 w-full sm:w-auto">
                    <a href="#projects" className="w-full sm:w-auto">
                        <Button className="w-full sm:w-auto h-12 px-8 rounded-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20">
                            View Infrastructure
                        </Button>
                    </a>
                    <a href="https://www.upwork.com/freelancers/~019c63b7c8441f7142" target="_blank" rel="noopener noreferrer" className="w-full sm:w-auto">
                        <Button variant="outline" className="w-full sm:w-auto h-12 px-8 rounded-xl font-bold border-border bg-background hover:bg-muted">
                            <SiUpwork className="w-4 h-4 mr-2 text-[#14a800]" />
                            Hire Expert
                        </Button>
                    </a>
                </div>

                {/* Impact stat strip */}
                <div className="grid grid-cols-2 gap-3 pt-2 border-t border-border/30">
                    {[
                        { value: `${yearsOfExp}+`, label: "Years Exp." },
                        { value: "100%", label: "HIPAA Rate" },
                    ].map((stat, i) => (
                        <div key={i} className="text-center">
                            <div className="text-lg sm:text-xl font-bold text-primary font-mono">{stat.value}</div>
                            <div className="text-[10px] sm:text-xs text-muted-foreground uppercase tracking-wider">{stat.label}</div>
                        </div>
                    ))}
                </div>
                <div className="flex flex-wrap justify-center xl:justify-start gap-2 pt-2">
                    {[
                        { icon: Database, label: "Data Lake" },
                        { icon: Cpu, label: "Spark Ops" },
                        { icon: ShieldCheck, label: "HIPAA SEC" },
                        { icon: Code2, label: "Automation" }
                    ].map((badge, i) => (
                        <div key={i} className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/30 border border-border/50 text-[11px] font-mono text-muted-foreground">
                            <badge.icon className="w-3.5 h-3.5 text-primary" />
                            {badge.label}
                        </div>
                    ))}
                </div>
            </motion.div>

            {/* Right Column: Interactive Terminal */}
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="w-full xl:w-1/2"
            >
                <div
                    className="bg-[#0c0c0e] rounded-2xl border border-border shadow-2xl font-mono text-sm overflow-hidden group"
                    onClick={() => inputRef.current?.focus()}
                >
                    {/* Header */}
                    <div className="bg-zinc-900/50 px-4 py-3 border-b border-border flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Terminal className="w-4 h-4 text-emerald-500" />
                            <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold">Systems Dashboard</span>
                        </div>
                        <div className="flex gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                            <div className="w-2.5 h-2.5 rounded-full bg-zinc-800" />
                            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/50" />
                        </div>
                    </div>

                    {/* Window Content */}
                    <div ref={terminalRef} className="p-4 sm:p-6 h-[260px] sm:h-[320px] md:h-[380px] overflow-y-auto space-y-2 text-zinc-300 relative scrollbar-hide">
                        {lines.map((line, i) => (
                            <div key={i} className="flex gap-2">
                                {line.startsWith(">") ? (
                                    <>
                                        <span className="text-emerald-500">$</span>
                                        <span className="text-white">{line.replace("> ", "")}</span>
                                    </>
                                ) : (
                                    <span className={i === 0 ? "text-zinc-500 text-[11px] italic" : ""}>{line}</span>
                                )}
                            </div>
                        ))}

                        {!isAutoTyping && (
                            <div className="flex items-center">
                                <span className="text-emerald-500 mr-2">$</span>
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={currentCommand}
                                    onChange={(e) => setCurrentCommand(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleCommand(currentCommand)}
                                    className="bg-transparent border-none outline-none flex-1 text-white"
                                    autoFocus
                                />
                                <motion.span
                                    animate={{ opacity: [1, 0] }}
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="w-2 h-4 bg-emerald-500"
                                />
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="bg-zinc-900/30 px-4 py-2 border-t border-border flex items-center justify-between text-[10px] text-zinc-600">
                        <div className="flex gap-4">
                            <span>ENV: PRODUCTION</span>
                            <span>NODE: DATA_NODE_01</span>
                            <span className="hidden sm:inline text-emerald-500/50 animate-pulse font-bold">TYPE 'HELP' FOR COMMANDS</span>
                        </div>
                        <span>v3.5.0-STABLE</span>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

// Supporting Button component if not available, or just use regular button
const Button = ({ children, className, variant, ...props }: any) => {
    const variants = {
        primary: "bg-primary text-primary-foreground",
        outline: "border border-border bg-transparent hover:bg-muted"
    };
    const v = variant === "outline" ? variants.outline : variants.primary;
    return (
        <button className={`inline-flex items-center justify-center transition-all ${v} ${className}`} {...props}>
            {children}
        </button>
    );
};
