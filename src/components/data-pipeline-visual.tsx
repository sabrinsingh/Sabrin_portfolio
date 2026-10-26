import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ShieldCheck, Database, Layers, ArrowRight, Activity, Terminal, Code2 } from "lucide-react";

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
        sublabel: "HL7 / FHIR / Parquet",
        type: "source",
        metrics: "50M+ rec/day",
        details: "Heterogeneous clinical records, lab telemetry, and patient encounter payloads landing into encrypted S3 raw buckets.",
        validation: "Format validation, schema registry lookup, and file MD5 hash verification.",
        codeRule: "s3_watcher.verify_checksum(file_stream, expected_md5)",
    },
    {
        id: "ING",
        label: "Ingestion Engine",
        sublabel: "PySpark & AWS Glue",
        type: "process",
        metrics: "p99 < 3.2s",
        details: "Parallel partition ingestion with strict batch idempotency, retry backoffs, and corrupt record routing.",
        validation: "Zero payload truncation check; quarantine malformed JSON/Parquet batches.",
        codeRule: "spark.read.option('mode', 'PERMISSIVE').option('columnNameOfCorruptRecord', '_corrupt')",
    },
    {
        id: "BRZ",
        label: "Bronze Delta",
        sublabel: "Append-only Lakehouse",
        type: "storage",
        metrics: "99.999% SLA",
        details: "Immutable raw history in Delta Lake with schema enforcement, time-travel auditing, and ACID isolation.",
        validation: "Delta schema constraint assertions and partition key non-null enforcement.",
        codeRule: "ALTER TABLE bronze_records ADD CONSTRAINT valid_date CHECK (event_date IS NOT NULL)",
    },
    {
        id: "SLV",
        label: "Silver Curated",
        sublabel: "Enriched & Deduplicated",
        type: "storage",
        metrics: "Dedupe: 100%",
        details: "Business keys normalized, null handling, type coercion, patient entity deduplication across clinical providers.",
        validation: "Great Expectations assertion suite covering null primary keys and data ranges.",
        codeRule: "expect_column_values_to_not_be_null(column='patient_id')",
    },
    {
        id: "QA",
        label: "Autonomous QA Gate",
        sublabel: "Blocking Verification",
        type: "gate",
        metrics: "0 Gold Defects",
        details: "Automated row count reconciliation vs source, statistical anomaly detection, and CI/CD blocking halts.",
        validation: "Hard fail threshold on null primary keys and reconciliation variances > 0.001%.",
        codeRule: "if variance_pct > 0.001: halt_pipeline_and_alert_pagerduty()",
    },
    {
        id: "GLD",
        label: "Gold Analytics",
        sublabel: "HIPAA BI Models",
        type: "storage",
        metrics: "Sub-sec queries",
        details: "Star schema data marts in AWS Redshift and Databricks SQL for executive clinical reporting and ML features.",
        validation: "Referential integrity between fact & dimension tables; 100% PII scrubber validation.",
        codeRule: "ASSERT NOT EXISTS (SELECT 1 FROM gold_facts WHERE dim_patient_sk IS NULL)",
    },
    {
        id: "BI",
        label: "Consumer Layer",
        sublabel: "Clinical Analytics",
        type: "sink",
        metrics: "30+ Analysts",
        details: "Downstream Tableau, PowerBI executive dashboards, and HIPAA-compliant clinical analytics consumption layers.",
        validation: "Query performance optimization, sub-second p50 response SLAs, and cache hit rate tracking.",
        codeRule: "analytics_sla_monitor.assert_p95_latency(threshold_ms=800)",
    },
];

export function DataPipelineVisual() {
    const [selectedNode, setSelectedNode] = useState<PipelineNode>(pipelineNodes[3]);

    const getNodeColor = (type: PipelineNode["type"]) => {
        switch (type) {
            case "source":
                return "text-sky-600 dark:text-sky-400 border-sky-300 dark:border-sky-800 bg-sky-50 dark:bg-sky-950/40";
            case "process":
                return "text-indigo-600 dark:text-indigo-400 border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-indigo-950/40";
            case "storage":
                return "text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-800 bg-blue-50 dark:bg-blue-950/40";
            case "gate":
                return "text-emerald-600 dark:text-emerald-400 border-emerald-400 dark:border-emerald-700 bg-emerald-50 dark:bg-emerald-950/40 ring-1 ring-emerald-500/30";
            case "sink":
                return "text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800 bg-amber-50 dark:bg-amber-950/40";
        }
    };

    const getNodeIcon = (type: PipelineNode["type"]) => {
        switch (type) {
            case "source": return <Activity className="w-4 h-4" />;
            case "process": return <Terminal className="w-4 h-4" />;
            case "storage": return <Database className="w-4 h-4" />;
            case "gate": return <ShieldCheck className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />;
            case "sink": return <Layers className="w-4 h-4" />;
        }
    };

    return (
        <section className="py-16 md:py-24 border-t border-border">
            <div className="container mx-auto px-5 sm:px-8 max-w-6xl">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
                    <div>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display text-foreground">
                            Data flow &amp; verification topology
                        </h2>
                        <p className="text-sm text-muted-foreground mt-2 max-w-xl">
                            Zero unverified records reach downstream consumers. Select any architectural stage to inspect assertions, boundaries, and runtime gate logic.
                        </p>
                    </div>
                </div>

                <div className="border border-border rounded-lg p-6 sm:p-8 bg-card shadow-sm">
                    {/* Nodes Strip */}
                    <div className="relative py-6 overflow-x-auto scrollbar-hide z-10">
                        <div className="min-w-[840px] flex items-center justify-between relative px-6">
                            {/* Bus Line */}
                            <div className="absolute top-1/2 left-8 right-8 h-px bg-border -translate-y-1/2 z-0">
                                {/* Streaming Pulse */}
                                <motion.div
                                    animate={{ left: ["0%", "95%"] }}
                                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                                    className="absolute top-1/2 -translate-y-1/2 w-20 h-[2px] bg-primary/70"
                                />
                            </div>

                            {/* Stage Nodes */}
                            {pipelineNodes.map((node) => {
                                const isSelected = selectedNode.id === node.id;
                                return (
                                    <button
                                        key={node.id}
                                        type="button"
                                        onClick={() => setSelectedNode(node)}
                                        className={`relative z-10 flex flex-col items-center group cursor-pointer focus:outline-none transition-all ${
                                            isSelected ? "scale-105" : "hover:scale-105 opacity-80 hover:opacity-100"
                                        }`}
                                    >
                                        <div
                                            className={`w-12 h-12 rounded-lg border flex items-center justify-center transition-all ${
                                                getNodeColor(node.type)
                                            } ${
                                                isSelected
                                                    ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
                                                    : ""
                                            }`}
                                        >
                                            {getNodeIcon(node.type)}
                                        </div>

                                        <span className="font-mono text-xs font-semibold text-foreground mt-2.5 tracking-wide">
                                            {node.id}
                                        </span>
                                        <span className="font-mono text-[11px] text-muted-foreground mt-0.5">
                                            {node.label}
                                        </span>

                                        {isSelected && (
                                            <motion.div
                                                layoutId="node-arrow"
                                                className="absolute -bottom-3.5 w-2 h-2 rotate-45 bg-primary"
                                                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    {/* Inspected Node Detail Box */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedNode.id}
                            initial={{ opacity: 0, y: 6 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -6 }}
                            transition={{ duration: 0.18 }}
                            className="mt-6 pt-6 border-t border-border grid grid-cols-1 md:grid-cols-3 gap-6 bg-secondary/40 rounded-lg p-6"
                        >
                            <div className="md:col-span-1 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-mono text-xs px-2 py-0.5 rounded border border-border bg-card uppercase font-medium">
                                        STAGE // {selectedNode.id}
                                    </span>
                                    <span className="font-mono text-xs text-primary font-medium">
                                        {selectedNode.metrics}
                                    </span>
                                </div>
                                <h3 className="font-display font-semibold text-xl text-foreground">
                                    {selectedNode.label}
                                </h3>
                                <p className="font-mono text-xs text-muted-foreground">
                                    {selectedNode.sublabel}
                                </p>
                            </div>

                            <div className="md:col-span-1 space-y-1.5">
                                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                                    Architecture &amp; Data Flow
                                </p>
                                <p className="text-sm text-foreground/90 leading-relaxed">
                                    {selectedNode.details}
                                </p>
                            </div>

                            <div className="md:col-span-1 space-y-2 border-t md:border-t-0 md:border-l border-border pt-4 md:pt-0 md:pl-6">
                                <p className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
                                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                                    Automated Quality Assertion Gate
                                </p>
                                <p className="text-xs font-mono text-emerald-700 dark:text-emerald-300 leading-relaxed bg-emerald-50 dark:bg-emerald-950/40 p-3 rounded border border-emerald-200 dark:border-emerald-800">
                                    {selectedNode.validation}
                                </p>
                                {selectedNode.codeRule && (
                                    <div className="pt-1">
                                        <p className="font-mono text-[10px] uppercase text-muted-foreground flex items-center gap-1 mb-1">
                                            <Code2 className="w-3 h-3 text-primary" />
                                            Runtime Rule Logic
                                        </p>
                                        <code className="text-[11px] font-mono text-foreground/90 bg-card px-2.5 py-1.5 rounded border border-border block overflow-x-auto scrollbar-hide">
                                            {selectedNode.codeRule}
                                        </code>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Pipeline Status Footer */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs font-mono text-muted-foreground pt-4 border-t border-border">
                        <span className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-500" />
                            TELEMETRY: Zero unvalidated flow to Gold consumption
                        </span>
                        <span className="flex items-center gap-1 text-accent font-medium">
                            Delta Lake time-travel auditing enabled <ArrowRight className="w-3.5 h-3.5" />
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
}
