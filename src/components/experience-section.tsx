import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/data/portfolio";
import { MapPin, Calendar, ChevronDown, ChevronUp } from "lucide-react";

const impactBadges: Record<number, { text: string; color: string }> = {
    0: { text: "+30% Throughput", color: "bg-primary/15 text-primary border-primary/30" },
    2: { text: "40% Scalability", color: "bg-accent/15 text-accent border-accent/30" },
    3: { text: "35% Latency ↓", color: "bg-primary/15 text-primary border-primary/30" },
};

export const ExperienceSection = () => {
    const [expandedIdx, setExpandedIdx] = useState<number | null>(0);

    return (
        <section id="experience" className="py-16 md:py-24 bg-background relative overflow-hidden">
            <div className="absolute inset-0 bg-dot-pattern opacity-10 pointer-events-none" />

            <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12"
                >
                    <span className="text-primary font-mono text-xl">02.</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Career <span className="gradient-text">Engineering</span></h2>
                    <div className="h-[1px] bg-border/50 flex-1 hidden md:block" />
                </motion.div>

                {/* Vertical Timeline */}
                <div className="relative">
                    {/* Timeline line */}
                    <div className="absolute left-4 md:left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-accent/30 to-border/20" />

                    <div className="space-y-6">
                        {experience.map((job, idx) => {
                            const isExpanded = expandedIdx === idx;
                            const badge = impactBadges[idx];

                            return (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="relative pl-12 md:pl-20"
                                >
                                    {/* Timeline node */}
                                    <div className="absolute left-4 md:left-8 -translate-x-1/2 top-6">
                                        <motion.div
                                            animate={isExpanded ? { scale: [1, 1.3, 1] } : {}}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className={`w-4 h-4 rounded-full border-2 transition-all duration-300 ${
                                                isExpanded
                                                    ? "bg-primary border-primary shadow-[0_0_12px_hsl(var(--primary)/0.5)]"
                                                    : "bg-background border-border hover:border-primary/50"
                                            }`}
                                        />
                                    </div>

                                    {/* Card */}
                                    <div
                                        onClick={() => setExpandedIdx(isExpanded ? null : idx)}
                                        className={`glass-card p-5 sm:p-6 cursor-pointer card-hover-glow holo-shimmer transition-all duration-300 ${
                                            isExpanded ? "ring-1 ring-primary/20" : ""
                                        }`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-1">
                                            <h3 className="text-lg md:text-xl font-bold text-foreground">
                                                {job.role}{" "}
                                                <span className="gradient-text">
                                                    @ {job.company}
                                                </span>
                                            </h3>
                                            <div className="flex items-center gap-2">
                                                {badge && (
                                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold border ${badge.color}`}>
                                                        {badge.text}
                                                    </span>
                                                )}
                                                {isExpanded ? (
                                                    <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" />
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
                                                )}
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-mono mb-3">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {job.period}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <MapPin className="w-3 h-3" />
                                                {job.location}
                                            </span>
                                        </div>

                                        <AnimatePresence>
                                            {isExpanded && (
                                                <motion.div
                                                    initial={{ opacity: 0, height: 0 }}
                                                    animate={{ opacity: 1, height: "auto" }}
                                                    exit={{ opacity: 0, height: 0 }}
                                                    transition={{ duration: 0.3, ease: "easeInOut" }}
                                                    className="overflow-hidden"
                                                >
                                                    <ul className="space-y-3 pt-3 border-t border-border/30">
                                                        {job.highlights.map((highlight, hidx) => (
                                                            <motion.li
                                                                key={hidx}
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                transition={{ delay: hidx * 0.05 }}
                                                                className="flex gap-3 text-muted-foreground/90 text-sm"
                                                            >
                                                                <span className="text-primary mt-1 text-xs">▹</span>
                                                                <span className="leading-relaxed">{highlight}</span>
                                                            </motion.li>
                                                        ))}
                                                    </ul>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
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
