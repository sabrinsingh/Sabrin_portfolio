import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { 
  MapPin, 
  Sparkles, 
  Award, 
  Users, 
  ShieldCheck, 
  Database, 
  RotateCw, 
  ExternalLink 
} from "lucide-react";

export function HeroCinematicPhoto() {
  const [isFlipped, setIsFlipped] = useState(false);

  // Ultra-smooth, subtle 3D tilt tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 120, damping: 18 });
  const mouseYSpring = useSpring(y, { stiffness: 120, damping: 18 });

  const tiltRotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const tiltRotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    // Disable tilt during flip to avoid perspective distortion
    if (isFlipped) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / rect.width - 0.5);
    y.set(mouseY / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="relative w-full max-w-[340px] sm:max-w-[380px] lg:max-w-[400px] mx-auto select-none"
      style={{ perspective: 1200 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* ─── AMBIENT BREATHING AURA ────────────────────────────────────────── */}
      <motion.div
        animate={{
          opacity: [0.25, 0.45, 0.25],
          scale: [0.98, 1.02, 0.98],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -inset-4 rounded-3xl blur-2xl pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(34, 211, 238, 0.18) 0%, rgba(52, 211, 153, 0.12) 40%, rgba(15, 23, 42, 0.6) 70%, transparent 85%)",
        }}
        aria-hidden="true"
      />

      {/* ─── 3D CARD CONTAINER ────────────────────────────────────────────── */}
      <motion.div
        style={{
          rotateX: isFlipped ? 0 : tiltRotateX,
          rotateY: isFlipped ? 0 : tiltRotateY,
          transformStyle: "preserve-3d",
        }}
        className="group relative rounded-2xl border border-slate-800/90 hover:border-slate-700/80 bg-slate-900/50 shadow-2xl transition-colors duration-300 backdrop-blur-sm"
      >
        {/* Flip Animation Wrapper */}
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{ transformStyle: "preserve-3d" }}
          className="relative w-full aspect-square"
        >
          {/* ═══════════════════════════════════════════════════════════════════
              FRONT FACE: EXECUTIVE BUST PORTRAIT
             ═══════════════════════════════════════════════════════════════════ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
            }}
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-slate-950"
          >
            <motion.img
              src="/images/profile.webp"
              alt="Sabrin Lal Singh — Data Lead & QA Engineer"
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              loading="eager"
              decoding="async"
            />

            {/* Luxurious Light Sheen Sweep on First Mount */}
            <motion.div
              initial={{ x: "-150%", opacity: 0 }}
              animate={{ x: "150%", opacity: [0, 0.6, 0] }}
              transition={{ duration: 1.4, delay: 0.4, ease: "easeInOut" }}
              className="absolute inset-0 pointer-events-none z-10"
              style={{
                background:
                  "linear-gradient(115deg, transparent 30%, rgba(255, 255, 255, 0.16) 50%, transparent 70%)",
                transform: "skewX(-20deg)",
              }}
              aria-hidden="true"
            />

            {/* Smooth photographic studio bottom scrim */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent pointer-events-none"
              aria-hidden="true"
            />

            {/* Top-Right Tactile Flip Trigger Button */}
            <div className="absolute top-3.5 right-3.5 z-20">
              <button
                type="button"
                onClick={() => setIsFlipped(true)}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-slate-950/80 border border-slate-700/80 hover:border-cyan-400 text-slate-200 hover:text-cyan-300 text-[11px] font-mono backdrop-blur-md shadow-lg transition-all active:scale-95"
                title="Click to flip to Executive Dossier"
                aria-label="Flip card to Executive Dossier"
              >
                <Sparkles className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span className="font-medium">Dossier</span>
                <RotateCw className="w-3 h-3 text-slate-400 ml-0.5" />
              </button>
            </div>

            {/* Floating Minimalist Status Pill */}
            <div className="absolute bottom-3.5 inset-x-3.5 flex items-center justify-between p-3 rounded-xl bg-slate-950/85 border border-slate-800/90 backdrop-blur-xl shadow-2xl transition-all duration-300 group-hover:border-slate-700/80">
              <div className="flex items-center gap-2.5 min-w-0">
                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-100 tracking-tight truncate">
                    Sabrin Lal Singh
                  </p>
                  <p className="text-[11px] font-mono text-slate-400 truncate flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-cyan-400 shrink-0 inline" />
                    Kathmandu, Nepal
                  </p>
                </div>
              </div>

              <div className="shrink-0 text-right pl-3 border-l border-slate-800/80 font-mono text-[10px]">
                <span className="block font-semibold text-cyan-400 tracking-tight">DATA LEAD ENGINEER</span>
                <span className="text-emerald-400 font-medium">QA ENGINEER · 9+ YRS</span>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════
              BACK FACE: EXECUTIVE LEADERSHIP HUD DOSSIER
             ═══════════════════════════════════════════════════════════════════ */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)",
            }}
            className="absolute inset-0 w-full h-full rounded-2xl overflow-hidden bg-slate-950/98 border border-cyan-500/30 p-5 flex flex-col justify-between"
          >
            {/* Top Bar with Return Button */}
            <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-cyan-400">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="font-semibold uppercase tracking-wider text-[11px]">Leadership Dossier</span>
              </div>

              <button
                type="button"
                onClick={() => setIsFlipped(false)}
                className="inline-flex items-center gap-1 px-2 py-1 rounded bg-slate-900 border border-slate-800 text-[10px] font-mono text-slate-300 hover:text-cyan-400 transition-colors"
                aria-label="Return to portrait"
              >
                <RotateCw className="w-3 h-3 text-cyan-400" />
                <span>Portrait</span>
              </button>
            </div>

            {/* Key Telemetry Bullets */}
            <div className="space-y-2.5 my-auto text-xs">
              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
                <Award className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-100 text-[11px]">Best Employee Award 2023</p>
                  <p className="text-[10px] text-slate-400">Honored for technical leadership at Techkraft Inc.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
                <Users className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-100 text-[11px]">Led &amp; Mentored 8 Engineers</p>
                  <p className="text-[10px] text-slate-400">Sprint leadership, code quality &amp; architecture gates.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
                <Database className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-100 text-[11px]">50M+ Records / Day Under SLA</p>
                  <p className="text-[10px] text-slate-400">Databricks Delta Lake &amp; AWS Redshift -35% latency.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-2 rounded-lg bg-slate-900/40 border border-slate-800/60">
                <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-slate-100 text-[11px]">95% Anomaly Reduction</p>
                  <p className="text-[10px] text-slate-400">Automated QA assertion gates &amp; HIPAA governance.</p>
                </div>
              </div>
            </div>

            {/* Bottom Action Footer */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono">
              <span className="text-emerald-400 font-medium">Available for Lead Roles</span>
              <a
                href="#contact"
                onClick={() => setIsFlipped(false)}
                className="inline-flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-semibold"
              >
                <span>Connect</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
