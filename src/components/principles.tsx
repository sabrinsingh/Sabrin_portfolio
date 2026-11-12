import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, ChevronRight } from "lucide-react";

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
    title: "Validation as code",
    tagline: "Correctness before throughput",
    description:
      "Bad data should not reach a dashboard and get noticed a week later. Every load passes the same assertions before it writes to Silver or Gold.",
    rule: "No partition reaches an executive dashboard without passing its assertions.",
  },
  {
    id: "02",
    title: "Automate the repetitive",
    tagline: "Zero manual reconciliation",
    description:
      "If an engineer checks a schema, a null rate or a row count twice, that check becomes a test suite. Test suites do not get tired.",
    rule: "Every manual reconciliation I run twice becomes a CI assertion.",
  },
  {
    id: "03",
    title: "Deterministic reconciliation",
    tagline: "Stored procedures and checks on both sides",
    description:
      "Clinical and claims records go wrong quietly when a number drifts. Every boundary between source and warehouse gets a checksum that compares both sides.",
    rule: "Checksums balance, or the batch goes to quarantine and someone gets told.",
  },
];

export function ArchitecturalPrinciples() {
  const [activeId, setActiveId] = useState<string>("01");

  const handleSelect = (id: string) => {
    setActiveId(id);
  };

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <p className="eyebrow">Architectural philosophy</p>
        <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-50">
          How I run a data pipeline
        </h2>
        <p className="text-slate-400 text-sm max-w-2xl">
          Three rules from nine years of production healthcare data work, where a quiet failure becomes a wrong number in a report.
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
                className={`w-full text-left p-4 rounded-xl border transition-colors duration-150 flex items-center justify-between group ${
                  isActive
                    ? "bg-slate-900 border-slate-700"
                    : "bg-slate-950/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/40"
                }`}
              >
                <div className="flex items-center gap-4 min-w-0">
                  <span
                    className={`font-mono text-xs px-2 py-0.5 rounded font-medium ${
                      isActive
                        ? "bg-signal text-ink-950"
                        : "bg-slate-900 text-slate-400 group-hover:text-slate-300"
                    }`}
                  >
                    {p.id}
                  </span>
                  <div className="min-w-0">
                    <p
                      className={`text-sm font-medium truncate transition-colors ${
                        isActive ? "text-slate-50" : "text-slate-300 group-hover:text-slate-100"
                      }`}
                    >
                      {p.title}
                    </p>
                    <p className="text-xs font-mono text-slate-400 truncate mt-0.5">
                      {p.tagline}
                    </p>
                  </div>
                </div>

                <ChevronRight
                  className={`w-4 h-4 transition-transform shrink-0 ${
                    isActive
                      ? "text-slate-400 translate-x-1"
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
                  className="panel rounded-[14px] p-6 sm:p-8 space-y-6"
                >
                  <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-2xl font-medium text-slate-400">
                        // {current.id}
                      </span>
                      <div>
                        <h3 className="text-lg font-medium text-slate-100">{current.title}</h3>
                        <p className="font-mono text-xs text-slate-400">{current.tagline}</p>
                      </div>
                    </div>
                    <ShieldCheck className="w-5 h-5 text-slate-400 shrink-0" />
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {current.description}
                  </p>

                  <div className="p-4 rounded-[10px] bg-slate-950 border border-slate-800 font-mono text-xs text-slate-200 flex items-start gap-3">
                    <span className="text-slate-400 shrink-0">Rule</span>
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
