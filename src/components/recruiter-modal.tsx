import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { X, Mail, FileText, Briefcase } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function RecruiterModal() {
    const [open, setOpen] = useState(false);

    const handleClose = () => setOpen(false);

    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") handleClose();
        };
        document.addEventListener("keydown", onKey);
        return () => document.removeEventListener("keydown", onKey);
    }, [open]);

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
                        <div className="p-4 border-b border-border flex items-center justify-between bg-secondary/40 sticky top-0 z-10">
                            <h2 className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                Quick Overview
                            </h2>
                            <button
                                onClick={handleClose}
                                className="p-1.5 rounded bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                                aria-label="Close modal"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="p-6 space-y-6 flex-1">
                            <div>
                                <h3 className="font-display font-bold text-2xl text-foreground">Sabrin Lal Singh</h3>
                                <p className="text-primary text-sm font-medium mt-0.5">Senior Data QA &amp; Analytics Engineer</p>
                            </div>

                            <div className="space-y-4 font-mono text-xs leading-relaxed divide-y divide-border/60">
                                <div className="flex flex-col gap-1 pt-3 first:pt-0">
                                    <span className="text-muted-foreground uppercase text-[10px]">Track Record</span>
                                    <span className="text-foreground">Cotiviti, Cedar Gate, Techkraft, CoWrkr (9+ Years)</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-3">
                                    <span className="text-muted-foreground uppercase text-[10px]">Core Competency</span>
                                    <span className="text-foreground">Automated Lakehouse Gates, SQL Stored Procedures, Claims Reconciliation</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-3">
                                    <span className="text-muted-foreground uppercase text-[10px]">Core Stack</span>
                                    <span className="text-foreground">PySpark, Delta Lake, AWS Redshift, Databricks, PostgreSQL, Python</span>
                                </div>
                                <div className="flex flex-col gap-1 pt-3">
                                    <span className="text-muted-foreground uppercase text-[10px]">Production Impact</span>
                                    <span className="text-foreground">50M+ row Medallion Lakehouse, 35% Redshift Query Latency Cut, 100% HIPAA Claims Integrity</span>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-border flex flex-col gap-3">
                                <a href="mailto:sabrinlalsingh@gmail.com?subject=Portfolio Inquiry — Sabrin Singh" className="btn-primary py-2.5 justify-center text-xs">
                                    <Mail className="w-4 h-4 mr-2" /> Direct Email
                                </a>
                                <a href="/Sabrin_Singh_Resume.pdf" download className="btn-outline py-2.5 justify-center text-xs">
                                    <FileText className="w-4 h-4 mr-2" /> Resume (PDF)
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
                className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono tracking-wide text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Open recruiter overview"
            >
                <Briefcase className="w-3.5 h-3.5" />
                <span>Overview</span>
            </button>
            {createPortal(modalContent, document.body)}
        </>
    );
}
