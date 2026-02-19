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

export const SkillsSection = () => {
    const yearsOfExp = calculateYearsOfExperience();

    return (
        <section id="skills" className="py-16 md:py-24 bg-muted/20">
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
                            Skills & <span className="text-primary">Expertise</span>
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

                    {/* Skill Cards Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                        {skills.map((skill, idx) => {
                            const Icon = iconMap[skill.category] || FaDatabase;
                            const pct = proficiency[skill.category] ?? 80;

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, y: 16 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="bg-card border border-border/60 rounded-xl p-3 sm:p-5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 group flex flex-col h-full"
                                >
                                    {/* Header */}
                                    <div className="flex flex-col items-start gap-2 mb-3">
                                        <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                                            <Icon className="w-4 h-4 text-primary" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-[11px] sm:text-xs text-foreground uppercase tracking-wider">{skill.category}</h3>
                                            <span className="text-[10px] font-mono text-primary font-bold">{pct}%</span>
                                        </div>
                                    </div>

                                    {/* Proficiency bar */}
                                    <div className="mb-3">
                                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${pct}%` }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 1, delay: idx * 0.1 + 0.3, ease: "easeOut" }}
                                                className="h-full bg-primary rounded-full"
                                            />
                                        </div>
                                    </div>

                                    {/* Skill chips */}
                                    <div className="flex flex-wrap gap-1 mt-auto">
                                        {skill.items.slice(0, 3).map((item, i) => (
                                            <span
                                                key={i}
                                                className="text-[9px] font-mono px-1.5 py-0.5 rounded-sm bg-secondary/50 text-muted-foreground border border-border/40"
                                            >
                                                {item}
                                            </span>
                                        ))}
                                        {skill.items.length > 3 && (
                                            <span className="text-[9px] font-mono text-primary/60 font-bold">+{skill.items.length - 3}</span>
                                        )}
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>


                </div>
            </div>
        </section>
    );
};
