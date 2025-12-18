import { motion } from "framer-motion";
import { Database, Table, Code } from "lucide-react";
import { skills } from "@/data/portfolio";

export const SkillsSection = () => {
    return (
        <section id="skills" className="py-20 md:py-32 bg-muted/20">
            <div className="container mx-auto px-6">
                <div className="max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="mb-8 flex items-center gap-4"
                    >
                        <div className="p-3 rounded-lg bg-primary/10 text-primary">
                            <Database className="w-6 h-6" />
                        </div>
                        <div>
                            <h2 className="text-3xl font-bold font-mono">system_capabilities.sql</h2>
                            <p className="text-muted-foreground text-sm font-mono">SELECT * FROM capabilities WHERE status = 'active'</p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.98 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="rounded-xl overflow-hidden border border-border bg-card shadow-2xl"
                    >
                        {/* SQL Editor Header */}
                        <div className="bg-muted px-4 py-2 border-b border-border flex items-center justify-between font-mono text-xs text-muted-foreground">
                            <div className="flex gap-4">
                                <span className="flex items-center gap-2"><Table className="w-3 h-3" /> results_grid</span>
                                <span className="flex items-center gap-2"><Code className="w-3 h-3" /> execution_time: 0.04s</span>
                            </div>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500/20" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500/20" />
                                <div className="w-3 h-3 rounded-full bg-green-500/20" />
                            </div>
                        </div>

                        {/* Results Table */}
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-mono text-sm">
                                <thead className="bg-secondary/30 text-muted-foreground">
                                    <tr>
                                        <th className="p-4 border-b border-border font-medium">id</th>
                                        <th className="p-4 border-b border-border font-medium">category</th>
                                        <th className="p-4 border-b border-border font-medium">proficiency_level</th>
                                        <th className="p-4 border-b border-border font-medium">stack_items</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-border/50">
                                    {skills.map((skill, idx) => (
                                        <tr key={idx} className="hover:bg-primary/5 transition-colors group">
                                            <td className="p-4 text-muted-foreground">{idx + 1}</td>
                                            <td className="p-4 text-primary font-semibold">{skill.category}</td>
                                            <td className="p-4">
                                                <div className="w-full max-w-[100px] h-1.5 bg-secondary rounded-full overflow-hidden">
                                                    <div className="h-full bg-emerald-500 w-[95%]" />
                                                </div>
                                            </td>
                                            <td className="p-4 text-muted-foreground group-hover:text-foreground transition-colors">
                                                {"["}{skill.items.join(", ")}{"]"}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="bg-muted/30 px-4 py-2 text-xs font-mono text-muted-foreground border-t border-border">
                            {skills.length} rows returned
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
