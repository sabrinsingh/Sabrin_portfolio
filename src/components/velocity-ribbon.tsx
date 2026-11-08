import { motion } from "framer-motion";

interface VelocityRibbonProps {
  items?: string[];
  direction?: "left" | "right";
  className?: string;
}

const DEFAULT_ITEMS = [
  "DATA LEAD & SQUAD MANAGEMENT",
  "ZERO SILENT FAILURES",
  "50M+ DAILY INGESTION",
  "MEDALLION LAKEHOUSE",
  "HIPAA COMPLIANT ARCHITECTURE",
  "DATABRICKS + DELTA LAKE",
  "BEST EMPLOYEE AWARD 2023",
  "AUTOMATED RECONCILIATION GATES",
  "PETABYTE SCALE WAREHOUSING",
  "AWS REDSHIFT + SNOWFLAKE",
];

export function VelocityRibbon({
  items = DEFAULT_ITEMS,
  direction = "left",
  className = "",
}: VelocityRibbonProps) {
  const isLeft = direction === "left";

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-slate-800/80 bg-slate-950/90 py-3 select-none backdrop-blur-sm ${className}`}
      aria-hidden="true"
    >
      {/* Edge gradient mask for smooth fade-in/out */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <motion.div
        className="flex whitespace-nowrap gap-8 text-xs font-mono tracking-widest text-slate-400 font-semibold"
        animate={{
          x: isLeft ? ["0%", "-50%"] : ["-50%", "0%"],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration: 35,
        }}
      >
        {/* Render twice for seamless continuous loop */}
        {[...items, ...items, ...items, ...items].map((text, i) => (
          <div key={i} className="flex items-center gap-8">
            <span className="hover:text-cyan-400 transition-colors uppercase">
              {text}
            </span>
            <span className="text-cyan-500/50 text-[10px]">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}

