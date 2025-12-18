import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
    id: number;
    title: string;
    category: string;
    description: string;
    longDescription?: string;
    technologies: string[];
    impact: string;
}

interface ProjectModalProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    if (!project) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50"
                    />
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        className="fixed left-[50%] top-[50%] z-50 w-full max-w-2xl translate-x-[-50%] translate-y-[-50%] p-4"
                    >
                        <div className="bg-card border border-border rounded-xl shadow-xl overflow-hidden max-h-[90vh] flex flex-col">
                            <div className="relative h-48 bg-muted flex items-center justify-center">
                                {/* Placeholder for project image */}
                                <div className="text-4xl">🚀</div>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-4 rounded-full bg-background/50 hover:bg-background"
                                    onClick={onClose}
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="p-6 overflow-y-auto">
                                <div className="flex items-start justify-between mb-4">
                                    <div>
                                        <h2 className="text-2xl font-bold mb-1">{project.title}</h2>
                                        <span className="text-sm text-muted-foreground capitalize">{project.category}</span>
                                    </div>
                                </div>

                                <div className="prose dark:prose-invert max-w-none mb-6">
                                    <p className="whitespace-pre-line">{project.longDescription || project.description}</p>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2">Impact</h3>
                                    <div className="bg-primary/10 text-primary p-3 rounded-lg border border-primary/20">
                                        {project.impact}
                                    </div>
                                </div>

                                <div className="mb-6">
                                    <h3 className="font-semibold mb-2">Tech Stack</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.technologies.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-2 py-1 bg-secondary text-secondary-foreground rounded-md text-sm"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex gap-4 pt-4 border-t border-border">
                                    <Button className="flex-1">
                                        <ExternalLink className="mr-2 h-4 w-4" /> View Live
                                    </Button>
                                    <Button variant="outline" className="flex-1">
                                        <Github className="mr-2 h-4 w-4" /> Source Code
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
