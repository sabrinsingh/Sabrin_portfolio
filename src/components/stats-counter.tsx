import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface StatItem {
    value: number;
    suffix: string;
    label: string;
    description: string;
}

const stats: StatItem[] = [
    {
        value: 8,
        suffix: "+",
        label: "Years Experience",
        description: "Building data pipelines",
    },
    {
        value: 5,
        suffix: "TB+",
        label: "Data Processed",
        description: "Daily volume",
    },
    {
        value: 99.9,
        suffix: "%",
        label: "Data Accuracy",
        description: "Quality frameworks",
    },
    {
        value: 30,
        suffix: "+",
        label: "Data Sources",
        description: "Heterogeneous systems",
    },
];

function AnimatedNumber({ value, suffix }: { value: number; suffix: string }) {
    const [displayValue, setDisplayValue] = useState(0);
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            const duration = 2000;
            const steps = 60;
            const increment = value / steps;
            let current = 0;
            const timer = setInterval(() => {
                current += increment;
                if (current >= value) {
                    setDisplayValue(value);
                    clearInterval(timer);
                } else {
                    setDisplayValue(Math.floor(current * 10) / 10);
                }
            }, duration / steps);
            return () => clearInterval(timer);
        }
    }, [isInView, value]);

    return (
        <span ref={ref} className="tabular-nums">
            {value % 1 === 0 ? Math.floor(displayValue) : displayValue.toFixed(1)}
            {suffix}
        </span>
    );
}

export function StatsCounter() {
    return (
        <section className="py-16 md:py-24 bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute inset-0 bg-grid-black/[0.02] -z-10" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-center mb-12"
                >
                    <p className="text-primary font-semibold text-sm tracking-wider uppercase mb-4">
                        By The Numbers
                    </p>
                    <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                        Impact & Achievements
                    </h2>
                </motion.div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1, duration: 0.5 }}
                            className="text-center group"
                        >
                            <div className="relative inline-block">
                                <div className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground group-hover:text-primary transition-colors duration-300">
                                    <AnimatedNumber value={stat.value} suffix={stat.suffix} />
                                </div>
                                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                            </div>
                            <p className="text-lg font-semibold text-foreground mt-3">
                                {stat.label}
                            </p>
                            <p className="text-sm text-muted-foreground mt-1">
                                {stat.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
