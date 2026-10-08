import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Mail, FileText, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function RecruiterModal() {
    const [open, setOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setMounted(true);
    }, []);

    // Keyboard shortcut for easy closing
    const handleClose = () => setOpen(false);

    const modalContent = (
        <AnimatePresence>
            {open && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm"
                        onClick={handleClose}
                    />
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-[101] w-full max-w-sm bg-card border-l border-border shadow-2xl flex flex-col overflow-y-auto"
                    >
                        <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/30 sticky top-0 z-10">
                            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                Recruiter Overview
                            </h2>
                            <button
                                onClick={handleClose}
                                className="p-1.5 rounded-md bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-8 flex-1">
                            <div>
                                <h3 className="font-display font-bold text-2xl text-foreground mb-1">Sabrin Lal Singh</h3>
                                <p className="text-primary font-medium">Data QA &amp; Analytics Engineer</p>
                            </div>

                            <div className="space-y-4 font-mono text-xs leading-relaxed">
                                <div className="flex flex-col gap-1">
                                    <span className="text-muted-foreground uppercase">Experience</span>
                                    <span className="text-foreground/90">8+ Years (Cotiviti, Techkraft, CoWrkr, Cedar Gate)</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-muted-foreground uppercase">Focus</span>
                                    <span className="text-foreground/90">Data Engineering, Pipeline QA, AI Governance</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-muted-foreground uppercase">Core Stack</span>
                                    <span className="text-foreground/90 leading-normal">SQL, Python, PySpark, Databricks, Snowflake, AWS, Great Expectations</span>
                                </div>
                                <div className="flex flex-col gap-1">
                                    <span className="text-muted-foreground uppercase">Select Work</span>
                                    <span className="text-foreground/90 leading-normal">50M+ row Medallion Lakehouse, 35% Redshift Query Latency Cut, 100% HIPAA AI Compliance</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border flex flex-col gap-3">
                                <a href="mailto:sabrinlalsingh@gmail.com?subject=Portfolio Inquiry — Sabrin Singh" className="btn-primary py-3 justify-center text-sm">
                                    <Mail className="w-4 h-4 mr-2" /> Email Sabrin
                                </a>
                                <a href="/Sabrin_Singh_Resume.pdf" download className="btn-outline py-3 justify-center text-sm">
                                    <FileText className="w-4 h-4 mr-2" /> Download Resume
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-all duration-200 font-mono text-xs uppercase tracking-widest mr-2 shadow-sm shadow-primary/20"
                aria-label="Open Recruiter Profile"
            >
                <Briefcase className="w-3.5 h-3.5" />
                Recruiter
            </button>
            {mounted ? createPortal(modalContent, document.body) : null}
        </>
    );
}
