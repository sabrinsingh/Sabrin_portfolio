
import { motion } from "framer-motion";
import React, { useState } from "react";
import {
    SiPython, SiApachespark, SiDatabricks,
    SiDelta, SiAmazonredshift, SiApacheairflow, SiSnowflake,
    SiPandas, SiGit, SiDocker, SiPostgresql
} from "react-icons/si";
import { FaAws } from "react-icons/fa";

interface TechItem {
    name: string;
    icon: React.ElementType;
    category: string;
    description: string;
    color: string;
}

const technologies: TechItem[] = [
    { name: "Python", icon: SiPython, category: "Language", description: "Primary programming language", color: "#3776AB" },
    { name: "SQL", icon: SiPostgresql, category: "Language", description: "Data querying & manipulation", color: "#336791" },
    { name: "PySpark", icon: SiApachespark, category: "Big Data", description: "Distributed data processing", color: "#E25A1C" },
    { name: "Databricks", icon: SiDatabricks, category: "Platform", description: "Unified analytics platform", color: "#FF3621" },
    { name: "AWS", icon: FaAws, category: "Cloud", description: "Cloud infrastructure", color: "#232F3E" },
    { name: "Delta Lake", icon: SiDelta, category: "Storage", description: "ACID transactions on data lakes", color: "#00ADD8" },
    { name: "Redshift", icon: SiAmazonredshift, category: "Warehouse", description: "Cloud data warehouse", color: "#8C4FFF" },
    { name: "Airflow", icon: SiApacheairflow, category: "Orchestration", description: "Workflow automation", color: "#017CEE" },
    { name: "Snowflake", icon: SiSnowflake, category: "Warehouse", description: "Cloud data platform", color: "#29B5E8" },
    { name: "Pandas", icon: SiPandas, category: "Library", description: "Data analysis library", color: "#150458" },
    { name: "Git", icon: SiGit, category: "DevOps", description: "Version control", color: "#F05032" },
    { name: "Docker", icon: SiDocker, category: "DevOps", description: "Containerization", color: "#2496ED" },
];

export function TechOrbit() {
    const [hoveredTech, setHoveredTech] = useState<string | null>(null);

    return (
        <div className="py-8">
            {/* Tech Grid */}
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4 md:gap-6 max-w-4xl mx-auto">
                {technologies.map((tech, index) => (
                    <motion.div
                        key={tech.name}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: index * 0.05 }}
                        className="relative group"
                        onMouseEnter={() => setHoveredTech(tech.name)}
                        onMouseLeave={() => setHoveredTech(null)}
                    >
                        <motion.div
                            whileHover={{ scale: 1.1, y: -5 }}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:shadow-lg hover:shadow-primary/10 transition-all cursor-pointer"
                        >
                            <tech.icon className="text-3xl md:text-4xl transition-colors" style={{ color: hoveredTech === tech.name ? tech.color : 'currentColor' }} />
                            <span className="text-xs md:text-sm font-medium text-foreground text-center">
                                {tech.name}
                            </span>
                        </motion.div>

                        {/* Tooltip on Hover */}
                        <motion.div
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{
                                opacity: hoveredTech === tech.name ? 1 : 0,
                                y: hoveredTech === tech.name ? 0 : 10,
                                scale: hoveredTech === tech.name ? 1 : 0.9,
                            }}
                            className="absolute left-1/2 -translate-x-1/2 -top-20 z-50 pointer-events-none"
                        >
                            <div className="bg-popover border border-border rounded-lg shadow-xl px-3 py-2 min-w-[140px]">
                                <p className="text-xs font-semibold text-primary">{tech.category}</p>
                                <p className="text-xs text-muted-foreground mt-0.5">{tech.description}</p>
                                {/* Arrow */}
                                <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 bg-popover border-r border-b border-border rotate-45" />
                            </div>
                        </motion.div>
                    </motion.div>
                ))}
            </div>

            {/* Category Legend */}
            <div className="flex flex-wrap justify-center gap-4 mt-8 text-xs text-muted-foreground">
                {["Language", "Big Data", "Platform", "Cloud", "Warehouse", "Orchestration", "Library", "DevOps"].map((cat) => (
                    <span key={cat} className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-primary/50" />
                        {cat}
                    </span>
                ))}
            </div>
        </div>
    );
}
