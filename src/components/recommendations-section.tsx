import { motion } from "framer-motion";
import { Quote, Terminal, User, Building2, Briefcase } from "lucide-react";
import { recommendations } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecommendationsSection() {
    return (
        <section id="recommendations" className="py-20 md:py-32 bg-background relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ scale: [1, 1.15, 1], opacity: [0.2, 0.4, 0.2] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="flex items-center justify-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase font-mono">
                        <Terminal className="w-4 h-4" />
                        <span>Professional Endorsements</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
                        What People <span className="gradient-text">Say</span>
                    </h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Feedback received from colleagues, managers, and clients I've had the privilege to work with.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
                    {recommendations.map((rec, idx) => (
                        <motion.div
                            key={rec.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.15 }}
                        >
                            <Card className="h-full glass-card card-hover-glow holo-shimmer group border-border/30">
                                <CardContent className="p-5 sm:p-8 flex flex-col h-full gap-4 sm:gap-6">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                            <Quote className="w-6 h-6 rotate-180" />
                                        </div>
                                        <Badge variant="secondary" className="font-mono text-xs">
                                            ref: {rec.id.toString().toUpperCase().substring(0, 6)}
                                        </Badge>
                                    </div>
                                    <div className="space-y-4">
                                        <blockquote className="text-sm sm:text-base md:text-lg italic text-foreground leading-relaxed">
                                            "{rec.text}"
                                        </blockquote>
                                    </div>

                                    <div className="pt-6 border-t border-border/30 mt-auto">
                                        <div className="flex items-center gap-4">
                                            {/* Gradient avatar */}
                                            <div className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg"
                                                style={{
                                                    background: `linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))`
                                                }}
                                            >
                                                {rec.author.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground flex items-center gap-2">
                                                    {rec.author}
                                                </h4>
                                                <div className="text-sm text-primary font-medium flex items-center gap-1.5 mt-0.5">
                                                    <Briefcase className="w-3 h-3" />
                                                    {rec.role}
                                                </div>
                                                <div className="text-xs text-muted-foreground flex items-center gap-3 mt-1.5">
                                                    <span className="flex items-center gap-1">
                                                        <Building2 className="w-3 h-3" />
                                                        {rec.company}
                                                    </span>
                                                    <span className="w-1 h-1 rounded-full bg-muted-foreground/50"></span>
                                                    <span className="flex items-center gap-1">
                                                        <User className="w-3 h-3" />
                                                        {rec.relation}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
