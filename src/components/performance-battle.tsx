import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Database, Cpu, Activity, Info, ChevronRight, BarChart3, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Scenario {
    id: string;
    title: string;
    description: string;
    sql: {
        steps: string[];
        duration: number;
        ram: string;
        cost: string;
        winner: boolean;
        insight: string;
    };
    spark: {
        steps: string[];
        duration: number;
        ram: string;
        cost: string;
        winner: boolean;
        insight: string;
    };
}

const scenarios: Scenario[] = [
    {
        id: "joins",
        title: "Multi-Way Fact Joins",
        description: "Joining 10B rows of Transactional data with 50M rows of Customer metadata.",
        sql: {
            steps: ["Parsing Query", "CBO Optimization", "Hash Join Execute", "Materializing"],
            duration: 4.2,
            ram: "128GB",
            cost: "$0.12",
            winner: true,
            insight: "SQL Engines with advanced Query Optimizers excel here due to Pushdown predicates and result caching."
        },
        spark: {
            steps: ["Job DAG Build", "Data Partitioning", "Shuffle Exchange", "Result Collect"],
            duration: 8.5,
            ram: "512GB (Cluster)",
            cost: "$0.45",
            winner: false,
            insight: "Spark's distributed nature adds shuffle overhead for 'small' large joins compared to centralized MPP engines."
        }
    },
    {
        id: "shuffles",
        title: "Large Scale Shuffles",
        description: "Re-partitioning 50TB of logs by UserID for a global 30-day window.",
        sql: {
            steps: ["Spilling to Disk", "TempDB Bloating", "Query Timeout", "ERROR: OOM"],
            duration: 0,
            ram: "OOM Error",
            cost: "$2.50 (Failed)",
            winner: false,
            insight: "Standard SQL engines often struggle with massive shuffles that exceed local memory limits."
        },
        spark: {
            steps: ["Memory Prep", "Map-Side Shuffle", "Reduce-Side Write", "Commit"],
            duration: 12.0,
            ram: "2TB (Dynamic)",
            cost: "$1.20",
            winner: true,
            insight: "Spark's shared-nothing architecture and spill-to-disk capability ensure stability at Peta-scale."
        }
    },
    {
        id: "udfs",
        title: "Geo-Spatial Complex UDFs",
        description: "Calculating distance-based clusters using custom Python logic across the dataset.",
        sql: {
            steps: ["Cursor Context Switch", "Row-by-Row Execution", "Serialization", "Bottleneck"],
            duration: 25.4,
            ram: "16GB",
            cost: "$0.80",
            winner: false,
            insight: "SQL engines incur massive overhead when switching contexts between the DB engine and custom code."
        },
        spark: {
            steps: ["Python Worker Init", "Vectorized UDF", "Parallel Map", "Result Write"],
            duration: 5.2,
            ram: "64GB",
            cost: "$0.30",
            winner: true,
            insight: "Spark (and PySpark) allows for efficient, vectorized execution of custom code directly on data partitions."
        }
    }
];

export const PerformanceBattle = () => {
    const [selectedId, setSelectedId] = useState(scenarios[0].id);
    const [isRunning, setIsRunning] = useState(false);
    const [progress, setProgress] = useState(0);
    const scenario = scenarios.find(s => s.id === selectedId)!;

    useEffect(() => {
        let timer: any;
        if (isRunning) {
            setProgress(0);
            timer = setInterval(() => {
                setProgress(prev => {
                    if (prev >= 100) {
                        setIsRunning(false);
                        return 100;
                    }
                    return prev + 1.5;
                });
            }, 50);
        }
        return () => clearInterval(timer);
    }, [isRunning]);

    const handleRun = () => {
        setIsRunning(true);
    };

    return (
        <section id="performance" className="py-24 bg-background relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Left side: Controls */}
                    <div className="w-full lg:w-1/3 space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
                                <Zap className="text-primary" /> Performance Battle
                            </h2>
                            <p className="text-muted-foreground">
                                Compare architectural execution paths. Select a workload to see how different engines handle data gravity.
                            </p>
                        </div>

                        <div className="space-y-3">
                            {scenarios.map(s => (
                                <button
                                    key={s.id}
                                    onClick={() => { setSelectedId(s.id); setIsRunning(false); setProgress(0); }}
                                    className={`w-full p-4 rounded-xl border text-left transition-all hover:border-primary/50 group ${selectedId === s.id ? 'bg-primary/5 border-primary ring-1 ring-primary' : 'bg-card border-border'
                                        }`}
                                >
                                    <h3 className="font-bold flex items-center justify-between">
                                        {s.title}
                                        <ChevronRight className={`w-4 h-4 transition-transform ${selectedId === s.id ? 'translate-x-1' : ''}`} />
                                    </h3>
                                    <p className="text-xs text-muted-foreground mt-1">{s.description}</p>
                                </button>
                            ))}
                        </div>

                        <Button
                            onClick={handleRun}
                            disabled={isRunning}
                            className="w-full h-14 text-lg font-bold rounded-xl gap-2 shadow-lg shadow-primary/20"
                        >
                            <Activity className={isRunning ? "animate-spin" : ""} />
                            {isRunning ? "Running Benchmark..." : "Execute Battle"}
                        </Button>
                    </div>

                    {/* Right side: Simulation */}
                    <div className="w-full lg:w-2/3 bg-card/40 backdrop-blur-2xl border border-border/40 rounded-[2rem] p-4 sm:p-6 lg:p-8 relative overflow-hidden min-h-[400px] sm:min-h-[500px] shadow-2xl shadow-primary/5">
                        <div className="absolute top-0 right-0 p-4 flex gap-2">
                            <div className="px-3 py-1 bg-secondary rounded-full text-[10px] font-bold uppercase tracking-wider text-muted-foreground hidden sm:block">Production Cluster Simulation</div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
                            {/* SQL Engine View */}
                            <EngineView
                                name="SQL Engine (MPP)"
                                icon={Database}
                                data={scenario.sql}
                                progress={progress}
                            />

                            {/* Spark View */}
                            <EngineView
                                name="Apache Spark"
                                icon={Cpu}
                                data={scenario.spark}
                                progress={progress}
                            />
                        </div>

                        {/* Insights Panel */}
                        <AnimatePresence>
                            {!isRunning && progress === 100 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="mt-12 p-6 rounded-2xl bg-secondary/50 border border-border flex gap-4"
                                >
                                    <div className="p-3 bg-primary/20 rounded-full h-fit">
                                        <Info className="w-6 h-6 text-primary" />
                                    </div>
                                    <div className="space-y-2">
                                        <h4 className="font-bold text-foreground">Architectural Insight</h4>
                                        <p className="text-sm text-muted-foreground leading-relaxed">
                                            {scenario.sql.winner ? scenario.sql.insight : scenario.spark.insight}
                                        </p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};

const EngineView = ({ name, icon: Icon, data, progress }: { name: string, icon: any, data: any, progress: number }) => {
    // Correct progress calculation to handle OOM/Errors if any
    const displayProgress = data.duration === 0 ? Math.min(progress, 60) : progress;
    const isError = data.duration === 0 && progress >= 60;

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                    <Icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-bold text-lg text-foreground">{name}</h3>
                {progress === 100 && data.winner && (
                    <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-[10px] bg-primary text-primary-foreground font-bold px-2 py-0.5 rounded-full uppercase tracking-tighter"
                    >
                        Winner
                    </motion.span>
                )}
            </div>

            {/* Metrics HUD */}
            <div className="grid grid-cols-3 gap-2">
                <MetricCard icon={Clock} label="Latency" value={progress === 100 ? `${data.duration}s` : "--"} />
                <MetricCard icon={BarChart3} label="RAM Peak" value={progress === 100 ? data.ram : "--"} />
                <MetricCard icon={Activity} label="Cost/Q" value={progress === 100 ? data.cost : "--"} color={isError ? "text-red-500" : ""} />
            </div>

            {/* Progress Bar Container */}
            <div className="space-y-4">
                <div className="relative h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                        className={`absolute left-0 top-0 h-full ${isError ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.5)]' : 'bg-primary shadow-[0_0_12px_rgba(var(--primary),0.5)]'}`}
                        animate={{ width: `${displayProgress}%` }}
                        transition={{ type: "spring", bounce: 0, duration: 0.1 }}
                    />
                </div>

                {/* Steps List */}
                <div className="space-y-2">
                    {data.steps.map((step: string, idx: number) => {
                        const stepThreshold = (100 / data.steps.length) * (idx + 1);
                        const isDone = displayProgress >= stepThreshold;
                        const isCurrent = displayProgress < stepThreshold && displayProgress >= stepThreshold - (100 / data.steps.length);
                        const stepIsError = isError && idx === data.steps.length - 1;

                        return (
                            <div key={idx} className={`flex items-center gap-3 transition-colors ${isDone ? 'text-foreground' : 'text-muted-foreground/40'}`}>
                                <div className={`w-1.5 h-1.5 rounded-full transition-all ${isDone ? (stepIsError ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]' : 'bg-primary shadow-[0_0_8px_rgba(var(--primary),0.6)]') : 'bg-muted-foreground/40'} ${isCurrent ? 'animate-pulse scale-150' : ''}`} />
                                <span className={`text-[11px] font-mono tracking-wide ${stepIsError ? 'text-red-500 font-bold' : ''}`}>{step}</span>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

const MetricCard = ({ icon: Icon, label, value, color = "" }: { icon: any, label: string, value: string, color?: string }) => (
    <div className="bg-secondary/30 p-2.5 rounded-xl border border-border/50">
        <Icon className="w-3.5 h-3.5 text-muted-foreground mb-1.5" />
        <div className="text-[11px] sm:text-sm text-muted-foreground uppercase font-bold tracking-tighter leading-none mb-1.5">{label}</div>
        <div className={`text-sm sm:text-base font-mono font-bold truncate ${color}`}>{value}</div>
    </div>
);
