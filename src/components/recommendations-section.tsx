import { motion } from "framer-motion";
import { Quote, Terminal, User, Building2, Briefcase } from "lucide-react";
import { recommendations } from "@/data/portfolio";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function RecommendationsSection() {
    return (
        <section id="recommendations" className="py-20 md:py-32 bg-muted/20 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-30 pointer-events-none">
                <div className="absolute top-10 left-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>
            </div>

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="flex items-center justify-center gap-2 text-primary font-semibold text-sm tracking-wider uppercase">
                        <Terminal className="w-4 h-4" />
                        <span>Professional Endorsements</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Recommendations</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Feedback received from colleagues, managers, and clients I've had the privilege to work with.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {recommendations.map((rec, idx) => (
                        <motion.div
                            key={rec.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <Card className="h-full bg-card/50 backdrop-blur-sm border-border/60 hover:border-primary/40 transition-all duration-300 hover:shadow-lg group">
                                <CardContent className="p-8 flex flex-col h-full gap-6">
                                    <div className="flex justify-between items-start">
                                        <div className="p-3 bg-primary/10 rounded-xl text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                                            <Quote className="w-6 h-6 rotate-180" />
                                        </div>
                                        <Badge variant="secondary" className="font-mono text-xs">
                                            {/* Simulate a commit hash or ID */}
                                            ref: {rec.id.toString().toUpperCase().substring(0, 6)}
                                        </Badge>
                                    </div>

                                    <blockquote className="text-lg text-muted-foreground leading-relaxed italic flex-grow">
                                        "{rec.text}"
                                    </blockquote>

                                    <div className="pt-6 border-t border-border/50">
                                        <div className="flex items-center gap-4">
                                            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                                                {rec.author.charAt(0)}
                                            </div>
                                            <div>
                                                <h4 className="font-bold text-foreground flex items-center gap-2">
                                                    {rec.author}
                                                    <a
                                                        href="#"
                                                        className="text-muted-foreground hover:text-[#0077b5] transition-colors"
                                                        aria-label="LinkedIn Profile"
                                                    >
                                                        {/* Placeholder for LinkedIn link if available later */}
                                                    </a>
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
