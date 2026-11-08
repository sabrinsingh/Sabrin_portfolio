import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronRight, Binary } from "lucide-react";

interface Principle {
  id: string;
  title: string;
  tagline: string;
  description: string;
  rule: string;
}

const PRINCIPLES: Principle[] = [
  {
    id: "01",
    title: "Validation as Code",
    tagline: "Correctness before throughput",
    description:
      "Data quality is not an after-the-fact monitoring alert; it is a fundamental unit of software engineering. Every ingestion flight path must carry deterministic, automated assertion gates before writing to Silver or Gold partitions.",
    rule: "Assertion Rule: Never allow an untyped or unvalidated partition into an executive dashboard.",
  },
  {
    id: "02",
    title: "Automate the Repetitive",
    tagline: "Zero manual reconciliation",
    description:
      "Turn repeatable validation and operational checks into deterministic test suites. If a human engineer inspects a schema, null frequency, or row count twice, an automated gate should check it forever.",
    rule: "Operational Rule: Every recurring manual reconciliation is an unbuilt CI/CD assertion gate.",
  },
  {
    id: "03",
    title: "Auditable Lineage",
    tagline: "From raw telemetry to executive metric",
    description:
      "Maintain strict visibility into where raw bytes originate, how transformations mutate types, and where downstream aggregates land. Full lineage tracking is how enterprise compliance and stakeholder trust are maintained.",
    rule: "Lineage Rule: Every downstream metric must trace back to its raw ingestion batch and partition ID.",
  },
  {
    id: "04",
    title: "Engineer for Failure",
    tagline: "Idempotent retries & ACID guarantees",
    description:
      "Distributed networks and upstream healthcare feeds will inevitably drop or corrupt batches. Architect pipelines with idempotent restarts, isolated dead-letter quarantine queues, and Delta Lake ACID transaction safety.",
    rule: "Failure Rule: A pipeline failure must be entirely replayable without duplicating a single record.",
  },
  {
    id: "05",
    title: "Deterministic Reconciliation",
    tagline: "Automated stored procedures & zero silent errors",
    description:
      "Mission-critical clinical and claims records cannot tolerate silent failures. Every pipeline boundary must perform mathematical checksum balance checks between source systems and target lakehouse warehouses.",
    rule: "Reconciliation Rule: Balanced checksums or immediate automated quarantine notification.",
  },
];

export function ArchitecturalPrinciples() {
  const [activeId, setActiveId] = useState<string>("01");

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className="space-y-8" id="principles">
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 font-mono text-xs text-cyan-400">
          <Binary className="w-3.5 h-3.5" />
          <span>// ARCHITECTURAL PHILOSOPHY</span>
        </div>
        <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-slate-50">
          Five Non-Negotiable Engineering Laws
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          Core engineering disciplines honed across 9+ years building high-throughput production data systems where silent failure is not an option.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left List of Principles */}
        <div className="lg:col-span-6 space-y-2">
          {PRINCIPLES.map((p) => {
            const isActive = activeId === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => handleSelect(p.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center justify-between group ${
                  isActive
                    ? "bg-slate-900 border-cyan-500/50 shadow-lg shadow-cyan-500/5"
                    : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                      isActive
                        ? "bg-cyan-400 text-slate-950"
                        : "bg-slate-900 text-slate-500 group-hover:text-slate-300"
                    }`}
                  >
                    {p.id}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-semibold truncate transition-colors ${
                        isActive ? "text-slate-50" : "text-slate-300 group-hover:text-slate-100"
                      }`}
                    >
                      {p.title}
                    </p>
                    <p className="text-xs font-mono text-slate-500 truncate mt-0.5">
                      {p.tagline}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform shrink-0 ${
                    isActive
                      ? "text-cyan-400 translate-x-1"
                      : "text-slate-600 group-hover:text-slate-400"
                  }`}
                />
              </button>
            );
          })}
        </div>

        {/* Right Active Detail Card */}
        <div className="lg:col-span-6">
          <AnimatePresence mode="wait">
            {(() => {
              const current = PRINCIPLES.find((p) => p.id === activeId) || PRINCIPLES[0];
              return (
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-md space-y-6 shadow-xl"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-2xl font-bold text-cyan-400">
                        // {current.id}
                      </span>
                      <div>
                        <h3 className="text-lg font-bold text-slate-100">{current.title}</h3>
                        <p className="font-mono text-xs text-emerald-400">{current.tagline}</p>
                      </div>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {current.description}
                  </p>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800/80 font-mono text-xs text-cyan-300/90 flex items-start gap-3">
                    <span className="text-cyan-400 font-bold shrink-0">LAW:</span>
                    <span>{current.rule}</span>
                  </div>
                </motion.div>
              );
            })()}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
