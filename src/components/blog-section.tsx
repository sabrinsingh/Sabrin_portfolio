import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/portfolio";

export function BlogSection() {
    return (
        <section id="blog" className="py-20 bg-muted/30">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl font-bold mb-4">Thoughts & Insights</h2>
                    <p className="text-muted-foreground max-w-2xl mx-auto">
                        Sharing my experiences and learnings in Data Engineering.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {blogPosts.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col h-full"
                        >
                            <div className="p-6 flex-1 flex flex-col">
                                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
                                    <div className="flex items-center gap-1">
                                        <Calendar className="h-3 w-3" />
                                        {post.date}
                                    </div>
                                    <div className="flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {post.readTime}
                                    </div>
                                </div>

                                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>

                                <p className="text-muted-foreground text-sm mb-4 flex-1">
                                    {post.excerpt}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-6">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-xs"
                                        >
                                            {tag}
                                        </span>
                                    ))}
                                </div>

                                <Button variant="ghost" className="w-full justify-between group mt-auto">
                                    Read Article
                                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
