import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { skills, calculateYearsOfExperience } from "@/data/portfolio";
import { FaDatabase, FaBuilding, FaCode, FaCogs } from "react-icons/fa";

// Map proficiency to a percentage
const proficiency: Record<string, number> = {
    "Data Engineering": 95,
    "Cloud & Infrastructure": 88,
    "Languages & Tools": 90,
    "AI & Data Quality": 82,
};

const iconMap: Record<string, any> = {
    "Data Engineering": FaDatabase,
    "Cloud & Infrastructure": FaBuilding,
    "Languages & Tools": FaCode,
    "AI & Data Quality": FaCogs,
};

// Animated circular progress ring
const ProgressRing = ({ percent, size = 56, strokeWidth = 4, delay = 0 }: { percent: number; size?: number; strokeWidth?: number; delay?: number }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;

    return (
        <svg width={size} height={size} className="transform -rotate-90">
            <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="hsl(var(--border))"
                strokeWidth={strokeWidth}
                fill="none"
                className="opacity-30"
            />
            <motion.circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                stroke="url(#progressGradient)"
                strokeWidth={strokeWidth}
                fill="none"
                strokeLinecap="round"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                whileInView={{ strokeDashoffset: circumference - (percent / 100) * circumference }}
                viewport={{ once: true }}
                transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
            />
            <defs>
                <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--primary))" />
                    <stop offset="100%" stopColor="hsl(var(--accent))" />
                </linearGradient>
            </defs>
        </svg>
    );
};

// Bento grid: first & last items span 2 columns
const getBentoSpan = (idx: number, total: number) => {
    if (total === 4) {
        // 2 cols on md: first item spans full, rest normal. On lg: bento layout
        if (idx === 0) return "md:col-span-2 lg:col-span-2";
        if (idx === 3) return "md:col-span-2 lg:col-span-2";
    }
    return "";
};

const SpotlightCard = ({ children, className, idx }: { children: React.ReactNode, className: string, idx: number }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        setMousePosition({ x, y });
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            onMouseMove={handleMouseMove}
            style={{
                "--mouse-x": `${mousePosition.x}px`,
                "--mouse-y": `${mousePosition.y}px`,
            } as any}
            className={`spotlight-card ${className}`}
        >
            {children}
        </motion.div>
    );
};

export const SkillsSection = () => {
    const yearsOfExp = calculateYearsOfExperience();

    return (
        <section id="skills" className="py-16 md:py-24 bg-background relative overflow-hidden">
            {/* Background pattern */}
            <div className="absolute inset-0 bg-dot-pattern opacity-20 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6">
                <div className="max-w-5xl mx-auto">
                    {/* SQL-style header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-10"
                    >
                        <div className="inline-block px-3 py-1 mb-4 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-mono font-bold tracking-widest uppercase">
                            Technical Arsenal
                        </div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight mb-3">
                            Skills & <span className="gradient-text">Expertise</span>
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto">
                            {yearsOfExp}+ years building production data systems across cloud, distributed compute, and AI infrastructure.
                        </p>
                    </motion.div>

                    {/* Query badge */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="mb-6 font-mono text-xs text-muted-foreground/60 px-1"
                    >
                        <span className="text-primary/70">SELECT</span> * <span className="text-primary/70">FROM</span> skills{" "}
                        <span className="text-primary/70">WHERE</span> proficiency <span className="text-primary/70">&gt;</span> 80{" "}
                        <span className="text-primary/70">ORDER BY</span> impact <span className="text-primary/70">DESC</span>;
                    </motion.div>

                    {/* Bento Skill Cards Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {skills.map((skill, idx) => {
                            const Icon = iconMap[skill.category] || FaDatabase;
                            const pct = proficiency[skill.category] ?? 80;
                            const bentoSpan = getBentoSpan(idx, skills.length);

                            return (
                                <SpotlightCard
                                    key={idx}
                                    idx={idx}
                                    className={`glass-card p-5 card-hover-glow group flex flex-col h-full ${bentoSpan}`}
                                >
                                    {/* Header with circular progress */}
                                    <div className="flex items-center gap-4 mb-4 z-10 relative">
                                        <div className="relative">
                                            <ProgressRing percent={pct} delay={idx * 0.1} />
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-primary" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-xs sm:text-sm text-foreground uppercase tracking-wider">{skill.category}</h3>
                                            <span className="text-[11px] font-mono gradient-text-gold font-bold">{pct}% Proficiency</span>
                                        </div>
                                    </div>

                                    {/* Skill chips — show all */}
                                    <div className="flex flex-wrap gap-1.5 mt-auto z-10 relative">
                                        {skill.items.map((item, i) => (
                                            <motion.span
                                                key={i}
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                whileInView={{ opacity: 1, scale: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ delay: idx * 0.1 + i * 0.05 }}
                                                className="text-[10px] font-mono px-2 py-1 rounded-md bg-secondary/60 text-muted-foreground border border-border/40 hover:border-primary/50 hover:text-primary transition-colors cursor-default"
                                            >
                                                {item}
                                            </motion.span>
                                        ))}
                                    </div>
                                </SpotlightCard>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
