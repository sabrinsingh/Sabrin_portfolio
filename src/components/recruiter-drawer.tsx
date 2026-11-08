import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  FileText, 
  Mail, 
  Award, 
  Users, 
  Database, 
  ShieldCheck, 
  Zap, 
  Clock, 
  MapPin, 
  ExternalLink,
  CheckCircle2,
  GraduationCap
} from "lucide-react";

interface RecruiterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onCopyEmail: () => void;
  copiedEmail: boolean;
}

export function RecruiterDrawer({ isOpen, onClose, onCopyEmail, copiedEmail }: RecruiterDrawerProps) {
  // Close on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden" role="dialog" aria-modal="true" aria-label="60-Second Executive Summary">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/75 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Drawer Slide-in Panel */}
          <div className="fixed inset-y-0 right-0 max-w-full flex pl-6 sm:pl-10">
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-screen max-w-lg bg-slate-950 border-l border-slate-800 shadow-2xl flex flex-col justify-between overflow-y-auto"
            >
              {/* Drawer Header */}
              <div className="sticky top-0 z-10 bg-slate-950/90 backdrop-blur-md border-b border-slate-800/80 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
                    <Zap className="w-4 h-4 text-amber-400" />
                  </div>
                  <div>
                    <h2 className="text-sm font-semibold text-slate-100 uppercase tracking-wider font-mono">
                      60-Second Recruiter Summary
                    </h2>
                    <p className="text-[11px] text-slate-400 font-mono">Executive Briefing · Sabrin Lal Singh</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-slate-100 hover:bg-slate-900 border border-transparent hover:border-slate-800 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  aria-label="Close executive summary"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Body Content */}
              <div className="p-6 space-y-6 flex-1 text-sm text-slate-300">
                {/* Target Positions Pill */}
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-cyan-400">
                    Target Leadership Roles
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 font-mono text-xs font-semibold">
                      Data Lead
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 font-mono text-xs font-semibold">
                      Data Manager
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-800/80 border border-slate-700 text-slate-200 font-mono text-xs font-semibold">
                      Lead Data Engineer / QA Engineer
                    </span>
                  </div>
                </div>

                {/* Quantitative Impact Points */}
                <div className="space-y-3">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Key Quantitative Metrics
                  </p>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
                      <div className="text-xl font-bold font-mono text-slate-100">9+ Years</div>
                      <div className="text-xs text-slate-400">Production Experience</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
                      <div className="text-xl font-bold font-mono text-emerald-400">95% Drop</div>
                      <div className="text-xs text-slate-400">In Data Anomalies</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
                      <div className="text-xl font-bold font-mono text-cyan-400">50M+ / Day</div>
                      <div className="text-xs text-slate-400">Ingestion Throughput</div>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-900/40 border border-slate-800/80">
                      <div className="text-xl font-bold font-mono text-slate-100">8 Engineers</div>
                      <div className="text-xs text-slate-400">Mentored at Techkraft</div>
                    </div>
                  </div>
                </div>

                {/* Leadership Honors & Track Record */}
                <div className="space-y-3">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Leadership Track Record
                  </p>

                  <ul className="space-y-2.5">
                    <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <GraduationCap className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-100">Dual Technical &amp; Business Pedigree:</strong> MBA (KFA / Lincoln University, <span className="text-emerald-400 font-semibold">3.78 GPA</span>) + Bachelor&apos;s in Computer Engineering (Tribhuvan University).
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-100">Best Employee Award 2023</strong> (Techkraft Inc.) for outstanding technical leadership, cross-functional delivery, and mentorship.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-100">Engineered Delivery Teams:</strong> Guided 8 data/software engineers through sprint planning, architecture reviews, and quality assertion standards.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-100">Scale & Optimization:</strong> Slashing AWS Redshift query latency by 35% and boosting PySpark pipeline throughput by 30% under strict SLAs.
                      </span>
                    </li>
                    <li className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                      <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-slate-100">Healthcare Governance:</strong> Deep mastery of HIPAA data compliance, clinical encounter processing, claims lifecycle, and zero-defect data pipelines.
                      </span>
                    </li>
                  </ul>
                </div>

                {/* Production Tech Arsenal */}
                <div className="space-y-2">
                  <p className="text-[11px] font-mono uppercase tracking-widest text-slate-400">
                    Primary Production Stack
                  </p>
                  <div className="flex flex-wrap gap-1.5 font-mono text-xs">
                    {["Databricks", "Delta Lake", "Snowflake", "AWS Redshift", "PySpark", "Python", "PostgreSQL", "dbt", "Great Expectations", "HIPAA", "Docker", "CI/CD"].map((tech) => (
                      <span key={tech} className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Availability & Location */}
                <div className="p-3.5 rounded-xl bg-slate-900/50 border border-slate-800 text-xs font-mono space-y-1.5">
                  <div className="flex items-center gap-2 text-slate-200">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Kathmandu, Nepal · Available for Global Remote & Relocation</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Status: Available for Manager and Lead Roles</span>
                  </div>
                </div>
              </div>

              {/* Drawer Footer Actions */}
              <div className="sticky bottom-0 bg-slate-950/95 backdrop-blur-md border-t border-slate-800 p-6 space-y-3">
                <a
                  href="/Sabrin_Singh_Resume.pdf"
                  download="Sabrin_Lal_Singh_CV.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-cyan-400 text-slate-950 font-semibold text-sm hover:bg-cyan-300 transition-colors shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                >
                  <FileText className="w-4 h-4" />
                  <span>Download Full CV (PDF)</span>
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={onCopyEmail}
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-cyan-400 font-mono text-xs transition-colors"
                  >
                    {copiedEmail ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400">Email Copied!</span>
                      </>
                    ) : (
                      <>
                        <Mail className="w-3.5 h-3.5 text-cyan-400" />
                        <span>Copy Email</span>
                      </>
                    )}
                  </button>

                  <a
                    href="mailto:sabrinlalsingh@gmail.com?subject=Leadership%20Role%20Inquiry%20%E2%80%94%20Sabrin%20Singh"
                    className="inline-flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg bg-slate-900 border border-slate-800 text-slate-200 hover:text-emerald-400 font-mono text-xs transition-colors"
                  >
                    <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Email Direct</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}

