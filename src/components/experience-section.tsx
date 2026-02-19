import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experience } from "@/data/portfolio";

export const ExperienceSection = () => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <section id="experience" className="py-24 bg-background border-t border-border/50">
            <div className="container mx-auto px-6 max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="flex items-center gap-4 mb-12"
                >
                    <span className="text-primary font-mono text-xl">02.</span>
                    <h2 className="text-3xl md:text-4xl font-bold text-foreground">Career Engineering</h2>
                    <div className="h-[1px] bg-border/50 flex-1 hidden md:block" />
                </motion.div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Tabs List */}
                    <div className="flex md:flex-col overflow-x-auto md:overflow-x-visible scroll-touch border-b md:border-b-0 md:border-l border-border/50 min-w-max pb-px md:pb-0">
                        {experience.map((job, idx) => (
                            <button
                                key={idx}
                                onClick={() => setActiveTab(idx)}
                                className={`px-4 md:px-6 py-3 text-left text-sm font-mono transition-all duration-300 border-b-2 md:border-b-0 md:border-l-2 -mb-[2px] md:mb-0 md:-ml-[2px] whitespace-nowrap ${activeTab === idx
                                    ? "text-primary border-primary bg-primary/10"
                                    : "text-muted-foreground border-transparent hover:text-primary hover:bg-primary/5"
                                    }`}
                            >
                                {job.company}
                            </button>
                        ))}
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 min-h-[280px] sm:min-h-[380px]">
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={activeTab}
                                initial={{ opacity: 0, x: 10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <div>
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                        <h3 className="text-xl md:text-2xl font-bold text-foreground">
                                            {experience[activeTab].role}{" "}
                                            <span className="text-primary">
                                                @ {experience[activeTab].company}
                                            </span>
                                        </h3>
                                        {/* Impact Badge */}
                                        {activeTab === 0 && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30">+30% Throughput</span>}
                                        {activeTab === 2 && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-accent/20 text-accent border border-accent/30">40% Scalability</span>}
                                        {activeTab === 3 && <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-primary/20 text-primary border border-primary/30">35% Latency ↓</span>}
                                    </div>
                                    <p className="text-sm font-mono text-muted-foreground mt-1">
                                        {experience[activeTab].period}
                                    </p>
                                    <p className="text-xs text-muted-foreground/70 mt-0.5 italic">
                                        {experience[activeTab].location}
                                    </p>
                                </div>

                                <ul className="space-y-4 pt-4">
                                    {experience[activeTab].highlights.map((highlight, hidx) => (
                                        <li key={hidx} className="flex gap-3 text-muted-foreground/90">
                                            <span className="text-primary mt-1.5 text-xs">▹</span>
                                            <span className="leading-relaxed">{highlight}</span>
                                        </li>
                                    ))}
                                </ul>
                            </motion.div>
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
