import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Database, Layers, Activity, Terminal, Code2 } from "lucide-react";
import { Reveal } from "@/components/motion";

interface PipelineNode {
    id: string;
    label: string;
    sublabel: string;
    type: "source" | "process" | "storage" | "gate" | "sink";
    metrics: string;
    details: string;
    validation: string;
    codeRule?: string;
}

const pipelineNodes: PipelineNode[] = [
    {
        id: "SRC",
        label: "Clinical Feeds",
        sublabel: "Extracts and payloads",
        type: "source",
        metrics: "multiple sources",
        details: "Clinical and claims extracts from several source systems, arriving as files and tables on different schedules.",
        validation: "File presence and row count compared to the expected batch size.",
        codeRule: "batch_manifest.expected_rows(batch_id)",
    },
    {
        id: "ING",
        label: "Ingestion",
        sublabel: "PySpark and Redshift COPY",
        type: "process",
        metrics: "scheduled batches",
        details: "Batch loads with idempotent reruns, so a failed batch can be replayed without duplicating rows.",
        validation: "Corrupt and truncated payloads are counted and held, not silently dropped.",
        codeRule: "spark.read.option('mode', 'PERMISSIVE')",
    },
    {
        id: "LND",
        label: "Raw landing",
        sublabel: "Append-only history",
        type: "storage",
        metrics: "one row per source record",
        details: "Raw records kept as received, so a bad batch can be traced back to the payload that produced it.",
        validation: "Batch id and load timestamp required on every row.",
        codeRule: "df.filter(F.col('loaded_at').isNull()).count() == 0",
    },
    {
        id: "CUR",
        label: "Curated",
        sublabel: "Typed and deduplicated",
        type: "storage",
        metrics: "keys enforced",
        details: "Business keys normalised, types coerced, duplicate patient and claim records resolved across providers.",
        validation: "Null primary keys, duplicate claim ids and out-of-range dates are rejected.",
        codeRule: "df.filter(F.col('claim_id').isNull()).count() == 0",
    },
    {
        id: "QA",
        label: "Check gate",
        sublabel: "Blocking",
        type: "gate",
        metrics: "batch held on failure",
        details: "Row counts compared against the source, duplicates and null rates checked, and failing batches held with the failing rule named.",
        validation: "A batch does not move on until every check passes.",
        codeRule: "if failures: quarantine(df, failures)",
    },
    {
        id: "WH",
        label: "Warehouse marts",
        sublabel: "Reporting tables",
        type: "storage",
        metrics: "reports read checked data",
        details: "Modelled tables in Redshift and Databricks for clinical and operational reporting.",
        validation: "Every fact row must resolve to a dimension row.",
        codeRule: "select count(*) from facts f left join dim d using (patient_sk) where d.patient_sk is null",
    },
    {
        id: "BI",
        label: "Reporting",
        sublabel: "Clinical analytics",
        type: "sink",
        metrics: "dashboards and exports",
        details: "Reports and dashboards for clinical and operational teams.",
        validation: "Report queries reviewed for cost and runtime before release.",
        codeRule: "explain <report query>",
    },
];

export function DataPipelineVisual() {
    const [selectedNode, setSelectedNode] = useState<PipelineNode>(pipelineNodes[3]);

    const getNodeIcon = (type: PipelineNode["type"]) => {
        switch (type) {
            case "source": return <Activity className="w-4 h-4" />;
            case "process": return <Terminal className="w-4 h-4" />;
            case "storage": return <Database className="w-4 h-4" />;
            case "gate": return <ShieldCheck className="w-4 h-4" />;
            case "sink": return <Layers className="w-4 h-4" />;
        }
    };

    return (
        <>
            <div className="space-y-2">
                <p className="eyebrow">Architecture</p>
                <h2 className="text-2xl sm:text-4xl font-medium tracking-tight text-slate-50">
                    Where the gates actually sit
                </h2>
                <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
                    A record does not move on until its checks pass. Select a stage to see what is checked and where it stops.
                </p>
            </div>

            <Reveal amount={0.1}>
                <div className="panel rounded-[14px] p-6 sm:p-8">
                    {/* Stage strip: wraps on small screens instead of scrolling sideways */}
                    <div className="flex flex-wrap sm:flex-nowrap items-start justify-center sm:justify-between gap-x-4 gap-y-7">
                        {pipelineNodes.map((node) => {
                            const isSelected = selectedNode.id === node.id;
                            return (
                                <button
                                    key={node.id}
                                    type="button"
                                    onClick={() => setSelectedNode(node)}
                                    aria-pressed={isSelected}
                                    className="flex flex-col items-center gap-2 rounded-md px-1 py-1 transition-colors hover:bg-slate-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal"
                                >
                                    <span
                                        className={`flex h-9 w-9 items-center justify-center rounded-lg border transition-colors ${
                                            isSelected
                                                ? "border-slate-600 text-slate-100"
                                                : "border-slate-800 text-slate-400"
                                        }`}
                                    >
                                        {getNodeIcon(node.type)}
                                    </span>
                                    <span className={`text-xs ${isSelected ? "text-slate-100" : "text-slate-400"}`}>
                                        {node.id}
                                    </span>
                                    <span className="font-mono text-[11px] text-slate-500">{node.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Selected stage detail */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedNode.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.18, ease: "easeOut" }}
                            className="mt-8 grid grid-cols-1 gap-6 border-t border-slate-800 pt-6 md:grid-cols-3"
                        >
                            <div className="space-y-2">
                                <p className="text-xs text-slate-400">
                                    Stage {selectedNode.id} · {selectedNode.metrics}
                                </p>
                                <h3 className="text-xl font-medium text-slate-50">{selectedNode.label}</h3>
                                <p className="text-xs text-slate-400">{selectedNode.sublabel}</p>
                            </div>

                            <div className="space-y-1.5">
                                <p className="text-xs text-slate-400">What happens</p>
                                <p className="text-sm text-slate-300 leading-relaxed">{selectedNode.details}</p>
                            </div>

                            <div className="space-y-2 border-t border-slate-800 pt-4 md:border-t-0 md:border-l md:pl-6 md:pt-0">
                                <p className="flex items-center gap-1.5 text-xs text-slate-400">
                                    <CheckCircle2 className="w-3.5 h-3.5" />
                                    Checked here
                                </p>
                                <p className="border-l border-slate-800 pl-3 text-sm text-slate-300 leading-relaxed">
                                    {selectedNode.validation}
                                </p>
                                {selectedNode.codeRule && (
                                    <div className="pt-1">
                                        <p className="mb-1 flex items-center gap-1 font-mono text-[11px] text-slate-500">
                                            <Code2 className="w-3 h-3" />
                                            Rule
                                        </p>
                                        <code className="block overflow-x-auto scrollbar-hide rounded border border-slate-800 bg-slate-950/60 px-2.5 py-1.5 font-mono text-[11px] text-slate-300">
                                            {selectedNode.codeRule}
                                        </code>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-800 pt-4 text-xs text-slate-400">
                        <span className="flex items-center gap-2">
                            <span className="status-dot" aria-hidden="true" />
                            No unvalidated rows reached reporting
                        </span>
                        <span>Batch id and load timestamp kept for replay</span>
                    </div>
                </div>
            </Reveal>
        </>
    );
}
